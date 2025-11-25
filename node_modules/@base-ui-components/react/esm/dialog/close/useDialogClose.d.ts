import * as React from 'react';
import type { DialogRoot } from "../root/DialogRoot.js";
export declare function useDialogClose(params: useDialogClose.Parameters): useDialogClose.ReturnValue;
export declare namespace useDialogClose {
  interface Parameters {
    /**
     * Whether the button is currently disabled.
     */
    disabled: boolean;
    /**
     * Whether the dialog is currently open.
     */
    open: boolean;
    /**
     * Event handler called when the dialog is opened or closed.
     */
    setOpen: (open: boolean, eventDetails: DialogRoot.ChangeEventDetails) => void;
    /**
     * Whether the component renders a native `<button>` element when replacing it
     * via the `render` prop.
     * Set to `false` if the rendered element is not a button (e.g. `<div>`).
     * @default true
     */
    nativeButton: boolean;
  }
  interface ReturnValue {
    /**
     * Resolver for the root element props.
     */
    getRootProps: (externalProps: React.HTMLAttributes<any>) => React.HTMLAttributes<any>;
    ref: React.RefObject<HTMLElement | null>;
  }
}