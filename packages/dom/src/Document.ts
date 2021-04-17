import { Element as XMLElement, parseXml } from 'libxmljs2';
import { Element } from './Element';
import { RokuError } from './Error';
import { SDK } from '@dlenroc/roku';

const rootXML = '<app-ui></app-ui>';
const rootNode = parseXml(rootXML, { noblanks: true }).root() as XMLElement;

export class Document extends Element {
  private xml: string | null;
  public context: 'ECP' | 'ODC' = 'ECP';

  constructor(sdk: SDK) {
    super(sdk, rootNode);
    this.xml = rootXML;
  }

  get focusedElement(): Element {
    return this.cssSelect('[focused="true"]:not(:has([focused="true"]))') || this;
  }

  get isKeyboardShown(): boolean {
    return this.xpathSelect('//*[self::Keyboard or self::MiniKeyboard or self::PinPad]')?.isDisplayed || false;
  }

  async clear() {
    const keyboard = this.xpathSelect('//*[self::Keyboard or self::MiniKeyboard or self::PinPad]');

    if (keyboard) {
      await keyboard.clear();
    } else {
      throw new RokuError('Keyboard must be visible to clear the field');
    }
  }

  async type(text: string) {
    const keyboard = this.xpathSelect('//*[self::Keyboard or self::MiniKeyboard or self::PinPad]');

    if (keyboard) {
      await keyboard.type(text);
    } else {
      await this.sdk.ecp.type(text);
    }
  }

  async append(text: string) {
    const keyboard = this.xpathSelect('//*[self::Keyboard or self::MiniKeyboard or self::PinPad]');

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
      xml = await this.sdk.odc.getAppUI();
    } else {
      throw new RokuError(`Unknown context ${this.context}`);
    }

    if (xml !== this.xml) {
      this.xml = xml;
      this._root = this._node = parseXml(xml, { noblanks: true }).root() as XMLElement;
    }
  }
}
