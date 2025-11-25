import * as React from 'react';
import type { Align, Side } from "../../utils/useAnchorPositioning.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Displays an element positioned against the popover anchor.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
export declare const PopoverArrow: React.ForwardRefExoticComponent<PopoverArrow.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace PopoverArrow {
  interface State {
    /**
     * Whether the popover is currently open.
     */
    open: boolean;
    side: Side;
    align: Align;
    uncentered: boolean;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}