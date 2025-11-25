'use client';

import * as React from 'react';
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useSliderRootContext } from "../root/SliderRootContext.js";
import { sliderStyleHookMapping } from "../root/styleHooks.js";
import { valueArrayToPercentages } from "../utils/valueArrayToPercentages.js";
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
export const SliderIndicator = /*#__PURE__*/React.forwardRef(function SliderIndicator(componentProps, forwardedRef) {
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
  } = useSliderRootContext();
  const percentageValues = valueArrayToPercentages(values.slice(), min, max);
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
  const element = useRenderElement('div', componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      style
    }, elementProps],
    customStyleHookMapping: sliderStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SliderIndicator.displayName = "SliderIndicator";