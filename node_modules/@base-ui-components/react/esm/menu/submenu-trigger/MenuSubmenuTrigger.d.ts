import * as React from 'react';
import { BaseUIComponentProps, NonNativeButtonProps } from "../../utils/types.js";
/**
 * A menu item that opens a submenu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export declare const MenuSubmenuTrigger: React.ForwardRefExoticComponent<MenuSubmenuTrigger.Props & React.RefAttributes<Element>>;
export declare namespace MenuSubmenuTrigger {
  interface Props extends NonNativeButtonProps, BaseUIComponentProps<'div', State> {
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
    /**
     * Overrides the text label to use when the item is matched during keyboard text navigation.
     */
    label?: string;
    /**
     * @ignore
     */
    id?: string;
  }
  interface State {
    /**
     * Whether the component should ignore user interaction.
     */
    disabled: boolean;
    highlighted: boolean;
    /**
     * Whether the menu is currently open.
     */
    open: boolean;
  }
}