import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { Side, Align } from "../../utils/useAnchorPositioning.js";
/**
 * Displays an element positioned against the tooltip anchor.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */
export declare const TooltipArrow: React.ForwardRefExoticComponent<TooltipArrow.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace TooltipArrow {
  interface State {
    /**
     * Whether the tooltip is currently open.
     */
    open: boolean;
    side: Side;
    align: Align;
    uncentered: boolean;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}