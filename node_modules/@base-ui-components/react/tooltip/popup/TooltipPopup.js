"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipPopup = void 0;
var React = _interopRequireWildcard(require("react"));
var _TooltipRootContext = require("../root/TooltipRootContext");
var _TooltipPositionerContext = require("../positioner/TooltipPositionerContext");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _styleHookMapping = require("../../utils/styleHookMapping");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _useRenderElement = require("../../utils/useRenderElement");
var _constants = require("../../utils/constants");
const customStyleHookMapping = {
  ..._popupStateMapping.popupStateMapping,
  ..._styleHookMapping.transitionStatusMapping
};

/**
 * A container for the tooltip contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */
const TooltipPopup = exports.TooltipPopup = /*#__PURE__*/React.forwardRef(function TooltipPopup(componentProps, forwardedRef) {
  const {
    className,
    render,
    ...elementProps
  } = componentProps;
  const {
    open,
    instantType,
    transitionStatus,
    popupProps,
    popupRef,
    onOpenChangeComplete
  } = (0, _TooltipRootContext.useTooltipRootContext)();
  const {
    side,
    align
  } = (0, _TooltipPositionerContext.useTooltipPositionerContext)();
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        onOpenChangeComplete?.(true);
      }
    }
  });
  const state = React.useMemo(() => ({
    open,
    side,
    align,
    instant: instantType,
    transitionStatus
  }), [open, side, align, instantType, transitionStatus]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: [forwardedRef, popupRef],
    props: [popupProps, transitionStatus === 'starting' ? _constants.DISABLED_TRANSITIONS_STYLE : _constants.EMPTY_OBJECT, elementProps],
    customStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") TooltipPopup.displayName = "TooltipPopup";