import * as React from 'react';
import type { Side, Align } from "../../utils/useAnchorPositioning.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Displays an element positioned against the menu anchor.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export declare const MenuArrow: React.ForwardRefExoticComponent<MenuArrow.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace MenuArrow {
  interface State {
    /**
     * Whether the menu is currently open.
     */
    open: boolean;
    side: Side;
    align: Align;
    uncentered: boolean;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}