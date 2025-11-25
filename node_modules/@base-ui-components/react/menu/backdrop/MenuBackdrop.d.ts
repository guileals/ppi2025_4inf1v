import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * An overlay displayed beneath the menu popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export declare const MenuBackdrop: React.ForwardRefExoticComponent<MenuBackdrop.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace MenuBackdrop {
  interface State {
    /**
     * Whether the menu is currently open.
     */
    open: boolean;
    transitionStatus: TransitionStatus;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}