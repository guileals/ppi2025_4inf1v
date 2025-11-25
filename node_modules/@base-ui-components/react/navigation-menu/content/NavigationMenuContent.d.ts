import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * A container for the content of the navigation menu item that is moved into the popup
 * when the item is active.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 */
export declare const NavigationMenuContent: React.ForwardRefExoticComponent<NavigationMenuContent.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace NavigationMenuContent {
  interface State {
    /**
     * If `true`, the component is open.
     */
    open: boolean;
    /**
     * The transition status of the component.
     */
    transitionStatus: TransitionStatus;
    /**
     * The direction of the activation.
     */
    activationDirection: 'left' | 'right' | 'up' | 'down' | null;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}