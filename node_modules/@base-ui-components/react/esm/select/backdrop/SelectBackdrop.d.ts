import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * An overlay displayed beneath the menu popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectBackdrop: React.ForwardRefExoticComponent<SelectBackdrop.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace SelectBackdrop {
  interface Props extends BaseUIComponentProps<'div', State> {}
  interface State {
    /**
     * Whether the select menu is currently open.
     */
    open: boolean;
    transitionStatus: TransitionStatus;
  }
}