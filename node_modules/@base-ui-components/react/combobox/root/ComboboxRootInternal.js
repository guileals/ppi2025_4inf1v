"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxRootInternal = ComboboxRootInternal;
var React = _interopRequireWildcard(require("react"));
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useOnFirstRender = require("@base-ui-components/utils/useOnFirstRender");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _visuallyHidden = require("@base-ui-components/utils/visuallyHidden");
var _useRefWithInit = require("@base-ui-components/utils/useRefWithInit");
var _store = require("@base-ui-components/utils/store");
var _floatingUiReact = require("../../floating-ui-react");
var _utils = require("../../floating-ui-react/utils");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _ComboboxRootContext = require("./ComboboxRootContext");
var _store2 = require("../store");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _CompositeList = require("../../composite/list/CompositeList");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _useFieldControlValidation = require("../../field/control/useFieldControlValidation");
var _FormContext = require("../../form/FormContext");
var _useField = require("../../field/useField");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _utils2 = require("./utils");
var _useFilter = require("./utils/useFilter");
var _useTransitionStatus = require("../../utils/useTransitionStatus");
var _constants = require("../../utils/constants");
var _useOpenInteractionType = require("../../utils/useOpenInteractionType");
var _useValueChanged = require("./utils/useValueChanged");
var _noop = require("../../utils/noop");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * @internal
 */

