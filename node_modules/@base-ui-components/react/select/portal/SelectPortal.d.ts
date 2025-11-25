import * as React from 'react';
import { FloatingPortalProps } from "../../floating-ui-react/index.js";
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare function SelectPortal(props: SelectPortal.Props): React.JSX.Element | null;
export declare namespace SelectPortal {
  interface Props {
    children?: React.ReactNode;
    /**
     * A parent element to render the portal element into.
     */
    container?: FloatingPortalProps['root'];
  }
}