import * as React from 'react';
import { useAnchorPositioning, type Align, type Side } from "../../utils/useAnchorPositioning.js";
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Positions the menu popup against the trigger.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export declare const MenuPositioner: React.ForwardRefExoticComponent<MenuPositioner.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace MenuPositioner {
  interface State {
    /**
     * Whether the menu is currently open.
     */
    open: boolean;
    side: Side;
    align: Align;
    anchorHidden: boolean;
    nested: boolean;
  }
  interface Props extends useAnchorPositioning.SharedParameters, BaseUIComponentProps<'div', State> {}
}