'use client';

import * as React from 'react';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { visuallyHidden } from '@base-ui-components/utils/visuallyHidden';
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { NOOP } from "../../utils/noop.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useButton } from "../../use-button/index.js";
import { ACTIVE_COMPOSITE_ITEM } from "../../composite/constants.js";
import { CompositeItem } from "../../composite/item/CompositeItem.js";
import { useFieldRootContext } from "../../field/root/FieldRootContext.js";
import { customStyleHookMapping } from "../utils/customStyleHookMapping.js";
import { useRadioGroupContext } from "../../radio-group/RadioGroupContext.js";
import { RadioRootContext } from "./RadioRootContext.js";
import { EMPTY_OBJECT } from "../../utils/constants.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";

/**
 * Represents the radio button itself.
 * Renders a `<button>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Radio](https://base-ui.com/react/components/radio)
 */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const RadioRoot = /*#__PURE__*/React.forwardRef(function RadioRoot(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp = false,
    readOnly: readOnlyProp = false,
    required: requiredProp = false,
    value,
    inputRef: inputRefProp,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const {
    disabled: disabledRoot,
    readOnly: readOnlyRoot,
    required: requiredRoot,
    checkedValue,
    setCheckedValue,
    touched,
    setTouched,
    fieldControlValidation,
    registerControlRef
  } = useRadioGroupContext();
  const {
    state: fieldState,
    disabled: fieldDisabled
  } = useFieldRootContext();
  const disabled = fieldDisabled || disabledRoot || disabledProp;
  const readOnly = readOnlyRoot || readOnlyProp;
  const required = requiredRoot || requiredProp;
  const {
    setDirty,
    validityData,
    setTouched: setFieldTouched,
    setFilled
  } = useFieldRootContext();
  const checked = checkedValue === value;
  const inputRef = React.useRef(null);
  const ref = useMergedRefs(inputRefProp, inputRef);
  useIsoLayoutEffect(() => {
    if (inputRef.current?.checked) {
      setFilled(true);
    }
  }, [setFilled]);
  const rootProps = React.useMemo(() => ({
    role: 'radio',
    'aria-checked': checked,
    'aria-required': required || undefined,
    'aria-disabled': disabled || undefined,
    'aria-readonly': readOnly || undefined,
    [ACTIVE_COMPOSITE_ITEM]: checked ? '' : undefined,
    disabled,
    onKeyDown(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    },
    onClick(event) {
      if (event.defaultPrevented || disabled || readOnly) {
        return;
      }
      event.preventDefault();
      inputRef.current?.click();
    },
    onFocus(event) {
      if (event.defaultPrevented || disabled || readOnly || !touched) {
        return;
      }
      inputRef.current?.click();
      setTouched(false);
    }
  }), [checked, required, disabled, readOnly, touched, setTouched]);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const id = useBaseUiId();
  const inputProps = React.useMemo(() => ({
    type: 'radio',
    ref,
    // Set `id` to stop Chrome warning about an unassociated input
    id,
    tabIndex: -1,
    style: visuallyHidden,
    'aria-hidden': true,
    disabled,
    checked,
    required,
    readOnly,
    onChange(event) {
      // Workaround for https://github.com/facebook/react/issues/9023
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      if (disabled || readOnly || value === undefined) {
        return;
      }
      const details = createBaseUIEventDetails('none', event.nativeEvent);
      if (details.isCanceled) {
        return;
      }
      setFieldTouched(true);
      setDirty(value !== validityData.initialValue);
      setFilled(true);
      setCheckedValue(value, details);
    }
  }), [checked, disabled, id, readOnly, ref, required, setCheckedValue, setDirty, setFieldTouched, setFilled, validityData.initialValue, value]);
  const state = React.useMemo(() => ({
    ...fieldState,
    required,
    disabled,
    readOnly,
    checked
  }), [fieldState, disabled, readOnly, checked, required]);
  const contextValue = React.useMemo(() => state, [state]);
  const isRadioGroup = setCheckedValue !== NOOP;
  const refs = [forwardedRef, registerControlRef, buttonRef];
  const props = [rootProps, fieldControlValidation?.getValidationProps ?? EMPTY_OBJECT, elementProps, getButtonProps];
  const element = useRenderElement('button', componentProps, {
    enabled: !isRadioGroup,
    state,
    ref: refs,
    props,
    customStyleHookMapping
  });
  return /*#__PURE__*/_jsxs(RadioRootContext.Provider, {
    value: contextValue,
    children: [isRadioGroup ? /*#__PURE__*/_jsx(CompositeItem, {
      tag: "button",
      render: render,
      className: className,
      state: state,
      refs: refs,
      props: props,
      customStyleHookMapping: customStyleHookMapping
    }) : element, /*#__PURE__*/_jsx("input", {
      ...inputProps
    })]
  });
});
if (process.env.NODE_ENV !== "production") RadioRoot.displayName = "RadioRoot";