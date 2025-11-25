"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogRootContext = void 0;
exports.useDialogRootContext = useDialogRootContext;
exports.useOptionalDialogRootContext = useOptionalDialogRootContext;
var React = _interopRequireWildcard(require("react"));
var _DialogContext = require("../utils/DialogContext");
const DialogRootContext = exports.DialogRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") DialogRootContext.displayName = "DialogRootContext";
function useOptionalDialogRootContext() {
  const dialogRootContext = React.useContext(DialogRootContext);
  const dialogContext = React.useContext(_DialogContext.DialogContext);
  if (dialogContext === undefined && dialogRootContext === undefined) {
    return undefined;
  }
  return {
    ...dialogRootContext,
    ...dialogContext
  };
}
function useDialogRootContext() {
  const dialogRootContext = React.useContext(DialogRootContext);
  const dialogContext = React.useContext(_DialogContext.DialogContext);
  if (dialogContext === undefined) {
    throw new Error('Base UI: DialogRootContext is missing. Dialog parts must be placed within <Dialog.Root>.');
  }
  return {
    ...dialogRootContext,
    ...dialogContext
  };
}