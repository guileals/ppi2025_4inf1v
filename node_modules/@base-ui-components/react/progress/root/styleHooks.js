"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.progressStyleHookMapping = void 0;
var _ProgressRootDataAttributes = require("./ProgressRootDataAttributes");
const progressStyleHookMapping = exports.progressStyleHookMapping = {
  status(value) {
    if (value === 'progressing') {
      return {
        [_ProgressRootDataAttributes.ProgressRootDataAttributes.progressing]: ''
      };
    }
    if (value === 'complete') {
      return {
        [_ProgressRootDataAttributes.ProgressRootDataAttributes.complete]: ''
      };
    }
    if (value === 'indeterminate') {
      return {
        [_ProgressRootDataAttributes.ProgressRootDataAttributes.indeterminate]: ''
      };
    }
    return null;
  }
};