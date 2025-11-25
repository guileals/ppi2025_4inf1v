"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuSubmenuTriggerDataAttributes = void 0;
var _popupStateMapping = require("../../utils/popupStateMapping");
let MenuSubmenuTriggerDataAttributes = exports.MenuSubmenuTriggerDataAttributes = function (MenuSubmenuTriggerDataAttributes) {
  /**
   * Present when the corresponding submenu is open.
   */
  MenuSubmenuTriggerDataAttributes[MenuSubmenuTriggerDataAttributes["popupOpen"] = _popupStateMapping.CommonTriggerDataAttributes.popupOpen] = "popupOpen";
  return MenuSubmenuTriggerDataAttributes;
}({});