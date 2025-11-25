import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A container viewport for toasts.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
export declare const ToastViewport: React.ForwardRefExoticComponent<ToastViewport.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ToastViewport {
  interface State {
    /**
     * Whether toasts are expanded in the viewport.
     */
    expanded: boolean;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}