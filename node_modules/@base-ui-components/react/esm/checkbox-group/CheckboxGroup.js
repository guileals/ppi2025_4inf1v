'use client';

import * as React from 'react';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useBaseUiId } from "../utils/useBaseUiId.js";
import { useRenderElement } from "../utils/useRenderElement.js";
import { CheckboxGroupContext } from "./CheckboxGroupContext.js";
import { useFieldRootContext } from "../field/root/FieldRootContext.js";
import { fieldValidityMapping } from "../field/utils/constants.js";
import { useField } from "../field/useField.js";
import { useFieldControlValidation } from "../field/control/useFieldControlValidation.js";
import { PARENT_CHECKBOX } from "../checkbox/root/CheckboxRoot.js";
import { useCheckboxGroupParent } from "./useCheckboxGroupParent.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Provides a shared state to a series of checkboxes.
 *
 * Documentation: [Base UI Checkbox Group](https://base-ui.com/react/components/checkbox-group)
 */
export const CheckboxGroup = /*#__PURE__*/React.forwardRef(function CheckboxGroup(componentProps, forwardedRef) {
  const {
    allValues,
    className,
    defaultValue,
    disabled: disabledProp = false,
    id: idProp,
    onValueChange,
    render,
    value: externalValue,
    ...elementProps
  } = componentProps;
  const {
    disabled: fieldDisabled,
    labelId,
    name: fieldName,
    state: fieldState
  } = useFieldRootContext();
  const disabled = fieldDisabled || disabledProp;
  const fieldControlValidation = useFieldControlValidation();
  const [value, setValueUnwrapped] = useControlled({
    controlled: externalValue,
    default: defaultValue,
    name: 'CheckboxGroup',
    state: 'value'
  });
  const setValue = useEventCallback((v, eventDetails) => {
    onValueChange?.(v, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(v);
  });
  const parent = useCheckboxGroupParent({
    allValues,
    value: externalValue,
    onValueChange
  });
  const id = useBaseUiId(idProp);
  const controlRef = React.useRef(null);
  const registerControlRef = useEventCallback(element => {
    if (controlRef.current == null && element != null && !element.hasAttribute(PARENT_CHECKBOX)) {
      controlRef.current = element;
    }
  });
  useField({
    enabled: !!fieldName,
    id,
    commitValidation: fieldControlValidation.commitValidation,
    value,
    controlRef,
    name: fieldName,
    getValue: () => value
  });
  const state = React.useMemo(() => ({
    ...fieldState,
    disabled
  }), [fieldState, disabled]);
  const contextValue = React.useMemo(() => ({
    allValues,
    value,
    defaultValue,
    setValue,
    parent,
    disabled,
    fieldControlValidation,
    registerControlRef
  }), [allValues, value, defaultValue, setValue, parent, disabled, fieldControlValidation, registerControlRef]);
  const element = useRenderElement('div', componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: 'group',
      'aria-labelledby': labelId
    }, elementProps],
    customStyleHookMapping: fieldValidityMapping
  });
  return /*#__PURE__*/_jsx(CheckboxGroupContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") CheckboxGroup.displayName = "CheckboxGroup";