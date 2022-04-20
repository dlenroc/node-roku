
export const KEYBOARD =
  'substring(name(), string-length(name()) - string-length("Keyboard") + 1) = "Keyboard"' +
  ' or ' +
  'substring(name(), string-length(name()) - string-length("PinPad") + 1) = "PinPad"' +
  ' or ' +
  'substring(@extends, string-length(name()) - string-length("Keyboard") + 1) = "Keyboard"' +
  ' or ' +
  'substring(@extends, string-length(name()) - string-length("PinPad") + 1) = "PinPad"';

export const DIALOG =
  'substring(name(), string-length(name()) - string-length("Dialog") + 1) = "Dialog"' +
  ' or ' +
  'substring(@extends, string-length(name()) - string-length("Dialog") + 1) = "Dialog"';

export const BUTTON =
  'substring(name(), string-length(name()) - string-length("Button") + 1) = "Button"' +
  ' or ' +
  'substring(@extends, string-length(name()) - string-length("Button") + 1) = "Button"';

export const LABEL =
  'substring(name(), string-length(name()) - string-length("Label") + 1) = "Label"' +
  ' or ' +
  'substring(@extends, string-length(name()) - string-length("Label") + 1) = "Label"';
