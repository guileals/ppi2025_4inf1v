import * as React from 'react';
import type { BaseUIComponentProps, NonNativeButtonProps } from "../../utils/types.js";
/**
 * An individual item in the list.
 * Renders a `<div>` element.
 */
export declare const ComboboxItem: React.NamedExoticComponent<ComboboxItem.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxItem {
  interface State {
    /**
     * Whether the item should ignore user interaction.
     */
    disabled: boolean;
    /**
     * Whether the item is selected.
     */
    selected: boolean;
    /**
     * Whether the item is highlighted.
     */
    highlighted: boolean;
  }
  interface Props extends NonNativeButtonProps, Omit<BaseUIComponentProps<'div', State>, 'id'> {
    children?: React.ReactNode;
    /**
     * The index of the item in the list. Improves performance when specified by avoiding the need to calculate the index automatically from the DOM.
     */
    index?: number;
    /**
     * A unique value that identifies this item.
     */
    value?: any;
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: boolean;
  }
}