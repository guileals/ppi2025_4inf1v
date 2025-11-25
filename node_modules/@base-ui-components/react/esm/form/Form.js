'use client';

import * as React from 'react';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { FormContext } from "./FormContext.js";
import { useRenderElement } from "../utils/useRenderElement.js";
import { jsx as _jsx } from "react/jsx-runtime";
const EMPTY = {};

/**
 * A native form element with consolidated error handling.
 * Renders a `<form>` element.
 *
 * Documentation: [Base UI Form](https://base-ui.com/react/components/form)
 */
export const Form = /*#__PURE__*/React.forwardRef(function Form(componentProps, forwardedRef) {
  const {
    render,
    className,
    errors,
    onClearErrors: onClearErrorsProp,
    onSubmit: onSubmitProp,
    ...elementProps
  } = componentProps;
  const formRef = React.useRef({
    fields: new Map()
  });
  const submittedRef = React.useRef(false);
  const onSubmit = useEventCallback(onSubmitProp);
  const onClearErrors = useEventCallback(onClearErrorsProp);
  const focusControl = useEventCallback(control => {
    control.focus();
    if (control.tagName === 'INPUT') {
      control.select();
    }
  });
  React.useEffect(() => {
    if (!submittedRef.current) {
      return;
    }
    submittedRef.current = false;
    const invalidFields = Array.from(formRef.current.fields.values()).filter(field => field.validityData.state.valid === false);
    if (invalidFields.length) {
      focusControl(invalidFields[0].controlRef.current);
    }
  }, [errors, focusControl]);
  const element = useRenderElement('form', componentProps, {
    state: EMPTY,
    ref: forwardedRef,
    props: [{
      noValidate: true,
      onSubmit(event) {
        let values = Array.from(formRef.current.fields.values());

        // Async validation isn't supported to stop the submit event.
        values.forEach(field => {
          field.validate();
        });
        values = Array.from(formRef.current.fields.values());
        const invalidFields = values.filter(field => !field.validityData.state.valid);
        if (invalidFields.length) {
          event.preventDefault();
          focusControl(invalidFields[0].controlRef.current);
        } else {
          submittedRef.current = true;
          onSubmit(event);
        }
      }
    }, elementProps]
  });
  const clearErrors = useEventCallback(name => {
    if (name && errors && EMPTY.hasOwnProperty.call(errors, name)) {
      const nextErrors = {
        ...errors
      };
      delete nextErrors[name];
      onClearErrors(nextErrors);
    }
  });
  const contextValue = React.useMemo(() => ({
    formRef,
    errors: errors ?? {},
    clearErrors
  }), [formRef, errors, clearErrors]);
  return /*#__PURE__*/_jsx(FormContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") Form.displayName = "Form";