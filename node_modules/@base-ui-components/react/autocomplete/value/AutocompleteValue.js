"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutocompleteValue = AutocompleteValue;
var _store = require("@base-ui-components/utils/store");
var _ComboboxRootContext = require("../../combobox/root/ComboboxRootContext");
var _store2 = require("../../combobox/store");
/**
 * The current value of the autocomplete.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete)
 */
function AutocompleteValue(props) {
  const {
    children
  } = props;
  const store = (0, _ComboboxRootContext.useComboboxRootContext)();
  const inputValue = (0, _store.useStore)(store, _store2.selectors.inputValue);
  if (typeof children === 'function') {
    return children(String(inputValue));
  }
  if (children != null) {
    return children;
  }
  return inputValue;
}