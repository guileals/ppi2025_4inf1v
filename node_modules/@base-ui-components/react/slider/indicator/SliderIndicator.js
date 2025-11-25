"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderIndicator = void 0;
var React = _interopRequireWildcard(require("react"));
var _useRenderElement = require("../../utils/useRenderElement");
var _SliderRootContext = require("../root/SliderRootContext");
var _styleHooks = require("../root/styleHooks");
var _valueArrayToPercentages = require("../utils/valueArrayToPercentages");
function getRangeStyles(orientation, offset, leap) {
  if (orientation === 'vertical') {
    return {
      position: 'absolute',
      bottom: `${offset}%`,
      height: `${leap}%`,
      width: 'inherit'
    };
  }
  return {
    position: 'relative',
    insetInlineStart: `${offset}%`,
    width: `${leap}%`,
    height: 'inherit'
  };
}

/**
 * Visualizes the current value of the slider.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
const SliderIndicator = exports.SliderIndicator = /*#__PURE__*/React.forwardRef(function SliderIndicator(componentProps, forwardedRef) {
  const {
    render,
    className,
    ...elementProps
  } = componentProps;
  const {
    max,
    min,
    orientation,
    state,
    values
  } = (0, _SliderRootContext.useSliderRootContext)();
  const percentageValues = (0, _valueArrayToPercentages.valueArrayToPercentages)(values.slice(), min, max);
  let style;
  if (percentageValues.length > 1) {
    const trackOffset = percentageValues[0];
    const trackLeap = percentageValues[percentageValues.length - 1] - trackOffset;
    style = getRangeStyles(orientation, trackOffset, trackLeap);
  } else if (orientation === 'vertical') {
    style = {
      position: 'absolute',
      bottom: 0,
      height: `${percentageValues[0]}%`,
      width: 'inherit'
    };
  } else {
    style = {
      position: 'relative',
      insetInlineStart: 0,
      width: `${percentageValues[0]}%`,
      height: 'inherit'
    };
  }
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      style
    }, elementProps],
    customStyleHookMapping: _styleHooks.sliderStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SliderIndicator.displayName = "SliderIndicator";