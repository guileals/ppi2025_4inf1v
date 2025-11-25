import { CommonPopupDataAttributes } from "../../utils/popupStateMapping.js";
export let AlertDialogBackdropDataAttributes = function (AlertDialogBackdropDataAttributes) {
  /**
   * Present when the dialog is open.
   */
  AlertDialogBackdropDataAttributes[AlertDialogBackdropDataAttributes["open"] = CommonPopupDataAttributes.open] = "open";
  /**
   * Present when the dialog is closed.
   */
  AlertDialogBackdropDataAttributes[AlertDialogBackdropDataAttributes["closed"] = CommonPopupDataAttributes.closed] = "closed";
  /**
   * Present when the dialog is animating in.
   */
  AlertDialogBackdropDataAttributes[AlertDialogBackdropDataAttributes["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
  /**
   * Present when the dialog is animating out.
   */
  AlertDialogBackdropDataAttributes[AlertDialogBackdropDataAttributes["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
  return AlertDialogBackdropDataAttributes;
}({});