import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A text label of the currently selected item.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectValue: React.ForwardRefExoticComponent<SelectValue.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace SelectValue {
  interface Props extends Omit<BaseUIComponentProps<'span', State>, 'children'> {
    /**
     * Accepts a function that returns a `ReactNode` to format the selected value.
     * @example
     * ```tsx
     * <Select.Value>
     *   {(value: string | null) => value ? labels[value] : 'No value'}
     * </Select.Value>
     * ```
     */
    children?: React.ReactNode | ((value: any) => React.ReactNode);
  }
  interface State {
    /**
     * The value of the currently selected item.
     */
    value: any;
  }
}