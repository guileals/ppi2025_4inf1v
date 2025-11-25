"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxItem = void 0;
var React = _interopRequireWildcard(require("react"));
var _store = require("@base-ui-components/utils/store");
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _ComboboxRootContext = require("../root/ComboboxRootContext");
var _useCompositeListItem = require("../../composite/list/useCompositeListItem");
var _useRenderElement = require("../../utils/useRenderElement");
var _ComboboxItemContext = require("./ComboboxItemContext");
var _store2 = require("../store");
var _useButton = require("../../use-button");
var _ComboboxRowContext = require("../row/ComboboxRowContext");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _utils = require("../../floating-ui-react/utils");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * An individual item in the list.
 * Renders a `<div>` element.
 */
const ComboboxItem = exports.ComboboxItem = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function ComboboxItem(componentProps, forwardedRef) {
  const {
    render,
    className,
    value,
    index: indexProp,
    disabled = false,
    nativeButton = false,
    ...elementProps
  } = componentProps;
  const textRef = React.useRef(null);
  const listItem = (0, _useCompositeListItem.useCompositeListItem)({
    index: indexProp,
    textRef,
    indexGuessBehavior: _useCompositeListItem.IndexGuessBehavior.GuessFromOrder
  });
  const store = (0, _ComboboxRootContext.useComboboxRootContext)();
  const isRow = (0, _ComboboxRowContext.useComboboxRowContext)();
  const {
    flatFilteredItems
  } = (0, _ComboboxRootContext.useComboboxDerivedItemsContext)();
  const selectionMode = (0, _store.useStore)(store, _store2.selectors.selectionMode);
  const readOnly = (0, _store.useStore)(store, _store2.selectors.readOnly);
  const virtualized = (0, _store.useStore)(store, _store2.selectors.virtualized);
  const listRef = (0, _store.useStore)(store, _store2.selectors.listRef);
  const valuesRef = (0, _store.useStore)(store, _store2.selectors.valuesRef);
  const allValuesRef = (0, _store.useStore)(store, _store2.selectors.allValuesRef);
  const inputRef = (0, _store.useStore)(store, _store2.selectors.inputRef);
  const selectable = selectionMode !== 'none';
  const multiple = selectionMode === 'multiple';
  const index = indexProp ?? (virtualized ? flatFilteredItems.indexOf(value) : listItem.index);
  const rootId = (0, _store.useStore)(store, _store2.selectors.id);
  const highlighted = (0, _store.useStore)(store, _store2.selectors.isActive, index);
  const matchesSelectedValue = (0, _store.useStore)(store, _store2.selectors.isSelected, value);
  const rootSelectedValue = (0, _store.useStore)(store, _store2.selectors.selectedValue);
  const items = (0, _store.useStore)(store, _store2.selectors.items);
  const getItemProps = (0, _store.useStore)(store, _store2.selectors.getItemProps);
  const itemRef = React.useRef(null);
  const indexRef = (0, _useLatestRef.useLatestRef)(index);
  const hasRegistered = listItem.index !== -1;
  const id = rootId != null && hasRegistered ? `${rootId}-${index}` : undefined;
  const selected = matchesSelectedValue && selectable;
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    const shouldRun = hasRegistered && (virtualized || indexProp != null);
    if (!shouldRun) {
      return undefined;
    }
    const list = listRef.current;
    list[index] = itemRef.current;
    return () => {
      delete list[index];
    };
  }, [hasRegistered, virtualized, index, listRef, indexProp]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!hasRegistered || items) {
      return undefined;
    }
    const visibleMap = valuesRef.current;
    visibleMap[index] = value;

    // Stable registry that doesn't depend on filtering. Assume that no
    // filtering had occurred at this point; otherwise, an `items` prop is
    // required.
    if (selectionMode !== 'none') {
      allValuesRef.current.push(value);
    }
    return () => {
      delete visibleMap[index];
    };
  }, [hasRegistered, items, index, value, valuesRef, allValuesRef, selectionMode]);

  // When items are uncontrolled (no `items` prop), ensure selectedIndex is
  // derived from the mounted item whose value matches the selected value.
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!hasRegistered || items) {
      return;
    }
    const lastSelectedValue = Array.isArray(rootSelectedValue) ? rootSelectedValue[rootSelectedValue.length - 1] : rootSelectedValue;
    if (lastSelectedValue != null && lastSelectedValue === value) {
      store.set('selectedIndex', index);
    }
  }, [hasRegistered, items, store, index, value, rootSelectedValue]);
  const state = React.useMemo(() => ({
    disabled,
    selected,
    highlighted
  }), [disabled, selected, highlighted]);
  const rootProps = getItemProps({
    active: highlighted,
    selected
  });
  delete rootProps.id;
  delete rootProps.onFocus;
  const {
    getButtonProps,
    buttonRef
  } = (0, _useButton.useButton)({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton
  });
  const defaultProps = {
    id,
    role: isRow ? 'gridcell' : 'option',
    'aria-disabled': disabled || undefined,
    'aria-selected': selectable ? selected : undefined,
    // Focusable items steal focus from the input upon mouseup.
    // Warn if the user renders a natively focusable element like `<button>`,
    // as it should be a `<div>` instead.
    tabIndex: undefined,
    onPointerDown(event) {
      event.preventDefault();
    },
    onClick(event) {
      if (disabled || readOnly) {
        return;
      }
      const eventDetails = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('item-press', event.nativeEvent);

      // Let the link handle the click.
      const target = (0, _utils.getTarget)(event.nativeEvent);
      const href = target?.closest('a')?.getAttribute('href');
      const hasNavigableHref = href != null && href !== '';
      if (hasNavigableHref) {
        // If on the same page, close the popup to avoid it lingering.
        if (href.startsWith('#')) {
          store.state.setOpen(false, eventDetails);
        }
        return;
      }
      if (multiple) {
        const currentSelectedValue = rootSelectedValue;
        const isCurrentlySelected = Array.isArray(currentSelectedValue) && currentSelectedValue.includes(value);
        let nextValue;
        if (isCurrentlySelected) {
          nextValue = currentSelectedValue.filter(v => v !== value);
        } else {
          nextValue = Array.isArray(currentSelectedValue) ? [...currentSelectedValue, value] : [value];
        }
        store.state.setSelectedValue(nextValue, eventDetails);
        const wasFiltering = inputRef.current ? inputRef.current.value.trim() !== '' : false;
        if (wasFiltering) {
          store.state.setOpen(false, eventDetails);
        }
      } else {
        store.state.setSelectedValue(value, eventDetails);
        store.state.setOpen(false, eventDetails);
      }
    }
  };
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    ref: [buttonRef, forwardedRef, listItem.ref, itemRef],
    state,
    props: [rootProps, defaultProps, elementProps, getButtonProps]
  });
  const contextValue = React.useMemo(() => ({
    selected,
    indexRef,
    textRef
  }), [selected, indexRef, textRef]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ComboboxItemContext.ComboboxItemContext.Provider, {
    value: contextValue,
    children: element
  });
}));
if (process.env.NODE_ENV !== "production") ComboboxItem.displayName = "ComboboxItem";