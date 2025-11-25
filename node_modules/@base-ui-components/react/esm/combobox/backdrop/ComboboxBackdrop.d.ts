import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * An overlay displayed beneath the popup.
 * Renders a `<div>` element.
 */
export declare const ComboboxBackdrop: React.ForwardRefExoticComponent<ComboboxBackdrop.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxBackdrop {
  interface Props extends BaseUIComponentProps<'div', State> {}
  interface State {
    /**
     * Whether the popup is currently open.
     */
    open: boolean;
    transitionStatus: TransitionStatus;
  }
}