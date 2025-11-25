"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogBackdrop = void 0;
var React = _interopRequireWildcard(require("react"));
var _DialogRootContext = require("../root/DialogRootContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _styleHookMapping = require("../../utils/styleHookMapping");
const customStyleHookMapping = {
  ..._popupStateMapping.popupStateMapping,
  ..._styleHookMapping.transitionStatusMapping
};

/**
 * An overlay displayed beneath the popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogBackdrop = exports.DialogBackdrop = /*#__PURE__*/React.forwardRef(function DialogBackdrop(componentProps, forwardedRef) {
  const {
    render,
    className,
    forceRender = false,
    ...elementProps
  } = componentProps;
  const {
    open,
    nested,
    mounted,
    transitionStatus,
    backdropRef
  } = (0, _DialogRootContext.useDialogRootContext)();
  const state = React.useMemo(() => ({
    open,
    transitionStatus
  }), [open, transitionStatus]);
  return (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: [backdropRef, forwardedRef],
    customStyleHookMapping,
    props: [{
      role: 'presentation',
      hidden: !mounted,
      style: {
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }
    }, elementProps],
    enabled: forceRender || !nested
  });
});
if (process.env.NODE_ENV !== "production") DialogBackdrop.displayName = "DialogBackdrop";