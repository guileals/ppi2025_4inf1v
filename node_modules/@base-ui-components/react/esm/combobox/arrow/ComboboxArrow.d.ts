import * as React from 'react';
import type { Side, Align } from "../../utils/useAnchorPositioning.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Displays an element positioned against the anchor.
 * Renders a `<div>` element.
 */
export declare const ComboboxArrow: React.ForwardRefExoticComponent<ComboboxArrow.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxArrow {
  interface State {
    /**
     * Whether the popup is currently open.
     */
    open: boolean;
    side: Side;
    align: Align;
    uncentered: boolean;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}