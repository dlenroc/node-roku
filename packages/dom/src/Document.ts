import { SDK } from '@dlenroc/roku';
import { Element as XMLElement, parseXml } from 'libxmljs2';
import { Element } from './Element.js';
import { RokuError } from './Error.js';
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
    return this.cssSelect('[focused="true"]:not(:has([focused="true"]))') || this;
  }

  get isKeyboardShown(): boolean {
    return this.xpathSelect(`//*[${KEYBOARD}]`)?.isDisplayed || false;
  }

  async clear() {
    const keyboard = this.xpathSelect(`//*[${KEYBOARD}]`);

    if (keyboard) {
      await keyboard.clear();
    } else {
      throw new RokuError('Keyboard must be visible to clear the field');
    }
  }

  async type(text: string) {
    const keyboard = this.xpathSelect(`//*[${KEYBOARD}]`);

    if (keyboard) {
      await keyboard.type(text);
    } else {
      await this.sdk.ecp.type(text);
    }
  }

  async append(text: string) {
    const keyboard = this.xpathSelect(`//*[${KEYBOARD}]`);

    if (keyboard) {
      await keyboard.append(text);
    } else {
      await this.sdk.ecp.type(text);
    }
  }

  async render() {
    let xml;

    if (this.context === 'ECP') {
      xml = await this.sdk.ecp.queryAppUI();
    } else if (this.context === 'ODC') {
      xml = await this.sdk.odc.getAppUI(this.fields);
    } else {
      throw new RokuError(`Unknown context ${this.context}`);
    }

    if (xml !== this.xml) {
      this.xml = xml;
      this._root = this._node = parseXml(xml, { noblanks: true }).root() as XMLElement;
    }
  }
}
