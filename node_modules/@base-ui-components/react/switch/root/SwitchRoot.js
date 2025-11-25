"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _visuallyHidden = require("@base-ui-components/utils/visuallyHidden");
var _useRenderElement = require("../../utils/useRenderElement");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _mergeProps = require("../../merge-props");
var _useButton = require("../../use-button");
var _SwitchRootContext = require("./SwitchRootContext");
var _styleHooks = require("../styleHooks");
var _useField = require("../../field/useField");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _useFieldControlValidation = require("../../field/control/useFieldControlValidation");
var _FormContext = require("../../form/FormContext");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Represents the switch itself.
 * Renders a `<button>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
 */
const SwitchRoot = exports.SwitchRoot = /*#__PURE__*/React.forwardRef(function SwitchRoot(componentProps, forwardedRef) {
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
  } = (0, _FormContext.useFormContext)();
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
  } = (0, _FieldRootContext.useFieldRootContext)();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? elementProps.name;
  const {
    getValidationProps,
    getInputValidationProps,
    inputRef: inputValidationRef,
    commitValidation
  } = (0, _useFieldControlValidation.useFieldControlValidation)();
  const onCheckedChange = (0, _useEventCallback.useEventCallback)(onCheckedChangeProp);
  const inputRef = React.useRef(null);
  const handleInputRef = (0, _useMergedRefs.useMergedRefs)(inputRef, externalInputRef, inputValidationRef);
  const switchRef = React.useRef(null);
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
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
  const [checked, setCheckedState] = (0, _useControlled.useControlled)({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'Switch',
    state: 'checked'
  });
  (0, _useField.useField)({
    id,
    commitValidation,
    value: checked,
    controlRef: switchRef,
    name,
    getValue: () => checked
  });
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (inputRef.current) {
      setFilled(inputRef.current.checked);
    }
  }, [inputRef, setFilled]);
  const {
    getButtonProps,
    buttonRef
  } = (0, _useButton.useButton)({
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
  const inputProps = React.useMemo(() => (0, _mergeProps.mergeProps)({
    checked,
    disabled,
    id: !name ? `${id}-input` : undefined,
    name,
    required,
    style: _visuallyHidden.visuallyHidden,
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
      const eventDetails = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent);
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
  const element = (0, _useRenderElement.useRenderElement)('button', componentProps, {
    state,
    ref: [forwardedRef, switchRef, buttonRef],
    props: [rootProps, getValidationProps, elementProps, getButtonProps],
    customStyleHookMapping: _styleHooks.styleHookMapping
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SwitchRootContext.SwitchRootContext.Provider, {
    value: state,
    children: [element, !checked && elementProps.name && /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      type: "hidden",
      name: elementProps.name,
      value: "off"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ...inputProps
    })]
  });
});
if (process.env.NODE_ENV !== "production") SwitchRoot.displayName = "SwitchRoot";