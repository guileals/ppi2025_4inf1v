import * as React from 'react';
import { createToastManager } from "../createToastManager.js";
/**
 * Provides a context for creating and managing toasts.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
export declare const ToastProvider: React.FC<ToastProvider.Props>;
export declare namespace ToastProvider {
  interface Props {
    children?: React.ReactNode;
    /**
     * The default amount of time (in ms) before a toast is auto dismissed.
     * A value of `0` will prevent the toast from being dismissed automatically.
     * @default 5000
     */
    timeout?: number;
    /**
     * The maximum number of toasts that can be displayed at once.
     * When the limit is reached, the oldest toast will be removed to make room for the new one.
     * @default 3
     */
    limit?: number;
    /**
     * A global manager for toasts to use outside of a React component.
     */
    toastManager?: createToastManager.ToastManager;
  }
}