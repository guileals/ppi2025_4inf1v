import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { SliderRoot } from "../root/SliderRoot.js";
/**
 * The clickable, interactive part of the slider.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export declare const SliderControl: React.ForwardRefExoticComponent<SliderControl.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace SliderControl {
  interface Props extends BaseUIComponentProps<'div', SliderRoot.State> {}
}