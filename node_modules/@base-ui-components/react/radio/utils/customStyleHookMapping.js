"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customStyleHookMapping = void 0;
var _styleHookMapping = require("../../utils/styleHookMapping");
var _constants = require("../../field/utils/constants");
var _RadioRootDataAttributes = require("../root/RadioRootDataAttributes");
const customStyleHookMapping = exports.customStyleHookMapping = {
  checked(value) {
    if (value) {
      return {
        [_RadioRootDataAttributes.RadioRootDataAttributes.checked]: ''
      };
    }
    return {
      [_RadioRootDataAttributes.RadioRootDataAttributes.unchecked]: ''
    };
  },
  ..._styleHookMapping.transitionStatusMapping,
  ..._constants.fieldValidityMapping
};