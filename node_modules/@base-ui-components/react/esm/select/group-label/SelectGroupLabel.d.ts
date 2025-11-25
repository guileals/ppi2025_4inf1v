import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An accessible label that is automatically associated with its parent group.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectGroupLabel: React.ForwardRefExoticComponent<SelectGroupLabel.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace SelectGroupLabel {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}