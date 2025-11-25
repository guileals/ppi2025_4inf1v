import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A container for the chips in a multiselectable input.
 * Renders a `<div>` element.
 */
export declare const ComboboxChips: React.ForwardRefExoticComponent<ComboboxChips.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxChips {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}