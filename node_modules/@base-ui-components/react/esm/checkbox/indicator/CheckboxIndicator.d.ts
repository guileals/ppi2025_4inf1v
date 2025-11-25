import * as React from 'react';
import type { CheckboxRoot } from "../root/CheckboxRoot.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
import { type TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * Indicates whether the checkbox is ticked.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Checkbox](https://base-ui.com/react/components/checkbox)
 */
export declare const CheckboxIndicator: React.ForwardRefExoticComponent<CheckboxIndicator.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace CheckboxIndicator {
  interface State extends CheckboxRoot.State {
    transitionStatus: TransitionStatus;
  }
  interface Props extends BaseUIComponentProps<'span', State> {
    /**
     * Whether to keep the element in the DOM when the checkbox is not checked.
     * @default false
     */
    keepMounted?: boolean;
  }
}