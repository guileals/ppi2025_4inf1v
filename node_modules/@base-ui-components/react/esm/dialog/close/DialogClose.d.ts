import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
/**
 * A button that closes the dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
export declare const DialogClose: React.ForwardRefExoticComponent<DialogClose.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace DialogClose {
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {}
  interface State {
    /**
     * Whether the button is currently disabled.
     */
    disabled: boolean;
  }
}