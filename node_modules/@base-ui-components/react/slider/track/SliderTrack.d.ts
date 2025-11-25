import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import type { SliderRoot } from "../root/SliderRoot.js";
/**
 * Contains the slider indicator and represents the entire range of the slider.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export declare const SliderTrack: React.ForwardRefExoticComponent<SliderTrack.Props & React.RefAttributes<HTMLElement>>;
export declare namespace SliderTrack {
  interface Props extends BaseUIComponentProps<'div', SliderRoot.State> {}
}