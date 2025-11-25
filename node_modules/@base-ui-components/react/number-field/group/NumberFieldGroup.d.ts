import * as React from 'react';
import type { NumberFieldRoot } from "../root/NumberFieldRoot.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Groups the input with the increment and decrement buttons.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Number Field](https://base-ui.com/react/components/number-field)
 */
export declare const NumberFieldGroup: React.ForwardRefExoticComponent<NumberFieldGroup.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace NumberFieldGroup {
  interface State extends NumberFieldRoot.State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}