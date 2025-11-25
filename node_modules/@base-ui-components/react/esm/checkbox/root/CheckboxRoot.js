'use client';

import * as React from 'react';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { visuallyHidden } from '@base-ui-components/utils/visuallyHidden';
import { useCustomStyleHookMapping } from "../utils/useCustomStyleHookMapping.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { mergeProps } from "../../merge-props/index.js";
import { useButton } from "../../use-button/useButton.js";
import { useFieldRootContext } from "../../field/root/FieldRootContext.js";
import { useFieldControlValidation } from "../../field/control/useFieldControlValidation.js";
import { useField } from "../../field/useField.js";
import { useFormContext } from "../../form/FormContext.js";
import { useCheckboxGroupContext } from "../../checkbox-group/CheckboxGroupContext.js";
import { CheckboxRootContext } from "./CheckboxRootContext.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY = {};
export const PARENT_CHECKBOX = 'data-parent';

/**
 * Represents the checkbox itself.
 * Renders a `<button>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Checkbox](https://base-ui.com/react/components/checkbox)
 */
export const CheckboxRoot = /*#__PURE__*/React.forwardRef(function CheckboxRoot(componentProps, forwardedRef) {
  const {
    checked: checkedProp,
    className,
    defaultChecked = false,
    disabled: disabledProp = false,
    id: idProp,
    indeterminate = false,
    inputRef: inputRefProp,
    name: nameProp,
    onCheckedChange: onCheckedChangeProp,
    parent = false,
    readOnly = false,
    render,
    required = false,
    value: valueProp,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const {
    clearErrors
  } = useFormContext();
  const {
    disabled: fieldDisabled,
    labelId,
    name: fieldName,
    setControlId,
    setDirty,
    setFilled,
    setFocused,
    setTouched,
    state: fieldState,
    validationMode,
    validityData
  } = useFieldRootContext();
  const groupContext = useCheckboxGroupContext();
  const parentContext = groupContext?.parent;
  const isGrouped = parentContext && groupContext.allValues;
  const disabled = fieldDisabled || groupContext?.disabled || disabledProp;
  const name = fieldName ?? nameProp;
  const value = valueProp ?? name;
  let groupProps = {};
  if (isGrouped) {
    if (parent) {
      groupProps = groupContext.parent.getParentProps();
    } else if (value) {
      groupProps = groupContext.parent.getChildProps(value);
    }
  }
  const onCheckedChange = useEventCallback(onCheckedChangeProp);
  const {
    checked: groupChecked = checkedProp,
    indeterminate: groupIndeterminate = indeterminate,
    onCheckedChange: groupOnChange,
    ...otherGroupProps
  } = groupProps;
  const groupValue = groupContext?.value;
  const setGroupValue = groupContext?.setValue;
  const defaultGroupValue = groupContext?.defaultValue;
  const controlRef = React.useRef(null);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const localFieldControlValidation = useFieldControlValidation();
  const fieldControlValidation = groupContext?.fieldControlValidation ?? localFieldControlValidation;
  const [checked, setCheckedState] = useControlled({
    controlled: value && groupValue && !parent ? groupValue.includes(value) : groupChecked,
    default: value && defaultGroupValue && !parent ? defaultGroupValue.includes(value) : defaultChecked,
    name: 'Checkbox',
    state: 'checked'
  });
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    const element = controlRef?.current;
    if (!element) {
      return undefined;
    }
    if (groupContext) {
      setControlId(idProp ?? null);
    } else if (element.closest('label') == null) {
      setControlId(id);
    }
    return () => {
      setControlId(undefined);
    };
  }, [groupContext, id, idProp, setControlId]);
  useField({
    enabled: !groupContext,
    id,
    commitValidation: fieldControlValidation.commitValidation,
    value: checked,
    controlRef,
    name,
    getValue: () => checked
  });
  const inputRef = React.useRef(null);
  const mergedInputRef = useMergedRefs(inputRefProp, inputRef, fieldControlValidation.inputRef);
  useIsoLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = groupIndeterminate;
      if (checked) {
        setFilled(true);
      }
    }
  }, [checked, groupIndeterminate, setFilled]);
  const onFocus = useEventCallback(() => setFocused(true));
  const onBlur = useEventCallback(() => {
    const element = inputRef.current;
    if (!element) {
      return;
    }
    setTouched(true);
    setFocused(false);
    if (validationMode === 'onBlur') {
      fieldControlValidation.commitValidation(groupContext ? groupValue : element.checked);
    }
  });
  const onClick = useEventCallback(event => {
    if (event.defaultPrevented || readOnly) {
      return;
    }
    event.preventDefault();
    inputRef.current?.click();
  });
  const inputProps = mergeProps({
    checked,
    disabled,
    // parent checkboxes unset `name` to be excluded from form submission
    name: parent ? undefined : name,
    // Set `id` to stop Chrome warning about an unassociated input
    id: `${id}-input`,
    required,
    ref: mergedInputRef,
    style: visuallyHidden,
    tabIndex: -1,
    type: 'checkbox',
    'aria-hidden': true,
    onChange(event) {
      // Workaround for https://github.com/facebook/react/issues/9023
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      const nextChecked = event.target.checked;
      const details = createBaseUIEventDetails('none', event.nativeEvent);
      groupOnChange?.(nextChecked, details);
      onCheckedChange(nextChecked, details);
      if (details.isCanceled) {
        return;
      }
      clearErrors(name);
      setDirty(nextChecked !== validityData.initialValue);
      setCheckedState(nextChecked);
      if (!groupContext) {
        setFilled(nextChecked);
        if (validationMode === 'onChange') {
          fieldControlValidation.commitValidation(nextChecked);
        } else {
          fieldControlValidation.commitValidation(nextChecked, true);
        }
      }
      if (value && groupValue && setGroupValue && !parent) {
        const nextGroupValue = nextChecked ? [...groupValue, value] : groupValue.filter(item => item !== value);
        setGroupValue(nextGroupValue, details);
        setFilled(nextGroupValue.length > 0);
        if (validationMode === 'onChange') {
          fieldControlValidation.commitValidation(nextGroupValue);
        } else {
          fieldControlValidation.commitValidation(nextGroupValue, true);
        }
      }
    },
    onFocus() {
      controlRef.current?.focus();
    }
  },
  // React <19 sets an empty value if `undefined` is passed explicitly
  // To avoid this, we only set the value if it's defined
  valueProp !== undefined ? {
    value: (groupContext ? checked && valueProp : valueProp) || ''
  } : EMPTY, groupContext ? fieldControlValidation.getValidationProps : fieldControlValidation.getInputValidationProps);
  const computedChecked = isGrouped ? Boolean(groupChecked) : checked;
  const computedIndeterminate = isGrouped ? groupIndeterminate || indeterminate : indeterminate;
  React.useEffect(() => {
    if (parentContext && value) {
      parentContext.disabledStatesRef.current.set(value, disabled);
    }
  }, [parentContext, disabled, value]);
  const state = React.useMemo(() => ({
    ...fieldState,
    checked: computedChecked,
    disabled,
    readOnly,
    required,
    indeterminate: computedIndeterminate
  }), [fieldState, computedChecked, disabled, readOnly, required, computedIndeterminate]);
  const customStyleHookMapping = useCustomStyleHookMapping(state);
  const element = useRenderElement('button', componentProps, {
    state,
    ref: [buttonRef, controlRef, forwardedRef, groupContext?.registerControlRef],
    props: [{
      id,
      role: 'checkbox',
      disabled,
      'aria-checked': groupIndeterminate ? 'mixed' : checked,
      'aria-readonly': readOnly || undefined,
      'aria-required': required || undefined,
      'aria-labelledby': labelId,
      [PARENT_CHECKBOX]: parent ? '' : undefined,
      onFocus,
      onBlur,
      onClick
    }, fieldControlValidation.getValidationProps, elementProps, otherGroupProps, getButtonProps],
    customStyleHookMapping
  });
  return /*#__PURE__*/_jsxs(CheckboxRootContext.Provider, {
    value: state,
    children: [element, !checked && !groupContext && componentProps.name && !parent && /*#__PURE__*/_jsx("input", {
      type: "hidden",
      name: componentProps.name,
      value: "off"
    }), /*#__PURE__*/_jsx("input", {
      ...inputProps
    })]
  });
});
if (process.env.NODE_ENV !== "production") CheckboxRoot.displayName = "CheckboxRoot";