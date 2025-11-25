'use client';

import * as React from 'react';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { visuallyHidden } from '@base-ui-components/utils/visuallyHidden';
import { useBaseUiId } from "../utils/useBaseUiId.js";
import { contains } from "../floating-ui-react/utils.js";
import { SHIFT } from "../composite/composite.js";
import { CompositeRoot } from "../composite/root/CompositeRoot.js";
import { useFormContext } from "../form/FormContext.js";
import { useField } from "../field/useField.js";
import { useFieldRootContext } from "../field/root/FieldRootContext.js";
import { useFieldControlValidation } from "../field/control/useFieldControlValidation.js";
import { fieldValidityMapping } from "../field/utils/constants.js";
import { mergeProps } from "../merge-props/index.js";
import { RadioGroupContext } from "./RadioGroupContext.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MODIFIER_KEYS = [SHIFT];

/**
 * Provides a shared state to a series of radio buttons.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Radio Group](https://base-ui.com/react/components/radio)
 */
export const RadioGroup = /*#__PURE__*/React.forwardRef(function RadioGroup(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp,
    readOnly,
    required,
    onValueChange: onValueChangeProp,
    value: externalValue,
    defaultValue,
    name: nameProp,
    inputRef: inputRefProp,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    labelId,
    setTouched: setFieldTouched,
    setFocused,
    validationMode,
    name: fieldName,
    disabled: fieldDisabled,
    state: fieldState
  } = useFieldRootContext();
  const fieldControlValidation = useFieldControlValidation();
  const {
    clearErrors
  } = useFormContext();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const id = useBaseUiId(idProp);
  const [checkedValue, setCheckedValueUnwrapped] = useControlled({
    controlled: externalValue,
    default: defaultValue,
    name: 'RadioGroup',
    state: 'value'
  });
  const onValueChange = useEventCallback(onValueChangeProp);
  const setCheckedValue = useEventCallback((value, eventDetails) => {
    onValueChange(value, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setCheckedValueUnwrapped(value);
  });
  const controlRef = React.useRef(null);
  const registerControlRef = useEventCallback(element => {
    if (controlRef.current == null && element != null) {
      controlRef.current = element;
    }
  });
  useField({
    id,
    commitValidation: fieldControlValidation.commitValidation,
    value: checkedValue,
    controlRef,
    name,
    getValue: () => checkedValue ?? null
  });
  const prevValueRef = React.useRef(checkedValue);
  useIsoLayoutEffect(() => {
    if (prevValueRef.current === checkedValue) {
      return;
    }
    clearErrors(name);
    if (validationMode === 'onChange') {
      fieldControlValidation.commitValidation(checkedValue);
    } else {
      fieldControlValidation.commitValidation(checkedValue, true);
    }
  }, [name, clearErrors, validationMode, checkedValue, fieldControlValidation]);
  useIsoLayoutEffect(() => {
    prevValueRef.current = checkedValue;
  }, [checkedValue]);
  const [touched, setTouched] = React.useState(false);
  const onBlur = useEventCallback(event => {
    if (!contains(event.currentTarget, event.relatedTarget)) {
      setFieldTouched(true);
      setFocused(false);
      if (validationMode === 'onBlur') {
        fieldControlValidation.commitValidation(checkedValue);
      }
    }
  });
  const onKeyDownCapture = useEventCallback(event => {
    if (event.key.startsWith('Arrow')) {
      setFieldTouched(true);
      setTouched(true);
      setFocused(true);
    }
  });
  const serializedCheckedValue = React.useMemo(() => {
    if (checkedValue == null) {
      return ''; // avoid uncontrolled -> controlled error
    }
    if (typeof checkedValue === 'string') {
      return checkedValue;
    }
    return JSON.stringify(checkedValue);
  }, [checkedValue]);
  const mergedInputRef = useMergedRefs(fieldControlValidation.inputRef, inputRefProp);
  const inputProps = mergeProps({
    value: serializedCheckedValue,
    ref: mergedInputRef,
    id,
    name: serializedCheckedValue ? name : undefined,
    disabled,
    readOnly,
    required,
    'aria-hidden': true,
    tabIndex: -1,
    style: visuallyHidden,
    onFocus() {
      controlRef.current?.focus();
    }
  }, fieldControlValidation.getInputValidationProps);
  const state = React.useMemo(() => ({
    ...fieldState,
    disabled: disabled ?? false,
    required: required ?? false,
    readOnly: readOnly ?? false
  }), [fieldState, disabled, readOnly, required]);
  const contextValue = React.useMemo(() => ({
    ...fieldState,
    checkedValue,
    disabled,
    name,
    onValueChange,
    readOnly,
    registerControlRef,
    required,
    setCheckedValue,
    setTouched,
    touched
  }), [checkedValue, disabled, fieldState, name, onValueChange, readOnly, registerControlRef, required, setCheckedValue, setTouched, touched]);
  const defaultProps = {
    role: 'radiogroup',
    'aria-required': required || undefined,
    'aria-disabled': disabled || undefined,
    'aria-readonly': readOnly || undefined,
    'aria-labelledby': labelId,
    onFocus() {
      setFocused(true);
    },
    onBlur,
    onKeyDownCapture
  };
  return /*#__PURE__*/_jsxs(RadioGroupContext.Provider, {
    value: contextValue,
    children: [/*#__PURE__*/_jsx(CompositeRoot, {
      render: render,
      className: className,
      state: state,
      props: [defaultProps, fieldControlValidation.getValidationProps, elementProps],
      refs: [forwardedRef],
      customStyleHookMapping: fieldValidityMapping,
      enableHomeAndEndKeys: false,
      modifierKeys: MODIFIER_KEYS,
      stopEventPropagation: true
    }), /*#__PURE__*/_jsx("input", {
      ...inputProps
    })]
  });
});
if (process.env.NODE_ENV !== "production") RadioGroup.displayName = "RadioGroup";