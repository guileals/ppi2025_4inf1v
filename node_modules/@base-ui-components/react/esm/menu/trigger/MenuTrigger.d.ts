import * as React from 'react';
import { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
/**
 * A button that opens the menu.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export declare const MenuTrigger: React.ForwardRefExoticComponent<MenuTrigger.Props & React.RefAttributes<HTMLElement>>;
export declare namespace MenuTrigger {
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {
    children?: React.ReactNode;
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: boolean;
  }
  type State = {
    /**
     * Whether the menu is currently open.
     */
    open: boolean;
  };
}