"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuCheckboxItemIndicatorDataAttributes = void 0;
var _styleHookMapping = require("../../utils/styleHookMapping");
let MenuCheckboxItemIndicatorDataAttributes = exports.MenuCheckboxItemIndicatorDataAttributes = function (MenuCheckboxItemIndicatorDataAttributes) {
  /**
   * Present when the menu checkbox item is checked.
   */
  MenuCheckboxItemIndicatorDataAttributes["checked"] = "data-checked";
  /**
   * Present when the menu checkbox item is not checked.
   */
  MenuCheckboxItemIndicatorDataAttributes["unchecked"] = "data-unchecked";
  /**
   * Present when the menu checkbox item is disabled.
   */
  MenuCheckboxItemIndicatorDataAttributes["disabled"] = "data-disabled";
  /**
   * Present when the indicator is animating in.
   */
  MenuCheckboxItemIndicatorDataAttributes[MenuCheckboxItemIndicatorDataAttributes["startingStyle"] = _styleHookMapping.TransitionStatusDataAttributes.startingStyle] = "startingStyle";
  /**
   * Present when the indicator is animating out.
   */
  MenuCheckboxItemIndicatorDataAttributes[MenuCheckboxItemIndicatorDataAttributes["endingStyle"] = _styleHookMapping.TransitionStatusDataAttributes.endingStyle] = "endingStyle";
  return MenuCheckboxItemIndicatorDataAttributes;
}({});