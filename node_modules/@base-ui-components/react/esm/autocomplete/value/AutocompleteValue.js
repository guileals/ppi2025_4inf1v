'use client';

import { useStore } from '@base-ui-components/utils/store';
import { useComboboxRootContext } from "../../combobox/root/ComboboxRootContext.js";
import { selectors } from "../../combobox/store.js";

/**
 * The current value of the autocomplete.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete)
 */
export function AutocompleteValue(props) {
  const {
    children
  } = props;
  const store = useComboboxRootContext();
  const inputValue = useStore(store, selectors.inputValue);
  if (typeof children === 'function') {
    return children(String(inputValue));
  }
  if (children != null) {
    return children;
  }
  return inputValue;
}