"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxPortal = ComboboxPortal;
var React = _interopRequireWildcard(require("react"));
var _store = require("@base-ui-components/utils/store");
var _floatingUiReact = require("../../floating-ui-react");
var _ComboboxRootContext = require("../root/ComboboxRootContext");
var _ComboboxPortalContext = require("./ComboboxPortalContext");
var _store2 = require("../store");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 */
function ComboboxPortal(props) {
  const {
    children,
    keepMounted = false,
    container
  } = props;
  const store = (0, _ComboboxRootContext.useComboboxRootContext)();
  const mounted = (0, _store.useStore)(store, _store2.selectors.mounted);
  const forceMounted = (0, _store.useStore)(store, _store2.selectors.forceMounted);
  const shouldRender = mounted || keepMounted || forceMounted;
  if (!shouldRender) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ComboboxPortalContext.ComboboxPortalContext.Provider, {
    value: keepMounted,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_floatingUiReact.FloatingPortal, {
      root: container,
      children: children
    })
  });
}