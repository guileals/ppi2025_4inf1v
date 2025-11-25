import { CommonTriggerDataAttributes } from "../../utils/popupStateMapping.js";
export let AlertDialogTriggerDataAttributes = function (AlertDialogTriggerDataAttributes) {
  /**
   * Present when the trigger is disabled.
   */
  AlertDialogTriggerDataAttributes["disabled"] = "data-disabled";
  /**
   * Present when the corresponding dialog is open.
   */
  AlertDialogTriggerDataAttributes[AlertDialogTriggerDataAttributes["popupOpen"] = CommonTriggerDataAttributes.popupOpen] = "popupOpen";
  return AlertDialogTriggerDataAttributes;
}({});