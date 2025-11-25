"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordionPanelDataAttributes = void 0;
var _styleHookMapping = require("../../utils/styleHookMapping");
let AccordionPanelDataAttributes = exports.AccordionPanelDataAttributes = function (AccordionPanelDataAttributes) {
  /**
   * Indicates the index of the accordion item.
   * @type {number}
   */
  AccordionPanelDataAttributes["index"] = "data-index";
  /**
   * Present when the accordion panel is open.
   */
  AccordionPanelDataAttributes["open"] = "data-open";
  /**
   * Indicates the orientation of the accordion.
   */
  AccordionPanelDataAttributes["orientation"] = "data-orientation";
  /**
   * Present when the accordion item is disabled.
   */
  AccordionPanelDataAttributes["disabled"] = "data-disabled";
  /**
   * Present when the panel is animating in.
   */
  AccordionPanelDataAttributes[AccordionPanelDataAttributes["startingStyle"] = _styleHookMapping.TransitionStatusDataAttributes.startingStyle] = "startingStyle";
  /**
   * Present when the panel is animating out.
   */
  AccordionPanelDataAttributes[AccordionPanelDataAttributes["endingStyle"] = _styleHookMapping.TransitionStatusDataAttributes.endingStyle] = "endingStyle";
  return AccordionPanelDataAttributes;
}({});