import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import { type TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * Indicates whether the item is selected.
 * Renders a `<span>` element.
 */
export declare const ComboboxItemIndicator: React.ForwardRefExoticComponent<ComboboxItemIndicator.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace ComboboxItemIndicator {
  interface Props extends BaseUIComponentProps<'span', State> {
    children?: React.ReactNode;
    /**
     * Whether to keep the HTML element in the DOM when the item is not selected.
     * @default false
     */
    keepMounted?: boolean;
  }
  interface State {
    selected: boolean;
    transitionStatus: TransitionStatus;
  }
}