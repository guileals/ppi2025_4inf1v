import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An element that scrolls the select menu up when hovered.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectScrollUpArrow: React.ForwardRefExoticComponent<SelectScrollUpArrow.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace SelectScrollUpArrow {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * Whether to keep the HTML element in the DOM while the select menu is not scrollable.
     * @default false
     */
    keepMounted?: boolean;
  }
}