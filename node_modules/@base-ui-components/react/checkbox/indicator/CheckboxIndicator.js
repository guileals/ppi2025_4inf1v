"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxIndicator = void 0;
var React = _interopRequireWildcard(require("react"));
var _CheckboxRootContext = require("../root/CheckboxRootContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _useCustomStyleHookMapping = require("../utils/useCustomStyleHookMapping");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _useTransitionStatus = require("../../utils/useTransitionStatus");
var _styleHookMapping = require("../../utils/styleHookMapping");
var _constants = require("../../field/utils/constants");
/**
 * Indicates whether the checkbox is ticked.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Checkbox](https://base-ui.com/react/components/checkbox)
 */
const CheckboxIndicator = exports.CheckboxIndicator = /*#__PURE__*/React.forwardRef(function CheckboxIndicator(componentProps, forwardedRef) {
  const {
    render,
    className,
    keepMounted = false,
    ...elementProps
  } = componentProps;
  const rootState = (0, _CheckboxRootContext.useCheckboxRootContext)();
  const rendered = rootState.checked || rootState.indeterminate;
  const {
    transitionStatus,
    setMounted
  } = (0, _useTransitionStatus.useTransitionStatus)(rendered);
  const indicatorRef = React.useRef(null);
  const state = React.useMemo(() => ({
    ...rootState,
    transitionStatus
  }), [rootState, transitionStatus]);
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
    open: rendered,
    ref: indicatorRef,
    onComplete() {
      if (!rendered) {
        setMounted(false);
      }
    }
  });
  const baseStyleHookMapping = (0, _useCustomStyleHookMapping.useCustomStyleHookMapping)(rootState);
  const customStyleHookMapping = React.useMemo(() => ({
    ...baseStyleHookMapping,
    ..._styleHookMapping.transitionStatusMapping,
    ..._constants.fieldValidityMapping
  }), [baseStyleHookMapping]);
  const shouldRender = keepMounted || rendered;
  const element = (0, _useRenderElement.useRenderElement)('span', componentProps, {
    enabled: shouldRender,
    ref: [forwardedRef, indicatorRef],
    state,
    customStyleHookMapping,
    props: elementProps
  });
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (process.env.NODE_ENV !== "production") CheckboxIndicator.displayName = "CheckboxIndicator";