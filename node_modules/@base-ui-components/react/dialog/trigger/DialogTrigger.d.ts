import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
/**
 * A button that opens the dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
export declare const DialogTrigger: React.ForwardRefExoticComponent<DialogTrigger.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace DialogTrigger {
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {}
  interface State {
    /**
     * Whether the dialog is currently disabled.
     */
    disabled: boolean;
    /**
     * Whether the dialog is currently open.
     */
    open: boolean;
  }
}