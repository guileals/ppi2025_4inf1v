import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import type { CollapsibleRoot } from "../root/CollapsibleRoot.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * A panel with the collapsible contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
export declare const CollapsiblePanel: React.ForwardRefExoticComponent<CollapsiblePanel.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace CollapsiblePanel {
  interface State extends CollapsibleRoot.State {
    transitionStatus: TransitionStatus;
  }
  interface Props extends BaseUIComponentProps<'div', CollapsibleRoot.State> {
    /**
     * Allows the browser’s built-in page search to find and expand the panel contents.
     *
     * Overrides the `keepMounted` prop and uses `hidden="until-found"`
     * to hide the element without removing it from the DOM.
     *
     * @default false
     */
    hiddenUntilFound?: boolean;
    /**
     * Whether to keep the element in the DOM while the panel is hidden.
     * This prop is ignored when `hiddenUntilFound` is used.
     * @default false
     */
    keepMounted?: boolean;
  }
}