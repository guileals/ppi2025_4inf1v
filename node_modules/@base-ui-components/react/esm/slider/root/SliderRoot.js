'use client';

import * as React from 'react';
import { ownerDocument } from '@base-ui-components/utils/owner';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useLatestRef } from '@base-ui-components/utils/useLatestRef';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { visuallyHidden } from '@base-ui-components/utils/visuallyHidden';
import { warn } from '@base-ui-components/utils/warn';
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { clamp } from "../../utils/clamp.js";
import { areArraysEqual } from "../../utils/areArraysEqual.js";
import { activeElement } from "../../floating-ui-react/utils.js";
import { CompositeList } from "../../composite/list/CompositeList.js";
import { useField } from "../../field/useField.js";
import { useFieldControlValidation } from "../../field/control/useFieldControlValidation.js";
import { useFieldRootContext } from "../../field/root/FieldRootContext.js";
import { useFormContext } from "../../form/FormContext.js";
import { asc } from "../utils/asc.js";
import { getSliderValue } from "../utils/getSliderValue.js";
import { validateMinimumDistance } from "../utils/validateMinimumDistance.js";
import { sliderStyleHookMapping } from "./styleHooks.js";
import { SliderRootContext } from "./SliderRootContext.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function areValuesEqual(newValue, oldValue) {
  if (typeof newValue === 'number' && typeof oldValue === 'number') {
    return newValue === oldValue;
  }
  if (Array.isArray(newValue) && Array.isArray(oldValue)) {
    return areArraysEqual(newValue, oldValue);
  }
  return false;
}

