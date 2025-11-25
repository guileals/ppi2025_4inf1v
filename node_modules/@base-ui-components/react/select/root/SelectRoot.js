"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectRoot = SelectRoot;
var React = _interopRequireWildcard(require("react"));
var _visuallyHidden = require("@base-ui-components/utils/visuallyHidden");
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _useSelectRoot = require("./useSelectRoot");
var _SelectRootContext = require("./SelectRootContext");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _serializeValue = require("../../utils/serializeValue");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Groups all parts of the select.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
function SelectRoot(props) {
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
  } = (0, _useSelectRoot.useSelectRoot)({
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
  } = (0, _FieldRootContext.useFieldRootContext)();
  const ref = (0, _useMergedRefs.useMergedRefs)(inputRef, rootContext.fieldControlValidation.inputRef);
  const serializedValue = React.useMemo(() => {
    if (isMultiple && Array.isArray(value) && value.length === 0) {
      return '';
    }
    return (0, _serializeValue.serializeValue)(value);
  }, [isMultiple, value]);
  const hiddenInputs = React.useMemo(() => {
    if (!isMultiple || !Array.isArray(value) || !rootContext.name) {
      return null;
    }
    return value.map(v => {
      const currentSerializedValue = (0, _serializeValue.serializeValue)(v);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        type: "hidden",
        name: rootContext.name,
        value: currentSerializedValue
      }, currentSerializedValue);
    });
  }, [isMultiple, value, rootContext.name]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectRootContext.SelectRootContext.Provider, {
    value: rootContext,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SelectRootContext.SelectFloatingContext.Provider, {
      value: floatingContext,
      children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
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
                  rootContext.setValue?.(exactValue, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent));
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
          style: _visuallyHidden.visuallyHidden,
          tabIndex: -1,
          'aria-hidden': true
        })
      }), hiddenInputs]
    })
  });
}