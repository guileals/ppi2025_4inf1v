"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDialogPopup = void 0;
var React = _interopRequireWildcard(require("react"));
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _inertValue = require("@base-ui-components/utils/inertValue");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _floatingUiReact = require("../../floating-ui-react");
var _useDialogPopup = require("../../dialog/popup/useDialogPopup");
var _AlertDialogRootContext = require("../root/AlertDialogRootContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _styleHookMapping = require("../../utils/styleHookMapping");
var _AlertDialogPopupCssVars = require("./AlertDialogPopupCssVars");
var _AlertDialogPopupDataAttributes = require("./AlertDialogPopupDataAttributes");
var _InternalBackdrop = require("../../utils/InternalBackdrop");
var _AlertDialogPortalContext = require("../portal/AlertDialogPortalContext");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _jsxRuntime = require("react/jsx-runtime");
const customStyleHookMapping = {
  ..._popupStateMapping.popupStateMapping,
  ..._styleHookMapping.transitionStatusMapping,
  nestedDialogOpen(value) {
    return value ? {
      [_AlertDialogPopupDataAttributes.AlertDialogPopupDataAttributes.nestedDialogOpen]: ''
    } : null;
  }
};

/**
 * A container for the alert dialog contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
const AlertDialogPopup = exports.AlertDialogPopup = /*#__PURE__*/React.forwardRef(function AlertDialogPopup(componentProps, forwardedRef) {
  const {
    className,
    render,
    initialFocus,
    finalFocus,
    ...elementProps
  } = componentProps;
  const {
    descriptionElementId,
    floatingRootContext,
    getPopupProps,
    mounted,
    nested,
    nestedOpenDialogCount,
    setOpen,
    open,
    openMethod,
    popupRef,
    setPopupElement,
    titleElementId,
    transitionStatus,
    modal,
    onOpenChangeComplete,
    internalBackdropRef
  } = (0, _AlertDialogRootContext.useAlertDialogRootContext)();
  (0, _AlertDialogPortalContext.useAlertDialogPortalContext)();
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        onOpenChangeComplete?.(true);
      }
    }
  });
  const mergedRef = (0, _useMergedRefs.useMergedRefs)(forwardedRef, popupRef);
  const {
    popupProps
  } = (0, _useDialogPopup.useDialogPopup)({
    descriptionElementId,
    mounted,
    setOpen,
    openMethod,
    ref: mergedRef,
    setPopupElement,
    titleElementId
  });
  const nestedDialogOpen = nestedOpenDialogCount > 0;
  const state = React.useMemo(() => ({
    open,
    nested,
    transitionStatus,
    nestedDialogOpen
  }), [open, nested, transitionStatus, nestedDialogOpen]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    props: [getPopupProps(), popupProps, {
      style: {
        [_AlertDialogPopupCssVars.AlertDialogPopupCssVars.nestedDialogs]: nestedOpenDialogCount
      },
      role: 'alertdialog'
    }, elementProps],
    customStyleHookMapping
  });

  // Default initial focus logic:
  // If opened by touch, focus the popup element to prevent the virtual keyboard from opening
  // (this is required for Android specifically as iOS handles this automatically).
  const defaultInitialFocus = (0, _useEventCallback.useEventCallback)(interactionType => {
    if (interactionType === 'touch') {
      return popupRef.current;
    }
    return true;
  });
  const resolvedInitialFocus = initialFocus === undefined ? defaultInitialFocus : initialFocus;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [mounted && modal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_InternalBackdrop.InternalBackdrop, {
      ref: internalBackdropRef,
      inert: (0, _inertValue.inertValue)(!open)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_floatingUiReact.FloatingFocusManager, {
      context: floatingRootContext,
      disabled: !mounted,
      initialFocus: resolvedInitialFocus,
      returnFocus: finalFocus,
      children: element
    })]
  });
});
if (process.env.NODE_ENV !== "production") AlertDialogPopup.displayName = "AlertDialogPopup";