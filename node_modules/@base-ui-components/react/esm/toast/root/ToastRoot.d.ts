import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { ToastObject as ToastObjectType } from "../useToastManager.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * Groups all parts of an individual toast.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
export declare const ToastRoot: React.ForwardRefExoticComponent<ToastRoot.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ToastRoot {
  type ToastObject<Data extends object = any> = ToastObjectType<Data>;
  interface State {
    transitionStatus: TransitionStatus;
    /**
     * Whether the toasts in the viewport are expanded.
     */
    expanded: boolean;
    /**
     * Whether the toast was removed due to exceeding the limit.
     */
    limited: boolean;
    /**
     * The type of the toast.
     */
    type: string | undefined;
    /**
     * Whether the toast is being swiped.
     */
    swiping: boolean;
    /**
     * The direction the toast is being swiped.
     */
    swipeDirection: 'up' | 'down' | 'left' | 'right' | undefined;
  }
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * The toast to render.
     */
    toast: ToastObject<any>;
    /**
     * Direction(s) in which the toast can be swiped to dismiss.
     * @default ['down', 'right']
     */
    swipeDirection?: 'up' | 'down' | 'left' | 'right' | ('up' | 'down' | 'left' | 'right')[];
  }
}