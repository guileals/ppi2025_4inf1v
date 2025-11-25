import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { Align, Side } from "../../utils/useAnchorPositioning.js";
/**
 * Displays an element positioned against the select menu anchor.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectArrow: React.ForwardRefExoticComponent<SelectArrow.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace SelectArrow {
  interface State {
    /**
     * Whether the select menu is currently open.
     */
    open: boolean;
    side: Side | 'none';
    align: Align;
    uncentered: boolean;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}