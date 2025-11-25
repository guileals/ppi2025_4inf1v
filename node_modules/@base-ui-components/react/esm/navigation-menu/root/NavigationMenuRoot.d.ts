import * as React from 'react';
import type { BaseUIComponentProps, BaseUIChangeEventReason } from "../../utils/types.js";
import { BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
/**
 * Groups all parts of the navigation menu.
 * Renders a `<nav>` element at the root, or `<div>` element when nested.
 *
 * Documentation: [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 */
export declare const NavigationMenuRoot: React.ForwardRefExoticComponent<NavigationMenuRoot.Props & React.RefAttributes<HTMLElement>>;
export declare namespace NavigationMenuRoot {
  interface State {
    /**
     * If `true`, the popup is open.
     */
    open: boolean;
    /**
     * Whether the navigation menu is nested.
     */
    nested: boolean;
  }
  interface Props extends BaseUIComponentProps<'nav', State> {
    /**
     * A ref to imperative actions.
     */
    actionsRef?: React.RefObject<Actions>;
    /**
     * Event handler called after any animations complete when the navigation menu is closed.
     */
    onOpenChangeComplete?: (open: boolean) => void;
    /**
     * The controlled value of the navigation menu item that should be currently open.
     * When non-nullish, the menu will be open. When nullish, the menu will be closed.
     *
     * To render an uncontrolled navigation menu, use the `defaultValue` prop instead.
     * @default null
     */
    value?: any;
    /**
     * The uncontrolled value of the item that should be initially selected.
     *
     * To render a controlled navigation menu, use the `value` prop instead.
     * @default null
     */
    defaultValue?: any;
    /**
     * Callback fired when the value changes.
     */
    onValueChange?: (value: any, eventDetails: ChangeEventDetails) => void;
    /**
     * How long to wait before opening the navigation menu. Specified in milliseconds.
     * @default 50
     */
    delay?: number;
    /**
     * How long to wait before closing the navigation menu. Specified in milliseconds.
     * @default 50
     */
    closeDelay?: number;
    /**
     * The orientation of the navigation menu.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
  }
  interface Actions {
    /**
     * When specified, the navigation menu will not be unmounted when closed.
     * Instead, the `unmount` function must be called to unmount the navigation menu manually.
     * Useful when the navigation menu's animation is controlled by an external library.
     */
    unmount: () => void;
  }
  type ChangeEventReason = BaseUIChangeEventReason | 'link-press';
  type ChangeEventDetails = BaseUIEventDetails<ChangeEventReason>;
}