"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxInput = void 0;
var React = _interopRequireWildcard(require("react"));
var _store = require("@base-ui-components/utils/store");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useRenderElement = require("../../utils/useRenderElement");
var _ComboboxRootContext = require("../root/ComboboxRootContext");
var _store2 = require("../store");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _constants = require("../../field/utils/constants");
var _ComboboxChipsContext = require("../chips/ComboboxChipsContext");
var _utils = require("../../floating-ui-react/utils");
var _ComboboxPositionerContext = require("../positioner/ComboboxPositionerContext");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
const customStyleHookMapping = {
  ..._popupStateMapping.pressableTriggerOpenStateMapping,
  ..._constants.fieldValidityMapping
};

/**
 * A text input to search for items in the list.
 * Renders an `<input>` element.
 */
const ComboboxInput = exports.ComboboxInput = /*#__PURE__*/React.forwardRef(function ComboboxInput(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp = false,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState,
    disabled: fieldDisabled,
    labelId,
    setTouched,
    setFocused,
    validationMode
  } = (0, _FieldRootContext.useFieldRootContext)();
  const comboboxChipsContext = (0, _ComboboxChipsContext.useComboboxChipsContext)();
  const hasPositionerParent = Boolean((0, _ComboboxPositionerContext.useComboboxPositionerContext)(true));
  const store = (0, _ComboboxRootContext.useComboboxRootContext)();
  const comboboxDisabled = (0, _store.useStore)(store, _store2.selectors.disabled);
  const readOnly = (0, _store.useStore)(store, _store2.selectors.readOnly);
  const fieldControlValidation = (0, _store.useStore)(store, _store2.selectors.fieldControlValidation);
  const openOnInputClick = (0, _store.useStore)(store, _store2.selectors.openOnInputClick);
  const name = (0, _store.useStore)(store, _store2.selectors.name);
  const selectionMode = (0, _store.useStore)(store, _store2.selectors.selectionMode);
  const autoHighlight = (0, _store.useStore)(store, _store2.selectors.autoHighlight);
  const inputProps = (0, _store.useStore)(store, _store2.selectors.inputProps);
  const triggerProps = (0, _store.useStore)(store, _store2.selectors.triggerProps);
  const open = (0, _store.useStore)(store, _store2.selectors.open);
  const selectedValue = (0, _store.useStore)(store, _store2.selectors.selectedValue);
  const inputValue = (0, _store.useStore)(store, _store2.selectors.inputValue);
  const [composingValue, setComposingValue] = React.useState(null);
  const isComposingRef = React.useRef(false);
  const disabled = fieldDisabled || comboboxDisabled || disabledProp;
  const setInputElement = (0, _useEventCallback.useEventCallback)(element => {
    store.apply({
      inputElement: element,
      inputInsidePopup: hasPositionerParent
    });
  });
  const state = React.useMemo(() => ({
    ...fieldState,
    open,
    disabled,
    readOnly
  }), [fieldState, open, disabled, readOnly]);
  function handleKeyDown(event) {
    if (!comboboxChipsContext) {
      return undefined;
    }
    let nextIndex;
    const {
      highlightedChipIndex
    } = comboboxChipsContext;
    if (highlightedChipIndex !== undefined) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (highlightedChipIndex > 0) {
          nextIndex = highlightedChipIndex - 1;
        } else {
          nextIndex = undefined;
        }
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (highlightedChipIndex < selectedValue.length - 1) {
          nextIndex = highlightedChipIndex + 1;
        } else {
          nextIndex = undefined;
        }
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        // Move highlight appropriately after removal.
        const computedNextIndex = highlightedChipIndex >= selectedValue.length - 1 ? selectedValue.length - 2 : highlightedChipIndex;
        // If the computed index is negative, treat it as no highlight.
        nextIndex = computedNextIndex >= 0 ? computedNextIndex : undefined;
        store.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: 'keyboard'
        });
      }
      return nextIndex;
    }

    // Handle navigation when no chip is highlighted
    if (event.key === 'ArrowLeft' && (event.currentTarget.selectionStart ?? 0) === 0 && selectedValue.length > 0) {
      event.preventDefault();
      const lastChipIndex = Math.max(selectedValue.length - 1, 0);
      nextIndex = lastChipIndex;
    } else if (event.key === 'Backspace' && event.currentTarget.value === '' && selectedValue.length > 0) {
      store.state.setIndices({
        activeIndex: null,
        selectedIndex: null,
        type: 'keyboard'
      });
      event.preventDefault();
    }
    return nextIndex;
  }
  const element = (0, _useRenderElement.useRenderElement)('input', componentProps, {
    state,
    ref: [forwardedRef, store.state.inputRef, setInputElement],
    props: [inputProps, triggerProps, {
      type: 'text',
      value: componentProps.value ?? composingValue ?? inputValue,
      'aria-readonly': readOnly || undefined,
      'aria-labelledby': labelId,
      disabled,
      readOnly,
      ...(selectionMode === 'none' && name && {
        name
      }),
      onFocus() {
        setFocused(true);
      },
      onBlur() {
        setTouched(true);
        setFocused(false);
        if (validationMode === 'onBlur') {
          const valueToValidate = selectionMode === 'none' ? inputValue : selectedValue;
          fieldControlValidation?.commitValidation(valueToValidate);
        }
      },
      onCompositionStart(event) {
        isComposingRef.current = true;
        setComposingValue(event.currentTarget.value);
      },
      onCompositionEnd(event) {
        isComposingRef.current = false;
        const next = event.currentTarget.value;
        setComposingValue(null);
        store.state.setInputValue(next, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('input-change', event.nativeEvent));
      },
      onChange(event) {
        // During IME composition, avoid propagating controlled updates to preserve
        // its state.
        if (isComposingRef.current) {
          const nextVal = event.currentTarget.value;
          setComposingValue(nextVal);
          if (nextVal === '' && !openOnInputClick && !hasPositionerParent) {
            store.state.setOpen(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('input-clear', event.nativeEvent));
          }
          if (!readOnly && !disabled) {
            const trimmed = nextVal.trim();
            if (trimmed !== '') {
              store.state.setOpen(true, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent));
              if (!(selectionMode === 'none' && autoHighlight)) {
                store.state.setIndices({
                  activeIndex: null,
                  selectedIndex: null,
                  type: store.state.keyboardActiveRef.current ? 'keyboard' : 'pointer'
                });
              }
            }
          }
          if (open && store.state.activeIndex !== null && !(selectionMode === 'none' && autoHighlight && nextVal.trim() !== '')) {
            store.state.setIndices({
              activeIndex: null,
              selectedIndex: null,
              type: store.state.keyboardActiveRef.current ? 'keyboard' : 'pointer'
            });
          }
          return;
        }
        store.state.setInputValue(event.currentTarget.value, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('input-change', event.nativeEvent));
        if (event.currentTarget.value === '' && !openOnInputClick && !hasPositionerParent) {
          store.state.setOpen(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('input-clear', event.nativeEvent));
        }
        if (!readOnly && !disabled) {
          const trimmed = event.currentTarget.value.trim();
          if (trimmed !== '') {
            store.state.setOpen(true, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent));
            // When autoHighlight is enabled for autocomplete, keep the highlight (will be set to 0 in root).
            if (!(selectionMode === 'none' && autoHighlight)) {
              store.state.setIndices({
                activeIndex: null,
                selectedIndex: null,
                type: store.state.keyboardActiveRef.current ? 'keyboard' : 'pointer'
              });
            }
          }
        }

        // When the user types, ensure the list resets its highlight so that
        // virtual focus returns to the input (aria-activedescendant is
        // cleared).
        if (open && store.state.activeIndex !== null && !(selectionMode === 'none' && autoHighlight && event.currentTarget.value.trim() !== '')) {
          store.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: store.state.keyboardActiveRef.current ? 'keyboard' : 'pointer'
          });
        }
      },
      onKeyDown(event) {
        if (disabled || readOnly) {
          return;
        }
        if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
          return;
        }
        store.state.keyboardActiveRef.current = true;
        if (event.key === 'Home') {
          (0, _utils.stopEvent)(event);
          event.currentTarget.setSelectionRange(0, 0);
          return;
        }
        if (event.key === 'End') {
          (0, _utils.stopEvent)(event);
          const length = event.currentTarget.value.length;
          event.currentTarget.setSelectionRange(length, length);
          return;
        }
        if (!open && event.key === 'Escape') {
          const isClear = selectionMode === 'multiple' && Array.isArray(selectedValue) ? selectedValue.length === 0 : selectedValue === null;
          const details = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent);
          const value = selectionMode === 'multiple' ? [] : null;
          store.state.setInputValue('', details);
          store.state.setSelectedValue(value, details);
          if (!isClear && !store.state.inline && !details.isPropagationAllowed) {
            event.stopPropagation();
          }
          return;
        }

        // Handle deletion when no chip is highlighted and the input is empty.
        if (comboboxChipsContext && event.key === 'Backspace' && event.currentTarget.value === '' && comboboxChipsContext.highlightedChipIndex === undefined && Array.isArray(selectedValue) && selectedValue.length > 0) {
          const newValue = selectedValue.slice(0, -1);
          // If the removed item was also the active (highlighted) item, clear highlight
          store.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: store.state.keyboardActiveRef.current ? 'keyboard' : 'pointer'
          });
          store.state.setSelectedValue(newValue, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent));
          return;
        }
        const nextIndex = handleKeyDown(event);
        comboboxChipsContext?.setHighlightedChipIndex(nextIndex);
        if (nextIndex !== undefined) {
          comboboxChipsContext?.chipsRef.current[nextIndex]?.focus();
        } else {
          store.state.inputRef.current?.focus();
        }

        // event.isComposing
        if (event.which === 229) {
          return;
        }
        if (event.key === 'Enter' && open) {
          (0, _utils.stopEvent)(event);
          if (store.state.activeIndex === null) {
            store.state.setOpen(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent));
            return;
          }
          store.state.handleEnterSelection(event.nativeEvent);
        }
      },
      onPointerMove() {
        store.state.keyboardActiveRef.current = false;
      },
      onPointerDown() {
        store.state.keyboardActiveRef.current = false;
      }
    }, fieldControlValidation ? fieldControlValidation.getValidationProps(elementProps) : elementProps],
    customStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ComboboxInput.displayName = "ComboboxInput";