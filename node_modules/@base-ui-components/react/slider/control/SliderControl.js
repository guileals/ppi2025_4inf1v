"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderControl = void 0;
var React = _interopRequireWildcard(require("react"));
var _owner = require("@base-ui-components/utils/owner");
var _useAnimationFrame = require("@base-ui-components/utils/useAnimationFrame");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _utils = require("../../floating-ui-react/utils");
var _clamp = require("../../utils/clamp");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _useRenderElement = require("../../utils/useRenderElement");
var _valueToPercent = require("../../utils/valueToPercent");
var _DirectionContext = require("../../direction-provider/DirectionContext");
var _SliderRootContext = require("../root/SliderRootContext");
var _styleHooks = require("../root/styleHooks");
var _replaceArrayItemAtIndex = require("../utils/replaceArrayItemAtIndex");
var _roundValueToStep = require("../utils/roundValueToStep");
var _validateMinimumDistance = require("../utils/validateMinimumDistance");
const INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
function getClosestThumbIndex(values, currentValue, max) {
  let closestIndex;
  let minDistance;
  for (let i = 0; i < values.length; i += 1) {
    const distance = Math.abs(currentValue - values[i]);
    if (minDistance === undefined || (
    // when the value is at max, the lowest index thumb has to be dragged
    // first or it will block higher index thumbs from moving
    // otherwise consider higher index thumbs to be closest when their values are identical
    values[i] === max ? distance < minDistance : distance <= minDistance)) {
      closestIndex = i;
      minDistance = distance;
    }
  }
  return closestIndex;
}
function getControlOffset(styles, orientation) {
  if (!styles) {
    return {
      start: 0,
      end: 0
    };
  }
  const start = orientation === 'horizontal' ? 'InlineStart' : 'Top';
  const end = orientation === 'horizontal' ? 'InlineEnd' : 'Bottom';
  return {
    start: parseFloat(styles[`border${start}Width`]) + parseFloat(styles[`padding${start}`]),
    end: parseFloat(styles[`border${end}Width`]) + parseFloat(styles[`padding${end}`])
  };
}
function getFingerPosition(event, touchIdRef) {
  // The event is TouchEvent
  if (touchIdRef.current !== undefined && event.changedTouches) {
    const touchEvent = event;
    for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
      const touch = touchEvent.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return null;
  }

  // The event is PointerEvent
  return {
    x: event.clientX,
    y: event.clientY
  };
}

