import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An individual navigation menu item.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 */
export declare const NavigationMenuItem: React.ForwardRefExoticComponent<NavigationMenuItem.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace NavigationMenuItem {
  interface State {}
  interface Props extends BaseUIComponentProps<'li', State> {
    /**
     * A unique value that identifies this navigation menu item.
     * If no value is provided, a unique ID will be generated automatically.
     * Use when controlling the navigation menu programmatically.
     */
    value?: any;
  }
}