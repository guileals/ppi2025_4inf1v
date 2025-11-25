"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToastManager = useToastManager;
var React = _interopRequireWildcard(require("react"));
var _ToastProviderContext = require("./provider/ToastProviderContext");
/**
 * Returns the array of toasts and methods to manage them.
 */
function useToastManager() {
  const context = React.useContext(_ToastProviderContext.ToastContext);
  if (!context) {
    throw new Error('Base UI: useToast must be used within <Toast.Provider>.');
  }
  const {
    toasts,
    add,
    close,
    update,
    promise
  } = context;
  return React.useMemo(() => ({
    toasts,
    add,
    close,
    update,
    promise
  }), [toasts, add, close, update, promise]);
}