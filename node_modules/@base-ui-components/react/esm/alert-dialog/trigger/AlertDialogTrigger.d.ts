import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
/**
 * A button that opens the alert dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
export declare const AlertDialogTrigger: React.ForwardRefExoticComponent<AlertDialogTrigger.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace AlertDialogTrigger {
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