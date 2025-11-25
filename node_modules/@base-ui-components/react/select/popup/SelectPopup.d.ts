import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { Side, Align } from "../../utils/useAnchorPositioning.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * A container for the select items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectPopup: React.ForwardRefExoticComponent<SelectPopup.Props & React.RefAttributes<Element>>;
export declare namespace SelectPopup {
  interface Props extends BaseUIComponentProps<'div', State> {
    children?: React.ReactNode;
  }
  interface State {
    side: Side | 'none';
    align: Align;
    open: boolean;
    transitionStatus: TransitionStatus;
  }
}