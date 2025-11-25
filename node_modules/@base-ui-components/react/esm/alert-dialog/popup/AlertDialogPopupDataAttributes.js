import { CommonPopupDataAttributes } from "../../utils/popupStateMapping.js";
export let AlertDialogPopupDataAttributes = function (AlertDialogPopupDataAttributes) {
  /**
   * Present when the dialog is open.
   */
  AlertDialogPopupDataAttributes[AlertDialogPopupDataAttributes["open"] = CommonPopupDataAttributes.open] = "open";
  /**
   * Present when the dialog is closed.
   */
  AlertDialogPopupDataAttributes[AlertDialogPopupDataAttributes["closed"] = CommonPopupDataAttributes.closed] = "closed";
  /**
   * Present when the dialog is animating in.
   */
  AlertDialogPopupDataAttributes[AlertDialogPopupDataAttributes["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
  /**
   * Present when the dialog is animating out.
   */
  AlertDialogPopupDataAttributes[AlertDialogPopupDataAttributes["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
  /**
   * Present when the dialog is nested within another dialog.
   */
  AlertDialogPopupDataAttributes["nested"] = "data-nested";
  /**
   * Present when the dialog has other open dialogs nested within it.
   */
  AlertDialogPopupDataAttributes["nestedDialogOpen"] = "data-nested-dialog-open";
  return AlertDialogPopupDataAttributes;
}({});