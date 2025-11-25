"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioGroup = void 0;
var React = _interopRequireWildcard(require("react"));
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _visuallyHidden = require("@base-ui-components/utils/visuallyHidden");
var _useBaseUiId = require("../utils/useBaseUiId");
var _utils = require("../floating-ui-react/utils");
var _composite = require("../composite/composite");
var _CompositeRoot = require("../composite/root/CompositeRoot");
var _FormContext = require("../form/FormContext");
var _useField = require("../field/useField");
var _FieldRootContext = require("../field/root/FieldRootContext");
var _useFieldControlValidation = require("../field/control/useFieldControlValidation");
var _constants = require("../field/utils/constants");
var _mergeProps = require("../merge-props");
var _RadioGroupContext = require("./RadioGroupContext");
var _jsxRuntime = require("react/jsx-runtime");
const MODIFIER_KEYS = [_composite.SHIFT];

/**
 * Provides a shared state to a series of radio buttons.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Radio Group](https://base-ui.com/react/components/radio)
 */
const RadioGroup = exports.RadioGroup = /*#__PURE__*/React.forwardRef(function RadioGroup(componentProps, forwardedRef) {
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
  } = (0, _FieldRootContext.useFieldRootContext)();
  const fieldControlValidation = (0, _useFieldControlValidation.useFieldControlValidation)();
  const {
    clearErrors
  } = (0, _FormContext.useFormContext)();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  const [checkedValue, setCheckedValueUnwrapped] = (0, _useControlled.useControlled)({
    controlled: externalValue,
    default: defaultValue,
    name: 'RadioGroup',
    state: 'value'
  });
  const onValueChange = (0, _useEventCallback.useEventCallback)(onValueChangeProp);
  const setCheckedValue = (0, _useEventCallback.useEventCallback)((value, eventDetails) => {
    onValueChange(value, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setCheckedValueUnwrapped(value);
  });
  const controlRef = React.useRef(null);
  const registerControlRef = (0, _useEventCallback.useEventCallback)(element => {
    if (controlRef.current == null && element != null) {
      controlRef.current = element;
    }
  });
  (0, _useField.useField)({
    id,
    commitValidation: fieldControlValidation.commitValidation,
    value: checkedValue,
    controlRef,
    name,
    getValue: () => checkedValue ?? null
  });
  const prevValueRef = React.useRef(checkedValue);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
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
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    prevValueRef.current = checkedValue;
  }, [checkedValue]);
  const [touched, setTouched] = React.useState(false);
  const onBlur = (0, _useEventCallback.useEventCallback)(event => {
    if (!(0, _utils.contains)(event.currentTarget, event.relatedTarget)) {
      setFieldTouched(true);
      setFocused(false);
      if (validationMode === 'onBlur') {
        fieldControlValidation.commitValidation(checkedValue);
      }
    }
  });
  const onKeyDownCapture = (0, _useEventCallback.useEventCallback)(event => {
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
  const mergedInputRef = (0, _useMergedRefs.useMergedRefs)(fieldControlValidation.inputRef, inputRefProp);
  const inputProps = (0, _mergeProps.mergeProps)({
    value: serializedCheckedValue,
    ref: mergedInputRef,
    id,
    name: serializedCheckedValue ? name : undefined,
    disabled,
    readOnly,
    required,
    'aria-hidden': true,
    tabIndex: -1,
    style: _visuallyHidden.visuallyHidden,
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RadioGroupContext.RadioGroupContext.Provider, {
    value: contextValue,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeRoot.CompositeRoot, {
      render: render,
      className: className,
      state: state,
      props: [defaultProps, fieldControlValidation.getValidationProps, elementProps],
      refs: [forwardedRef],
      customStyleHookMapping: _constants.fieldValidityMapping,
      enableHomeAndEndKeys: false,
      modifierKeys: MODIFIER_KEYS,
      stopEventPropagation: true
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ...inputProps
    })]
  });
});
if (process.env.NODE_ENV !== "production") RadioGroup.displayName = "RadioGroup";