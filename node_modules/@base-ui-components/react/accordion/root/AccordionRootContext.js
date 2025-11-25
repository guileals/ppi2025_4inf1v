"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordionRootContext = void 0;
exports.useAccordionRootContext = useAccordionRootContext;
var React = _interopRequireWildcard(require("react"));
const AccordionRootContext = exports.AccordionRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") AccordionRootContext.displayName = "AccordionRootContext";
function useAccordionRootContext() {
  const context = React.useContext(AccordionRootContext);
  if (context === undefined) {
    throw new Error('Base UI: AccordionRootContext is missing. Accordion parts must be placed within <Accordion.Root>.');
  }
  return context;
}