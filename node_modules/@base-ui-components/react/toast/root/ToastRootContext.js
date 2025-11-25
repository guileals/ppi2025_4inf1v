"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastRootContext = void 0;
exports.useToastRootContext = useToastRootContext;
var React = _interopRequireWildcard(require("react"));
const ToastRootContext = exports.ToastRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ToastRootContext.displayName = "ToastRootContext";
function useToastRootContext() {
  const context = React.useContext(ToastRootContext);
  if (!context) {
    throw new Error('Base UI: ToastRootContext is missing. Toast parts must be used within <Toast.Root>.');
  }
  return context;
}