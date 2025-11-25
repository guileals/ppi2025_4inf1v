'use client';

import * as React from 'react';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { visuallyHidden } from '@base-ui-components/utils/visuallyHidden';
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { mergeProps } from "../../merge-props/index.js";
import { useButton } from "../../use-button/index.js";
import { SwitchRootContext } from "./SwitchRootContext.js";
import { styleHookMapping } from "../styleHooks.js";
import { useField } from "../../field/useField.js";
import { useFieldRootContext } from "../../field/root/FieldRootContext.js";
import { useFieldControlValidation } from "../../field/control/useFieldControlValidation.js";
import { useFormContext } from "../../form/FormContext.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";

/**
 * Represents the switch itself.
 * Renders a `<button>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
 */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const SwitchRoot = /*#__PURE__*/React.forwardRef(function SwitchRoot(componentProps, forwardedRef) {
  const {
    checked: checkedProp,
    className,
    defaultChecked,
    id: idProp,
    inputRef: externalInputRef,
    nativeButton = true,
    onCheckedChange: onCheckedChangeProp,
    readOnly = false,
    required = false,
    disabled: disabledProp = false,
    render,
    ...elementProps
  } = componentProps;
  const {
    clearErrors
  } = useFormContext();
  const {
    state: fieldState,
    labelId,
    setControlId,
    setTouched,
    setDirty,
    validityData,
    setFilled,
    setFocused,
    validationMode,
    disabled: fieldDisabled,
    name: fieldName
  } = useFieldRootContext();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? elementProps.name;
  const {
    getValidationProps,
    getInputValidationProps,
    inputRef: inputValidationRef,
    commitValidation
  } = useFieldControlValidation();
  const onCheckedChange = useEventCallback(onCheckedChangeProp);
  const inputRef = React.useRef(null);
  const handleInputRef = useMergedRefs(inputRef, externalInputRef, inputValidationRef);
  const switchRef = React.useRef(null);
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    const element = switchRef.current;
    if (!element) {
      return undefined;
    }
    if (element.closest('label') != null) {
      setControlId(idProp ?? null);
    } else {
      setControlId(id);
    }
    return () => {
      setControlId(undefined);
    };
  }, [id, idProp, setControlId]);
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'Switch',
    state: 'checked'
  });
  useField({
    id,
    commitValidation,
    value: checked,
    controlRef: switchRef,
    name,
    getValue: () => checked
  });
  useIsoLayoutEffect(() => {
    if (inputRef.current) {
      setFilled(inputRef.current.checked);
    }
  }, [inputRef, setFilled]);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const rootProps = React.useMemo(() => ({
    id,
    role: 'switch',
    disabled,
    'aria-checked': checked,
    'aria-readonly': readOnly || undefined,
    'aria-labelledby': labelId,
    onFocus() {
      setFocused(true);
    },
    onBlur() {
      const element = inputRef.current;
      if (!element) {
        return;
      }
      setTouched(true);
      setFocused(false);
      if (validationMode === 'onBlur') {
        commitValidation(element.checked);
      }
    },
    onClick(event) {
      if (event.defaultPrevented || readOnly) {
        return;
      }
      inputRef?.current?.click();
    }
  }), [id, disabled, checked, readOnly, labelId, setFocused, setTouched, commitValidation, validationMode, inputRef]);
  const inputProps = React.useMemo(() => mergeProps({
    checked,
    disabled,
    id: !name ? `${id}-input` : undefined,
    name,
    required,
    style: visuallyHidden,
    tabIndex: -1,
    type: 'checkbox',
    'aria-hidden': true,
    ref: handleInputRef,
    onChange(event) {
      // Workaround for https://github.com/facebook/react/issues/9023
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      const nextChecked = event.target.checked;
      const eventDetails = createBaseUIEventDetails('none', event.nativeEvent);
      onCheckedChange?.(nextChecked, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      clearErrors(name);
      setDirty(nextChecked !== validityData.initialValue);
      setFilled(nextChecked);
      setCheckedState(nextChecked);
      if (validationMode === 'onChange') {
        commitValidation(nextChecked);
      } else {
        commitValidation(nextChecked, true);
      }
    }
  }, getInputValidationProps), [checked, clearErrors, commitValidation, disabled, getInputValidationProps, handleInputRef, id, name, onCheckedChange, required, setCheckedState, setDirty, setFilled, validationMode, validityData.initialValue]);
  const state = React.useMemo(() => ({
    ...fieldState,
    checked,
    disabled,
    readOnly,
    required
  }), [fieldState, checked, disabled, readOnly, required]);
  const element = useRenderElement('button', componentProps, {
    state,
    ref: [forwardedRef, switchRef, buttonRef],
    props: [rootProps, getValidationProps, elementProps, getButtonProps],
    customStyleHookMapping: styleHookMapping
  });
  return /*#__PURE__*/_jsxs(SwitchRootContext.Provider, {
    value: state,
    children: [element, !checked && elementProps.name && /*#__PURE__*/_jsx("input", {
      type: "hidden",
      name: elementProps.name,
      value: "off"
    }), /*#__PURE__*/_jsx("input", {
      ...inputProps
    })]
  });
});
if (process.env.NODE_ENV !== "production") SwitchRoot.displayName = "SwitchRoot";