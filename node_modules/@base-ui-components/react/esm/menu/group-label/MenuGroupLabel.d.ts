import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An accessible label that is automatically associated with its parent group.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export declare const MenuGroupLabel: React.ForwardRefExoticComponent<MenuGroupLabel.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace MenuGroupLabel {
  interface Props extends BaseUIComponentProps<'div', State> {}
  interface State {}
}