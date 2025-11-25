import * as React from 'react';
import { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
import type { NumberFieldRoot } from "../root/NumberFieldRoot.js";
/**
 * A stepper button that decreases the field value when clicked.
 * Renders an `<button>` element.
 *
 * Documentation: [Base UI Number Field](https://base-ui.com/react/components/number-field)
 */
export declare const NumberFieldDecrement: React.ForwardRefExoticComponent<NumberFieldDecrement.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace NumberFieldDecrement {
  interface State extends NumberFieldRoot.State {}
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {}
}