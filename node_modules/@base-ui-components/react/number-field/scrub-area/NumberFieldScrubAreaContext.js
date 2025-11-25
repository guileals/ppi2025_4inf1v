"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberFieldScrubAreaContext = void 0;
exports.useNumberFieldScrubAreaContext = useNumberFieldScrubAreaContext;
var React = _interopRequireWildcard(require("react"));
const NumberFieldScrubAreaContext = exports.NumberFieldScrubAreaContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") NumberFieldScrubAreaContext.displayName = "NumberFieldScrubAreaContext";
function useNumberFieldScrubAreaContext() {
  const context = React.useContext(NumberFieldScrubAreaContext);
  if (context === undefined) {
    throw new Error('Base UI: NumberFieldScrubAreaContext is missing. NumberFieldScrubArea parts must be placed within <NumberField.ScrubArea>.');
  }
  return context;
}