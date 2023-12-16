import { keypress, queryAppUI } from '@dlenroc/roku-ecp';
import { getAppUI } from '@dlenroc/roku-odc';
import { parseXml, type Element as XMLElement } from 'libxmljs2';
import { Element } from './Element.js';
import type { SDK } from './internal/SDK.ts';
import { KEYBOARD } from './internal/selectors.js';

const rootXML = '<app-ui></app-ui>';
const rootNode = parseXml(rootXML, { noblanks: true }).root() as XMLElement;

export class Document extends Element {
  private xml: string | null;
  public context: 'ECP' | 'ODC' = 'ECP';
  public fields: Record<string, string[]> | undefined;

  constructor(sdk: SDK) {
    super(sdk, rootNode);
    this.xml = rootXML;
  }

  get focusedElement(): Element {
    function findFocusedNode(
      nodes: Element[],
      forceHandleFocusItem: boolean
    ): Element | null {
      for (const node of nodes) {
        const isVisible = node.attributes['visible']?.toLowerCase();
        const isFocused = node.attributes['focused']?.toLowerCase();
        if ((!isVisible || isVisible == 'true') && isFocused != 'false') {
          const focusItem = node.attributes['focusItem'];
          if (focusItem && (isFocused == 'true' || forceHandleFocusItem)) {
            const result = handleFocusItem(node, focusItem);
            if (result) {
              return result;
            }
          } else if (node.children.length && !focusItem) {
            const childNode = findFocusedNode(
              node.children,
              forceHandleFocusItem
            );
            if (childNode) {
              return childNode;
            } else if (isFocused == 'true') {
              return node;
            }
          } else if (isFocused == 'true') {
            return node;
          }
        }
      }
      return null;
    }

    function handleFocusItem(node: Element, focusItem: string): Element | null {
      const index = +focusItem;
      if (isNaN(index)) {
        return null;
      }
      if (node.children.length <= index || index < 0) {
        return null;
      }
      let childNode: Element | null = null;
      for (const childItem of node.children) {
        const nodeIndex = childItem.attributes['index'];
        if (focusItem == nodeIndex) {
          childNode = childItem;
          break;
        }
      }
      if (childNode && childNode.children.length) {
        const childFocusedNode = findFocusedNode(childNode.children, true);
        if (childFocusedNode) {
          return childFocusedNode;
        } else {
          return childNode;
        }
      } else {
        return childNode;
      }
    }

    let focusedNode = findFocusedNode(this.children, false);

    if (focusedNode && this.context === 'ODC') {
      const focusedItem = +(focusedNode.attributes['itemFocused'] || '');
      const focusedColumn = +(
        focusedNode.attributes['rowItemFocused']?.match(/\[\d+,(\d+)\]/)?.[1] ||
        ''
      );

      if (!isNaN(focusedItem)) {
        let contentNode = focusedNode?.children[0];
        if (contentNode?.tag === 'CONTENTNODE') {
          focusedNode = contentNode.children[focusedItem] || focusedNode;

          if (!isNaN(focusedColumn) && focusedNode?.tag === 'CONTENTNODE') {
            focusedNode = focusedNode?.children[focusedColumn] || focusedNode;
          }
        }
      }
    }

    return focusedNode || this;
  }

  get isKeyboardShown(): boolean {
    return this.xpathSelect(`//*[${KEYBOARD}]`)?.isDisplayed || false;
  }

  override async clear() {
    const keyboard = this.xpathSelect(`//*[${KEYBOARD}]`);

    if (keyboard) {
      await keyboard.clear();
    } else {
      throw new Error('Keyboard must be visible to clear the field');
    }
  }

  override async type(text: string) {
    const keyboard = this.xpathSelect(`//*[${KEYBOARD}]`);

    if (keyboard) {
      await keyboard.type(text);
    } else {
      for (const char of text) {
        await keypress(this.sdk.ecp, {
          key: `LIT_${encodeURIComponent(char)}`,
        });
      }
    }
  }

  override async append(text: string) {
    const keyboard = this.xpathSelect(`//*[${KEYBOARD}]`);

    if (keyboard) {
      await keyboard.append(text);
    } else {
      for (const char of text) {
        await keypress(this.sdk.ecp, {
          key: `LIT_${encodeURIComponent(char)}`,
        });
      }
    }
  }

  async render() {
    let xml;

    if (this.context === 'ECP') {
      xml = await queryAppUI(this.sdk.ecp);
    } else if (this.context === 'ODC') {
      xml = await getAppUI(this.sdk.odc, { fields: this.fields! });
    } else {
      throw new Error(`Unknown context ${this.context}`);
    }

    if (xml !== this.xml) {
      this.xml = xml;
      this._root = this._node = parseXml(xml, {
        noblanks: true,
      }).root() as XMLElement;
    }
  }
}
