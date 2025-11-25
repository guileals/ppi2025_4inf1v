import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Groups related items with the corresponding label.
 * Renders a `<div>` element.
 */
export declare const ComboboxGroup: React.ForwardRefExoticComponent<ComboboxGroup.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxGroup {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * Items to be rendered within this group.
     * When provided, child `Collection` components will use these items.
     */
    items?: any[];
  }
}