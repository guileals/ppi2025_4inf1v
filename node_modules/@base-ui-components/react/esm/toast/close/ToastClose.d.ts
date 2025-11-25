import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
/**
 * Closes the toast when clicked.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
export declare const ToastClose: React.ForwardRefExoticComponent<ToastClose.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace ToastClose {
  interface State {
    /**
     * The type of the toast.
     */
    type: string | undefined;
  }
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {}
}