"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatingPortalLite = FloatingPortalLite;
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _floatingUiReact = require("../floating-ui-react");
/**
 * `FloatingPortal` includes tabbable logic handling for focus management.
 * For components that don't need tabbable logic, use `FloatingPortalLite`.
 * @internal
 */
function FloatingPortalLite(props) {
  const node = (0, _floatingUiReact.useFloatingPortalNode)({
    root: props.root
  });
  return node && /*#__PURE__*/ReactDOM.createPortal(props.children, node);
}