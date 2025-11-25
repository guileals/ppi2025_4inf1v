import * as React from 'react';
import { FieldRoot } from "../root/FieldRoot.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An accessible label that is automatically associated with the field control.
 * Renders a `<label>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */
export declare const FieldLabel: React.ForwardRefExoticComponent<FieldLabel.Props & React.RefAttributes<any>>;
export declare namespace FieldLabel {
  type State = FieldRoot.State;
  interface Props extends BaseUIComponentProps<'label', State> {}
}