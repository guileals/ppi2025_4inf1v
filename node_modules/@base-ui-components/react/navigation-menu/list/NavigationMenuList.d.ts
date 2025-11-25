import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Contains a list of navigation menu items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 */
export declare const NavigationMenuList: React.ForwardRefExoticComponent<NavigationMenuList.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace NavigationMenuList {
  interface State {
    /**
     * If `true`, the popup is open.
     */
    open: boolean;
  }
  interface Props extends BaseUIComponentProps<'ul', State> {}
}