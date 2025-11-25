"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeterRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _MeterRootContext = require("./MeterRootContext");
var _formatNumber = require("../../utils/formatNumber");
var _useRenderElement = require("../../utils/useRenderElement");
var _jsxRuntime = require("react/jsx-runtime");
function formatValue(value, locale, format) {
  if (!format) {
    return (0, _formatNumber.formatNumber)(value / 100, locale, {
      style: 'percent'
    });
  }
  return (0, _formatNumber.formatNumber)(value, locale, format);
}

/**
 * Groups all parts of the meter and provides the value for screen readers.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Meter](https://base-ui.com/react/components/meter)
 */
const MeterRoot = exports.MeterRoot = /*#__PURE__*/React.forwardRef(function MeterRoot(componentProps, forwardedRef) {
  const {
    format,
    getAriaValueText,
    locale,
    max = 100,
    min = 0,
    value: valueProp,
    render,
    className,
    ...elementProps
  } = componentProps;
  const formatOptionsRef = (0, _useLatestRef.useLatestRef)(format);
  const [labelId, setLabelId] = React.useState();
  const formattedValue = formatValue(valueProp, locale, formatOptionsRef.current);
  let ariaValuetext = `${valueProp}%`;
  if (getAriaValueText) {
    ariaValuetext = getAriaValueText(formattedValue, valueProp);
  } else if (format) {
    ariaValuetext = formattedValue;
  }
  const defaultProps = {
    'aria-labelledby': labelId,
    'aria-valuemax': max,
    'aria-valuemin': min,
    'aria-valuenow': valueProp,
    'aria-valuetext': ariaValuetext,
    role: 'meter'
  };
  const contextValue = React.useMemo(() => ({
    formattedValue,
    max,
    min,
    setLabelId,
    value: valueProp
  }), [formattedValue, max, min, setLabelId, valueProp]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    ref: forwardedRef,
    props: [defaultProps, elementProps]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MeterRootContext.MeterRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") MeterRoot.displayName = "MeterRoot";