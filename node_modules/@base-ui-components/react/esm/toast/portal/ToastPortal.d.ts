import * as React from 'react';
/**
 * A portal element that moves the viewport to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
export declare function ToastPortal(props: ToastPortal.Props): React.JSX.Element;
export declare namespace ToastPortal {
  interface Props {
    children?: React.ReactNode;
    /**
     * A parent element to render the portal element into.
     */
    container?: HTMLElement | null | React.RefObject<HTMLElement | null>;
  }
}