"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordionItemContext = void 0;
exports.useAccordionItemContext = useAccordionItemContext;
var React = _interopRequireWildcard(require("react"));
const AccordionItemContext = exports.AccordionItemContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") AccordionItemContext.displayName = "AccordionItemContext";
function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (context === undefined) {
    throw new Error('Base UI: AccordionItemContext is missing. Accordion parts must be placed within <Accordion.Item>.');
  }
  return context;
}