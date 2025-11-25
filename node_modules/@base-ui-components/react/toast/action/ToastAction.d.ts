import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
/**
 * Performs an action when clicked.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
export declare const ToastAction: React.ForwardRefExoticComponent<ToastAction.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace ToastAction {
  interface State {
    /**
     * The type of the toast.
     */
    type: string | undefined;
  }
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {}
}