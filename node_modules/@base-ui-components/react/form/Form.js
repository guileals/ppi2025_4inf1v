"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _FormContext = require("./FormContext");
var _useRenderElement = require("../utils/useRenderElement");
var _jsxRuntime = require("react/jsx-runtime");
const EMPTY = {};

/**
 * A native form element with consolidated error handling.
 * Renders a `<form>` element.
 *
 * Documentation: [Base UI Form](https://base-ui.com/react/components/form)
 */
const Form = exports.Form = /*#__PURE__*/React.forwardRef(function Form(componentProps, forwardedRef) {
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
  const onSubmit = (0, _useEventCallback.useEventCallback)(onSubmitProp);
  const onClearErrors = (0, _useEventCallback.useEventCallback)(onClearErrorsProp);
  const focusControl = (0, _useEventCallback.useEventCallback)(control => {
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
  const element = (0, _useRenderElement.useRenderElement)('form', componentProps, {
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
  const clearErrors = (0, _useEventCallback.useEventCallback)(name => {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormContext.FormContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") Form.displayName = "Form";