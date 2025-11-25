'use client';

import * as React from 'react';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useAvatarRootContext } from "../root/AvatarRootContext.js";
import { avatarStyleHookMapping } from "../root/styleHooks.js";
import { useImageLoadingStatus } from "./useImageLoadingStatus.js";

/**
 * The image to be displayed in the avatar.
 * Renders an `<img>` element.
 *
 * Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
 */
export const AvatarImage = /*#__PURE__*/React.forwardRef(function AvatarImage(componentProps, forwardedRef) {
  const {
    className,
    render,
    onLoadingStatusChange: onLoadingStatusChangeProp,
    referrerPolicy,
    crossOrigin,
    ...elementProps
  } = componentProps;
  const context = useAvatarRootContext();
  const imageLoadingStatus = useImageLoadingStatus(componentProps.src, {
    referrerPolicy,
    crossOrigin
  });
  const handleLoadingStatusChange = useEventCallback(status => {
    onLoadingStatusChangeProp?.(status);
    context.setImageLoadingStatus(status);
  });
  useIsoLayoutEffect(() => {
    if (imageLoadingStatus !== 'idle') {
      handleLoadingStatusChange(imageLoadingStatus);
    }
  }, [imageLoadingStatus, handleLoadingStatusChange]);
  const state = React.useMemo(() => ({
    imageLoadingStatus
  }), [imageLoadingStatus]);
  const element = useRenderElement('img', componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    customStyleHookMapping: avatarStyleHookMapping,
    enabled: imageLoadingStatus === 'loaded'
  });
  return element;
});
if (process.env.NODE_ENV !== "production") AvatarImage.displayName = "AvatarImage";