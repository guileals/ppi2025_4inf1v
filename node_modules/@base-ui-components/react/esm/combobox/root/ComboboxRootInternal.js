'use client';

import * as React from 'react';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { useOnFirstRender } from '@base-ui-components/utils/useOnFirstRender';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { visuallyHidden } from '@base-ui-components/utils/visuallyHidden';
import { useRefWithInit } from '@base-ui-components/utils/useRefWithInit';
import { Store, useStore } from '@base-ui-components/utils/store';
import { useDismiss, useFloatingRootContext, useInteractions, useListNavigation, useClick, useTypeahead } from "../../floating-ui-react/index.js";
import { contains, getTarget } from "../../floating-ui-react/utils.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { ComboboxFloatingContext, ComboboxDerivedItemsContext, ComboboxRootContext } from "./ComboboxRootContext.js";
import { selectors } from "../store.js";
import { useOpenChangeComplete } from "../../utils/useOpenChangeComplete.js";
import { CompositeList } from "../../composite/list/CompositeList.js";
import { useFieldRootContext } from "../../field/root/FieldRootContext.js";
import { useFieldControlValidation } from "../../field/control/useFieldControlValidation.js";
import { useFormContext } from "../../form/FormContext.js";
import { useField } from "../../field/useField.js";
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { isGroupedItems, stringifyItem, stringifyItemValue, createCollatorItemFilter, createSingleSelectionCollatorFilter } from "./utils/index.js";
import { useCoreFilter } from "./utils/useFilter.js";
import { useTransitionStatus } from "../../utils/useTransitionStatus.js";
import { EMPTY_ARRAY } from "../../utils/constants.js";
import { useOpenInteractionType } from "../../utils/useOpenInteractionType.js";
import { useValueChanged } from "./utils/useValueChanged.js";
import { NOOP } from "../../utils/noop.js";

