import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * Indicates whether the checkbox item is ticked.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export declare const MenuCheckboxItemIndicator: React.ForwardRefExoticComponent<MenuCheckboxItemIndicator.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace MenuCheckboxItemIndicator {
  interface Props extends BaseUIComponentProps<'span', State> {
    /**
     * Whether to keep the HTML element in the DOM when the checkbox item is not checked.
     * @default false
     */
    keepMounted?: boolean;
  }
  interface State {
    /**
     * Whether the checkbox item is currently ticked.
     */
    checked: boolean;
    /**
     * Whether the component should ignore user interaction.
     */
    disabled: boolean;
    highlighted: boolean;
    transitionStatus: TransitionStatus;
  }
}