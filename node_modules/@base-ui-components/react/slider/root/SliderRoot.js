"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var _owner = require("@base-ui-components/utils/owner");
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _visuallyHidden = require("@base-ui-components/utils/visuallyHidden");
var _warn = require("@base-ui-components/utils/warn");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _useRenderElement = require("../../utils/useRenderElement");
var _clamp = require("../../utils/clamp");
var _areArraysEqual = require("../../utils/areArraysEqual");
var _utils = require("../../floating-ui-react/utils");
var _CompositeList = require("../../composite/list/CompositeList");
var _useField = require("../../field/useField");
var _useFieldControlValidation = require("../../field/control/useFieldControlValidation");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _FormContext = require("../../form/FormContext");
var _asc = require("../utils/asc");
var _getSliderValue = require("../utils/getSliderValue");
var _validateMinimumDistance = require("../utils/validateMinimumDistance");
var _styleHooks = require("./styleHooks");
var _SliderRootContext = require("./SliderRootContext");
var _jsxRuntime = require("react/jsx-runtime");
function areValuesEqual(newValue, oldValue) {
  if (typeof newValue === 'number' && typeof oldValue === 'number') {
    return newValue === oldValue;
  }
  if (Array.isArray(newValue) && Array.isArray(oldValue)) {
    return (0, _areArraysEqual.areArraysEqual)(newValue, oldValue);
  }
  return false;
}

/**
 * Groups all parts of the slider.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
const SliderRoot = exports.SliderRoot = /*#__PURE__*/React.forwardRef(function SliderRoot(componentProps, forwardedRef) {
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
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  const onValueChange = (0, _useEventCallback.useEventCallback)(onValueChangeProp);
  const onValueCommitted = (0, _useEventCallback.useEventCallback)(onValueCommittedProp);
  const {
    clearErrors
  } = (0, _FormContext.useFormContext)();
  const {
    labelId,
    state: fieldState,
    disabled: fieldDisabled,
    name: fieldName,
    setTouched,
    setDirty,
    validityData,
    validationMode
  } = (0, _FieldRootContext.useFieldRootContext)();
  const fieldControlValidation = (0, _useFieldControlValidation.useFieldControlValidation)();
  const ariaLabelledby = ariaLabelledByProp ?? labelId;
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp ?? '';

  // The internal value is potentially unsorted, e.g. to support frozen arrays
  // https://github.com/mui/material-ui/pull/28472
  const [valueUnwrapped, setValueUnwrapped] = (0, _useControlled.useControlled)({
    controlled: valueProp,
    default: defaultValue ?? min,
    name: 'Slider'
  });
  const sliderRef = React.useRef(null);
  const controlRef = React.useRef(null);
  const thumbRefs = React.useRef([]);
  const pressedInputRef = React.useRef(null);
  const inputRef = (0, _useMergedRefs.useMergedRefs)(inputRefProp, fieldControlValidation.inputRef);
  const lastChangedValueRef = React.useRef(null);
  const formatOptionsRef = (0, _useLatestRef.useLatestRef)(format);

  // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transferred when inversing a range slider.
  const [active, setActive] = React.useState(-1);
  const [dragging, setDragging] = React.useState(false);
  const [thumbMap, setThumbMap] = React.useState(() => new Map());
  (0, _useField.useField)({
    id,
    commitValidation: fieldControlValidation.commitValidation,
    value: valueUnwrapped,
    controlRef,
    name,
    getValue: () => valueUnwrapped
  });
  const registerFieldControlRef = (0, _useEventCallback.useEventCallback)(element => {
    if (element) {
      controlRef.current = element;
    }
  });
  const range = Array.isArray(valueUnwrapped);
  const values = React.useMemo(() => {
    if (!range) {
      return [(0, _clamp.clamp)(valueUnwrapped, min, max)];
    }
    return valueUnwrapped.slice().sort(_asc.asc);
  }, [max, min, range, valueUnwrapped]);
  const setValue = (0, _useEventCallback.useEventCallback)((newValue, thumbIndex, event) => {
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
    const details = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', clonedEvent);
    onValueChange(newValue, details, thumbIndex);
    if (details.isCanceled) {
      return;
    }
    setValueUnwrapped(newValue);
    clearErrors(name);
    fieldControlValidation.commitValidation(newValue, true);
  });

  // for keypresses only
  const handleInputChange = (0, _useEventCallback.useEventCallback)((valueInput, index, event) => {
    const newValue = (0, _getSliderValue.getSliderValue)(valueInput, index, min, max, range, values);
    if ((0, _validateMinimumDistance.validateMinimumDistance)(newValue, step, minStepsBetweenValues)) {
      setValue(newValue, index, event.nativeEvent);
      setDirty(newValue !== validityData.initialValue);
      setTouched(true);
      const nextValue = lastChangedValueRef.current ?? newValue;
      onValueCommitted(nextValue, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent));
      clearErrors(name);
      if (validationMode === 'onChange') {
        fieldControlValidation.commitValidation(nextValue ?? newValue);
      } else {
        fieldControlValidation.commitValidation(nextValue ?? newValue, true);
      }
    }
  });
  const handleHiddenInputFocus = (0, _useEventCallback.useEventCallback)(() => {
    // focus the first thumb if the hidden input receives focus
    thumbRefs.current?.[0]?.focus();
  });
  if (process.env.NODE_ENV !== 'production') {
    if (min >= max) {
      (0, _warn.warn)('Slider `max` must be greater than `min`.');
    }
  }
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    const activeEl = (0, _utils.activeElement)((0, _owner.ownerDocument)(sliderRef.current));
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
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: [forwardedRef, sliderRef],
    props: [{
      'aria-labelledby': ariaLabelledby,
      id,
      role: 'group'
    }, fieldControlValidation.getValidationProps, elementProps],
    customStyleHookMapping: _styleHooks.sliderStyleHookMapping
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SliderRootContext.SliderRootContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_CompositeList.CompositeList, {
      elementsRef: thumbRefs,
      onMapChange: setThumbMap,
      children: [element, range ? values.map((value, index) => {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ...fieldControlValidation.getInputValidationProps({
            disabled,
            name,
            ref: inputRef,
            value,
            onFocus: handleHiddenInputFocus,
            style: _visuallyHidden.visuallyHidden,
            tabIndex: -1,
            'aria-hidden': true
          })
        }, `${name}-input-${index}`);
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        ...fieldControlValidation.getInputValidationProps({
          disabled,
          name,
          ref: inputRef,
          value: valueUnwrapped,
          onFocus: handleHiddenInputFocus,
          style: _visuallyHidden.visuallyHidden,
          tabIndex: -1,
          'aria-hidden': true
        })
      })]
    })
  });
});
if (process.env.NODE_ENV !== "production") SliderRoot.displayName = "SliderRoot";