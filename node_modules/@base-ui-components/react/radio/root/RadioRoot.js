"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _visuallyHidden = require("@base-ui-components/utils/visuallyHidden");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _noop = require("../../utils/noop");
var _useRenderElement = require("../../utils/useRenderElement");
var _useButton = require("../../use-button");
var _constants = require("../../composite/constants");
var _CompositeItem = require("../../composite/item/CompositeItem");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _customStyleHookMapping = require("../utils/customStyleHookMapping");
var _RadioGroupContext = require("../../radio-group/RadioGroupContext");
var _RadioRootContext = require("./RadioRootContext");
var _constants2 = require("../../utils/constants");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Represents the radio button itself.
 * Renders a `<button>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Radio](https://base-ui.com/react/components/radio)
 */
const RadioRoot = exports.RadioRoot = /*#__PURE__*/React.forwardRef(function RadioRoot(componentProps, forwardedRef) {
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
  } = (0, _RadioGroupContext.useRadioGroupContext)();
  const {
    state: fieldState,
    disabled: fieldDisabled
  } = (0, _FieldRootContext.useFieldRootContext)();
  const disabled = fieldDisabled || disabledRoot || disabledProp;
  const readOnly = readOnlyRoot || readOnlyProp;
  const required = requiredRoot || requiredProp;
  const {
    setDirty,
    validityData,
    setTouched: setFieldTouched,
    setFilled
  } = (0, _FieldRootContext.useFieldRootContext)();
  const checked = checkedValue === value;
  const inputRef = React.useRef(null);
  const ref = (0, _useMergedRefs.useMergedRefs)(inputRefProp, inputRef);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
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
    [_constants.ACTIVE_COMPOSITE_ITEM]: checked ? '' : undefined,
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
  } = (0, _useButton.useButton)({
    disabled,
    native: nativeButton
  });
  const id = (0, _useBaseUiId.useBaseUiId)();
  const inputProps = React.useMemo(() => ({
    type: 'radio',
    ref,
    // Set `id` to stop Chrome warning about an unassociated input
    id,
    tabIndex: -1,
    style: _visuallyHidden.visuallyHidden,
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
      const details = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent);
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
  const isRadioGroup = setCheckedValue !== _noop.NOOP;
  const refs = [forwardedRef, registerControlRef, buttonRef];
  const props = [rootProps, fieldControlValidation?.getValidationProps ?? _constants2.EMPTY_OBJECT, elementProps, getButtonProps];
  const element = (0, _useRenderElement.useRenderElement)('button', componentProps, {
    enabled: !isRadioGroup,
    state,
    ref: refs,
    props,
    customStyleHookMapping: _customStyleHookMapping.customStyleHookMapping
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RadioRootContext.RadioRootContext.Provider, {
    value: contextValue,
    children: [isRadioGroup ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeItem.CompositeItem, {
      tag: "button",
      render: render,
      className: className,
      state: state,
      refs: refs,
      props: props,
      customStyleHookMapping: _customStyleHookMapping.customStyleHookMapping
    }) : element, /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ...inputProps
    })]
  });
});
if (process.env.NODE_ENV !== "production") RadioRoot.displayName = "RadioRoot";