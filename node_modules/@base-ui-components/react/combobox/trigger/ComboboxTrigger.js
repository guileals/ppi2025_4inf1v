"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxTrigger = void 0;
var React = _interopRequireWildcard(require("react"));
var _store = require("@base-ui-components/utils/store");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _useRenderElement = require("../../utils/useRenderElement");
var _useButton = require("../../use-button");
var _ComboboxRootContext = require("../root/ComboboxRootContext");
var _store2 = require("../store");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _utils = require("../../floating-ui-react/utils");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _constants = require("../../field/utils/constants");
const customStyleHookMapping = {
  ..._popupStateMapping.pressableTriggerOpenStateMapping,
  ..._constants.fieldValidityMapping
};

/**
 * A button that opens the popup.
 * Renders a `<button>` element.
 */
const ComboboxTrigger = exports.ComboboxTrigger = /*#__PURE__*/React.forwardRef(function ComboboxTrigger(componentProps, forwardedRef) {
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
  } = (0, _FieldRootContext.useFieldRootContext)();
  const store = (0, _ComboboxRootContext.useComboboxRootContext)();
  const selectionMode = (0, _store.useStore)(store, _store2.selectors.selectionMode);
  const fieldControlValidation = (0, _store.useStore)(store, _store2.selectors.fieldControlValidation);
  const comboboxDisabled = (0, _store.useStore)(store, _store2.selectors.disabled);
  const readOnly = (0, _store.useStore)(store, _store2.selectors.readOnly);
  const listElement = (0, _store.useStore)(store, _store2.selectors.listElement);
  const triggerProps = (0, _store.useStore)(store, _store2.selectors.triggerProps);
  const typeaheadTriggerProps = (0, _store.useStore)(store, _store2.selectors.typeaheadTriggerProps);
  const inputInsidePopup = (0, _store.useStore)(store, _store2.selectors.inputInsidePopup);
  const open = (0, _store.useStore)(store, _store2.selectors.open);
  const selectedValue = (0, _store.useStore)(store, _store2.selectors.selectedValue);
  const inputValue = (0, _store.useStore)(store, _store2.selectors.inputValue);
  const disabled = fieldDisabled || comboboxDisabled || disabledProp;
  const focusTimeout = (0, _useTimeout.useTimeout)();
  const currentPointerTypeRef = React.useRef('');
  const trackPointerType = (0, _useEventCallback.useEventCallback)(event => {
    currentPointerTypeRef.current = event.pointerType;
  });
  const {
    buttonRef,
    getButtonProps
  } = (0, _useButton.useButton)({
    native: nativeButton,
    disabled
  });
  const state = React.useMemo(() => ({
    ...fieldState,
    open,
    disabled
  }), [fieldState, open, disabled]);
  const setTriggerElement = (0, _useEventCallback.useEventCallback)(element => {
    store.set('triggerElement', element);
  });
  const element = (0, _useRenderElement.useRenderElement)('button', componentProps, {
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
        store.state.setOpen(!open, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('trigger-press', event.nativeEvent));
        if (currentPointerTypeRef.current !== 'touch') {
          store.state.inputRef.current?.focus();
        }
      },
      onKeyDown(event) {
        if (disabled || readOnly) {
          return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          (0, _utils.stopEvent)(event);
          store.state.setOpen(true, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('list-navigation', event.nativeEvent));
          store.state.inputRef.current?.focus();
        }
      }
    }, fieldControlValidation ? fieldControlValidation.getValidationProps(elementProps) : elementProps, getButtonProps],
    customStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ComboboxTrigger.displayName = "ComboboxTrigger";