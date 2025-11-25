"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogContext = void 0;
exports.useDialogContext = useDialogContext;
var React = _interopRequireWildcard(require("react"));
/**
 * Common context for dialog & dialog alert components.
 */

const DialogContext = exports.DialogContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") DialogContext.displayName = "DialogContext";
function useDialogContext() {
  return React.useContext(DialogContext);
}