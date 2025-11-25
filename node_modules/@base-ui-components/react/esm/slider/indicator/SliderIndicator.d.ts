import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { SliderRoot } from "../root/SliderRoot.js";
/**
 * Visualizes the current value of the slider.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export declare const SliderIndicator: React.ForwardRefExoticComponent<SliderIndicator.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace SliderIndicator {
  interface Props extends BaseUIComponentProps<'div', SliderRoot.State> {}
}