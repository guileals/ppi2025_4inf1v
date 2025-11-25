'use client';

import * as React from 'react';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { ComboboxRootInternal } from "../../combobox/root/ComboboxRootInternal.js";
import { stringifyItem } from "../../combobox/root/utils/index.js";
import { useCoreFilter } from "../../combobox/root/utils/useFilter.js";
import { jsx as _jsx } from "react/jsx-runtime";
const DEFAULT_FILTER_OPTIONS = {
  sensitivity: 'base'
};

/**
 * Groups all parts of the autocomplete.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete)
 */

export function AutocompleteRoot(props) {
  const {
    openOnInputClick = false,
    value,
    defaultValue,
    onValueChange,
    mode = 'list',
    autoHighlight = false,
    itemToStringValue,
    items,
    ...rest
  } = props;
  const enableInline = mode === 'inline' || mode === 'both';
  const staticItems = mode === 'inline' || mode === 'none';

  // Mirror the typed value for uncontrolled usage so we can compose the inline overlay.
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const [inlineOverlay, setInlineOverlay] = React.useState('');

  // When the outer value changes (controlled), drop the overlay if it no longer matches intent.
  React.useEffect(() => {
    if (isControlled) {
      setInlineOverlay('');
    }
  }, [value, isControlled]);

  // Compose the input value shown to the user: overlay takes precedence when enabled.
  let composedValue;
  if (enableInline && inlineOverlay !== '') {
    composedValue = inlineOverlay;
  } else if (isControlled) {
    composedValue = value ?? '';
  } else {
    composedValue = internalValue;
  }
  const handleValueChange = useEventCallback((nextValue, eventDetails) => {
    // Typing should clear the overlay, mirroring the demo behavior
    setInlineOverlay('');
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue, eventDetails);
  });
  const collator = useCoreFilter(DEFAULT_FILTER_OPTIONS);
  const baseFilter = React.useMemo(() => {
    if (rest.filter) {
      return rest.filter;
    }
    return (item, query, toString) => {
      return collator.contains(stringifyItem(item, toString), query);
    };
  }, [rest, collator]);
  const query = String(isControlled ? value : internalValue).trim();

  // In "both", wrap filtering to use only the typed value, ignoring overlay.
  let effectiveFilter;
  if (mode !== 'both') {
    effectiveFilter = staticItems ? null : rest.filter;
  } else {
    effectiveFilter = (item, _query, toString) => {
      return baseFilter(item, query, toString);
    };
  }
  const handleItemHighlighted = useEventCallback((highlightedValue, data) => {
    props.onItemHighlighted?.(highlightedValue, data);
    if (data.type === 'pointer') {
      return;
    }
    if (enableInline) {
      if (highlightedValue == null) {
        setInlineOverlay('');
      } else {
        setInlineOverlay(stringifyItem(highlightedValue, itemToStringValue));
      }
    } else {
      setInlineOverlay('');
    }
  });
  return /*#__PURE__*/_jsx(ComboboxRootInternal, {
    ...rest,
    items: items // Block `Group` type inference
    ,
    itemToStringLabel: itemToStringValue,
    openOnInputClick: openOnInputClick,
    selectionMode: "none",
    fillInputOnItemPress: true,
    autoHighlight: autoHighlight,
    filter: effectiveFilter,
    inputValue: composedValue,
    defaultInputValue: defaultValue,
    onInputValueChange: handleValueChange,
    onItemHighlighted: handleItemHighlighted,
    autoComplete: mode
  });
}