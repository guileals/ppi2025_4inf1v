"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collapsibleStyleHookMapping = void 0;
var _collapsibleOpenStateMapping = require("../../utils/collapsibleOpenStateMapping");
var _styleHookMapping = require("../../utils/styleHookMapping");
const collapsibleStyleHookMapping = exports.collapsibleStyleHookMapping = {
  ..._collapsibleOpenStateMapping.collapsibleOpenStateMapping,
  ..._styleHookMapping.transitionStatusMapping
};