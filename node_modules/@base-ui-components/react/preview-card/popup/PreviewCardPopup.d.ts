import * as React from 'react';
import type { Align, Side } from "../../utils/useAnchorPositioning.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * A container for the preview card contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
 */
export declare const PreviewCardPopup: React.ForwardRefExoticComponent<PreviewCardPopup.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace PreviewCardPopup {
  interface State {
    /**
     * Whether the preview card is currently open.
     */
    open: boolean;
    side: Side;
    align: Align;
    transitionStatus: TransitionStatus;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}