import * as React from 'react';
import { FieldRoot } from "../root/FieldRoot.js";
import { BaseUIComponentProps } from "../../utils/types.js";
import { BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
/**
 * The form control to label and validate.
 * Renders an `<input>` element.
 *
 * You can omit this part and use any Base UI input component instead. For example,
 * [Input](https://base-ui.com/react/components/input), [Checkbox](https://base-ui.com/react/components/checkbox),
 * or [Select](https://base-ui.com/react/components/select), among others, will work with Field out of the box.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */
export declare const FieldControl: React.ForwardRefExoticComponent<FieldControl.Props & React.RefAttributes<HTMLInputElement>>;
export declare namespace FieldControl {
  type State = FieldRoot.State;
  interface Props extends BaseUIComponentProps<'input', State> {
    /**
     * Callback fired when the `value` changes. Use when controlled.
     */
    onValueChange?: (value: string, eventDetails: ChangeEventDetails) => void;
    defaultValue?: React.ComponentProps<'input'>['defaultValue'];
  }
  type ChangeEventReason = 'none';
  type ChangeEventDetails = BaseUIEventDetails<ChangeEventReason>;
}