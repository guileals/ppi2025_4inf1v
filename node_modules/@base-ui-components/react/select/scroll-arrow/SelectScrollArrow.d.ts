import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import { Side } from "../../utils/useAnchorPositioning.js";
import { type TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * @internal
 */
export declare const SelectScrollArrow: React.ForwardRefExoticComponent<SelectScrollArrow.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace SelectScrollArrow {
  interface State {
    direction: 'up' | 'down';
    visible: boolean;
    side: Side | 'none';
    transitionStatus: TransitionStatus;
  }
  interface Props extends BaseUIComponentProps<'div', State> {
    direction: 'up' | 'down';
    /**
     * Whether to keep the HTML element in the DOM while the select menu is not scrollable.
     * @default false
     */
    keepMounted?: boolean;
  }
}