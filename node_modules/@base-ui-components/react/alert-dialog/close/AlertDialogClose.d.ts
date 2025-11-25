import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
/**
 * A button that closes the alert dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
export declare const AlertDialogClose: React.ForwardRefExoticComponent<AlertDialogClose.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace AlertDialogClose {
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {}
  interface State {
    /**
     * Whether the button is currently disabled.
     */
    disabled: boolean;
  }
}