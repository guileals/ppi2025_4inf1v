"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxValue = ComboboxValue;
var React = _interopRequireWildcard(require("react"));
var _store = require("@base-ui-components/utils/store");
var _ComboboxRootContext = require("../root/ComboboxRootContext");
var _utils = require("../root/utils");
var _store2 = require("../store");
/**
 * The current value of the combobox.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
function ComboboxValue(props) {
  const {
    children: childrenProp
  } = props;
  const store = (0, _ComboboxRootContext.useComboboxRootContext)();
  const itemToStringLabel = (0, _store.useStore)(store, _store2.selectors.itemToStringLabel);
  const selectedValue = (0, _store.useStore)(store, _store2.selectors.selectedValue);
  const items = (0, _store.useStore)(store, _store2.selectors.items);
  const isChildrenPropDefined = childrenProp !== undefined;
  const memoizedItemDerivatives = React.useMemo(() => {
    if (isChildrenPropDefined || !Array.isArray(items)) {
      return {
        flatItems: undefined,
        valueToLabel: undefined,
        nullItemLabel: undefined
      };
    }
    const flatItems = (0, _utils.isGroupedItems)(items) ? items.flatMap(g => g.items) : items;
    let valueToLabel;
    let nullItemLabel;
    for (let i = 0; i < flatItems.length; i += 1) {
      const item = flatItems[i];
      if (item == null) {
        if (nullItemLabel === undefined) {
          nullItemLabel = (0, _utils.stringifyItem)(item, itemToStringLabel);
        }
        continue;
      }
      if (typeof item === 'object') {
        const hasValueKey = 'value' in item;
        const hasLabelKey = 'label' in item;
        if (hasValueKey) {
          if (item.value == null && nullItemLabel === undefined) {
            nullItemLabel = hasLabelKey ? item.label : (0, _utils.stringifyItem)(item, itemToStringLabel);
          }
          if (hasLabelKey) {
            valueToLabel ?? (valueToLabel = new Map());
            if (!valueToLabel.has(item.value)) {
              valueToLabel.set(item.value, item.label);
            }
          }
        }
      }
    }
    return {
      flatItems,
      valueToLabel,
      nullItemLabel
    };
  }, [items, itemToStringLabel, isChildrenPropDefined]);
  if (typeof childrenProp === 'function') {
    return childrenProp(selectedValue);
  }
  if (childrenProp != null) {
    return childrenProp;
  }
  if (selectedValue && typeof selectedValue === 'object' && 'label' in selectedValue && selectedValue.label != null) {
    return selectedValue.label;
  }
  if (Array.isArray(items)) {
    if (selectedValue == null && memoizedItemDerivatives.nullItemLabel !== undefined) {
      return memoizedItemDerivatives.nullItemLabel;
    }

    // When a value is selected and items are value/label pairs, render label.
    // e.g. items: [{ value: 'uk', label: 'United Kingdom' }], selectedValue: 'uk' → 'United Kingdom'
    if (selectedValue != null && memoizedItemDerivatives.valueToLabel?.has(selectedValue)) {
      return memoizedItemDerivatives.valueToLabel.get(selectedValue);
    }
  }
  return (0, _utils.stringifyItem)(selectedValue, itemToStringLabel);
}