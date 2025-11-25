import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import { type TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * Indicates whether the select item is selected.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectItemIndicator: React.ForwardRefExoticComponent<SelectItemIndicator.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace SelectItemIndicator {
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