import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * The clipping viewport of the navigation menu's current content.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 */
export declare const NavigationMenuViewport: React.ForwardRefExoticComponent<NavigationMenuViewport.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace NavigationMenuViewport {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}