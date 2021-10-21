import { Element as XMLElement, Node as XMLNode } from 'libxmljs2';
import { performance } from 'perf_hooks';
import { Document } from './Document';
import { RokuError } from './Error';
import { selectAll, selectOne } from './internal/css-select';
import { SDK, Key } from '@dlenroc/roku';

export class Element {
  sdk: SDK;
  document: Document;
  protected _node: XMLElement;
  protected _root: XMLElement;

  constructor(sdk: SDK, node: XMLElement, document: Document | null = null) {
    document = document || (this as unknown as Document);

    this.sdk = sdk;
    this.document = document;
    this._node = node;
    this._root = document._node;
  }

  private get node(): XMLElement {
    if (this._root === this.document._root) {
      return this._node;
    }

    const node = this.document._root.get(this._node.path());

    if (node) {
      this._node = node as XMLElement;
      this._root = this.document._root;
    }

    return this._node;
  }

  get parent(): Element | null {
    const node = this.node.parent();
    return node instanceof XMLElement ? new Element(this.sdk, node, this.document) : null;
  }

  get parents(): Element[] {
    const elements = [];
    let parent = this.parent;

    while (parent != null) {
      elements.push(parent);
      parent = parent.parent;
    }

    return elements;
  }

  get siblings(): Element[] {
    return this.parent?.children || [this];
  }

  get prev(): Element | null {
    const node = this.node.prevElement();
    return node instanceof XMLElement ? new Element(this.sdk, node, this.document) : null;
  }

  get next(): Element | null {
    const node = this.node.nextElement();
    return node instanceof XMLElement ? new Element(this.sdk, node, this.document) : null;
  }

  get children(): Element[] {
    const elements = [];

    for (const node of this.node.childNodes()) {
      if (node instanceof XMLElement) {
        elements.push(new Element(this.sdk, node, this.document));
      }
    }

    return elements;
  }

  get tag(): string {
    return this.node.name().toUpperCase();
  }

  get path(): string {
    return this.node.path();
  }

  get index(): number {
    let index = 0;
    let node: XMLElement | null = this.node;

    while ((node = node.prevElement())) {
      index++;
    }

    return index;
  }

  get attributes(): Record<string, string> {
    const attrs: Record<string, string> = {};

    for (const attr of this.node.attrs()) {
      attrs[attr.name()] = attr.value();
    }

    return attrs;
  }

  get text(): string {
    return this.xpathSelectAll('./descendant-or-self::*[(self::Label or self::SimpleLabel) and @text]')
      .filter((element) => element.isDisplayed)
      .map((element) => element.attributes.text.trim())
      .filter((text) => text)
      .join('\n');
  }

  get bounds(): { x: number; y: number; width: number; height: number } | null {
    const bounds = this.attributes.bounds;

    if (!bounds) {
      return null;
    }

    const [x, y, width, height] = JSON.parse(`[${bounds.slice(1, -1)}]`);

    return {
      width: Math.ceil(width),
      height: Math.ceil(height),
      x: Math.floor(x),
      y: Math.floor(y),
    };
  }

  get isConnected(): boolean {
    return this.node && this._root === this.document._root;
  }

  get isFocused(): boolean {
    return this.node.attr('focused')?.value() === 'true';
  }

  get isInFocusChain(): boolean {
    const focusedElement = this.document.focusedElement;
    if (focusedElement === this.document) {
      return false;
    }

    const elementChain = [this, ...this.parents];
    const focusedElementChain = [focusedElement, ...focusedElement.parents];
    const count = Math.min(elementChain.length, focusedElementChain.length);

    return elementChain[elementChain.length - count].isSameNode(focusedElementChain[focusedElementChain.length - count]);
  }

  get isDisplayed(): boolean {
    return !this.node.get('./ancestor-or-self::*[@visible="false" or @opacity="0"]');
  }

  isSameNode(element: Element): boolean {
    return this === element || this.node === element.node || this.path === element.path;
  }

  async clear() {
    await appendOrSetText(this, '', true);
  }

  async type(text: string) {
    await appendOrSetText(this, text, true);
  }

