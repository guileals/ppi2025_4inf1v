"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNumberFieldButton = useNumberFieldButton;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _constants = require("../utils/constants");
var _parse = require("../utils/parse");
function useNumberFieldButton(params) {
  const {
    allowInputSyncRef,
    disabled,
    formatOptionsRef,
    getStepAmount,
    id,
    incrementValue,
    inputRef,
    inputValue,
    intentionalTouchCheckTimeout,
    isIncrement,
    isPressedRef,
    locale,
    maxWithDefault,
    minWithDefault,
    movesAfterTouchRef,
    readOnly,
    setValue,
    startAutoChange,
    stopAutoChange,
    value,
    valueRef
  } = params;
  const incrementDownCoordsRef = React.useRef({
    x: 0,
    y: 0
  });
  const isTouchingButtonRef = React.useRef(false);
  const ignoreClickRef = React.useRef(false);
  const pointerTypeRef = React.useRef('');
  const isMin = value != null && value <= minWithDefault;
  const isMax = value != null && value >= maxWithDefault;
  const commitValue = (0, _useEventCallback.useEventCallback)(nativeEvent => {
    allowInputSyncRef.current = true;

    // The input may be dirty but not yet blurred, so the value won't have been committed.
    const parsedValue = (0, _parse.parseNumber)(inputValue, locale, formatOptionsRef.current);
    if (parsedValue !== null) {
      // The increment value function needs to know the current input value to increment it
      // correctly.
      valueRef.current = parsedValue;
      setValue(parsedValue, nativeEvent);
    }
  });
  const props = React.useMemo(() => ({
    disabled: disabled || (isIncrement ? isMax : isMin),
    'aria-readonly': readOnly || undefined,
    'aria-label': isIncrement ? 'Increase' : 'Decrease',
    'aria-controls': id,
    // Keyboard users shouldn't have access to the buttons, since they can use the input element
    // to change the value. On the other hand, `aria-hidden` is not applied because touch screen
    // readers should be able to use the buttons.
    tabIndex: -1,
    style: {
      WebkitUserSelect: 'none',
      userSelect: 'none'
    },
    onTouchStart() {
      isTouchingButtonRef.current = true;
    },
    onTouchEnd() {
      isTouchingButtonRef.current = false;
    },
    onClick(event) {
      const isDisabled = disabled || readOnly || (isIncrement ? isMax : isMin);
      if (event.defaultPrevented || isDisabled || (
      // If it's not a keyboard/virtual click, ignore.
      pointerTypeRef.current === 'touch' ? ignoreClickRef.current : event.detail !== 0)) {
        return;
      }
      commitValue(event.nativeEvent);
      const amount = getStepAmount(event) ?? _constants.DEFAULT_STEP;
      incrementValue(amount, isIncrement ? 1 : -1, undefined, event.nativeEvent);
    },
    onPointerDown(event) {
      const isMainButton = !event.button || event.button === 0;
      const isDisabled = disabled || (isIncrement ? isMax : isMin);
      if (event.defaultPrevented || readOnly || !isMainButton || isDisabled) {
        return;
      }
      pointerTypeRef.current = event.pointerType;
      ignoreClickRef.current = false;
      isPressedRef.current = true;
      incrementDownCoordsRef.current = {
        x: event.clientX,
        y: event.clientY
      };
      commitValue(event.nativeEvent);

      // Note: "pen" is sometimes returned for mouse usage on Linux Chrome.
      if (event.pointerType !== 'touch') {
        event.preventDefault();
        inputRef.current?.focus();
        startAutoChange(isIncrement, event);
      } else {
        // We need to check if the pointerdown was intentional, and not the result of a scroll
        // or pinch-zoom. In that case, we don't want to change the value.
        intentionalTouchCheckTimeout.start(_constants.TOUCH_TIMEOUT, () => {
          const moves = movesAfterTouchRef.current;
          movesAfterTouchRef.current = 0;
          if (moves != null && moves < _constants.MAX_POINTER_MOVES_AFTER_TOUCH) {
            ignoreClickRef.current = true;
            startAutoChange(isIncrement, event);
          } else {
            stopAutoChange();
          }
        });
      }
    },
    onPointerMove(event) {
      const isDisabled = disabled || readOnly || (isIncrement ? isMax : isMin);
      if (isDisabled || event.pointerType !== 'touch' || !isPressedRef.current) {
        return;
      }
      if (movesAfterTouchRef.current != null) {
        movesAfterTouchRef.current += 1;
      }
      const {
        x,
        y
      } = incrementDownCoordsRef.current;
      const dx = x - event.clientX;
      const dy = y - event.clientY;

      // An alternative to this technique is to detect when the NumberField's parent container
      // has been scrolled
      if (dx ** 2 + dy ** 2 > _constants.SCROLLING_POINTER_MOVE_DISTANCE ** 2) {
        stopAutoChange();
      }
    },
    onMouseEnter(event) {
      const isDisabled = disabled || readOnly || (isIncrement ? isMax : isMin);
      if (event.defaultPrevented || isDisabled || !isPressedRef.current || isTouchingButtonRef.current || pointerTypeRef.current === 'touch') {
        return;
      }
      startAutoChange(isIncrement, event);
    },
    onMouseLeave() {
      if (isTouchingButtonRef.current) {
        return;
      }
      stopAutoChange();
    },
    onMouseUp() {
      if (isTouchingButtonRef.current) {
        return;
      }
      stopAutoChange();
    }
  }), [commitValue, disabled, getStepAmount, id, incrementValue, inputRef, isIncrement, intentionalTouchCheckTimeout, isMax, isMin, isPressedRef, movesAfterTouchRef, readOnly, startAutoChange, stopAutoChange]);
  return React.useMemo(() => ({
    props
  }), [props]);
}