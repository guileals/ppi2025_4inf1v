import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A list container for the items.
 * Renders a `<div>` element.
 */
export declare const ComboboxList: React.ForwardRefExoticComponent<ComboboxList.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxList {
  interface State {}
  interface Props extends Omit<BaseUIComponentProps<'div', State>, 'children'> {
    children?: React.ReactNode | ((item: any, index: number) => React.ReactNode);
  }
}