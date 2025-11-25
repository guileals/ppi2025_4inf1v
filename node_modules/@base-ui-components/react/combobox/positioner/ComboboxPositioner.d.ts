import * as React from 'react';
import { type Side, type Align, useAnchorPositioning } from "../../utils/useAnchorPositioning.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Positions the popup against the trigger.
 * Renders a `<div>` element.
 */
export declare const ComboboxPositioner: React.ForwardRefExoticComponent<ComboboxPositioner.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxPositioner {
  interface State {
    /**
     * Whether the popup is currently open.
     */
    open: boolean;
    side: Side;
    align: Align;
    anchorHidden: boolean;
    empty: boolean;
  }
  interface Props extends useAnchorPositioning.SharedParameters, BaseUIComponentProps<'div', State> {}
}