/**
 * Groups all parts of the slider.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export const SliderRoot = /*#__PURE__*/React.forwardRef(function SliderRoot(componentProps, forwardedRef) {
  const {
    'aria-labelledby': ariaLabelledByProp,
    className,
    defaultValue,
    disabled: disabledProp = false,
    id: idProp,
    inputRef: inputRefProp,
    format,
    largeStep = 10,
    locale,
    render,
    max = 100,
    min = 0,
    minStepsBetweenValues = 0,
    name: nameProp,
    onValueChange: onValueChangeProp,
    onValueCommitted: onValueCommittedProp,
    orientation = 'horizontal',
    step = 1,
    value: valueProp,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const onValueChange = useEventCallback(onValueChangeProp);
  const onValueCommitted = useEventCallback(onValueCommittedProp);
  const {
    clearErrors
  } = useFormContext();
  const {
    labelId,
    state: fieldState,
    disabled: fieldDisabled,
    name: fieldName,
    setTouched,
    setDirty,
    validityData,
    validationMode
  } = useFieldRootContext();
  const fieldControlValidation = useFieldControlValidation();
  const ariaLabelledby = ariaLabelledByProp ?? labelId;
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp ?? '';

  // The internal value is potentially unsorted, e.g. to support frozen arrays
  // https://github.com/mui/material-ui/pull/28472
  const [valueUnwrapped, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue ?? min,
    name: 'Slider'
  });
  const sliderRef = React.useRef(null);
  const controlRef = React.useRef(null);
  const thumbRefs = React.useRef([]);
  const pressedInputRef = React.useRef(null);
  const inputRef = useMergedRefs(inputRefProp, fieldControlValidation.inputRef);
  const lastChangedValueRef = React.useRef(null);
  const formatOptionsRef = useLatestRef(format);

  // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transferred when inversing a range slider.
  const [active, setActive] = React.useState(-1);
  const [dragging, setDragging] = React.useState(false);
  const [thumbMap, setThumbMap] = React.useState(() => new Map());
  useField({
    id,
    commitValidation: fieldControlValidation.commitValidation,
    value: valueUnwrapped,
    controlRef,
    name,
    getValue: () => valueUnwrapped
  });
  const registerFieldControlRef = useEventCallback(element => {
    if (element) {
      controlRef.current = element;
    }
  });
  const range = Array.isArray(valueUnwrapped);
  const values = React.useMemo(() => {
    if (!range) {
      return [clamp(valueUnwrapped, min, max)];
    }
    return valueUnwrapped.slice().sort(asc);
  }, [max, min, range, valueUnwrapped]);
  const setValue = useEventCallback((newValue, thumbIndex, event) => {
    if (Number.isNaN(newValue) || areValuesEqual(newValue, valueUnwrapped)) {
      return;
    }

    // Redefine target to allow name and value to be read.
    // This allows seamless integration with the most popular form libraries.
    // https://github.com/mui/material-ui/issues/13485#issuecomment-676048492
    // Clone the event to not override `target` of the original event.
    // @ts-expect-error The nativeEvent is function, not object
    const clonedEvent = new event.constructor(event.type, event);
    Object.defineProperty(clonedEvent, 'target', {
      writable: true,
      value: {
        value: newValue,
        name
      }
    });
    lastChangedValueRef.current = newValue;
    const details = createBaseUIEventDetails('none', clonedEvent);
    onValueChange(newValue, details, thumbIndex);
    if (details.isCanceled) {
      return;
    }
    setValueUnwrapped(newValue);
    clearErrors(name);
    fieldControlValidation.commitValidation(newValue, true);
  });

  // for keypresses only
  const handleInputChange = useEventCallback((valueInput, index, event) => {
    const newValue = getSliderValue(valueInput, index, min, max, range, values);
    if (validateMinimumDistance(newValue, step, minStepsBetweenValues)) {
      setValue(newValue, index, event.nativeEvent);
      setDirty(newValue !== validityData.initialValue);
      setTouched(true);
      const nextValue = lastChangedValueRef.current ?? newValue;
      onValueCommitted(nextValue, createBaseUIEventDetails('none', event.nativeEvent));
      clearErrors(name);
      if (validationMode === 'onChange') {
        fieldControlValidation.commitValidation(nextValue ?? newValue);
      } else {
        fieldControlValidation.commitValidation(nextValue ?? newValue, true);
      }
    }
  });
  const handleHiddenInputFocus = useEventCallback(() => {
    // focus the first thumb if the hidden input receives focus
    thumbRefs.current?.[0]?.focus();
  });
  if (process.env.NODE_ENV !== 'production') {
    if (min >= max) {
      warn('Slider `max` must be greater than `min`.');
    }
  }
  useIsoLayoutEffect(() => {
    const activeEl = activeElement(ownerDocument(sliderRef.current));
    if (disabled && activeEl && sliderRef.current?.contains(activeEl)) {
      // This is necessary because Firefox and Safari will keep focus
      // on a disabled element:
      // https://codesandbox.io/p/sandbox/mui-pr-22247-forked-h151h?file=/src/App.js
      activeEl.blur();
    }
  }, [disabled]);
  if (disabled && active !== -1) {
    setActive(-1);
  }
  const state = React.useMemo(() => ({
    ...fieldState,
    activeThumbIndex: active,
    disabled,
    dragging,
    orientation,
    max,
    min,
    minStepsBetweenValues,
    step,
    values
  }), [fieldState, active, disabled, dragging, max, min, minStepsBetweenValues, orientation, step, values]);
  const contextValue = React.useMemo(() => ({
    active,
    disabled,
    dragging,
    fieldControlValidation,
    pressedInputRef,
    formatOptionsRef,
    handleInputChange,
    labelId: ariaLabelledby,
    largeStep,
    lastChangedValueRef,
    locale,
    max,
    min,
    minStepsBetweenValues,
    onValueCommitted,
    orientation,
    range,
    registerFieldControlRef,
    setActive,
    setDragging,
    setValue,
    state,
    step,
    thumbMap,
    thumbRefs,
    values
  }), [active, ariaLabelledby, disabled, dragging, fieldControlValidation, pressedInputRef, formatOptionsRef, handleInputChange, largeStep, lastChangedValueRef, locale, max, min, minStepsBetweenValues, onValueCommitted, orientation, range, registerFieldControlRef, setActive, setDragging, setValue, state, step, thumbMap, thumbRefs, values]);
  const element = useRenderElement('div', componentProps, {
    state,
    ref: [forwardedRef, sliderRef],
    props: [{
      'aria-labelledby': ariaLabelledby,
      id,
      role: 'group'
    }, fieldControlValidation.getValidationProps, elementProps],
    customStyleHookMapping: sliderStyleHookMapping
  });
  return /*#__PURE__*/_jsx(SliderRootContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/_jsxs(CompositeList, {
      elementsRef: thumbRefs,
      onMapChange: setThumbMap,
      children: [element, range ? values.map((value, index) => {
        return /*#__PURE__*/_jsx("input", {
          ...fieldControlValidation.getInputValidationProps({
            disabled,
            name,
            ref: inputRef,
            value,
            onFocus: handleHiddenInputFocus,
            style: visuallyHidden,
            tabIndex: -1,
            'aria-hidden': true
          })
        }, `${name}-input-${index}`);
      }) : /*#__PURE__*/_jsx("input", {
        ...fieldControlValidation.getInputValidationProps({
          disabled,
          name,
          ref: inputRef,
          value: valueUnwrapped,
          onFocus: handleHiddenInputFocus,
          style: visuallyHidden,
          tabIndex: -1,
          'aria-hidden': true
        })
      })]
    })
  });
});
if (process.env.NODE_ENV !== "production") SliderRoot.displayName = "SliderRoot";