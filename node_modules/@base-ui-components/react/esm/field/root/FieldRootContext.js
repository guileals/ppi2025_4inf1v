'use client';

import * as React from 'react';
import { NOOP } from "../../utils/noop.js";
import { DEFAULT_VALIDITY_STATE } from "../utils/constants.js";
export const FieldRootContext = /*#__PURE__*/React.createContext({
  invalid: undefined,
  controlId: undefined,
  setControlId: NOOP,
  labelId: undefined,
  setLabelId: NOOP,
  messageIds: [],
  setMessageIds: NOOP,
  name: undefined,
  validityData: {
    state: DEFAULT_VALIDITY_STATE,
    errors: [],
    error: '',
    value: '',
    initialValue: null
  },
  setValidityData: NOOP,
  disabled: undefined,
  touched: false,
  setTouched: NOOP,
  dirty: false,
  setDirty: NOOP,
  filled: false,
  setFilled: NOOP,
  focused: false,
  setFocused: NOOP,
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
export function useFieldRootContext(optional = true) {
  const context = React.useContext(FieldRootContext);
  if (context.setControlId === NOOP && !optional) {
    throw new Error('Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>.');
  }
  return context;
}