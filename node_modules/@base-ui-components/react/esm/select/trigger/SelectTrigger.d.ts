import * as React from 'react';
import { BaseUIComponentProps, NonNativeButtonProps } from "../../utils/types.js";
import type { FieldRoot } from "../../field/root/FieldRoot.js";
/**
 * A button that opens the select menu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectTrigger: React.ForwardRefExoticComponent<SelectTrigger.Props & React.RefAttributes<HTMLElement>>;
export declare namespace SelectTrigger {
  interface Props extends NonNativeButtonProps, BaseUIComponentProps<'div', State> {
    children?: React.ReactNode;
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: boolean;
  }
  interface State extends FieldRoot.State {
    /**
     * Whether the select menu is currently open.
     */
    open: boolean;
    /**
     * Whether the select menu is readonly.
     */
    readOnly: boolean;
    /**
     * The value of the currently selected item.
     */
    value: any;
  }
}