/**
 * The clickable, interactive part of the slider.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
const SliderControl = exports.SliderControl = /*#__PURE__*/React.forwardRef(function SliderControl(componentProps, forwardedRef) {
  const {
    render: renderProp,
    className,
    ...elementProps
  } = componentProps;
  const {
    disabled,
    dragging,
    fieldControlValidation,
    pressedInputRef,
    lastChangedValueRef,
    max,
    min,
    minStepsBetweenValues,
    onValueCommitted,
    orientation,
    range,
    registerFieldControlRef,
    setActive,
    setDragging,
    setValue,
    state,
    step,
    thumbRefs,
    values
  } = (0, _SliderRootContext.useSliderRootContext)();
  const controlRef = React.useRef(null);
  const stylesRef = React.useRef(null);
  const setStylesRef = (0, _useEventCallback.useEventCallback)(element => {
    if (element && stylesRef.current == null) {
      if (stylesRef.current == null) {
        stylesRef.current = getComputedStyle(element);
      }
    }
  });
  const closestThumbIndexRef = React.useRef(null);
  // A number that uniquely identifies the current finger in the touch session.
  const touchIdRef = React.useRef(null);
  const moveCountRef = React.useRef(0);
  /**
   * The difference between the value at the finger origin and the value at
   * the center of the thumb scaled down to fit the range [0, 1]
   */
  const offsetRef = React.useRef(0);
  const direction = (0, _DirectionContext.useDirection)();
  const getFingerState = (0, _useEventCallback.useEventCallback)((fingerPosition,
  /**
   * When `true`, closestThumbIndexRef is updated.
   * It's `true` when called by touchstart or pointerdown.
   */
  shouldCaptureThumbIndex = false,
  /**
   * The difference between the value at the finger origin and the value at
   * the center of the thumb scaled down to fit the range [0, 1]
   */
  thumbOffset = 0) => {
    if (fingerPosition == null) {
      return null;
    }
    const control = controlRef.current;
    if (!control) {
      return null;
    }
    const isRtl = direction === 'rtl';
    const isVertical = orientation === 'vertical';
    const {
      width,
      height,
      bottom,
      left,
      right
    } = control.getBoundingClientRect();
    const controlOffset = getControlOffset(stylesRef.current, orientation);

    // the value at the finger origin scaled down to fit the range [0, 1]
    let valueRescaled = isVertical ? (bottom - controlOffset.end - fingerPosition.y) / (height - controlOffset.start - controlOffset.end) + thumbOffset : (isRtl ? right - controlOffset.start - fingerPosition.x : fingerPosition.x - left - controlOffset.start) / (width - controlOffset.start - controlOffset.end) + thumbOffset * (isRtl ? -1 : 1);
    valueRescaled = (0, _clamp.clamp)(valueRescaled, 0, 1);
    let newValue = (max - min) * valueRescaled + min;
    newValue = (0, _roundValueToStep.roundValueToStep)(newValue, step, min);
    newValue = (0, _clamp.clamp)(newValue, min, max);
    if (!range) {
      return {
        value: newValue,
        valueRescaled,
        thumbIndex: 0
      };
    }
    if (shouldCaptureThumbIndex) {
      closestThumbIndexRef.current = getClosestThumbIndex(values, newValue, max) ?? 0;
    }
    const closestThumbIndex = closestThumbIndexRef.current ?? 0;
    const minValueDifference = minStepsBetweenValues * step;

    // Bound the new value to the thumb's neighbours.
    newValue = (0, _clamp.clamp)(newValue, values[closestThumbIndex - 1] + minValueDifference || -Infinity, values[closestThumbIndex + 1] - minValueDifference || Infinity);
    return {
      value: (0, _replaceArrayItemAtIndex.replaceArrayItemAtIndex)(values, closestThumbIndex, newValue),
      valueRescaled,
      thumbIndex: closestThumbIndex
    };
  });
  const focusThumb = (0, _useEventCallback.useEventCallback)(thumbIndex => {
    thumbRefs.current?.[thumbIndex]?.querySelector('input[type="range"]')?.focus({
      preventScroll: true
    });
  });
  const handleTouchMove = (0, _useEventCallback.useEventCallback)(nativeEvent => {
    const fingerPosition = getFingerPosition(nativeEvent, touchIdRef);
    if (fingerPosition == null) {
      return;
    }
    moveCountRef.current += 1;

    // Cancel move in case some other element consumed a pointerup event and it was not fired.
    if (nativeEvent.type === 'pointermove' && nativeEvent.buttons === 0) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleTouchEnd(nativeEvent);
      return;
    }
    const finger = getFingerState(fingerPosition, false, offsetRef.current);
    if (finger == null) {
      return;
    }
    if ((0, _validateMinimumDistance.validateMinimumDistance)(finger.value, step, minStepsBetweenValues)) {
      if (!dragging && moveCountRef.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
        setDragging(true);
      }
      setValue(finger.value, finger.thumbIndex, nativeEvent);
    }
  });
  const handleTouchEnd = (0, _useEventCallback.useEventCallback)(nativeEvent => {
    const fingerPosition = getFingerPosition(nativeEvent, touchIdRef);
    setDragging(false);
    pressedInputRef.current = null;
    if (fingerPosition == null) {
      return;
    }
    const finger = getFingerState(fingerPosition, false);
    if (finger == null) {
      return;
    }
    setActive(-1);
    fieldControlValidation.commitValidation(lastChangedValueRef.current ?? finger.value);
    onValueCommitted(lastChangedValueRef.current ?? finger.value, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', nativeEvent));
    if ('pointerType' in nativeEvent && controlRef.current?.hasPointerCapture(nativeEvent.pointerId)) {
      controlRef.current?.releasePointerCapture(nativeEvent.pointerId);
    }
    touchIdRef.current = null;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();
  });
  const handleTouchStart = (0, _useEventCallback.useEventCallback)(nativeEvent => {
    if (disabled) {
      return;
    }
    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      touchIdRef.current = touch.identifier;
    }
    const fingerPosition = getFingerPosition(nativeEvent, touchIdRef);
    if (fingerPosition != null) {
      const finger = getFingerState(fingerPosition, true);
      if (finger == null) {
        return;
      }
      focusThumb(finger.thumbIndex);
      setValue(finger.value, finger.thumbIndex, nativeEvent);
    }
    moveCountRef.current = 0;
    const doc = (0, _owner.ownerDocument)(controlRef.current);
    doc.addEventListener('touchmove', handleTouchMove, {
      passive: true
    });
    doc.addEventListener('touchend', handleTouchEnd, {
      passive: true
    });
  });
  const stopListening = (0, _useEventCallback.useEventCallback)(() => {
    offsetRef.current = 0;
    const doc = (0, _owner.ownerDocument)(controlRef.current);
    doc.removeEventListener('pointermove', handleTouchMove);
    doc.removeEventListener('pointerup', handleTouchEnd);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  });
  const focusFrame = (0, _useAnimationFrame.useAnimationFrame)();
  React.useEffect(() => {
    const control = controlRef.current;
    if (!control) {
      return () => stopListening();
    }
    control.addEventListener('touchstart', handleTouchStart, {
      passive: true
    });
    return () => {
      control.removeEventListener('touchstart', handleTouchStart);
      focusFrame.cancel();
      stopListening();
    };
  }, [stopListening, handleTouchStart, controlRef, focusFrame]);
  React.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: [forwardedRef, registerFieldControlRef, controlRef, setStylesRef],
    props: [{
      onPointerDown(event) {
        const control = controlRef.current;
        if (!control || disabled || event.defaultPrevented ||
        // Only handle left clicks
        event.button !== 0) {
          return;
        }
        const fingerPosition = getFingerPosition(event, touchIdRef);
        if (fingerPosition != null) {
          const finger = getFingerState(fingerPosition, true);
          if (finger == null) {
            return;
          }
          const pressedOnFocusedThumb = (0, _utils.contains)(thumbRefs.current[finger.thumbIndex], (0, _utils.activeElement)((0, _owner.ownerDocument)(control)));
          if (pressedOnFocusedThumb) {
            event.preventDefault();
          } else {
            focusFrame.request(() => {
              focusThumb(finger.thumbIndex);
            });
          }
          setDragging(true);
          // if the event lands on a thumb, don't change the value, just get the
          // percentageValue difference represented by the distance between the click origin
          // and the coordinates of the value on the track area
          if (thumbRefs.current.includes(event.target)) {
            offsetRef.current = (0, _valueToPercent.valueToPercent)(values[finger.thumbIndex], min, max) / 100 - finger.valueRescaled;
          } else {
            setValue(finger.value, finger.thumbIndex, event.nativeEvent);
          }
        }
        if (event.nativeEvent.pointerId) {
          control.setPointerCapture(event.nativeEvent.pointerId);
        }
        moveCountRef.current = 0;
        const doc = (0, _owner.ownerDocument)(controlRef.current);
        doc.addEventListener('pointermove', handleTouchMove, {
          passive: true
        });
        doc.addEventListener('pointerup', handleTouchEnd);
      },
      tabIndex: -1
    }, elementProps],
    customStyleHookMapping: _styleHooks.sliderStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SliderControl.displayName = "SliderControl";