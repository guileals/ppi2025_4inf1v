"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PARENT_CHECKBOX = exports.CheckboxRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _visuallyHidden = require("@base-ui-components/utils/visuallyHidden");
var _useCustomStyleHookMapping = require("../utils/useCustomStyleHookMapping");
var _useRenderElement = require("../../utils/useRenderElement");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _mergeProps = require("../../merge-props");
var _useButton = require("../../use-button/useButton");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _useFieldControlValidation = require("../../field/control/useFieldControlValidation");
var _useField = require("../../field/useField");
var _FormContext = require("../../form/FormContext");
var _CheckboxGroupContext = require("../../checkbox-group/CheckboxGroupContext");
var _CheckboxRootContext = require("./CheckboxRootContext");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
const EMPTY = {};
const PARENT_CHECKBOX = exports.PARENT_CHECKBOX = 'data-parent';

/**
 * Represents the checkbox itself.
 * Renders a `<button>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Checkbox](https://base-ui.com/react/components/checkbox)
 */
const CheckboxRoot = exports.CheckboxRoot = /*#__PURE__*/React.forwardRef(function CheckboxRoot(componentProps, forwardedRef) {
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
  } = (0, _FormContext.useFormContext)();
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
  } = (0, _FieldRootContext.useFieldRootContext)();
  const groupContext = (0, _CheckboxGroupContext.useCheckboxGroupContext)();
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
  const onCheckedChange = (0, _useEventCallback.useEventCallback)(onCheckedChangeProp);
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
  } = (0, _useButton.useButton)({
    disabled,
    native: nativeButton
  });
  const localFieldControlValidation = (0, _useFieldControlValidation.useFieldControlValidation)();
  const fieldControlValidation = groupContext?.fieldControlValidation ?? localFieldControlValidation;
  const [checked, setCheckedState] = (0, _useControlled.useControlled)({
    controlled: value && groupValue && !parent ? groupValue.includes(value) : groupChecked,
    default: value && defaultGroupValue && !parent ? defaultGroupValue.includes(value) : defaultChecked,
    name: 'Checkbox',
    state: 'checked'
  });
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
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
  (0, _useField.useField)({
    enabled: !groupContext,
    id,
    commitValidation: fieldControlValidation.commitValidation,
    value: checked,
    controlRef,
    name,
    getValue: () => checked
  });
  const inputRef = React.useRef(null);
  const mergedInputRef = (0, _useMergedRefs.useMergedRefs)(inputRefProp, inputRef, fieldControlValidation.inputRef);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = groupIndeterminate;
      if (checked) {
        setFilled(true);
      }
    }
  }, [checked, groupIndeterminate, setFilled]);
  const onFocus = (0, _useEventCallback.useEventCallback)(() => setFocused(true));
  const onBlur = (0, _useEventCallback.useEventCallback)(() => {
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
  const onClick = (0, _useEventCallback.useEventCallback)(event => {
    if (event.defaultPrevented || readOnly) {
      return;
    }
    event.preventDefault();
    inputRef.current?.click();
  });
  const inputProps = (0, _mergeProps.mergeProps)({
    checked,
    disabled,
    // parent checkboxes unset `name` to be excluded from form submission
    name: parent ? undefined : name,
    // Set `id` to stop Chrome warning about an unassociated input
    id: `${id}-input`,
    required,
    ref: mergedInputRef,
    style: _visuallyHidden.visuallyHidden,
    tabIndex: -1,
    type: 'checkbox',
    'aria-hidden': true,
    onChange(event) {
      // Workaround for https://github.com/facebook/react/issues/9023
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      const nextChecked = event.target.checked;
      const details = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent);
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
  const customStyleHookMapping = (0, _useCustomStyleHookMapping.useCustomStyleHookMapping)(state);
  const element = (0, _useRenderElement.useRenderElement)('button', componentProps, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_CheckboxRootContext.CheckboxRootContext.Provider, {
    value: state,
    children: [element, !checked && !groupContext && componentProps.name && !parent && /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      type: "hidden",
      name: componentProps.name,
      value: "off"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ...inputProps
    })]
  });
});
if (process.env.NODE_ENV !== "production") CheckboxRoot.displayName = "CheckboxRoot";