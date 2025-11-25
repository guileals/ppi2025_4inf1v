'use client';

import * as React from 'react';
import { visuallyHidden } from '@base-ui-components/utils/visuallyHidden';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useSelectRoot } from "./useSelectRoot.js";
import { SelectRootContext, SelectFloatingContext } from "./SelectRootContext.js";
import { useFieldRootContext } from "../../field/root/FieldRootContext.js";
import { serializeValue } from "../../utils/serializeValue.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Groups all parts of the select.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export function SelectRoot(props) {
  const {
    id,
    value: valueProp,
    defaultValue = null,
    onValueChange,
    open,
    defaultOpen = false,
    onOpenChange,
    name,
    disabled = false,
    readOnly = false,
    required = false,
    modal = true,
    actionsRef,
    inputRef,
    onOpenChangeComplete,
    items,
    multiple,
    children
  } = props;
  const {
    rootContext,
    floatingContext,
    value
  } = useSelectRoot({
    id,
    value: valueProp,
    defaultValue,
    onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    name,
    disabled,
    readOnly,
    required,
    modal,
    actionsRef,
    onOpenChangeComplete,
    items,
    multiple
  });
  const store = rootContext.store;
  const isMultiple = multiple ?? false;
  const {
    setDirty,
    validityData,
    validationMode,
    controlId
  } = useFieldRootContext();
  const ref = useMergedRefs(inputRef, rootContext.fieldControlValidation.inputRef);
  const serializedValue = React.useMemo(() => {
    if (isMultiple && Array.isArray(value) && value.length === 0) {
      return '';
    }
    return serializeValue(value);
  }, [isMultiple, value]);
  const hiddenInputs = React.useMemo(() => {
    if (!isMultiple || !Array.isArray(value) || !rootContext.name) {
      return null;
    }
    return value.map(v => {
      const currentSerializedValue = serializeValue(v);
      return /*#__PURE__*/_jsx("input", {
        type: "hidden",
        name: rootContext.name,
        value: currentSerializedValue
      }, currentSerializedValue);
    });
  }, [isMultiple, value, rootContext.name]);
  return /*#__PURE__*/_jsx(SelectRootContext.Provider, {
    value: rootContext,
    children: /*#__PURE__*/_jsxs(SelectFloatingContext.Provider, {
      value: floatingContext,
      children: [children, /*#__PURE__*/_jsx("input", {
        ...rootContext.fieldControlValidation.getInputValidationProps({
          onFocus() {
            // Move focus to the trigger element when the hidden input is focused.
            store.state.triggerElement?.focus();
          },
          // Handle browser autofill.
          onChange(event) {
            // Workaround for https://github.com/facebook/react/issues/9023
            if (event.nativeEvent.defaultPrevented) {
              return;
            }
            const nextValue = event.target.value;
            store.set('forceMount', true);
            queueMicrotask(() => {
              if (isMultiple) {
                // Browser autofill only ever writes one scalar value per field.
                // Because a multi-select expects an array, every mainstream engine skips it.
                // Reliably pre-selecting multiple options therefore has to be done in
                // application code, not via browser autofill.
              } else {
                // Handle single selection
                const exactValue = rootContext.valuesRef.current.find(v => v === nextValue || typeof value === 'string' && nextValue.toLowerCase() === v.toLowerCase());
                if (exactValue != null) {
                  setDirty(exactValue !== validityData.initialValue);
                  rootContext.setValue?.(exactValue, createBaseUIEventDetails('none', event.nativeEvent));
                  if (validationMode === 'onChange') {
                    rootContext.fieldControlValidation.commitValidation(exactValue);
                  }
                }
              }
            });
          },
          id: id || controlId || undefined,
          name: isMultiple ? undefined : rootContext.name,
          value: serializedValue,
          disabled: rootContext.disabled,
          required: rootContext.required,
          readOnly: rootContext.readOnly,
          ref,
          style: visuallyHidden,
          tabIndex: -1,
          'aria-hidden': true
        })
      }), hiddenInputs]
    })
  });
}