  async append(text: string) {
    await appendOrSetText(this, text, false);
  }

  async select() {
    await this.focus();
    await this.sdk.ecp.keypress('Select');
  }

  async focus() {
    const move = async (key: Key) => {
      const { path, attributes } = this.document.focusedElement;

      await this.sdk.ecp.keypress(key);

      const moved = await retrying({
        timeout: 5000,
        validate: (result, error) => result || error,
        command: async () => {
          await this.document.render();

          const { path: newPath, attributes: newAttributes } = this.document.focusedElement;

          if (path !== newPath) {
            return true;
          }

          for (const [key, value] of Object.entries(attributes)) {
            if (newAttributes[key] !== value) {
              return true;
            }
          }

          return false;
        },
      });

      if (!moved) {
        throw new RokuError('Could not focus');
      }
    };

    let variants = this.document.cssSelectAll('*:not(:has(*))').length;

    while (this.isConnected && this.isDisplayed && !this.isInFocusChain && variants--) {
      const focusedElement = this.document.focusedElement;
      const focusChain = [focusedElement, ...focusedElement.parents].reverse();
      const chain = [this, ...this.parents].reverse();
      const depth = Math.min(chain.length, focusChain.length);

      for (let moved = false, i = 0; !moved && i < depth; i++) {
        const target = chain[i];
        const source = focusChain[i];

        if (target.isSameNode(source)) {
          continue;
        }

        const targetBounds = target.bounds;
        const sourceBounds = source.bounds;

        if (!targetBounds || !sourceBounds) {
          continue;
        }

        if (targetBounds.y < sourceBounds.y) {
          moved = true;
          await move('Up');
        } else if (targetBounds.y > sourceBounds.y) {
          moved = true;
          await move('Down');
        } else if (targetBounds.x < sourceBounds.x) {
          moved = true;
          await move('Left');
        } else if (targetBounds.x > sourceBounds.x) {
          moved = true;
          await move('Right');
        }
      }
    }

    if (!this.isInFocusChain) {
      throw new RokuError('Could not focus');
    }
  }

  cssSelect<T extends Timeout = null>(css: string, timeoutInSeconds?: T): ReturnForTimeout<Element | null, T> {
    return findElOrEls(
      this,
      () => {
        const node = normalizeNode(selectOne(css, this.node));
        return node ? new Element(this.sdk, node, this.document) : null;
      },
      timeoutInSeconds
    );
  }

  cssSelectAll<T extends Timeout = null>(css: string, timeoutInSeconds?: T): ReturnForTimeout<Element[], T> {
    return findElOrEls(
      this,
      () => {
        const nodes = normalizeNodes(selectAll(css, this.node));
        return nodes.map((node) => new Element(this.sdk, node, this.document));
      },
      timeoutInSeconds
    );
  }

  xpathSelect<T extends Timeout = null>(xpath: string, timeoutInSeconds?: T): ReturnForTimeout<Element | null, T> {
    return findElOrEls(
      this,
      () => {
        const node = normalizeNode(this.node.get(xpath));
        return node ? new Element(this.sdk, node, this.document) : null;
      },
      timeoutInSeconds
    );
  }

  xpathSelectAll<T extends Timeout = null>(xpath: string, timeoutInSeconds?: T): ReturnForTimeout<Element[], T> {
    return findElOrEls(
      this,
      () => {
        const nodes = normalizeNodes(this.node.find(xpath));
        return nodes.map((node) => new Element(this.sdk, node, this.document));
      },
      timeoutInSeconds
    );
  }

  toString(): string {
    return this.node.toString({
      type: 'xml',
      whitespace: false,
      declaration: false,
      selfCloseEmpty: true,
    });
  }
}

type Timeout = number | undefined | null;
type ReturnForTimeout<R, T extends Timeout = null> = T extends undefined | null ? R : Promise<R>;

