import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An accessible label that is automatically associated with its parent group.
 * Renders a `<div>` element.
 */
export declare const ComboboxGroupLabel: React.ForwardRefExoticComponent<ComboboxGroupLabel.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxGroupLabel {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}