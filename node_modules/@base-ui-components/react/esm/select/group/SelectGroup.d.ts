import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Groups related select items with the corresponding label.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectGroup: React.ForwardRefExoticComponent<SelectGroup.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace SelectGroup {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}