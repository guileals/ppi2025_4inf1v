import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * Indicates whether the radio item is selected.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export declare const MenuRadioItemIndicator: React.ForwardRefExoticComponent<MenuRadioItemIndicator.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace MenuRadioItemIndicator {
  interface Props extends BaseUIComponentProps<'span', State> {
    /**
     * Whether to keep the HTML element in the DOM when the radio item is inactive.
     * @default false
     */
    keepMounted?: boolean;
  }
  interface State {
    /**
     * Whether the radio item is currently selected.
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