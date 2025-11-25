import * as React from 'react';
import { useDialogRoot } from "./useDialogRoot.js";
import type { BaseUIChangeEventReason } from "../../utils/types.js";
import { BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
/**
 * Groups all parts of the dialog.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
export declare const DialogRoot: React.FC<DialogRoot.Props>;
export declare namespace DialogRoot {
  interface Props extends useDialogRoot.SharedParameters {
    children?: React.ReactNode;
  }
  interface Actions {
    unmount: () => void;
  }
  type ChangeEventReason = BaseUIChangeEventReason | 'close-press';
  type ChangeEventDetails = BaseUIEventDetails<ChangeEventReason>;
}