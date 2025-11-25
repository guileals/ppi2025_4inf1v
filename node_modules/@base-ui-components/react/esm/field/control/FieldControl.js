'use client';

import * as React from 'react';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { useFieldRootContext } from "../root/FieldRootContext.js";
import { fieldValidityMapping } from "../utils/constants.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useField } from "../useField.js";
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { useFieldControlValidation } from "./useFieldControlValidation.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";

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
export const FieldControl = /*#__PURE__*/React.forwardRef(function FieldControl(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    name: nameProp,
    value: valueProp,
    disabled: disabledProp = false,
    onValueChange,
    defaultValue,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState,
    name: fieldName,
    disabled: fieldDisabled
  } = useFieldRootContext();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const state = React.useMemo(() => ({
    ...fieldState,
    disabled
  }), [fieldState, disabled]);
  const {
    setControlId,
    labelId,
    setTouched,
    setDirty,
    validityData,
    setFocused,
    setFilled,
    validationMode
  } = useFieldRootContext();
  const {
    getValidationProps,
    getInputValidationProps,
    commitValidation,
    inputRef
  } = useFieldControlValidation();
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    setControlId(id);
    return () => {
      setControlId(undefined);
    };
  }, [id, setControlId]);
  useIsoLayoutEffect(() => {
    const hasExternalValue = valueProp != null;
    if (inputRef.current?.value || hasExternalValue && valueProp !== '') {
      setFilled(true);
    } else if (hasExternalValue && valueProp === '') {
      setFilled(false);
    }
  }, [inputRef, setFilled, valueProp]);
  const [value, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'FieldControl',
    state: 'value'
  });
  const isControlled = valueProp !== undefined;
  const setValue = useEventCallback((nextValue, eventDetails) => {
    onValueChange?.(nextValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(nextValue);
  });
  useField({
    id,
    name,
    commitValidation,
    value,
    getValue: () => inputRef.current?.value,
    controlRef: inputRef
  });
  const element = useRenderElement('input', componentProps, {
    ref: forwardedRef,
    state,
    props: [{
      id,
      disabled,
      name,
      ref: inputRef,
      'aria-labelledby': labelId,
      ...(isControlled ? {
        value
      } : {
        defaultValue
      }),
      onChange(event) {
        const inputValue = event.currentTarget.value;
        setValue(inputValue, createBaseUIEventDetails('none', event.nativeEvent));
        setDirty(inputValue !== validityData.initialValue);
        setFilled(inputValue !== '');
      },
      onFocus() {
        setFocused(true);
      },
      onBlur(event) {
        setTouched(true);
        setFocused(false);
        if (validationMode === 'onBlur') {
          commitValidation(event.currentTarget.value);
        }
      },
      onKeyDown(event) {
        if (event.currentTarget.tagName === 'INPUT' && event.key === 'Enter') {
          setTouched(true);
          commitValidation(event.currentTarget.value);
        }
      }
    }, getValidationProps(), getInputValidationProps(), elementProps],
    customStyleHookMapping: fieldValidityMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") FieldControl.displayName = "FieldControl";