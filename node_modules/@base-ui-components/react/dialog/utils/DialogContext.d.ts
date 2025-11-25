import * as React from 'react';
import type { useDialogRoot } from "../root/useDialogRoot.js";
/**
 * Common context for dialog & dialog alert components.
 */
export interface DialogContext extends useDialogRoot.ReturnValue {
  /**
   * Determines if the dialog is nested within a parent dialog.
   */
  nested: boolean;
  /**
   * Callback to invoke after any animations complete when the dialog is opened or closed.
   */
  onOpenChangeComplete?: (open: boolean) => void;
}
export declare const DialogContext: React.Context<DialogContext | undefined>;
export declare function useDialogContext(): DialogContext | undefined;