function findElOrEls<R, T extends Timeout = null>(element: Element, getElOrEls: () => R, timeoutInSeconds?: T): ReturnForTimeout<R, T> {
  if (typeof timeoutInSeconds !== 'number') {
    return getElOrEls() as any;
  }

  return (async () => {
    let elOrEls = getElOrEls();

    if (Array.isArray(elOrEls) ? elOrEls.length == 0 : !elOrEls) {
      elOrEls = await retrying({
        timeout: timeoutInSeconds * 1000,
        validate: (elOrEls, error) => error || (Array.isArray(elOrEls) ? elOrEls.length > 0 : elOrEls),
        command: async () => {
          await element.document.render();
          return getElOrEls();
        },
      });
    }

    return elOrEls;
  })() as any;
}

async function appendOrSetText(element: Element, text: string, clear: boolean) {
  // If the element is inside the keyboard,
  // make sure the keyboard is activated
  // and make changes to the text

  let keyboard = element.xpathSelect('./ancestor-or-self::*[substring(name(), string-length(name()) - string-length("Keyboard") + 1) = "Keyboard" or substring(name(), string-length(name()) - string-length("PinPad") + 1) = "PinPad"]');

  if (keyboard) {
    if (clear || text) {
      await keyboard.focus();
    }

    if (clear) {
      const input = keyboard.xpathSelect('.//*[@text]');
      const cursor = keyboard.xpathSelect('.//*[@bounds and contains(@uri, "cursor_textInput")]');
      if (input && (cursor?.bounds?.x || keyboard.attributes.text)) {
        for (let i = 0, n = input.attributes.text.length; i < n; i++) {
          await element.sdk.ecp.keypress('Backspace');
        }
      }
    }

    if (text) {
      await element.sdk.ecp.type(text);
    }

    return;
  }

  // Otherwise, we need to activate keyboard
  // by selecting element and then change the text

  await element.select();

  keyboard = await element.document.xpathSelect('//*[substring(name(), string-length(name()) - string-length("Keyboard") + 1) = "Keyboard" or substring(name(), string-length(name()) - string-length("PinPad") + 1) = "PinPad"]', 5);

  if (keyboard) {
    await appendOrSetText(keyboard, text, clear);
  } else {
    throw new RokuError('Keyboard dialog did not appear after pressing `Select` on element');
  }

  // Submit changes by selecting the first button in the dialog
  // or by sending `Enter` button

  const submitButton = keyboard.xpathSelect('./ancestor-or-self::*[substring(name(), string-length(name()) - string-length("Dialog") + 1) = "Dialog"]//*[substring(name(), string-length(name()) - string-length("Button") + 1) = "Button"]');

  if (submitButton) {
    await submitButton.select();
  } else {
    await element.sdk.ecp.keypress('Enter');
  }

  // Wait for the keyboard to disappear

  const isKeyboardClosed = !(await element.document.xpathSelect('self::*[not(./descendant-or-self::*[substring(name(), string-length(name()) - string-length("Keyboard") + 1) = "Keyboard" or substring(name(), string-length(name()) - string-length("PinPad") + 1) = "PinPad"])]', 5));
  if (isKeyboardClosed) {
    throw new RokuError('Keyboard dialog did not disappear');
  }
}

function normalizeNode(node: XMLNode | null): XMLElement | null {
  if (node instanceof XMLElement) {
    return node;
  }

  const element = node?.parent();
  return element instanceof XMLElement ? element : null;
}

function normalizeNodes(nodes: XMLNode[]): XMLElement[] {
  const elements = [];

  for (const node of nodes) {
    const element = normalizeNode(node);

    if (element) {
      elements.push(element);
    }
  }

  return elements;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retrying<Type>(options: { timeout: number; command: () => Promise<Type>; validate: (result?: Type, error?: any) => boolean }): Promise<Type> {
  const duration = 500;
  const endTimestamp = performance.now() + options.timeout;

  while (true) {
    let result;
    let exception;
    let hasException;

    try {
      result = await options.command();
    } catch (e) {
      exception = e;
      hasException = true;
    }

    const isValid = options.validate(result, exception);
    const elapsed = endTimestamp - performance.now();

    if (isValid || elapsed <= 0) {
      if (hasException) {
        throw exception;
      } else {
        return result as Type;
      }
    }

    if (elapsed > duration) {
      await sleep(duration);
    } else {
      await sleep(elapsed);
      continue; // last chance
    }
  }
}
