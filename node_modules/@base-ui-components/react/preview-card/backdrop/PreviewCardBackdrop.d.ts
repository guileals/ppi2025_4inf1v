import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * An overlay displayed beneath the popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
 */
export declare const PreviewCardBackdrop: React.ForwardRefExoticComponent<PreviewCardBackdrop.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace PreviewCardBackdrop {
  interface State {
    /**
     * Whether the preview card is currently open.
     */
    open: boolean;
    transitionStatus: TransitionStatus;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}