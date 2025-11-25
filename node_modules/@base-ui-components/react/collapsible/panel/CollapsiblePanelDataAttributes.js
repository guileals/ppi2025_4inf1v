"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsiblePanelDataAttributes = void 0;
var _styleHookMapping = require("../../utils/styleHookMapping");
let CollapsiblePanelDataAttributes = exports.CollapsiblePanelDataAttributes = function (CollapsiblePanelDataAttributes) {
  /**
   * Present when the collapsible panel is open.
   */
  CollapsiblePanelDataAttributes["open"] = "data-open";
  /**
   * Present when the collapsible panel is closed.
   */
  CollapsiblePanelDataAttributes["closed"] = "data-closed";
  /**
   * Present when the panel is animating in.
   */
  CollapsiblePanelDataAttributes[CollapsiblePanelDataAttributes["startingStyle"] = _styleHookMapping.TransitionStatusDataAttributes.startingStyle] = "startingStyle";
  /**
   * Present when the panel is animating out.
   */
  CollapsiblePanelDataAttributes[CollapsiblePanelDataAttributes["endingStyle"] = _styleHookMapping.TransitionStatusDataAttributes.endingStyle] = "endingStyle";
  return CollapsiblePanelDataAttributes;
}({});