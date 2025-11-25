import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import type { SliderRoot } from "../root/SliderRoot.js";
/**
 * The draggable part of the the slider at the tip of the indicator.
 * Renders a `<div>` element and a nested `<input type="range">`.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export declare const SliderThumb: React.ForwardRefExoticComponent<SliderThumb.Props & React.RefAttributes<HTMLDivElement>>;
export interface ThumbMetadata {
  inputId: string | undefined;
}
export declare namespace SliderThumb {
  interface State extends SliderRoot.State {}
  interface Props extends Omit<BaseUIComponentProps<'div', State>, 'onBlur' | 'onFocus'> {
    /**
     * Whether the thumb should ignore user interaction.
     * @default false
     */
    disabled?: boolean;
    /**
     * A function which returns a string value for the [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) attribute of the `input`.
     * @param {number} index The index of the input
     * @returns {string}
     */
    getAriaLabel?: ((index: number) => string) | null;
    /**
     * A function which returns a string value for the [`aria-valuetext`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-valuetext) attribute of the `input`.
     * This is important for screen reader users.
     * @param {string} formattedValue The thumb's formatted value.
     * @param {number} value The thumb's numerical value.
     * @param {number} index The thumb's index.
     * @returns {string}
     */
    getAriaValueText?: ((formattedValue: string, value: number, index: number) => string) | null;
    /**
     * The index of the thumb which corresponds to the index of its value in the
     * `value` or `defaultValue` array.
     * This prop is required to support server-side rendering for range sliders
     * with multiple thumbs.
     * @example
     * ```tsx
     * <Slider.Root value={[10, 20]}>
     *   <Slider.Thumb index={0} />
     *   <Slider.Thumb index={1} />
     * </Slider.Root>
     * ```
     */
    index?: number | undefined;
    /**
     * A blur handler forwarded to the `input`.
     */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * A focus handler forwarded to the `input`.
     */
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Optional tab index attribute forwarded to the `input`.
     */
    tabIndex?: number;
  }
}