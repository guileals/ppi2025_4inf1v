import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { Align, Side } from "../../utils/useAnchorPositioning.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * A container for the tooltip contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */
export declare const TooltipPopup: React.ForwardRefExoticComponent<TooltipPopup.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace TooltipPopup {
  interface State {
    /**
     * Whether the tooltip is currently open.
     */
    open: boolean;
    side: Side;
    align: Align;
    instant: 'delay' | 'focus' | 'dismiss' | undefined;
    transitionStatus: TransitionStatus;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}