'use client';

import * as React from 'react';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { FieldRootContext } from "./FieldRootContext.js";
import { DEFAULT_VALIDITY_STATE, fieldValidityMapping } from "../utils/constants.js";
import { useFieldsetRootContext } from "../../fieldset/root/FieldsetRootContext.js";
import { useFormContext } from "../../form/FormContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";

/**
 * Groups all parts of the field.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const FieldRoot = /*#__PURE__*/React.forwardRef(function FieldRoot(componentProps, forwardedRef) {
  const {
    render,
    className,
    validate: validateProp,
    validationDebounceTime = 0,
    validationMode = 'onBlur',
    name,
    disabled: disabledProp = false,
    invalid: invalidProp,
    ...elementProps
  } = componentProps;
  const {
    disabled: disabledFieldset
  } = useFieldsetRootContext();
  const {
    errors
  } = useFormContext();
  const validate = useEventCallback(validateProp || (() => null));
  const disabled = disabledFieldset || disabledProp;
  const [controlId, setControlId] = React.useState(undefined);
  const [labelId, setLabelId] = React.useState(undefined);
  const [messageIds, setMessageIds] = React.useState([]);
  const [touched, setTouched] = React.useState(false);
  const [dirty, setDirtyUnwrapped] = React.useState(false);
  const [filled, setFilled] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const markedDirtyRef = React.useRef(false);
  const setDirty = React.useCallback(value => {
    if (value) {
      markedDirtyRef.current = true;
    }
    setDirtyUnwrapped(value);
  }, []);
  const invalid = Boolean(invalidProp || name && {}.hasOwnProperty.call(errors, name) && errors[name] !== undefined);
  const [validityData, setValidityData] = React.useState({
    state: DEFAULT_VALIDITY_STATE,
    error: '',
    errors: [],
    value: null,
    initialValue: null
  });
  const valid = !invalid && validityData.state.valid;
  const state = React.useMemo(() => ({
    disabled,
    touched,
    dirty,
    valid,
    filled,
    focused
  }), [disabled, touched, dirty, valid, filled, focused]);
  const contextValue = React.useMemo(() => ({
    invalid,
    controlId,
    setControlId,
    labelId,
    setLabelId,
    messageIds,
    setMessageIds,
    name,
    validityData,
    setValidityData,
    disabled,
    touched,
    setTouched,
    dirty,
    setDirty,
    filled,
    setFilled,
    focused,
    setFocused,
    validate,
    validationMode,
    validationDebounceTime,
    state,
    markedDirtyRef
  }), [invalid, controlId, labelId, messageIds, name, validityData, disabled, touched, dirty, setDirty, filled, setFilled, focused, setFocused, validate, validationMode, validationDebounceTime, state]);
  const element = useRenderElement('div', componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    customStyleHookMapping: fieldValidityMapping
  });
  return /*#__PURE__*/_jsx(FieldRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") FieldRoot.displayName = "FieldRoot";