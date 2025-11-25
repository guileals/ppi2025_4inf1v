import * as React from 'react';
import type { DialogRoot } from "../../dialog/root/DialogRoot.js";
import { BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
/**
 * Groups all parts of the alert dialog.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
export declare const AlertDialogRoot: React.FC<AlertDialogRoot.Props>;
export declare namespace AlertDialogRoot {
  interface Props extends Omit<DialogRoot.Props, 'modal' | 'dismissible' | 'onOpenChange' | 'actionsRef'> {
    /**
     * Event handler called when the dialog is opened or closed.
     */
    onOpenChange?: (open: boolean, eventDetails: AlertDialogRoot.ChangeEventDetails) => void;
    /**
     * A ref to imperative actions.
     * - `unmount`: When specified, the dialog will not be unmounted when closed.
     * Instead, the `unmount` function must be called to unmount the dialog manually.
     * Useful when the dialog's animation is controlled by an external library.
     */
    actionsRef?: React.RefObject<AlertDialogRoot.Actions>;
  }
  type Actions = DialogRoot.Actions;
  type ChangeEventReason = DialogRoot.ChangeEventReason;
  type ChangeEventDetails = BaseUIEventDetails<ChangeEventReason>;
}