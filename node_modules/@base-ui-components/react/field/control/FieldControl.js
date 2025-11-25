"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldControl = void 0;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _FieldRootContext = require("../root/FieldRootContext");
var _constants = require("../utils/constants");
var _useRenderElement = require("../../utils/useRenderElement");
var _useField = require("../useField");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _useFieldControlValidation = require("./useFieldControlValidation");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
/**
 * The form control to label and validate.
 * Renders an `<input>` element.
 *
 * You can omit this part and use any Base UI input component instead. For example,
 * [Input](https://base-ui.com/react/components/input), [Checkbox](https://base-ui.com/react/components/checkbox),
 * or [Select](https://base-ui.com/react/components/select), among others, will work with Field out of the box.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */
const FieldControl = exports.FieldControl = /*#__PURE__*/React.forwardRef(function FieldControl(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    name: nameProp,
    value: valueProp,
    disabled: disabledProp = false,
    onValueChange,
    defaultValue,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState,
    name: fieldName,
    disabled: fieldDisabled
  } = (0, _FieldRootContext.useFieldRootContext)();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const state = React.useMemo(() => ({
    ...fieldState,
    disabled
  }), [fieldState, disabled]);
  const {
    setControlId,
    labelId,
    setTouched,
    setDirty,
    validityData,
    setFocused,
    setFilled,
    validationMode
  } = (0, _FieldRootContext.useFieldRootContext)();
  const {
    getValidationProps,
    getInputValidationProps,
    commitValidation,
    inputRef
  } = (0, _useFieldControlValidation.useFieldControlValidation)();
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    setControlId(id);
    return () => {
      setControlId(undefined);
    };
  }, [id, setControlId]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    const hasExternalValue = valueProp != null;
    if (inputRef.current?.value || hasExternalValue && valueProp !== '') {
      setFilled(true);
    } else if (hasExternalValue && valueProp === '') {
      setFilled(false);
    }
  }, [inputRef, setFilled, valueProp]);
  const [value, setValueUnwrapped] = (0, _useControlled.useControlled)({
    controlled: valueProp,
    default: defaultValue,
    name: 'FieldControl',
    state: 'value'
  });
  const isControlled = valueProp !== undefined;
  const setValue = (0, _useEventCallback.useEventCallback)((nextValue, eventDetails) => {
    onValueChange?.(nextValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(nextValue);
  });
  (0, _useField.useField)({
    id,
    name,
    commitValidation,
    value,
    getValue: () => inputRef.current?.value,
    controlRef: inputRef
  });
  const element = (0, _useRenderElement.useRenderElement)('input', componentProps, {
    ref: forwardedRef,
    state,
    props: [{
      id,
      disabled,
      name,
      ref: inputRef,
      'aria-labelledby': labelId,
      ...(isControlled ? {
        value
      } : {
        defaultValue
      }),
      onChange(event) {
        const inputValue = event.currentTarget.value;
        setValue(inputValue, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent));
        setDirty(inputValue !== validityData.initialValue);
        setFilled(inputValue !== '');
      },
      onFocus() {
        setFocused(true);
      },
      onBlur(event) {
        setTouched(true);
        setFocused(false);
        if (validationMode === 'onBlur') {
          commitValidation(event.currentTarget.value);
        }
      },
      onKeyDown(event) {
        if (event.currentTarget.tagName === 'INPUT' && event.key === 'Enter') {
          setTouched(true);
          commitValidation(event.currentTarget.value);
        }
      }
    }, getValidationProps(), getInputValidationProps(), elementProps],
    customStyleHookMapping: _constants.fieldValidityMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") FieldControl.displayName = "FieldControl";