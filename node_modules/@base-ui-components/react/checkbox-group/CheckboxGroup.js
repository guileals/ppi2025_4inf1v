"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxGroup = void 0;
var React = _interopRequireWildcard(require("react"));
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useBaseUiId = require("../utils/useBaseUiId");
var _useRenderElement = require("../utils/useRenderElement");
var _CheckboxGroupContext = require("./CheckboxGroupContext");
var _FieldRootContext = require("../field/root/FieldRootContext");
var _constants = require("../field/utils/constants");
var _useField = require("../field/useField");
var _useFieldControlValidation = require("../field/control/useFieldControlValidation");
var _CheckboxRoot = require("../checkbox/root/CheckboxRoot");
var _useCheckboxGroupParent = require("./useCheckboxGroupParent");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Provides a shared state to a series of checkboxes.
 *
 * Documentation: [Base UI Checkbox Group](https://base-ui.com/react/components/checkbox-group)
 */
const CheckboxGroup = exports.CheckboxGroup = /*#__PURE__*/React.forwardRef(function CheckboxGroup(componentProps, forwardedRef) {
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
  } = (0, _FieldRootContext.useFieldRootContext)();
  const disabled = fieldDisabled || disabledProp;
  const fieldControlValidation = (0, _useFieldControlValidation.useFieldControlValidation)();
  const [value, setValueUnwrapped] = (0, _useControlled.useControlled)({
    controlled: externalValue,
    default: defaultValue,
    name: 'CheckboxGroup',
    state: 'value'
  });
  const setValue = (0, _useEventCallback.useEventCallback)((v, eventDetails) => {
    onValueChange?.(v, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(v);
  });
  const parent = (0, _useCheckboxGroupParent.useCheckboxGroupParent)({
    allValues,
    value: externalValue,
    onValueChange
  });
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  const controlRef = React.useRef(null);
  const registerControlRef = (0, _useEventCallback.useEventCallback)(element => {
    if (controlRef.current == null && element != null && !element.hasAttribute(_CheckboxRoot.PARENT_CHECKBOX)) {
      controlRef.current = element;
    }
  });
  (0, _useField.useField)({
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
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: 'group',
      'aria-labelledby': labelId
    }, elementProps],
    customStyleHookMapping: _constants.fieldValidityMapping
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CheckboxGroupContext.CheckboxGroupContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") CheckboxGroup.displayName = "CheckboxGroup";