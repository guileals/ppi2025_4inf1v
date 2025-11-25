import * as React from 'react';
import type { BaseUIComponentProps } from "../utils/types.js";
import { FormContext } from "./FormContext.js";
/**
 * A native form element with consolidated error handling.
 * Renders a `<form>` element.
 *
 * Documentation: [Base UI Form](https://base-ui.com/react/components/form)
 */
export declare const Form: React.ForwardRefExoticComponent<Form.Props & React.RefAttributes<HTMLFormElement>>;
export declare namespace Form {
  interface Props extends BaseUIComponentProps<'form', State> {
    /**
     * An object where the keys correspond to the `name` attribute of the form fields,
     * and the values correspond to the error(s) related to that field.
     */
    errors?: FormContext['errors'];
    /**
     * Event handler called when the `errors` object is cleared.
     */
    onClearErrors?: (errors: FormContext['errors']) => void;
  }
  interface State {}
}