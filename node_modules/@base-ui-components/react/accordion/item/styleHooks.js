"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accordionStyleHookMapping = void 0;
var _collapsibleOpenStateMapping = require("../../utils/collapsibleOpenStateMapping");
var _styleHookMapping = require("../../utils/styleHookMapping");
var _AccordionItemDataAttributes = require("./AccordionItemDataAttributes");
const accordionStyleHookMapping = exports.accordionStyleHookMapping = {
  ..._collapsibleOpenStateMapping.collapsibleOpenStateMapping,
  index: value => {
    return Number.isInteger(value) ? {
      [_AccordionItemDataAttributes.AccordionItemDataAttributes.index]: String(value)
    } : null;
  },
  ..._styleHookMapping.transitionStatusMapping,
  value: () => null
};