/**
 * @internal
 */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ComboboxRootInternal(props) {
  const {
    id: idProp,
    onOpenChangeComplete: onOpenChangeCompleteProp,
    defaultSelectedValue = null,
    selectedValue: selectedValueProp,
    onSelectedValueChange,
    defaultInputValue = '',
    inputValue: inputValueProp,
    selectionMode = 'none',
    onItemHighlighted: onItemHighlightedProp,
    name: nameProp,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    inputRef: inputRefProp,
    cols = 1,
    items,
    filter: filterProp,
    openOnInputClick = true,
    autoHighlight = false,
    itemToStringLabel,
    itemToStringValue,
    virtualized = false,
    fillInputOnItemPress = true,
    modal = false,
    limit = -1,
    autoComplete = 'list',
    locale
  } = props;
  const {
    clearErrors
  } = useFormContext();
  const {
    setDirty,
    validityData,
    validationMode,
    setControlId,
    setFilled,
    name: fieldName,
    disabled: fieldDisabled
  } = useFieldRootContext();
  const fieldControlValidation = useFieldControlValidation();
  const id = useBaseUiId(idProp);
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const multiple = selectionMode === 'multiple';
  const commitValidation = fieldControlValidation.commitValidation;
  useIsoLayoutEffect(() => {
    setControlId(id);
    return () => {
      setControlId(undefined);
    };
  }, [id, setControlId]);
  const [selectedValue, setSelectedValueUnwrapped] = useControlled({
    controlled: selectedValueProp,
    default: multiple ? defaultSelectedValue ?? EMPTY_ARRAY : defaultSelectedValue,
    name: 'Combobox',
    state: 'selectedValue'
  });
  const [queryChangedAfterOpen, setQueryChangedAfterOpen] = React.useState(false);
  const collatorFilter = useCoreFilter({
    locale
  });
  const filter = React.useMemo(() => {
    if (filterProp === null) {
      return () => true;
    }
    if (filterProp !== undefined) {
      return filterProp;
    }
    if (selectionMode === 'single' && !queryChangedAfterOpen) {
      return createSingleSelectionCollatorFilter(collatorFilter, itemToStringLabel, selectedValue);
    }
    return createCollatorItemFilter(collatorFilter, itemToStringLabel);
  }, [filterProp, selectionMode, selectedValue, queryChangedAfterOpen, collatorFilter, itemToStringLabel]);
  const [inputValue, setInputValueUnwrapped] = useControlled({
    controlled: inputValueProp,
    default: defaultInputValue,
    name: 'Combobox',
    state: 'value'
  });
  const [open, setOpenUnwrapped] = useControlled({
    controlled: props.open,
    default: props.defaultOpen,
    name: 'Combobox',
    state: 'open'
  });
  const [closeQuery, setCloseQuery] = React.useState(null);
  const query = closeQuery ?? (inputValue === '' ? '' : String(inputValue).trim());
  const isGrouped = isGroupedItems(items);
  const flatItems = React.useMemo(() => {
    if (!items) {
      return [];
    }
    if (isGrouped) {
      return items.flatMap(group => group.items);
    }
    return items;
  }, [items, isGrouped]);
  const filteredItems = React.useMemo(() => {
    if (!items) {
      return [];
    }
    if (isGrouped) {
      const groupedItems = items;
      const resultingGroups = [];
      let currentCount = 0;
      for (const group of groupedItems) {
        if (limit > -1 && currentCount >= limit) {
          break;
        }
        const candidateItems = query === '' ? group.items : group.items.filter(item => filter(item, query, itemToStringLabel));
        if (candidateItems.length === 0) {
          continue;
        }
        const remainingLimit = limit > -1 ? limit - currentCount : Infinity;
        const itemsToTake = candidateItems.slice(0, remainingLimit);
        if (itemsToTake.length > 0) {
          const newGroup = {
            ...group,
            items: itemsToTake
          };
          resultingGroups.push(newGroup);
          currentCount += itemsToTake.length;
        }
      }
      return resultingGroups;
    }
    if (query === '') {
      return limit > -1 ? flatItems.slice(0, limit) : flatItems;
    }
    const limitedItems = [];
    for (const item of flatItems) {
      if (limit > -1 && limitedItems.length >= limit) {
        break;
      }
      if (filter(item, query, itemToStringLabel)) {
        limitedItems.push(item);
      }
    }
    return limitedItems;
  }, [items, flatItems, query, filter, isGrouped, itemToStringLabel, limit]);
  const flatFilteredItems = React.useMemo(() => {
    if (isGrouped) {
      const groups = filteredItems;
      return groups.flatMap(g => g.items);
    }
    return filteredItems;
  }, [filteredItems, isGrouped]);
  const listRef = React.useRef([]);
  const labelsRef = React.useRef([]);
  const popupRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const keyboardActiveRef = React.useRef(true);
  const hadInputClearRef = React.useRef(false);
  const chipsContainerRef = React.useRef(null);
  const clearRef = React.useRef(null);

  /**
   * Contains the currently visible list of item values post-filtering.
   */
  const valuesRef = React.useRef([]);
  /**
   * Contains all item values in a stable, unfiltered order.
   * - When `items` prop is provided, this mirrors the flat items.
   * - When `items` is not provided, this accumulates values on first mount and
   *   does not remove them on unmount (due to filtering), providing a stable
   *   index for selected value tracking.
   */
  const allValuesRef = React.useRef([]);
  const store = useRefWithInit(() => new Store({
    id,
    selectedValue,
    inputValue,
    open,
    filter,
    query,
    items,
    selectionMode,
    listRef,
    popupRef,
    inputRef,
    keyboardActiveRef,
    chipsContainerRef,
    clearRef,
    valuesRef,
    allValuesRef,
    name,
    disabled,
    readOnly,
    required,
    fieldControlValidation,
    cols,
    isGrouped,
    virtualized,
    openOnInputClick,
    itemToStringLabel,
    modal,
    autoHighlight,
    mounted: false,
    forceMounted: false,
    transitionStatus: 'idle',
    inline: false,
    activeIndex: null,
    selectedIndex: null,
    popupProps: {},
    inputProps: {},
    triggerProps: {},
    typeaheadTriggerProps: {},
    positionerElement: null,
    listElement: null,
    triggerElement: null,
    inputElement: null,
    openMethod: null,
    inputInsidePopup: true,
    onOpenChangeComplete: onOpenChangeCompleteProp || NOOP,
    // Placeholder callbacks replaced on first render
    setOpen: NOOP,
    setInputValue: NOOP,
    setSelectedValue: NOOP,
    setIndices: NOOP,
    onItemHighlighted: NOOP,
    handleEnterSelection: NOOP,
    getItemProps() {
      return {};
    },
    forceMount: NOOP
  })).current;
  const onItemHighlighted = useEventCallback(onItemHighlightedProp);
  const onOpenChangeComplete = useEventCallback(onOpenChangeCompleteProp);
  const activeIndex = useStore(store, selectors.activeIndex);
  const selectedIndex = useStore(store, selectors.selectedIndex);
  const positionerElement = useStore(store, selectors.positionerElement);
  const listElement = useStore(store, selectors.listElement);
  const triggerElement = useStore(store, selectors.triggerElement);
  const inputElement = useStore(store, selectors.inputElement);
  const inline = useStore(store, selectors.inline);
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup);
  const queryRef = React.useRef(query);
  const selectedValueRef = React.useRef(selectedValue);
  const inputValueRef = React.useRef(inputValue);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  const {
    openMethod,
    triggerProps,
    reset: resetOpenInteractionType
  } = useOpenInteractionType(open);
  const forceMount = useEventCallback(() => {
    if (items) {
      // Ensure typeahead works on a closed list.
      labelsRef.current = flatFilteredItems.map(item => stringifyItem(item, itemToStringLabel));
    } else {
      store.set('forceMounted', true);
    }
  });
  const initialSelectedValueRef = React.useRef(selectedValue);
  useIsoLayoutEffect(() => {
    // Ensure the values and labels are registered for programmatic value changes.
    if (selectedValue !== initialSelectedValueRef.current) {
      forceMount();
    }
  }, [forceMount, selectedValue, initialSelectedValueRef]);
  const updateValue = useEventCallback(nextValue => {
    clearErrors(name);
    setDirty(nextValue !== validityData.initialValue);
  });
  const formValue = selectionMode === 'none' ? inputValue : selectedValue;
  useField({
    id,
    commitValidation,
    value: formValue,
    controlRef: inputRef,
    name,
    getValue: () => formValue
  });
  useIsoLayoutEffect(() => {
    if (items) {
      valuesRef.current = flatFilteredItems;
      allValuesRef.current = flatItems;
      listRef.current.length = flatFilteredItems.length;
    }
  }, [items, flatFilteredItems, flatItems]);

  // When the available items change, ensure the selected value(s) remain valid.
  // - Single: if current selection is removed, fall back to defaultSelectedValue if it exists in the list; else null.
  // - Multiple: drop any removed selections.
  useIsoLayoutEffect(() => {
    if (!items || selectionMode === 'none') {
      return;
    }
    const registry = flatItems;
    if (multiple) {
      const current = Array.isArray(selectedValue) ? selectedValue : EMPTY_ARRAY;
      const next = current.filter(v => registry.includes(v));
      if (next.length !== current.length) {
        setSelectedValueUnwrapped(next);
      }
      return;
    }
    const isStillPresent = selectedValue == null ? true : registry.includes(selectedValue);
    if (isStillPresent) {
      return;
    }
    let fallback = null;
    if (defaultSelectedValue != null && registry.includes(defaultSelectedValue)) {
      fallback = defaultSelectedValue;
    }
    setSelectedValueUnwrapped(fallback);

    // Keep the input text in sync when the input is rendered outside the popup.
    if (!store.state.inputInsidePopup) {
      const stringVal = stringifyItem(fallback, itemToStringLabel);
      if (inputRef.current && inputRef.current.value !== stringVal) {
        setInputValueUnwrapped(stringVal);
      }
    }
  }, [items, flatItems, multiple, selectionMode, selectedValue, defaultSelectedValue, setSelectedValueUnwrapped, setInputValueUnwrapped, itemToStringLabel, store]);
  useValueChanged(queryRef, query, () => {
    if (!open || query === '' || query === String(defaultInputValue)) {
      return;
    }
    setQueryChangedAfterOpen(true);
  });
  useValueChanged(selectedValueRef, selectedValue, () => {
    if (selectionMode === 'none') {
      return;
    }
    clearErrors(name);
    commitValidation?.(selectedValue, true);
    if (validationMode === 'onChange') {
      commitValidation?.(selectedValue);
    }
    updateValue(selectedValue);
  });
  useValueChanged(inputValueRef, inputValue, () => {
    if (selectionMode !== 'none') {
      return;
    }
    clearErrors(name);
    commitValidation?.(inputValue, true);
    if (validationMode === 'onChange') {
      commitValidation?.(inputValue);
    }
    updateValue(inputValue);
  });
  useIsoLayoutEffect(() => {
    if (selectionMode === 'none') {
      setFilled(String(inputValue) !== '');
    } else {
      setFilled(multiple ? Array.isArray(selectedValue) && selectedValue.length > 0 : selectedValue != null);
    }
  }, [setFilled, selectionMode, inputValue, selectedValue, multiple]);
  const setIndices = useEventCallback(options => {
    store.apply(options);
    const type = options.type || 'none';
    if (options.activeIndex === undefined) {
      return;
    }
    if (options.activeIndex === null) {
      onItemHighlighted(undefined, {
        type,
        index: -1
      });
    } else {
      const activeValue = valuesRef.current[options.activeIndex];
      onItemHighlighted(activeValue, {
        type,
        index: options.activeIndex
      });
    }
  });
  const setInputValue = useEventCallback((next, eventDetails) => {
    if (eventDetails.reason === 'input-clear' && open) {
      hadInputClearRef.current = true;
      // Defer clearing until close transition completes to avoid flicker
      return;
    }
    props.onInputValueChange?.(next, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }

    // If user is typing, ensure we don't auto-highlight on open due to a race
    // with the post-open effect that sets this flag.
    if (eventDetails.reason === 'input-change') {
      const hasQuery = next.trim() !== '';
      if (hasQuery) {
        setQueryChangedAfterOpen(true);
      }
      if (selectionMode === 'none' && autoHighlight) {
        setIndices({
          activeIndex: hasQuery ? 0 : null
        });
      }
    }
    setInputValueUnwrapped(next);
  });
  const setOpen = useEventCallback((nextOpen, eventDetails) => {
    props.onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    if (selectionMode === 'single' && !nextOpen && queryChangedAfterOpen) {
      setCloseQuery(query);
      // Avoid a flicker when closing the popup with an empty query.
      if (query === '') {
        setQueryChangedAfterOpen(false);
      }
    }
    setOpenUnwrapped(nextOpen);
  });
  const setSelectedValue = useEventCallback((nextValue, eventDetails) => {
    // Cast to `any` due to conditional value type (single vs. multiple).
    // The runtime implementation already ensures the correct value shape.
    onSelectedValueChange?.(nextValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setSelectedValueUnwrapped(nextValue);
    const shouldFillInput = selectionMode === 'none' && popupRef.current && fillInputOnItemPress || selectionMode === 'single' && !store.state.inputInsidePopup;
    if (shouldFillInput) {
      setInputValue(stringifyItem(nextValue, itemToStringLabel), createBaseUIEventDetails(eventDetails.reason, eventDetails.event));
    }
    const hadInputValue = inputRef.current ? inputRef.current.value.trim() !== '' : false;
    if (multiple && hadInputValue) {
      setInputValue('', createBaseUIEventDetails(eventDetails.reason, eventDetails.event));
      // Reset active index and clear any highlighted item since the list will re-filter.
      setIndices({
        activeIndex: null
      });
    }
    if (selectionMode === 'single' && nextValue != null && eventDetails.reason !== 'input-change') {
      setOpen(false, createBaseUIEventDetails('item-press', eventDetails.event));
      if (queryChangedAfterOpen) {
        setCloseQuery(query);
      }
    }
  });
  const syncSelectedIndex = useEventCallback(() => {
    if (selectionMode === 'none') {
      return;
    }
    const registry = items ? flatItems : allValuesRef.current;
    if (multiple) {
      const currentValue = Array.isArray(selectedValue) ? selectedValue : [];
      const lastValue = currentValue[currentValue.length - 1];
      const lastIndex = registry.indexOf(lastValue);
      setIndices({
        selectedIndex: lastIndex === -1 ? null : lastIndex
      });
    } else {
      const index = registry.indexOf(selectedValue);
      setIndices({
        selectedIndex: index === -1 ? null : index
      });
    }
  });
  useIsoLayoutEffect(() => {
    if (!open) {
      syncSelectedIndex();
    }
  }, [open, selectedValue, syncSelectedIndex]);
  const handleEnterSelection = useEventCallback(() => {
    if (activeIndex != null) {
      listRef.current[activeIndex]?.click();
    }
  });
  const handleUnmount = useEventCallback(() => {
    setMounted(false);
    onOpenChangeComplete?.(false);
    setQueryChangedAfterOpen(false);
    resetOpenInteractionType();
    setCloseQuery(null);
    if (selectionMode === 'none') {
      setIndices({
        activeIndex: null,
        selectedIndex: null
      });
    } else {
      setIndices({
        activeIndex: null
      });
    }

    // If an input-clear was requested while open, perform it here after close completes
    // to avoid mid-exit flicker.
    if (hadInputClearRef.current && inputRef.current && inputRef.current.value !== '') {
      setInputValue('', createBaseUIEventDetails('input-clear'));
      hadInputClearRef.current = false;
    }

    // If explicitly requested by a wrapper (e.g., FilterableMenu), clear the input
    // after close completes regardless of selection mode. This ensures the next open
    // starts from a blank query without requiring external state resets.
    if (props.clearInputOnCloseComplete && inputRef.current && inputRef.current.value !== '') {
      setInputValue('', createBaseUIEventDetails('input-clear'));
    }

    // Multiple selection mode:
    // If the user typed a filter and didn't select in multiple mode, clear the input
    // after close completes to avoid mid-exit flicker and start fresh on next open.
    if (selectionMode === 'multiple' && inputRef.current && inputRef.current.value !== '') {
      setInputValue('', createBaseUIEventDetails('input-clear'));
    }

    // Single selection mode:
    // - If input is rendered inside the popup, clear it so the next open is blank
    // - If input is outside the popup, sync it to the selected value
    if (selectionMode === 'single') {
      if (store.state.inputInsidePopup) {
        if (inputRef.current && inputRef.current.value !== '') {
          setInputValue('', createBaseUIEventDetails('input-clear'));
        }
      } else {
        const stringVal = stringifyItem(selectedValue, itemToStringLabel);
        if (inputRef.current && inputRef.current.value !== stringVal) {
          // If no selection was made, treat this as clearing the typed filter.
          const reason = stringVal === '' ? 'input-clear' : 'item-press';
          setInputValue(stringVal, createBaseUIEventDetails(reason));
        }
      }
    }
  });
  useOpenChangeComplete({
    enabled: !props.actionsRef,
    open,
    ref: popupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  React.useImperativeHandle(props.actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  const floatingRootContext = useFloatingRootContext({
    open: inline ? true : open,
    onOpenChange: setOpen,
    elements: {
      reference: inputInsidePopup ? triggerElement : inputElement,
      floating: positionerElement
    }
  });
  let ariaHasPopup;
  let ariaExpanded;
  if (!inline) {
    ariaHasPopup = cols > 1 ? 'grid' : 'listbox';
    ariaExpanded = open ? 'true' : 'false';
  }
  const role = React.useMemo(() => {
    const isPlainInput = inputElement?.tagName === 'INPUT';
    const shouldApplyAria = isPlainInput || open;
    const reference = isPlainInput ? {
      autoComplete: 'off',
      spellCheck: 'false',
      autoCorrect: 'off',
      autoCapitalize: 'none'
    } : {};
    if (shouldApplyAria) {
      reference.role = 'combobox';
      reference['aria-expanded'] = ariaExpanded;
      reference['aria-haspopup'] = ariaHasPopup;
      reference['aria-controls'] = open ? listElement?.id : undefined;
      reference['aria-autocomplete'] = autoComplete;
    }
    return {
      reference,
      floating: {
        role: 'presentation'
      }
    };
  }, [inputElement, open, ariaExpanded, ariaHasPopup, listElement?.id, autoComplete]);
  const click = useClick(floatingRootContext, {
    enabled: !readOnly && !disabled && openOnInputClick,
    event: 'mousedown-only',
    toggle: false,
    // Apply a small delay for touch to let iOS viewport centering settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: inputInsidePopup ? 0 : 50
  });
  const dismiss = useDismiss(floatingRootContext, {
    enabled: !readOnly && !disabled,
    outsidePressEvent: {
      mouse: 'sloppy',
      // The visual viewport (affected by the mobile software keyboard) can be
      // somewhat small. The user may want to scroll the screen to see more of
      // the popup.
      touch: 'intentional'
    },
    // Without a popup, let the Escape key bubble the event up to other popups' handlers.
    bubbles: inline ? true : undefined,
    outsidePress(event) {
      const target = getTarget(event);
      return !contains(triggerElement, target) && !contains(clearRef.current, target) && !contains(chipsContainerRef.current, target);
    }
  });
  const listNavigation = useListNavigation(floatingRootContext, {
    enabled: !readOnly && !disabled,
    id,
    listRef,
    activeIndex,
    selectedIndex,
    virtual: true,
    loop: true,
    allowEscape: !autoHighlight,
    focusItemOnOpen: queryChangedAfterOpen || selectionMode === 'none' ? false : 'auto',
    cols,
    orientation: cols > 1 ? 'horizontal' : undefined,
    disabledIndices: virtualized ? index => index < 0 || index >= flatFilteredItems.length : EMPTY_ARRAY,
    onNavigate(nextActiveIndex, event) {
      // Retain the highlight only while actually transitioning out or closed.
      if (nextActiveIndex === null && (!open || transitionStatus === 'ending')) {
        return;
      }
      if (!event) {
        setIndices({
          activeIndex: nextActiveIndex
        });
      } else {
        setIndices({
          activeIndex: nextActiveIndex,
          type: keyboardActiveRef.current ? 'keyboard' : 'pointer'
        });
      }
    }
  });
  const {
    reference: typeaheadTriggerProps
  } = useTypeahead(floatingRootContext, {
    enabled: !open && !readOnly && !disabled && selectionMode === 'single',
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch(index) {
      const nextSelectedValue = valuesRef.current[index];
      if (nextSelectedValue !== undefined) {
        setSelectedValue(nextSelectedValue, createBaseUIEventDetails('none'));
      }
    }
  });
  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = useInteractions([role, click, dismiss, listNavigation]);
  useOnFirstRender(() => {
    store.apply({
      popupProps: getFloatingProps(),
      inputProps: getReferenceProps(),
      triggerProps,
      typeaheadTriggerProps,
      getItemProps,
      setOpen,
      setInputValue,
      setSelectedValue,
      setIndices,
      onItemHighlighted,
      handleEnterSelection,
      forceMount
    });
  });
  React.useEffect(() => {
    store.apply({
      id,
      selectedValue,
      inputValue,
      open,
      mounted,
      transitionStatus,
      items,
      popupProps: getFloatingProps(),
      inputProps: getReferenceProps(),
      triggerProps,
      typeaheadTriggerProps,
      openMethod,
      getItemProps,
      selectionMode,
      name,
      disabled,
      readOnly,
      required,
      fieldControlValidation,
      cols,
      isGrouped,
      virtualized,
      onOpenChangeComplete,
      openOnInputClick,
      itemToStringLabel,
      modal,
      autoHighlight
    });
  }, [store, id, selectedValue, inputValue, open, mounted, transitionStatus, items, getFloatingProps, getReferenceProps, getItemProps, openMethod, triggerProps, typeaheadTriggerProps, selectionMode, name, disabled, readOnly, required, fieldControlValidation, cols, isGrouped, virtualized, onOpenChangeComplete, openOnInputClick, itemToStringLabel, modal, autoHighlight]);
  const hiddenInputRef = useMergedRefs(inputRefProp, fieldControlValidation.inputRef);
  const itemsContextValue = React.useMemo(() => ({
    query,
    filteredItems,
    flatFilteredItems
  }), [query, filteredItems, flatFilteredItems]);
  const serializedValue = React.useMemo(() => {
    if (Array.isArray(formValue)) {
      return '';
    }
    return stringifyItemValue(formValue, itemToStringValue);
  }, [formValue, itemToStringValue]);
  const hiddenInputs = React.useMemo(() => {
    if (!multiple || !Array.isArray(selectedValue) || !name) {
      return null;
    }
    return selectedValue.map(value => {
      const currentSerializedValue = stringifyItemValue(value, itemToStringValue);
      return /*#__PURE__*/_jsx("input", {
        type: "hidden",
        name: name,
        value: currentSerializedValue
      }, currentSerializedValue);
    });
  }, [multiple, selectedValue, name, itemToStringValue]);
  const children = /*#__PURE__*/_jsxs(React.Fragment, {
    children: [props.children, /*#__PURE__*/_jsx("input", {
      ...fieldControlValidation.getInputValidationProps({
        // Move focus when the hidden input is focused.
        onFocus() {
          if (inputInsidePopup) {
            triggerElement?.focus();
          }
          (inputRef.current || triggerElement)?.focus();
        },
        // Handle browser autofill.
        onChange(event) {
          // Workaround for https://github.com/facebook/react/issues/9023
          if (event.nativeEvent.defaultPrevented) {
            return;
          }
          const nextValue = event.target.value;
          const details = createBaseUIEventDetails('input-change', event.nativeEvent);
          function handleChange() {
            if (selectionMode === 'none') {
              setDirty(nextValue !== validityData.initialValue);
              setInputValue(nextValue, details);
              if (validationMode === 'onChange') {
                fieldControlValidation.commitValidation(nextValue);
              }
              return;
            }
            const exactValue = valuesRef.current.find(v => v === nextValue || typeof selectedValue === 'string' && nextValue.toLowerCase() === v.toLowerCase());
            if (exactValue != null) {
              setDirty(exactValue !== validityData.initialValue);
              setSelectedValue?.(exactValue, details);
              if (validationMode === 'onChange') {
                fieldControlValidation.commitValidation(exactValue);
              }
            }
          }
          if (items) {
            handleChange();
          } else {
            forceMount();
            queueMicrotask(handleChange);
          }
        },
        id,
        name: multiple || selectionMode === 'none' ? undefined : name,
        disabled,
        required,
        readOnly,
        value: serializedValue,
        ref: hiddenInputRef,
        style: visuallyHidden,
        tabIndex: -1,
        'aria-hidden': true
      })
    }), hiddenInputs]
  });
  return /*#__PURE__*/_jsx(ComboboxRootContext.Provider, {
    value: store,
    children: /*#__PURE__*/_jsx(ComboboxFloatingContext.Provider, {
      value: floatingRootContext,
      children: /*#__PURE__*/_jsx(ComboboxDerivedItemsContext.Provider, {
        value: itemsContextValue,
        children: virtualized ? children : /*#__PURE__*/_jsx(CompositeList, {
          elementsRef: listRef,
          labelsRef: items ? undefined : labelsRef,
          children: children
        })
      })
    })
  });
}