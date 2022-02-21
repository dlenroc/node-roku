import { XMLParser, X2jOptionsOptional } from 'fast-xml-parser';

const globalOptions = {
  ignoreAttributes: false,
  parseAttributeValue: true,
  attributeNamePrefix: '',
};

export default function parse(xml: string, options?: X2jOptionsOptional & { array?: boolean }): any {
  let parsedXML = new XMLParser({ ...globalOptions, ...options }).parse(xml);

  // Hide top level node
  parsedXML = Object.values(parsedXML)[0];

  // Convert element to array
  if (options?.array) {
    parsedXML = Object.values(parsedXML)[0];

    if (parsedXML) {
      parsedXML = Array.isArray(parsedXML) ? parsedXML : [parsedXML];
    } else {
      parsedXML = [];
    }
  }

  return parsedXML;
}
