"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldRootContext = void 0;
exports.useFieldRootContext = useFieldRootContext;
var React = _interopRequireWildcard(require("react"));
var _noop = require("../../utils/noop");
var _constants = require("../utils/constants");
const FieldRootContext = exports.FieldRootContext = /*#__PURE__*/React.createContext({
  invalid: undefined,
  controlId: undefined,
  setControlId: _noop.NOOP,
  labelId: undefined,
  setLabelId: _noop.NOOP,
  messageIds: [],
  setMessageIds: _noop.NOOP,
  name: undefined,
  validityData: {
    state: _constants.DEFAULT_VALIDITY_STATE,
    errors: [],
    error: '',
    value: '',
    initialValue: null
  },
  setValidityData: _noop.NOOP,
  disabled: undefined,
  touched: false,
  setTouched: _noop.NOOP,
  dirty: false,
  setDirty: _noop.NOOP,
  filled: false,
  setFilled: _noop.NOOP,
  focused: false,
  setFocused: _noop.NOOP,
  validate: () => null,
  validationMode: 'onBlur',
  validationDebounceTime: 0,
  state: {
    disabled: false,
    valid: null,
    touched: false,
    dirty: false,
    filled: false,
    focused: false
  },
  markedDirtyRef: {
    current: false
  }
});
if (process.env.NODE_ENV !== "production") FieldRootContext.displayName = "FieldRootContext";
function useFieldRootContext(optional = true) {
  const context = React.useContext(FieldRootContext);
  if (context.setControlId === _noop.NOOP && !optional) {
    throw new Error('Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>.');
  }
  return context;
}