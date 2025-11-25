import * as React from 'react';
import { BaseUIComponentProps, Orientation as BaseOrientation } from "../../utils/types.js";
/**
 * A container for grouping a set of controls, such as buttons, toggle groups, or menus.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Toolbar](https://base-ui.com/react/components/toolbar)
 */
export declare const ToolbarRoot: React.ForwardRefExoticComponent<ToolbarRoot.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ToolbarRoot {
  interface ItemMetadata {
    focusableWhenDisabled: boolean;
  }
  type Orientation = BaseOrientation;
  type State = {
    disabled: boolean;
    orientation: Orientation;
  };
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * The number of columns. When greater than 1, the toolbar is arranged into
     * a grid.
     * @default 1
     */
    cols?: number;
    disabled?: boolean;
    /**
     * The orientation of the toolbar.
     * @default 'horizontal'
     */
    orientation?: Orientation;
    /**
     * If `true`, using keyboard navigation will wrap focus to the other end of the toolbar once the end is reached.
     *
     * @default true
     */
    loop?: boolean;
  }
}