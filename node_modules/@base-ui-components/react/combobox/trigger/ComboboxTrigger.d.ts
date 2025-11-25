import * as React from 'react';
import { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
import type { FieldRoot } from "../../field/root/FieldRoot.js";
/**
 * A button that opens the popup.
 * Renders a `<button>` element.
 */
export declare const ComboboxTrigger: React.ForwardRefExoticComponent<ComboboxTrigger.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace ComboboxTrigger {
  interface State extends FieldRoot.State {
    /**
     * Whether the popup is open.
     */
    open: boolean;
    /**
     * Whether the component should ignore user interaction.
     */
    disabled: boolean;
  }
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: boolean;
  }
}