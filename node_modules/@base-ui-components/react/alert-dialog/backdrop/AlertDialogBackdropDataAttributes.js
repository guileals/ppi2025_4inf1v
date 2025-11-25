"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDialogBackdropDataAttributes = void 0;
var _popupStateMapping = require("../../utils/popupStateMapping");
let AlertDialogBackdropDataAttributes = exports.AlertDialogBackdropDataAttributes = function (AlertDialogBackdropDataAttributes) {
  /**
   * Present when the dialog is open.
   */
  AlertDialogBackdropDataAttributes[AlertDialogBackdropDataAttributes["open"] = _popupStateMapping.CommonPopupDataAttributes.open] = "open";
  /**
   * Present when the dialog is closed.
   */
  AlertDialogBackdropDataAttributes[AlertDialogBackdropDataAttributes["closed"] = _popupStateMapping.CommonPopupDataAttributes.closed] = "closed";
  /**
   * Present when the dialog is animating in.
   */
  AlertDialogBackdropDataAttributes[AlertDialogBackdropDataAttributes["startingStyle"] = _popupStateMapping.CommonPopupDataAttributes.startingStyle] = "startingStyle";
  /**
   * Present when the dialog is animating out.
   */
  AlertDialogBackdropDataAttributes[AlertDialogBackdropDataAttributes["endingStyle"] = _popupStateMapping.CommonPopupDataAttributes.endingStyle] = "endingStyle";
  return AlertDialogBackdropDataAttributes;
}({});