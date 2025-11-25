"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewCardPortal = PreviewCardPortal;
var React = _interopRequireWildcard(require("react"));
var _PreviewCardContext = require("../root/PreviewCardContext");
var _PreviewCardPortalContext = require("./PreviewCardPortalContext");
var _FloatingPortalLite = require("../../utils/FloatingPortalLite");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
 */
function PreviewCardPortal(props) {
  const {
    children,
    keepMounted = false,
    container
  } = props;
  const {
    mounted
  } = (0, _PreviewCardContext.usePreviewCardRootContext)();
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreviewCardPortalContext.PreviewCardPortalContext.Provider, {
    value: keepMounted,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FloatingPortalLite.FloatingPortalLite, {
      root: container,
      children: children
    })
  });
}