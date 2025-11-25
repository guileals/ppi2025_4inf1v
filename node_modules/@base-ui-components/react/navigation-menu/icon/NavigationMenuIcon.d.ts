import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An icon that indicates that the trigger button opens a menu.
 *
 * Documentation: [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 */
export declare const NavigationMenuIcon: React.ForwardRefExoticComponent<NavigationMenuIcon.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace NavigationMenuIcon {
  interface State {
    /**
     * Whether the navigation menu is open and the item is active.
     */
    open: boolean;
  }
  interface Props extends BaseUIComponentProps<'span', State> {}
}