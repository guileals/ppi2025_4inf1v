import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Displays a status message whose content changes are announced politely to screen readers.
 * Useful for conveying the status of an asynchronously loaded list.
 * Renders a `<div>` element.
 */
export declare const ComboboxStatus: React.ForwardRefExoticComponent<ComboboxStatus.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxStatus {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}