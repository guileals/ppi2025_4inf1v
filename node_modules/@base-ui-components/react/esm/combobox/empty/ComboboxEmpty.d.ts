import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Renders its children only when the list is empty.
 * Requires the `items` prop on the root component.
 * Announces changes politely to screen readers.
 * Renders a `<div>` element.
 */
export declare const ComboboxEmpty: React.ForwardRefExoticComponent<ComboboxEmpty.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxEmpty {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}