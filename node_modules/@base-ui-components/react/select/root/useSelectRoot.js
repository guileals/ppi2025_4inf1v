"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelectRoot = useSelectRoot;
var React = _interopRequireWildcard(require("react"));
var _useRefWithInit = require("@base-ui-components/utils/useRefWithInit");
var _useOnFirstRender = require("@base-ui-components/utils/useOnFirstRender");
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _warn = require("@base-ui-components/utils/warn");
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _store = require("@base-ui-components/utils/store");
var _floatingUiReact = require("../../floating-ui-react");
var _useFieldControlValidation = require("../../field/control/useFieldControlValidation");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _useTransitionStatus = require("../../utils/useTransitionStatus");
var _store2 = require("../store");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _FormContext = require("../../form/FormContext");
var _useField = require("../../field/useField");
var _constants = require("../../utils/constants");
function useSelectRoot(params) {
  const {
    id: idProp,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    modal = false,
    name: nameProp,
    onOpenChangeComplete,
    items,
    multiple = false
  } = params;
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
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    setControlId(id);
    return () => {
      setControlId(undefined);
    };
  }, [id, setControlId]);
  const [value, setValueUnwrapped] = (0, _useControlled.useControlled)({
    controlled: params.value,
    default: multiple ? params.defaultValue ?? _constants.EMPTY_ARRAY : params.defaultValue,
    name: 'Select',
    state: 'value'
  });
  const [open, setOpenUnwrapped] = (0, _useControlled.useControlled)({
    controlled: params.open,
    default: params.defaultOpen,
    name: 'Select',
    state: 'open'
  });
  const listRef = React.useRef([]);
  const labelsRef = React.useRef([]);
  const popupRef = React.useRef(null);
  const valueRef = React.useRef(null);
  const valuesRef = React.useRef([]);
  const typingRef = React.useRef(false);
  const keyboardActiveRef = React.useRef(false);
  const selectedItemTextRef = React.useRef(null);
  const lastSelectedIndexRef = React.useRef(null);
  const selectionRef = React.useRef({
    allowSelectedMouseUp: false,
    allowUnselectedMouseUp: false
  });
  const hasRegisteredRef = React.useRef(false);
  const alignItemWithTriggerActiveRef = React.useRef(false);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = (0, _useTransitionStatus.useTransitionStatus)(open);
  const store = (0, _useRefWithInit.useRefWithInit)(() => new _store.Store({
    id,
    modal,
    multiple,
    value,
    label: '',
    open,
    mounted,
    forceMount: false,
    transitionStatus,
    items,
    touchModality: false,
    activeIndex: null,
    selectedIndex: null,
    popupProps: {},
    triggerProps: {},
    triggerElement: null,
    positionerElement: null,
    scrollUpArrowVisible: false,
    scrollDownArrowVisible: false
  })).current;
  const initialValueRef = React.useRef(value);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    // Ensure the values and labels are registered for programmatic value changes.
    if (value !== initialValueRef.current) {
      store.set('forceMount', true);
    }
  }, [store, value]);
  const activeIndex = (0, _store.useStore)(store, _store2.selectors.activeIndex);
  const selectedIndex = (0, _store.useStore)(store, _store2.selectors.selectedIndex);
  const triggerElement = (0, _store.useStore)(store, _store2.selectors.triggerElement);
  const positionerElement = (0, _store.useStore)(store, _store2.selectors.positionerElement);
  const controlRef = (0, _useLatestRef.useLatestRef)(store.state.triggerElement);
  const commitValidation = fieldControlValidation.commitValidation;
  (0, _useField.useField)({
    id,
    commitValidation,
    value,
    controlRef,
    name,
    getValue: () => value
  });
  const prevValueRef = React.useRef(value);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    setFilled(value !== null);
  }, [value, setFilled]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (prevValueRef.current === value) {
      return;
    }
    if (multiple) {
      // For multiple selection, update the label and keep track of the last selected
      // item via `selectedIndex`, which is needed when the popup (re)opens.
      const currentValue = Array.isArray(value) ? value : [];
      const labels = currentValue.map(v => {
        const index = valuesRef.current.indexOf(v);
        return index !== -1 ? labelsRef.current[index] ?? '' : '';
      }).filter(Boolean);
      const lastValue = currentValue[currentValue.length - 1];
      const lastIndex = lastValue != null ? valuesRef.current.indexOf(lastValue) : -1;

      // Store the last selected index for later use when closing the popup.
      lastSelectedIndexRef.current = lastIndex === -1 ? null : lastIndex;
      store.apply({
        label: labels.join(', ')
      });
    } else {
      const index = valuesRef.current.indexOf(value);
      store.apply({
        selectedIndex: index === -1 ? null : index,
        label: labelsRef.current[index] ?? ''
      });
    }
    clearErrors(name);
    setDirty(value !== validityData.initialValue);
    commitValidation(value, validationMode !== 'onChange');
    if (validationMode === 'onChange') {
      commitValidation(value);
    }
  }, [value, commitValidation, clearErrors, name, validationMode, store, setDirty, validityData.initialValue, setFilled, multiple]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    prevValueRef.current = value;
  }, [value]);
  const setOpen = (0, _useEventCallback.useEventCallback)((nextOpen, eventDetails) => {
    params.onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setOpenUnwrapped(nextOpen);

    // The active index will sync to the last selected index on the next open.
    if (!nextOpen && multiple) {
      store.set('selectedIndex', lastSelectedIndexRef.current);
    }

    // Workaround `enableFocusInside` in Floating UI setting `tabindex=0` of a non-highlighted
    // option upon close when tabbing out due to `keepMounted=true`:
    // https://github.com/floating-ui/floating-ui/pull/3004/files#diff-962a7439cdeb09ea98d4b622a45d517bce07ad8c3f866e089bda05f4b0bbd875R194-R199
    // This otherwise causes options to retain `tabindex=0` incorrectly when the popup is closed
    // when tabbing outside.
    if (!nextOpen && store.state.activeIndex !== null) {
      const activeOption = listRef.current[store.state.activeIndex];
      // Wait for Floating UI's focus effect to have fired
      queueMicrotask(() => {
        activeOption?.setAttribute('tabindex', '-1');
      });
    }
  });
  const handleUnmount = (0, _useEventCallback.useEventCallback)(() => {
    setMounted(false);
    store.set('activeIndex', null);
    onOpenChangeComplete?.(false);
  });
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
    enabled: !params.actionsRef,
    open,
    ref: popupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  React.useImperativeHandle(params.actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  const setValue = (0, _useEventCallback.useEventCallback)((nextValue, eventDetails) => {
    params.onValueChange?.(nextValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(nextValue);
  });

  /**
   * Keeps `store.selectedIndex` and `store.label` in sync with the current `value`.
   * Does nothing until at least one item has reported its index (so that
   * `valuesRef`/`labelsRef` are populated).
   */
  const syncSelectedState = (0, _useEventCallback.useEventCallback)(() => {
    if (!hasRegisteredRef.current) {
      return;
    }
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      const labels = currentValue.map(v => {
        const index = valuesRef.current.indexOf(v);
        return index !== -1 ? labelsRef.current[index] ?? '' : '';
      }).filter(Boolean);
      const lastValue = currentValue[currentValue.length - 1];
      const lastIndex = lastValue !== undefined ? valuesRef.current.indexOf(lastValue) : -1;

      // Store the last selected index for later use when closing the popup.
      lastSelectedIndexRef.current = lastIndex === -1 ? null : lastIndex;
      let computedSelectedIndex = store.state.selectedIndex;
      if (computedSelectedIndex === null) {
        computedSelectedIndex = lastIndex === -1 ? null : lastIndex;
      }
      store.apply({
        selectedIndex: computedSelectedIndex,
        label: labels.join(', ')
      });
    } else {
      const index = valuesRef.current.indexOf(value);
      const hasIndex = index !== -1;
      if (hasIndex || value === null) {
        store.apply({
          selectedIndex: hasIndex ? index : null,
          label: hasIndex ? labelsRef.current[index] ?? '' : ''
        });
        return;
      }
      if (process.env.NODE_ENV !== 'production') {
        if (value) {
          const stringValue = typeof value === 'string' || value === null ? value : JSON.stringify(value);
          (0, _warn.warn)(`The value \`${stringValue}\` is not present in the select items.`);
        }
      }
    }
  });

  /**
   * Called by each <Select.Item> once it knows its stable index. After the first
   * call, the root is able to resolve labels and selected indices.
   */
  const registerItemIndex = (0, _useEventCallback.useEventCallback)(index => {
    hasRegisteredRef.current = true;
    if (multiple) {
      // Store the last selected item index so that the popup can restore focus
      // when it re-opens.
      lastSelectedIndexRef.current = index;
    }
    syncSelectedState();
  });

  // Keep store in sync whenever `value` changes after registration.
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(syncSelectedState, [value, syncSelectedState]);
  const handleScrollArrowVisibility = (0, _useEventCallback.useEventCallback)(() => {
    const popupElement = popupRef.current;
    if (!popupElement) {
      return;
    }
    const viewportTop = popupElement.scrollTop;
    const viewportBottom = popupElement.scrollTop + popupElement.clientHeight;
    const shouldShowUp = viewportTop > 1;
    const shouldShowDown = viewportBottom < popupElement.scrollHeight - 1;
    if (store.state.scrollUpArrowVisible !== shouldShowUp) {
      store.set('scrollUpArrowVisible', shouldShowUp);
    }
    if (store.state.scrollDownArrowVisible !== shouldShowDown) {
      store.set('scrollDownArrowVisible', shouldShowDown);
    }
  });
  const floatingContext = (0, _floatingUiReact.useFloatingRootContext)({
    open,
    onOpenChange: setOpen,
    elements: {
      reference: triggerElement,
      floating: positionerElement
    }
  });
  const click = (0, _floatingUiReact.useClick)(floatingContext, {
    enabled: !readOnly && !disabled,
    event: 'mousedown'
  });
  const dismiss = (0, _floatingUiReact.useDismiss)(floatingContext, {
    bubbles: false
  });
  const role = (0, _floatingUiReact.useRole)(floatingContext, {
    role: 'select'
  });
  const listNavigation = (0, _floatingUiReact.useListNavigation)(floatingContext, {
    enabled: !readOnly && !disabled,
    listRef,
    activeIndex,
    selectedIndex,
    disabledIndices: _constants.EMPTY_ARRAY,
    onNavigate(nextActiveIndex) {
      // Retain the highlight while transitioning out.
      if (nextActiveIndex === null && !open) {
        return;
      }
      store.set('activeIndex', nextActiveIndex);
    },
    // Implement our own listeners since `onPointerLeave` on each option fires while scrolling with
    // the `alignItemWithTrigger=true`, causing a performance issue on Chrome.
    focusItemOnHover: false
  });
  const typeahead = (0, _floatingUiReact.useTypeahead)(floatingContext, {
    enabled: !readOnly && !disabled && (open || !multiple),
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch(index) {
      if (open) {
        store.set('activeIndex', index);
      } else {
        setValue(valuesRef.current[index], (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none'));
      }
    },
    onTypingChange(typing) {
      // FIXME: Floating UI doesn't support allowing space to select an item while the popup is
      // closed and the trigger isn't a native <button>.
      typingRef.current = typing;
    }
  });
  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = (0, _floatingUiReact.useInteractions)([click, dismiss, role, listNavigation, typeahead]);
  (0, _useOnFirstRender.useOnFirstRender)(() => {
    // These should be initialized at store creation, but there is an interdependency
    // between some values used in floating hooks above.
    store.apply({
      popupProps: getFloatingProps(),
      triggerProps: getReferenceProps()
    });
  });

  // Store values that depend on other hooks
  React.useEffect(() => {
    store.apply({
      id,
      modal,
      multiple,
      value,
      open,
      mounted,
      transitionStatus,
      popupProps: getFloatingProps(),
      triggerProps: getReferenceProps(),
      items
    });
  }, [store, id, modal, multiple, value, open, mounted, transitionStatus, getFloatingProps, getReferenceProps, items]);
  const rootContext = React.useMemo(() => ({
    store,
    name,
    required,
    disabled,
    readOnly,
    multiple,
    setValue,
    setOpen,
    listRef,
    popupRef,
    handleScrollArrowVisibility,
    getItemProps,
    events: floatingContext.events,
    valueRef,
    valuesRef,
    labelsRef,
    typingRef,
    selectionRef,
    selectedItemTextRef,
    fieldControlValidation,
    registerItemIndex,
    onOpenChangeComplete,
    keyboardActiveRef,
    alignItemWithTriggerActiveRef,
    initialValueRef
  }), [store, name, required, disabled, readOnly, multiple, setValue, setOpen, listRef, popupRef, getItemProps, floatingContext.events, valueRef, valuesRef, labelsRef, typingRef, selectionRef, selectedItemTextRef, fieldControlValidation, registerItemIndex, onOpenChangeComplete, keyboardActiveRef, alignItemWithTriggerActiveRef, handleScrollArrowVisibility]);
  return {
    rootContext,
    floatingContext,
    value
  };
}