import * as React from 'react';
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An overlay displayed beneath the popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
export declare const AlertDialogBackdrop: React.ForwardRefExoticComponent<AlertDialogBackdrop.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace AlertDialogBackdrop {
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * Whether the backdrop is forced to render even when nested.
     * @default false
     */
    forceRender?: boolean;
  }
  interface State {
    /**
     * Whether the dialog is currently open.
     */
    open: boolean;
    transitionStatus: TransitionStatus;
  }
}