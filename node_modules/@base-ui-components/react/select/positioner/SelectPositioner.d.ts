import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import { useAnchorPositioning, type Align, type Side } from "../../utils/useAnchorPositioning.js";
/**
 * Positions the select menu popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectPositioner: React.ForwardRefExoticComponent<SelectPositioner.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace SelectPositioner {
  interface State {
    open: boolean;
    side: Side | 'none';
    align: Align;
    anchorHidden: boolean;
  }
  interface Props extends useAnchorPositioning.SharedParameters, BaseUIComponentProps<'div', State> {
    /**
     * Whether the positioner overlaps the trigger so the selected item's text is aligned with the trigger's value text. This only applies to mouse input and is automatically disabled if there is not enough space.
     * @default true
     */
    alignItemWithTrigger?: boolean;
  }
}