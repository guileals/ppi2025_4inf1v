import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Groups all parts of the meter and provides the value for screen readers.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Meter](https://base-ui.com/react/components/meter)
 */
export declare const MeterRoot: React.ForwardRefExoticComponent<MeterRoot.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace MeterRoot {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * A string value that provides a user-friendly name for `aria-valuenow`, the current value of the meter.
     */
    'aria-valuetext'?: React.AriaAttributes['aria-valuetext'];
    /**
     * Options to format the value.
     */
    format?: Intl.NumberFormatOptions;
    /**
     * A function that returns a string value that provides a human-readable text alternative for `aria-valuenow`, the current value of the meter.
     * @param {string} formattedValue The formatted value
     * @param {number} value The raw value
     * @returns {string}
     */
    getAriaValueText?: (formattedValue: string, value: number) => string;
    /**
     * The locale used by `Intl.NumberFormat` when formatting the value.
     * Defaults to the user's runtime locale.
     */
    locale?: Intl.LocalesArgument;
    /**
     * The maximum value
     * @default 100
     */
    max?: number;
    /**
     * The minimum value
     * @default 0
     */
    min?: number;
    /**
     * The current value.
     */
    value: number;
  }
}