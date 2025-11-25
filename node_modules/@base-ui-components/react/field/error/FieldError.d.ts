import * as React from 'react';
import { FieldRoot } from "../root/FieldRoot.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An error message displayed if the field control fails validation.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */
export declare const FieldError: React.ForwardRefExoticComponent<FieldError.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace FieldError {
  type State = FieldRoot.State;
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * Determines whether to show the error message according to the field’s
     * [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState).
     * Specifying `true` will always show the error message, and lets external libraries
     * control the visibility.
     */
    match?: boolean | keyof ValidityState;
  }
}