function ComboboxRootInternal(props) {
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
  } = (0, _FormContext.useFormContext)();
  const {
    setDirty,
    validityData,
    validationMode,
    setControlId,
    setFilled,
    name: fieldName,
    disabled: fieldDisabled
  } = (0, _FieldRootContext.useFieldRootContext)();
  const fieldControlValidation = (0, _useFieldControlValidation.useFieldControlValidation)();
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const multiple = selectionMode === 'multiple';
  const commitValidation = fieldControlValidation.commitValidation;
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    setControlId(id);
    return () => {
      setControlId(undefined);
    };
  }, [id, setControlId]);
  const [selectedValue, setSelectedValueUnwrapped] = (0, _useControlled.useControlled)({
    controlled: selectedValueProp,
    default: multiple ? defaultSelectedValue ?? _constants.EMPTY_ARRAY : defaultSelectedValue,
    name: 'Combobox',
    state: 'selectedValue'
  });
  const [queryChangedAfterOpen, setQueryChangedAfterOpen] = React.useState(false);
  const collatorFilter = (0, _useFilter.useCoreFilter)({
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
      return (0, _utils2.createSingleSelectionCollatorFilter)(collatorFilter, itemToStringLabel, selectedValue);
    }
    return (0, _utils2.createCollatorItemFilter)(collatorFilter, itemToStringLabel);
  }, [filterProp, selectionMode, selectedValue, queryChangedAfterOpen, collatorFilter, itemToStringLabel]);
  const [inputValue, setInputValueUnwrapped] = (0, _useControlled.useControlled)({
    controlled: inputValueProp,
    default: defaultInputValue,
    name: 'Combobox',
    state: 'value'
  });
  const [open, setOpenUnwrapped] = (0, _useControlled.useControlled)({
    controlled: props.open,
    default: props.defaultOpen,
    name: 'Combobox',
    state: 'open'
  });
  const [closeQuery, setCloseQuery] = React.useState(null);
  const query = closeQuery ?? (inputValue === '' ? '' : String(inputValue).trim());
  const isGrouped = (0, _utils2.isGroupedItems)(items);
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
  const store = (0, _useRefWithInit.useRefWithInit)(() => new _store.Store({
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
    onOpenChangeComplete: onOpenChangeCompleteProp || _noop.NOOP,
    // Placeholder callbacks replaced on first render
    setOpen: _noop.NOOP,
    setInputValue: _noop.NOOP,
    setSelectedValue: _noop.NOOP,
    setIndices: _noop.NOOP,
    onItemHighlighted: _noop.NOOP,
    handleEnterSelection: _noop.NOOP,
    getItemProps() {
      return {};
    },
    forceMount: _noop.NOOP
  })).current;
  const onItemHighlighted = (0, _useEventCallback.useEventCallback)(onItemHighlightedProp);
  const onOpenChangeComplete = (0, _useEventCallback.useEventCallback)(onOpenChangeCompleteProp);
  const activeIndex = (0, _store.useStore)(store, _store2.selectors.activeIndex);
  const selectedIndex = (0, _store.useStore)(store, _store2.selectors.selectedIndex);
  const positionerElement = (0, _store.useStore)(store, _store2.selectors.positionerElement);
  const listElement = (0, _store.useStore)(store, _store2.selectors.listElement);
  const triggerElement = (0, _store.useStore)(store, _store2.selectors.triggerElement);
  const inputElement = (0, _store.useStore)(store, _store2.selectors.inputElement);
  const inline = (0, _store.useStore)(store, _store2.selectors.inline);
  const inputInsidePopup = (0, _store.useStore)(store, _store2.selectors.inputInsidePopup);
  const queryRef = React.useRef(query);
  const selectedValueRef = React.useRef(selectedValue);
  const inputValueRef = React.useRef(inputValue);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = (0, _useTransitionStatus.useTransitionStatus)(open);
  const {
    openMethod,
    triggerProps,
    reset: resetOpenInteractionType
  } = (0, _useOpenInteractionType.useOpenInteractionType)(open);
  const forceMount = (0, _useEventCallback.useEventCallback)(() => {
    if (items) {
      // Ensure typeahead works on a closed list.
      labelsRef.current = flatFilteredItems.map(item => (0, _utils2.stringifyItem)(item, itemToStringLabel));
    } else {
      store.set('forceMounted', true);
    }
  });
  const initialSelectedValueRef = React.useRef(selectedValue);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    // Ensure the values and labels are registered for programmatic value changes.
    if (selectedValue !== initialSelectedValueRef.current) {
      forceMount();
    }
  }, [forceMount, selectedValue, initialSelectedValueRef]);
  const updateValue = (0, _useEventCallback.useEventCallback)(nextValue => {
    clearErrors(name);
    setDirty(nextValue !== validityData.initialValue);
  });
  const formValue = selectionMode === 'none' ? inputValue : selectedValue;
  (0, _useField.useField)({
    id,
    commitValidation,
    value: formValue,
    controlRef: inputRef,
    name,
    getValue: () => formValue
  });
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (items) {
      valuesRef.current = flatFilteredItems;
      allValuesRef.current = flatItems;
      listRef.current.length = flatFilteredItems.length;
    }
  }, [items, flatFilteredItems, flatItems]);

  // When the available items change, ensure the selected value(s) remain valid.
  // - Single: if current selection is removed, fall back to defaultSelectedValue if it exists in the list; else null.
  // - Multiple: drop any removed selections.
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!items || selectionMode === 'none') {
      return;
    }
    const registry = flatItems;
    if (multiple) {
      const current = Array.isArray(selectedValue) ? selectedValue : _constants.EMPTY_ARRAY;
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
      const stringVal = (0, _utils2.stringifyItem)(fallback, itemToStringLabel);
      if (inputRef.current && inputRef.current.value !== stringVal) {
        setInputValueUnwrapped(stringVal);
      }
    }
  }, [items, flatItems, multiple, selectionMode, selectedValue, defaultSelectedValue, setSelectedValueUnwrapped, setInputValueUnwrapped, itemToStringLabel, store]);
  (0, _useValueChanged.useValueChanged)(queryRef, query, () => {
    if (!open || query === '' || query === String(defaultInputValue)) {
      return;
    }
    setQueryChangedAfterOpen(true);
  });
  (0, _useValueChanged.useValueChanged)(selectedValueRef, selectedValue, () => {
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
  (0, _useValueChanged.useValueChanged)(inputValueRef, inputValue, () => {
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
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (selectionMode === 'none') {
      setFilled(String(inputValue) !== '');
    } else {
      setFilled(multiple ? Array.isArray(selectedValue) && selectedValue.length > 0 : selectedValue != null);
    }
  }, [setFilled, selectionMode, inputValue, selectedValue, multiple]);
  const setIndices = (0, _useEventCallback.useEventCallback)(options => {
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
  const setInputValue = (0, _useEventCallback.useEventCallback)((next, eventDetails) => {
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
  const setOpen = (0, _useEventCallback.useEventCallback)((nextOpen, eventDetails) => {
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
  const setSelectedValue = (0, _useEventCallback.useEventCallback)((nextValue, eventDetails) => {
    // Cast to `any` due to conditional value type (single vs. multiple).
    // The runtime implementation already ensures the correct value shape.
    onSelectedValueChange?.(nextValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setSelectedValueUnwrapped(nextValue);
    const shouldFillInput = selectionMode === 'none' && popupRef.current && fillInputOnItemPress || selectionMode === 'single' && !store.state.inputInsidePopup;
    if (shouldFillInput) {
      setInputValue((0, _utils2.stringifyItem)(nextValue, itemToStringLabel), (0, _createBaseUIEventDetails.createBaseUIEventDetails)(eventDetails.reason, eventDetails.event));
    }
    const hadInputValue = inputRef.current ? inputRef.current.value.trim() !== '' : false;
    if (multiple && hadInputValue) {
      setInputValue('', (0, _createBaseUIEventDetails.createBaseUIEventDetails)(eventDetails.reason, eventDetails.event));
      // Reset active index and clear any highlighted item since the list will re-filter.
      setIndices({
        activeIndex: null
      });
    }
    if (selectionMode === 'single' && nextValue != null && eventDetails.reason !== 'input-change') {
      setOpen(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('item-press', eventDetails.event));
      if (queryChangedAfterOpen) {
        setCloseQuery(query);
      }
    }
  });
  const syncSelectedIndex = (0, _useEventCallback.useEventCallback)(() => {
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
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!open) {
      syncSelectedIndex();
    }
  }, [open, selectedValue, syncSelectedIndex]);
  const handleEnterSelection = (0, _useEventCallback.useEventCallback)(() => {
    if (activeIndex != null) {
      listRef.current[activeIndex]?.click();
    }
  });
  const handleUnmount = (0, _useEventCallback.useEventCallback)(() => {
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
      setInputValue('', (0, _createBaseUIEventDetails.createBaseUIEventDetails)('input-clear'));
      hadInputClearRef.current = false;
    }

    // If explicitly requested by a wrapper (e.g., FilterableMenu), clear the input
    // after close completes regardless of selection mode. This ensures the next open
    // starts from a blank query without requiring external state resets.
    if (props.clearInputOnCloseComplete && inputRef.current && inputRef.current.value !== '') {
      setInputValue('', (0, _createBaseUIEventDetails.createBaseUIEventDetails)('input-clear'));
    }

    // Multiple selection mode:
    // If the user typed a filter and didn't select in multiple mode, clear the input
    // after close completes to avoid mid-exit flicker and start fresh on next open.
    if (selectionMode === 'multiple' && inputRef.current && inputRef.current.value !== '') {
      setInputValue('', (0, _createBaseUIEventDetails.createBaseUIEventDetails)('input-clear'));
    }

    // Single selection mode:
    // - If input is rendered inside the popup, clear it so the next open is blank
    // - If input is outside the popup, sync it to the selected value
    if (selectionMode === 'single') {
      if (store.state.inputInsidePopup) {
        if (inputRef.current && inputRef.current.value !== '') {
          setInputValue('', (0, _createBaseUIEventDetails.createBaseUIEventDetails)('input-clear'));
        }
      } else {
        const stringVal = (0, _utils2.stringifyItem)(selectedValue, itemToStringLabel);
        if (inputRef.current && inputRef.current.value !== stringVal) {
          // If no selection was made, treat this as clearing the typed filter.
          const reason = stringVal === '' ? 'input-clear' : 'item-press';
          setInputValue(stringVal, (0, _createBaseUIEventDetails.createBaseUIEventDetails)(reason));
        }
      }
    }
  });
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
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
  const floatingRootContext = (0, _floatingUiReact.useFloatingRootContext)({
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
  const click = (0, _floatingUiReact.useClick)(floatingRootContext, {
    enabled: !readOnly && !disabled && openOnInputClick,
    event: 'mousedown-only',
    toggle: false,
    // Apply a small delay for touch to let iOS viewport centering settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: inputInsidePopup ? 0 : 50
  });
  const dismiss = (0, _floatingUiReact.useDismiss)(floatingRootContext, {
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
      const target = (0, _utils.getTarget)(event);
      return !(0, _utils.contains)(triggerElement, target) && !(0, _utils.contains)(clearRef.current, target) && !(0, _utils.contains)(chipsContainerRef.current, target);
    }
  });
  const listNavigation = (0, _floatingUiReact.useListNavigation)(floatingRootContext, {
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
    disabledIndices: virtualized ? index => index < 0 || index >= flatFilteredItems.length : _constants.EMPTY_ARRAY,
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
  } = (0, _floatingUiReact.useTypeahead)(floatingRootContext, {
    enabled: !open && !readOnly && !disabled && selectionMode === 'single',
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch(index) {
      const nextSelectedValue = valuesRef.current[index];
      if (nextSelectedValue !== undefined) {
        setSelectedValue(nextSelectedValue, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none'));
      }
    }
  });
  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = (0, _floatingUiReact.useInteractions)([role, click, dismiss, listNavigation]);
  (0, _useOnFirstRender.useOnFirstRender)(() => {
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
  const hiddenInputRef = (0, _useMergedRefs.useMergedRefs)(inputRefProp, fieldControlValidation.inputRef);
  const itemsContextValue = React.useMemo(() => ({
    query,
    filteredItems,
    flatFilteredItems
  }), [query, filteredItems, flatFilteredItems]);
  const serializedValue = React.useMemo(() => {
    if (Array.isArray(formValue)) {
      return '';
    }
    return (0, _utils2.stringifyItemValue)(formValue, itemToStringValue);
  }, [formValue, itemToStringValue]);
  const hiddenInputs = React.useMemo(() => {
    if (!multiple || !Array.isArray(selectedValue) || !name) {
      return null;
    }
    return selectedValue.map(value => {
      const currentSerializedValue = (0, _utils2.stringifyItemValue)(value, itemToStringValue);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        type: "hidden",
        name: name,
        value: currentSerializedValue
      }, currentSerializedValue);
    });
  }, [multiple, selectedValue, name, itemToStringValue]);
  const children = /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [props.children, /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
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
          const details = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('input-change', event.nativeEvent);
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
        style: _visuallyHidden.visuallyHidden,
        tabIndex: -1,
        'aria-hidden': true
      })
    }), hiddenInputs]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ComboboxRootContext.ComboboxRootContext.Provider, {
    value: store,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ComboboxRootContext.ComboboxFloatingContext.Provider, {
      value: floatingRootContext,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ComboboxRootContext.ComboboxDerivedItemsContext.Provider, {
        value: itemsContextValue,
        children: virtualized ? children : /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeList.CompositeList, {
          elementsRef: listRef,
          labelsRef: items ? undefined : labelsRef,
          children: children
        })
      })
    })
  });
}