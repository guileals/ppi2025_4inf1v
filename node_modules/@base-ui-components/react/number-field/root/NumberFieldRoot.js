"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberFieldRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _useInterval = require("@base-ui-components/utils/useInterval");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _useForcedRerendering = require("@base-ui-components/utils/useForcedRerendering");
var _owner = require("@base-ui-components/utils/owner");
var _detectBrowser = require("@base-ui-components/utils/detectBrowser");
var _NumberFieldRootContext = require("./NumberFieldRootContext");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _styleHooks = require("../utils/styleHooks");
var _useRenderElement = require("../../utils/useRenderElement");
var _parse = require("../utils/parse");
var _formatNumber = require("../../utils/formatNumber");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _constants = require("../utils/constants");
var _validate = require("../utils/validate");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _utils = require("../../floating-ui-react/utils");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Groups all parts of the number field and manages its state.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Number Field](https://base-ui.com/react/components/number-field)
 */
const NumberFieldRoot = exports.NumberFieldRoot = /*#__PURE__*/React.forwardRef(function NumberFieldRoot(componentProps, forwardedRef) {
  const {
    id: idProp,
    min,
    max,
    smallStep = 0.1,
    step = 1,
    largeStep = 10,
    required = false,
    disabled: disabledProp = false,
    readOnly = false,
    name: nameProp,
    defaultValue,
    value: valueProp,
    onValueChange: onValueChangeProp,
    allowWheelScrub = false,
    snapOnStep = false,
    format,
    locale,
    render,
    className,
    inputRef: inputRefProp,
    ...elementProps
  } = componentProps;
  const {
    setControlId,
    setDirty,
    validityData,
    setValidityData,
    disabled: fieldDisabled,
    setFilled,
    invalid,
    name: fieldName,
    state: fieldState
  } = (0, _FieldRootContext.useFieldRootContext)();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const [isScrubbing, setIsScrubbing] = React.useState(false);
  const minWithDefault = min ?? Number.MIN_SAFE_INTEGER;
  const maxWithDefault = max ?? Number.MAX_SAFE_INTEGER;
  const minWithZeroDefault = min ?? 0;
  const formatStyle = format?.style;
  const inputRef = React.useRef(null);
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    setControlId(id);
    return () => {
      setControlId(undefined);
    };
  }, [id, setControlId]);
  const [valueUnwrapped, setValueUnwrapped] = (0, _useControlled.useControlled)({
    controlled: valueProp,
    default: defaultValue,
    name: 'NumberField',
    state: 'value'
  });
  const value = valueUnwrapped ?? null;
  const valueRef = (0, _useLatestRef.useLatestRef)(value);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    setFilled(value !== null);
  }, [setFilled, value]);
  const forceRender = (0, _useForcedRerendering.useForcedRerendering)();
  const formatOptionsRef = (0, _useLatestRef.useLatestRef)(format);
  const onValueChange = (0, _useEventCallback.useEventCallback)(onValueChangeProp);
  const startTickTimeout = (0, _useTimeout.useTimeout)();
  const tickInterval = (0, _useInterval.useInterval)();
  const intentionalTouchCheckTimeout = (0, _useTimeout.useTimeout)();
  const isPressedRef = React.useRef(false);
  const movesAfterTouchRef = React.useRef(0);
  const allowInputSyncRef = React.useRef(true);
  const unsubscribeFromGlobalContextMenuRef = React.useRef(() => {});
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (validityData.initialValue === null && value !== validityData.initialValue) {
      setValidityData(prev => ({
        ...prev,
        initialValue: value
      }));
    }
  }, [setValidityData, validityData.initialValue, value]);

  // During SSR, the value is formatted on the server, whose locale may differ from the client's
  // locale. This causes a hydration mismatch, which we manually suppress. This is preferable to
  // rendering an empty input field and then updating it with the formatted value, as the user
  // can still see the value prior to hydration, even if it's not formatted correctly.
  const [inputValue, setInputValue] = React.useState(() => {
    if (valueProp !== undefined) {
      return getControlledInputValue(value, locale, format);
    }
    return (0, _formatNumber.formatNumber)(value, locale, format);
  });
  const [inputMode, setInputMode] = React.useState('numeric');
  const getAllowedNonNumericKeys = (0, _useEventCallback.useEventCallback)(() => {
    const {
      decimal,
      group,
      currency
    } = (0, _parse.getNumberLocaleDetails)(locale, format);
    const keys = new Set(['.', ',', decimal, group]);
    if (formatStyle === 'percent') {
      _parse.PERCENTAGES.forEach(key => keys.add(key));
    }
    if (formatStyle === 'currency' && currency) {
      keys.add(currency);
    }
    if (minWithDefault < 0) {
      keys.add('-');
    }
    return keys;
  });
  const getStepAmount = (0, _useEventCallback.useEventCallback)(event => {
    if (event?.altKey) {
      return smallStep;
    }
    if (event?.shiftKey) {
      return largeStep;
    }
    return step;
  });
  const setValue = (0, _useEventCallback.useEventCallback)((unvalidatedValue, event, dir) => {
    const eventWithOptionalKeyState = event;
    const nativeEvent = event && (0, _utils.isReactEvent)(event) ? event.nativeEvent : event;
    const details = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', nativeEvent);
    const validatedValue = (0, _validate.toValidatedNumber)(unvalidatedValue, {
      step: dir ? getStepAmount(eventWithOptionalKeyState) * dir : undefined,
      format: formatOptionsRef.current,
      minWithDefault,
      maxWithDefault,
      minWithZeroDefault,
      snapOnStep,
      small: eventWithOptionalKeyState?.altKey ?? false
    });

    // Determine whether we should notify about a change even if the numeric value is unchanged.
    // This is needed when the user input is clamped/snapped to the same current value, or when
    // the source value differs but validation normalizes to the existing value.
    const shouldFireChange = validatedValue !== value || unvalidatedValue !== value;
    if (shouldFireChange) {
      onValueChange?.(validatedValue, details);
      if (details.isCanceled) {
        return;
      }
      setValueUnwrapped(validatedValue);
      setDirty(validatedValue !== validityData.initialValue);
    }

    // Keep the visible input in sync immediately when programmatic changes occur
    // (increment/decrement, wheel, etc). During direct typing we don't want
    // to overwrite the user-provided text until blur, so we gate on
    // `allowInputSyncRef`.
    if (allowInputSyncRef.current) {
      setInputValue((0, _formatNumber.formatNumber)(validatedValue, locale, format));
    }

    // Formatting can change even if the numeric value hasn't, so ensure a re-render when needed.
    forceRender();
  });
  const incrementValue = (0, _useEventCallback.useEventCallback)((amount, dir, currentValue, event) => {
    const prevValue = currentValue == null ? valueRef.current : currentValue;
    const nextValue = typeof prevValue === 'number' ? prevValue + amount * dir : Math.max(0, min ?? 0);
    setValue(nextValue, event, dir);
  });
  const stopAutoChange = (0, _useEventCallback.useEventCallback)(() => {
    intentionalTouchCheckTimeout.clear();
    startTickTimeout.clear();
    tickInterval.clear();
    unsubscribeFromGlobalContextMenuRef.current();
    movesAfterTouchRef.current = 0;
  });
  const startAutoChange = (0, _useEventCallback.useEventCallback)((isIncrement, triggerEvent) => {
    stopAutoChange();
    if (!inputRef.current) {
      return;
    }
    const win = (0, _owner.ownerWindow)(inputRef.current);
    function handleContextMenu(event) {
      event.preventDefault();
    }

    // A global context menu is necessary to prevent the context menu from appearing when the touch
    // is slightly outside of the element's hit area.
    win.addEventListener('contextmenu', handleContextMenu);
    unsubscribeFromGlobalContextMenuRef.current = () => {
      win.removeEventListener('contextmenu', handleContextMenu);
    };
    win.addEventListener('pointerup', () => {
      isPressedRef.current = false;
      stopAutoChange();
    }, {
      once: true
    });
    function tick() {
      const amount = getStepAmount(triggerEvent) ?? _constants.DEFAULT_STEP;
      incrementValue(amount, isIncrement ? 1 : -1, undefined, triggerEvent);
    }
    tick();
    startTickTimeout.start(_constants.START_AUTO_CHANGE_DELAY, () => {
      tickInterval.start(_constants.CHANGE_VALUE_TICK_DELAY, tick);
    });
  });

  // We need to update the input value when the external `value` prop changes. This ends up acting
  // as a single source of truth to update the input value, bypassing the need to manually set it in
  // each event handler internally in this hook.
  // This is done inside a layout effect as an alternative to the technique to set state during
  // render as we're accessing a ref, which must be inside an effect.
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  //
  // ESLint is disabled because it needs to run even if the parsed value hasn't changed, since the
  // value still can be formatted differently.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(function syncFormattedInputValueOnValueChange() {
    // This ensures the value is only updated on blur rather than every keystroke, but still
    // allows the input value to be updated when the value is changed externally.
    if (!allowInputSyncRef.current) {
      return;
    }
    const nextInputValue = valueProp !== undefined ? getControlledInputValue(value, locale, format) : (0, _formatNumber.formatNumber)(value, locale, format);
    if (nextInputValue !== inputValue) {
      setInputValue(nextInputValue);
    }
  });
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(function setDynamicInputModeForIOS() {
    if (!_detectBrowser.isIOS) {
      return;
    }

    // iOS numeric software keyboard doesn't have a minus key, so we need to use the default
    // keyboard to let the user input a negative number.
    let computedInputMode = 'text';
    if (minWithDefault >= 0) {
      // iOS numeric software keyboard doesn't have a decimal key for "numeric" input mode, but
      // this is better than the "text" input if possible to use.
      computedInputMode = 'decimal';
    }
    setInputMode(computedInputMode);
  }, [minWithDefault, formatStyle]);
  React.useEffect(() => {
    return () => stopAutoChange();
  }, [stopAutoChange]);

  // The `onWheel` prop can't be prevented, so we need to use a global event listener.
  React.useEffect(function registerElementWheelListener() {
    const element = inputRef.current;
    if (disabled || readOnly || !allowWheelScrub || !element) {
      return undefined;
    }
    function handleWheel(event) {
      if (
      // Allow pinch-zooming.
      event.ctrlKey || (0, _owner.ownerDocument)(inputRef.current).activeElement !== inputRef.current) {
        return;
      }

      // Prevent the default behavior to avoid scrolling the page.
      event.preventDefault();
      const amount = getStepAmount(event) ?? _constants.DEFAULT_STEP;
      incrementValue(amount, event.deltaY > 0 ? -1 : 1, undefined, event);
    }
    element.addEventListener('wheel', handleWheel);
    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, [allowWheelScrub, incrementValue, disabled, readOnly, largeStep, step, getStepAmount]);
  const state = React.useMemo(() => ({
    ...fieldState,
    disabled,
    readOnly,
    required,
    value,
    inputValue,
    scrubbing: isScrubbing
  }), [fieldState, disabled, readOnly, required, value, inputValue, isScrubbing]);
  const contextValue = React.useMemo(() => ({
    inputRef,
    inputValue,
    value,
    startAutoChange,
    stopAutoChange,
    minWithDefault,
    maxWithDefault,
    disabled,
    readOnly,
    id,
    setValue,
    incrementValue,
    getStepAmount,
    allowInputSyncRef,
    formatOptionsRef,
    valueRef,
    isPressedRef,
    intentionalTouchCheckTimeout,
    movesAfterTouchRef,
    name,
    required,
    invalid,
    inputMode,
    getAllowedNonNumericKeys,
    min,
    max,
    setInputValue,
    locale,
    isScrubbing,
    setIsScrubbing,
    state
  }), [inputRef, inputValue, value, startAutoChange, stopAutoChange, minWithDefault, maxWithDefault, disabled, readOnly, id, setValue, incrementValue, getStepAmount, allowInputSyncRef, formatOptionsRef, valueRef, isPressedRef, intentionalTouchCheckTimeout, movesAfterTouchRef, name, required, invalid, inputMode, getAllowedNonNumericKeys, min, max, setInputValue, locale, isScrubbing, state]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    customStyleHookMapping: _styleHooks.styleHookMapping
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_NumberFieldRootContext.NumberFieldRootContext.Provider, {
    value: contextValue,
    children: [element, name && /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      type: "hidden",
      name: name,
      ref: inputRefProp,
      value: value ?? '',
      disabled: disabled,
      required: required
    })]
  });
});
if (process.env.NODE_ENV !== "production") NumberFieldRoot.displayName = "NumberFieldRoot";
function getControlledInputValue(value, locale, format) {
  const explicitPrecision = format?.maximumFractionDigits != null || format?.minimumFractionDigits != null;
  return explicitPrecision ? (0, _formatNumber.formatNumber)(value, locale, format) : (0, _formatNumber.formatNumberMaxPrecision)(value, locale, format);
}