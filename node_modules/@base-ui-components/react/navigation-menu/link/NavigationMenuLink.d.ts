import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A link in the navigation menu that can be used to navigate to a different page or section.
 * Renders an `<a>` element.
 *
 * Documentation: [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 */
export declare const NavigationMenuLink: React.ForwardRefExoticComponent<NavigationMenuLink.Props & React.RefAttributes<HTMLAnchorElement>>;
export declare namespace NavigationMenuLink {
  interface State {
    /**
     * Whether the link is the currently active page.
     */
    active: boolean;
  }
  interface Props extends BaseUIComponentProps<'a', State> {
    /**
     * Whether the link is the currently active page.
     * @default false
     */
    active?: boolean;
  }
}