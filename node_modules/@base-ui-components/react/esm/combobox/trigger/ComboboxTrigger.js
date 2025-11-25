'use client';

import * as React from 'react';
import { useStore } from '@base-ui-components/utils/store';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useTimeout } from '@base-ui-components/utils/useTimeout';
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useButton } from "../../use-button/index.js";
import { useComboboxRootContext } from "../root/ComboboxRootContext.js";
import { selectors } from "../store.js";
import { useFieldRootContext } from "../../field/root/FieldRootContext.js";
import { pressableTriggerOpenStateMapping } from "../../utils/popupStateMapping.js";
import { stopEvent } from "../../floating-ui-react/utils.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { fieldValidityMapping } from "../../field/utils/constants.js";
const customStyleHookMapping = {
  ...pressableTriggerOpenStateMapping,
  ...fieldValidityMapping
};

/**
 * A button that opens the popup.
 * Renders a `<button>` element.
 */
export const ComboboxTrigger = /*#__PURE__*/React.forwardRef(function ComboboxTrigger(componentProps, forwardedRef) {
  const {
    render,
    className,
    nativeButton = true,
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
  } = useFieldRootContext();
  const store = useComboboxRootContext();
  const selectionMode = useStore(store, selectors.selectionMode);
  const fieldControlValidation = useStore(store, selectors.fieldControlValidation);
  const comboboxDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const listElement = useStore(store, selectors.listElement);
  const triggerProps = useStore(store, selectors.triggerProps);
  const typeaheadTriggerProps = useStore(store, selectors.typeaheadTriggerProps);
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup);
  const open = useStore(store, selectors.open);
  const selectedValue = useStore(store, selectors.selectedValue);
  const inputValue = useStore(store, selectors.inputValue);
  const disabled = fieldDisabled || comboboxDisabled || disabledProp;
  const focusTimeout = useTimeout();
  const currentPointerTypeRef = React.useRef('');
  const trackPointerType = useEventCallback(event => {
    currentPointerTypeRef.current = event.pointerType;
  });
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    native: nativeButton,
    disabled
  });
  const state = React.useMemo(() => ({
    ...fieldState,
    open,
    disabled
  }), [fieldState, open, disabled]);
  const setTriggerElement = useEventCallback(element => {
    store.set('triggerElement', element);
  });
  const element = useRenderElement('button', componentProps, {
    ref: [forwardedRef, buttonRef, setTriggerElement],
    state,
    props: [triggerProps, typeaheadTriggerProps, {
      tabIndex: inputInsidePopup ? 0 : -1,
      disabled,
      'aria-expanded': open ? 'true' : 'false',
      'aria-haspopup': inputInsidePopup ? 'dialog' : 'listbox',
      'aria-controls': open ? listElement?.id : undefined,
      'aria-readonly': readOnly || undefined,
      'aria-labelledby': labelId,
      onPointerDown: trackPointerType,
      onPointerEnter: trackPointerType,
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
        if (disabled || readOnly) {
          return;
        }
        focusTimeout.start(0, () => store.state.forceMount());
      },
      onMouseDown(event) {
        if (disabled || readOnly) {
          return;
        }

        // Ensure items are registered for initial selection highlight.
        store.state.forceMount();
        if (!store.state.inputInsidePopup) {
          event.preventDefault();
        }
      },
      onClick(event) {
        if (disabled || readOnly) {
          return;
        }
        store.state.setOpen(!open, createBaseUIEventDetails('trigger-press', event.nativeEvent));
        if (currentPointerTypeRef.current !== 'touch') {
          store.state.inputRef.current?.focus();
        }
      },
      onKeyDown(event) {
        if (disabled || readOnly) {
          return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          stopEvent(event);
          store.state.setOpen(true, createBaseUIEventDetails('list-navigation', event.nativeEvent));
          store.state.inputRef.current?.focus();
        }
      }
    }, fieldControlValidation ? fieldControlValidation.getValidationProps(elementProps) : elementProps, getButtonProps],
    customStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ComboboxTrigger.displayName = "ComboboxTrigger";