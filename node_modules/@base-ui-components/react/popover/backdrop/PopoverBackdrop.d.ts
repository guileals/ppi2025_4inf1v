import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * An overlay displayed beneath the popover.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
export declare const PopoverBackdrop: React.ForwardRefExoticComponent<PopoverBackdrop.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace PopoverBackdrop {
  interface State {
    /**
     * Whether the popover is currently open.
     */
    open: boolean;
    transitionStatus: TransitionStatus;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}