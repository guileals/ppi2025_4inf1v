import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Displays a single row of items in a grid list.
 * Specify `cols` on the root component to indicate the number of columns.
 * Renders a `<div>` element.
 */
export declare const ComboboxRow: React.ForwardRefExoticComponent<ComboboxRow.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxRow {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}