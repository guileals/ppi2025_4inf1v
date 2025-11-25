"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AlertDialogRootContext", {
  enumerable: true,
  get: function () {
    return _DialogContext.DialogContext;
  }
});
exports.useAlertDialogRootContext = useAlertDialogRootContext;
var React = _interopRequireWildcard(require("react"));
var _DialogContext = require("../../dialog/utils/DialogContext");
function useAlertDialogRootContext() {
  const context = React.useContext(_DialogContext.DialogContext);
  if (context === undefined) {
    throw new Error('Base UI: AlertDialogRootContext is missing. AlertDialog parts must be placed within <AlertDialog.Root>.');
  }
  return context;
}