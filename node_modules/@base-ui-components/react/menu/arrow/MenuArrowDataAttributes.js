"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuArrowDataAttributes = void 0;
var _popupStateMapping = require("../../utils/popupStateMapping");
let MenuArrowDataAttributes = exports.MenuArrowDataAttributes = function (MenuArrowDataAttributes) {
  /**
   * Present when the menu popup is open.
   */
  MenuArrowDataAttributes[MenuArrowDataAttributes["open"] = _popupStateMapping.CommonPopupDataAttributes.open] = "open";
  /**
   * Present when the menu popup is closed.
   */
  MenuArrowDataAttributes[MenuArrowDataAttributes["closed"] = _popupStateMapping.CommonPopupDataAttributes.closed] = "closed";
  /**
   * Present when the anchor is hidden.
   */
  MenuArrowDataAttributes[MenuArrowDataAttributes["anchorHidden"] = _popupStateMapping.CommonPopupDataAttributes.anchorHidden] = "anchorHidden";
  /**
   * Indicates which side the popup is positioned relative to the trigger.
   * @type {'top' | 'bottom' | 'left' | 'right' | 'inline-end' | 'inline-start'}
   */
  MenuArrowDataAttributes["side"] = "data-side";
  /**
   * Indicates how the popup is aligned relative to specified side.
   * @type {'start' | 'center' | 'end'}
   */
  MenuArrowDataAttributes["align"] = "data-align";
  /**
   * Present when the menu arrow is uncentered.
   */
  MenuArrowDataAttributes["uncentered"] = "data-uncentered";
  return MenuArrowDataAttributes;
}({});