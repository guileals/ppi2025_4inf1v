"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDialogClose = useDialogClose;
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useButton = require("../../use-button/useButton");
var _mergeProps = require("../../merge-props");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
function useDialogClose(params) {
  const {
    open,
    setOpen,
    disabled,
    nativeButton
  } = params;
  const handleClick = (0, _useEventCallback.useEventCallback)(event => {
    if (open) {
      setOpen(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('close-press', event.nativeEvent));
    }
  });
  const {
    getButtonProps,
    buttonRef
  } = (0, _useButton.useButton)({
    disabled,
    native: nativeButton
  });
  const getRootProps = externalProps => (0, _mergeProps.mergeProps)({
    onClick: handleClick
  }, externalProps, getButtonProps);
  return {
    getRootProps,
    ref: buttonRef
  };
}