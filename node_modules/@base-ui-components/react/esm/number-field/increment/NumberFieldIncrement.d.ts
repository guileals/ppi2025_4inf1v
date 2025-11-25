import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
import type { NumberFieldRoot } from "../root/NumberFieldRoot.js";
/**
 * A stepper button that increases the field value when clicked.
 * Renders an `<button>` element.
 *
 * Documentation: [Base UI Number Field](https://base-ui.com/react/components/number-field)
 */
export declare const NumberFieldIncrement: React.ForwardRefExoticComponent<NumberFieldIncrement.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace NumberFieldIncrement {
  interface State extends NumberFieldRoot.State {}
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {}
}