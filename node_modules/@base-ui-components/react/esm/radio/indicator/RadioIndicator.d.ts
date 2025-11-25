import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import { type TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * Indicates whether the radio button is selected.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Radio](https://base-ui.com/react/components/radio)
 */
export declare const RadioIndicator: React.ForwardRefExoticComponent<RadioIndicator.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace RadioIndicator {
  interface Props extends BaseUIComponentProps<'span', State> {
    /**
     * Whether to keep the HTML element in the DOM when the radio button is inactive.
     * @default false
     */
    keepMounted?: boolean;
  }
  interface State {
    /**
     * Whether the radio button is currently selected.
     */
    checked: boolean;
    transitionStatus: TransitionStatus;
  }
}