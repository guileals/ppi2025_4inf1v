'use client';

import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useButton } from "../../use-button/useButton.js";
import { mergeProps } from "../../merge-props/index.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
export function useDialogClose(params) {
  const {
    open,
    setOpen,
    disabled,
    nativeButton
  } = params;
  const handleClick = useEventCallback(event => {
    if (open) {
      setOpen(false, createBaseUIEventDetails('close-press', event.nativeEvent));
    }
  });
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const getRootProps = externalProps => mergeProps({
    onClick: handleClick
  }, externalProps, getButtonProps);
  return {
    getRootProps,
    ref: buttonRef
  };
}