import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Groups all parts of the progress bar and provides the task completion status to screen readers.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
 */
export declare const ProgressRoot: React.ForwardRefExoticComponent<ProgressRoot.Props & React.RefAttributes<HTMLDivElement>>;
export type ProgressStatus = 'indeterminate' | 'progressing' | 'complete';
export declare namespace ProgressRoot {
  type State = {
    status: ProgressStatus;
  };
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
     * Accepts a function which returns a string value that provides a human-readable text alternative for the current value of the progress bar.
     * @param {string} formattedValue The component's formatted value.
     * @param {number | null} value The component's numerical value.
     * @returns {string}
     */
    getAriaValueText?: (formattedValue: string | null, value: number | null) => string;
    /**
     * The locale used by `Intl.NumberFormat` when formatting the value.
     * Defaults to the user's runtime locale.
     */
    locale?: Intl.LocalesArgument;
    /**
     * The maximum value.
     * @default 100
     */
    max?: number;
    /**
     * The minimum value.
     * @default 0
     */
    min?: number;
    /**
     * The current value. The component is indeterminate when value is `null`.
     * @default null
     */
    value: number | null;
  }
}