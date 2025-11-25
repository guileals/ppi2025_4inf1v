"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogPopup = void 0;
var React = _interopRequireWildcard(require("react"));
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _inertValue = require("@base-ui-components/utils/inertValue");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _floatingUiReact = require("../../floating-ui-react");
var _useDialogPopup = require("./useDialogPopup");
var _DialogRootContext = require("../root/DialogRootContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _styleHookMapping = require("../../utils/styleHookMapping");
var _DialogPopupCssVars = require("./DialogPopupCssVars");
var _DialogPopupDataAttributes = require("./DialogPopupDataAttributes");
var _InternalBackdrop = require("../../utils/InternalBackdrop");
var _DialogPortalContext = require("../portal/DialogPortalContext");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _jsxRuntime = require("react/jsx-runtime");
const customStyleHookMapping = {
  ..._popupStateMapping.popupStateMapping,
  ..._styleHookMapping.transitionStatusMapping,
  nestedDialogOpen(value) {
    return value ? {
      [_DialogPopupDataAttributes.DialogPopupDataAttributes.nestedDialogOpen]: ''
    } : null;
  }
};

/**
 * A container for the dialog contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogPopup = exports.DialogPopup = /*#__PURE__*/React.forwardRef(function DialogPopup(componentProps, forwardedRef) {
  const {
    className,
    finalFocus,
    initialFocus,
    render,
    ...elementProps
  } = componentProps;
  const {
    descriptionElementId,
    dismissible,
    floatingRootContext,
    getPopupProps,
    modal,
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
    onOpenChangeComplete,
    internalBackdropRef
  } = (0, _DialogRootContext.useDialogRootContext)();
  (0, _DialogPortalContext.useDialogPortalContext)();
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
        [_DialogPopupCssVars.DialogPopupCssVars.nestedDialogs]: nestedOpenDialogCount
      }
    }, elementProps],
    customStyleHookMapping
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [mounted && modal === true && /*#__PURE__*/(0, _jsxRuntime.jsx)(_InternalBackdrop.InternalBackdrop, {
      ref: internalBackdropRef,
      inert: (0, _inertValue.inertValue)(!open)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_floatingUiReact.FloatingFocusManager, {
      context: floatingRootContext,
      openInteractionType: openMethod,
      disabled: !mounted,
      closeOnFocusOut: dismissible,
      initialFocus: resolvedInitialFocus,
      returnFocus: finalFocus,
      modal: modal !== false,
      restoreFocus: "popup",
      children: element
    })]
  });
});
if (process.env.NODE_ENV !== "production") DialogPopup.displayName = "DialogPopup";