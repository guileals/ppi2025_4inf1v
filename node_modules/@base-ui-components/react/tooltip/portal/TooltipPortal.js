"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipPortal = TooltipPortal;
var React = _interopRequireWildcard(require("react"));
var _TooltipRootContext = require("../root/TooltipRootContext");
var _TooltipPortalContext = require("./TooltipPortalContext");
var _FloatingPortalLite = require("../../utils/FloatingPortalLite");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */
function TooltipPortal(props) {
  const {
    children,
    keepMounted = false,
    container
  } = props;
  const {
    mounted
  } = (0, _TooltipRootContext.useTooltipRootContext)();
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipPortalContext.TooltipPortalContext.Provider, {
    value: keepMounted,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FloatingPortalLite.FloatingPortalLite, {
      root: container,
      children: children
    })
  });
}