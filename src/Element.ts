import { Element as XMLElement, Node as XMLNode } from 'libxmljs2';
import { performance } from 'perf_hooks';
import { Document } from './Document';
import { RokuError } from './Error';
import { selectAll, selectOne } from './internal/css-select';
import { SDK } from './SDK';
import { Key } from './types';

export class Element {
  sdk: SDK;
  document: Document;
  protected _node: XMLElement;
  protected _root: XMLElement;

  constructor(sdk: SDK, node: XMLElement, document: Document | null = null) {
    document = document || ((this as unknown) as Document);

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
    const elementChain = [this, ...this.parents];
    const focusedElement = this.document.focusedElement;
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
    // If the element is inside the keyboard,
    // make sure the keyboard is activated
    // and clear the text with `Backspace`

    let keyboard = this.xpathSelect('./ancestor-or-self::*[self::Keyboard or self::MiniKeyboard or self::PinPad]');

    if (keyboard) {
      await keyboard.focus();

      const input = keyboard.xpathSelect('.//*[@text]');
      const cursor = keyboard.xpathSelect('.//*[@bounds and contains(@uri, "cursor_textInput")]');
      if (input && (cursor?.bounds?.x || keyboard.attributes.text)) {
        for (let i = 0, n = input.text.length; i < n; i++) {
          await this.sdk.ecp.keypress('Backspace');
        }
      }

      return;
    }

    // Otherwise, we need to activate keyboard
    // by selecting element and then removing text

    await this.select();

    keyboard = await this.document.xpathSelect('//*[self::Keyboard or self::MiniKeyboard or self::PinPad]', 5);

    if (keyboard) {
      await keyboard.clear();
    } else {
      throw new RokuError('Keyboard dialog did not appear after pressing `Select` on element');
    }

    // Submit changes by selecting the first button in the dialog
    // or by sending `Enter` button

    const submitButton = await keyboard.xpathSelect('./ancestor-or-self::*[self::Dialog or self::KeyboardDialog or self::PinDialog or self::ProgressDialog]//ButtonGroup');

    if (submitButton) {
      await submitButton.select();
    } else {
      await this.sdk.ecp.keypress('Enter');
    }

    // Wait for the keyboard to disappear

    const isKeyboardClosed = !(await this.document.xpathSelect('self::*[not(./descendant-or-self::*[self::Keyboard or self::MiniKeyboard or self::PinPad])]', 5));
    if (isKeyboardClosed) {
      throw new RokuError('Keyboard dialog did not disappear');
    }
  }

  async type(text: string) {
    // If the element is inside the keyboard,
    // make sure the keyboard is activated
    // and send the text

    let keyboard = this.xpathSelect('./ancestor-or-self::*[self::Keyboard or self::MiniKeyboard or self::PinPad]');

    if (keyboard) {
      if (text) {
        await keyboard.focus();
        await this.sdk.ecp.type(text);
      }

      return;
    }

    // Otherwise, we need to activate keyboard
    // by selecting element and then send the text

    await this.select();

    keyboard = await this.document.xpathSelect('//*[self::Keyboard or self::MiniKeyboard or self::PinPad]', 5);

    if (keyboard) {
      await keyboard.type(text);
    } else {
      throw new RokuError('Keyboard dialog did not appear after pressing `Select` on element');
    }

    // Submit changes by selecting the first button in the dialog
    // or by sending `Enter` button

    const submitButton = await keyboard.xpathSelect('./ancestor-or-self::*[self::Dialog or self::KeyboardDialog or self::PinDialog or self::ProgressDialog]//ButtonGroup');

    if (submitButton) {
      await submitButton.select();
    } else {
      await this.sdk.ecp.keypress('Enter');
    }

    // Wait for the keyboard to disappear

    const isKeyboardClosed = !(await this.document.xpathSelect('self::*[not(./descendant-or-self::*[self::Keyboard or self::MiniKeyboard or self::PinPad])]', 5));
    if (isKeyboardClosed) {
      throw new RokuError('Keyboard dialog did not disappear');
    }
  }

  async select() {
    await this.focus();
    await this.sdk.ecp.keypress('Select');
  }

  async focus() {
    const move = async (key: Key) => {
      const path = this.document.focusedElement?.path;
      await this.sdk.ecp.keypress(key);

      const endTime = performance.now() + 5 * 1000;

      while (performance.now() <= endTime) {
        await this.document.render();

        const newPath = this.document.focusedElement?.path;

        if (path !== newPath) {
          return;
        }
      }

      throw new RokuError('Could not focus');
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

    if (!this.isDisplayed) {
      throw new RokuError('Not visible');
    }

    if (!this.isInFocusChain) {
      throw new RokuError('Not focused');
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
    const endTime = performance.now() + timeoutInSeconds * 1000;

    let elOrEls = getElOrEls();
    while ((Array.isArray(elOrEls) ? elOrEls.length == 0 : !elOrEls) && endTime > performance.now()) {
      await element.document.render();
      elOrEls = getElOrEls();
    }

    return elOrEls;
  })() as any;
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
