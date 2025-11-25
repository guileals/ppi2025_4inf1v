"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxPopup = void 0;
var React = _interopRequireWildcard(require("react"));
var _store = require("@base-ui-components/utils/store");
var _floatingUiReact = require("../../floating-ui-react");
var _useRenderElement = require("../../utils/useRenderElement");
var _ComboboxRootContext = require("../root/ComboboxRootContext");
var _store2 = require("../store");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _ComboboxPositionerContext = require("../positioner/ComboboxPositionerContext");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _constants = require("../../utils/constants");
var _styleHookMapping = require("../../utils/styleHookMapping");
var _utils = require("../../floating-ui-react/utils");
var _jsxRuntime = require("react/jsx-runtime");
const customStyleHookMapping = {
  ..._popupStateMapping.popupStateMapping,
  ..._styleHookMapping.transitionStatusMapping
};

/**
 * A container for the list.
 * Renders a `<div>` element.
 */
const ComboboxPopup = exports.ComboboxPopup = /*#__PURE__*/React.forwardRef(function ComboboxPopup(componentProps, forwardedRef) {
  const {
    render,
    className,
    initialFocus,
    finalFocus,
    ...elementProps
  } = componentProps;
  const store = (0, _ComboboxRootContext.useComboboxRootContext)();
  const positioning = (0, _ComboboxPositionerContext.useComboboxPositionerContext)();
  const floatingRootContext = (0, _ComboboxRootContext.useComboboxFloatingContext)();
  const {
    filteredItems
  } = (0, _ComboboxRootContext.useComboboxDerivedItemsContext)();
  const mounted = (0, _store.useStore)(store, _store2.selectors.mounted);
  const open = (0, _store.useStore)(store, _store2.selectors.open);
  const openMethod = (0, _store.useStore)(store, _store2.selectors.openMethod);
  const transitionStatus = (0, _store.useStore)(store, _store2.selectors.transitionStatus);
  const inputInsidePopup = (0, _store.useStore)(store, _store2.selectors.inputInsidePopup);
  const inputElement = (0, _store.useStore)(store, _store2.selectors.inputElement);
  const listElement = (0, _store.useStore)(store, _store2.selectors.listElement);
  const empty = filteredItems.length === 0;
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
    open,
    ref: store.state.popupRef,
    onComplete() {
      if (open) {
        store.state.onOpenChangeComplete(true);
      }
    }
  });
  const state = React.useMemo(() => ({
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    transitionStatus,
    empty
  }), [open, positioning.side, positioning.align, positioning.anchorHidden, transitionStatus, empty]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: [forwardedRef, store.state.popupRef],
    props: [{
      tabIndex: -1,
      onFocus(event) {
        const target = (0, _utils.getTarget)(event.nativeEvent);
        if (openMethod !== 'touch' && !(0, _utils.contains)(listElement, target)) {
          store.state.inputRef.current?.focus();
        }
      }
    }, transitionStatus === 'starting' ? _constants.DISABLED_TRANSITIONS_STYLE : _constants.EMPTY_OBJECT, elementProps],
    customStyleHookMapping
  });

  // Default initial focus logic:
  // If opened by touch, focus the popup element to prevent the virtual keyboard from opening
  // (this is required for Android specifically as iOS handles this automatically).
  const computedDefaultInitialFocus = inputInsidePopup ? interactionType => interactionType === 'touch' ? store.state.popupRef.current : inputElement : false;
  const resolvedInitialFocus = initialFocus === undefined ? computedDefaultInitialFocus : initialFocus;
  let resolvedFinalFocus;
  if (finalFocus != null) {
    resolvedFinalFocus = finalFocus;
  } else {
    resolvedFinalFocus = inputInsidePopup ? undefined : false;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_floatingUiReact.FloatingFocusManager, {
    context: floatingRootContext,
    disabled: !mounted,
    modal: !inputInsidePopup,
    openInteractionType: openMethod,
    initialFocus: resolvedInitialFocus,
    returnFocus: resolvedFinalFocus,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") ComboboxPopup.displayName = "ComboboxPopup";