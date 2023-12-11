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
    return (
      this.cssSelect('[focused="true"]:not(:has([focused="true"]))') || this
    );
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
