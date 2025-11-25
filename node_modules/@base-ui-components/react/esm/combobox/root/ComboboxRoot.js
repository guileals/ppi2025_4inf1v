'use client';

import * as React from 'react';
import { ComboboxRootInternal } from "./ComboboxRootInternal.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Groups all parts of the combobox.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/autocomplete)
 */
export function ComboboxRoot(props) {
  const {
    multiple = false,
    defaultValue,
    value,
    onValueChange,
    ...rest
  } = props;
  return /*#__PURE__*/_jsx(ComboboxRootInternal, {
    ...rest,
    selectionMode: multiple ? 'multiple' : 'single',
    selectedValue: value,
    defaultSelectedValue: defaultValue,
    onSelectedValueChange: onValueChange
  });
}