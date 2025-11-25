"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxRoot = ComboboxRoot;
var React = _interopRequireWildcard(require("react"));
var _ComboboxRootInternal = require("./ComboboxRootInternal");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Groups all parts of the combobox.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/autocomplete)
 */
function ComboboxRoot(props) {
  const {
    multiple = false,
    defaultValue,
    value,
    onValueChange,
    ...rest
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ComboboxRootInternal.ComboboxRootInternal, {
    ...rest,
    selectionMode: multiple ? 'multiple' : 'single',
    selectedValue: value,
    defaultSelectedValue: defaultValue,
    onSelectedValueChange: onValueChange
  });
}