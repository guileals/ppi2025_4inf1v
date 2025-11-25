import * as React from 'react';
import type { BaseUIComponentProps } from "../utils/types.js";
import { Field } from "../field/index.js";
/**
 * A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Input](https://base-ui.com/react/components/input)
 */
export declare const Input: React.ForwardRefExoticComponent<Input.Props & React.RefAttributes<HTMLInputElement>>;
export declare namespace Input {
  interface Props extends BaseUIComponentProps<'input', State> {
    /**
     * Callback fired when the `value` changes. Use when controlled.
     */
    onValueChange?: Field.Control.Props['onValueChange'];
    defaultValue?: Field.Control.Props['defaultValue'];
  }
  interface State extends Field.Control.State {}
  type ChangeEventReason = Field.Control.ChangeEventReason;
  type ChangeEventDetails = Field.Control.ChangeEventDetails;
}