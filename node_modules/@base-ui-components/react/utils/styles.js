"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleDisableScrollbar = void 0;
var React = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
const DISABLE_SCROLLBAR_CLASS_NAME = 'base-ui-disable-scrollbar';
const styleDisableScrollbar = exports.styleDisableScrollbar = {
  className: DISABLE_SCROLLBAR_CLASS_NAME,
  element: /*#__PURE__*/(0, _jsxRuntime.jsx)("style", {
    href: DISABLE_SCROLLBAR_CLASS_NAME,
    precedence: "base-ui:low",
    children: `.${DISABLE_SCROLLBAR_CLASS_NAME}{scrollbar-width:none}.${DISABLE_SCROLLBAR_CLASS_NAME}::-webkit-scrollbar{display:none}`
  })
};