import * as CssSelect from 'css-select';
// @ts-ignore
import BaseAdapter from 'css-select-base-adapter';
import { Element as XMLElement, Node as XMLNode } from 'libxmljs2';

const XmlAdapter = BaseAdapter({
  isTag(node: XMLNode): boolean {
    return node instanceof XMLElement;
  },

  getName(node: XMLElement): string {
    return node.name().toLowerCase();
  },

  getAttributeValue(node: XMLElement, name: string): string | undefined {
    let attribute = node.attr(name);

    if (!attribute && name === 'id') {
      return (node.attr('name') || node.attr('uiElementId'))?.value();
    }

    if (!attribute) {
      for (const attr of node.attrs()) {
        if (attr.name().toLowerCase() == name) {
          attribute = attr;
        }
      }
    }

    return attribute?.value();
  },

  getText(node: XMLElement): string {
    let text = this.getAttributeValue(node, 'text') || '';

    const nodes = this.getChildren(node);
    for (const node of nodes) {
      text += this.getText(node);
    }

    return text;
  },

  getParent(node: XMLElement): XMLElement | null {
    let parent = node.parent();

    if (parent instanceof XMLElement) {
      return parent;
    }

    return null;
  },

  getChildren(node: XMLElement): XMLElement[] {
    let nodes = node.childNodes();
    let elements: XMLElement[] = [];

    for (const node of nodes) {
      if (node instanceof XMLElement) {
        elements.push(node);
      }
    }

    return elements;
  },

  isHovered(node: XMLElement): boolean {
    return this.getAttributeValue(node, 'focused') === 'true';
  },

  isActive(node: XMLElement): boolean {
    return (
      this.isHovered(node) && !node.get('./descendant::*[@focused="true"]')
    );
  },
});

export function selectOne(
  query: string,
  context: XMLElement
): XMLElement | null {
  return CssSelect.selectOne(query, context, { adapter: XmlAdapter });
}

export function selectAll(query: string, context: XMLElement): XMLElement[] {
  return CssSelect.selectAll(query, context, { adapter: XmlAdapter });
}
