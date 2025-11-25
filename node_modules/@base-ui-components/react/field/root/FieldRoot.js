"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _FieldRootContext = require("./FieldRootContext");
var _constants = require("../utils/constants");
var _FieldsetRootContext = require("../../fieldset/root/FieldsetRootContext");
var _FormContext = require("../../form/FormContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Groups all parts of the field.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */
const FieldRoot = exports.FieldRoot = /*#__PURE__*/React.forwardRef(function FieldRoot(componentProps, forwardedRef) {
  const {
    render,
    className,
    validate: validateProp,
    validationDebounceTime = 0,
    validationMode = 'onBlur',
    name,
    disabled: disabledProp = false,
    invalid: invalidProp,
    ...elementProps
  } = componentProps;
  const {
    disabled: disabledFieldset
  } = (0, _FieldsetRootContext.useFieldsetRootContext)();
  const {
    errors
  } = (0, _FormContext.useFormContext)();
  const validate = (0, _useEventCallback.useEventCallback)(validateProp || (() => null));
  const disabled = disabledFieldset || disabledProp;
  const [controlId, setControlId] = React.useState(undefined);
  const [labelId, setLabelId] = React.useState(undefined);
  const [messageIds, setMessageIds] = React.useState([]);
  const [touched, setTouched] = React.useState(false);
  const [dirty, setDirtyUnwrapped] = React.useState(false);
  const [filled, setFilled] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const markedDirtyRef = React.useRef(false);
  const setDirty = React.useCallback(value => {
    if (value) {
      markedDirtyRef.current = true;
    }
    setDirtyUnwrapped(value);
  }, []);
  const invalid = Boolean(invalidProp || name && {}.hasOwnProperty.call(errors, name) && errors[name] !== undefined);
  const [validityData, setValidityData] = React.useState({
    state: _constants.DEFAULT_VALIDITY_STATE,
    error: '',
    errors: [],
    value: null,
    initialValue: null
  });
  const valid = !invalid && validityData.state.valid;
  const state = React.useMemo(() => ({
    disabled,
    touched,
    dirty,
    valid,
    filled,
    focused
  }), [disabled, touched, dirty, valid, filled, focused]);
  const contextValue = React.useMemo(() => ({
    invalid,
    controlId,
    setControlId,
    labelId,
    setLabelId,
    messageIds,
    setMessageIds,
    name,
    validityData,
    setValidityData,
    disabled,
    touched,
    setTouched,
    dirty,
    setDirty,
    filled,
    setFilled,
    focused,
    setFocused,
    validate,
    validationMode,
    validationDebounceTime,
    state,
    markedDirtyRef
  }), [invalid, controlId, labelId, messageIds, name, validityData, disabled, touched, dirty, setDirty, filled, setFilled, focused, setFocused, validate, validationMode, validationDebounceTime, state]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    customStyleHookMapping: _constants.fieldValidityMapping
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FieldRootContext.FieldRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") FieldRoot.displayName = "FieldRoot";