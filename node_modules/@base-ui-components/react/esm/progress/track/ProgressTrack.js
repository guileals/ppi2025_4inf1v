'use client';

import * as React from 'react';
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useProgressRootContext } from "../root/ProgressRootContext.js";
import { progressStyleHookMapping } from "../root/styleHooks.js";
/**
 * Contains the progress bar indicator.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
 */
export const ProgressTrack = /*#__PURE__*/React.forwardRef(function ProgressTrack(componentProps, forwardedRef) {
  const {
    render,
    className,
    ...elementProps
  } = componentProps;
  const {
    state
  } = useProgressRootContext();
  const element = useRenderElement('div', componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    customStyleHookMapping: progressStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ProgressTrack.displayName = "ProgressTrack";