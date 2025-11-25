"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchRootContext = void 0;
exports.useSwitchRootContext = useSwitchRootContext;
var React = _interopRequireWildcard(require("react"));
const SwitchRootContext = exports.SwitchRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") SwitchRootContext.displayName = "SwitchRootContext";
function useSwitchRootContext() {
  const context = React.useContext(SwitchRootContext);
  if (context === undefined) {
    throw new Error('Base UI: SwitchRootContext is missing. Switch parts must be placed within <Switch.Root>.');
  }
  return context;
}