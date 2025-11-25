'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ownerWindow, ownerDocument } from '@base-ui-components/utils/owner';
import { isWebKit } from '@base-ui-components/utils/detectBrowser';
import { useLatestRef } from '@base-ui-components/utils/useLatestRef';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useNumberFieldRootContext } from "../root/NumberFieldRootContext.js";
import { styleHookMapping } from "../utils/styleHooks.js";
import { NumberFieldScrubAreaContext } from "./NumberFieldScrubAreaContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { getViewportRect } from "../utils/getViewportRect.js";
import { subscribeToVisualViewportResize } from "../utils/subscribeToVisualViewportResize.js";
import { DEFAULT_STEP } from "../utils/constants.js";

/**
 * An interactive area where the user can click and drag to change the field value.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Number Field](https://base-ui.com/react/components/number-field)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const NumberFieldScrubArea = /*#__PURE__*/React.forwardRef(function NumberFieldScrubArea(componentProps, forwardedRef) {
  const {
    render,
    className,
    direction = 'horizontal',
    pixelSensitivity = 2,
    teleportDistance,
    ...elementProps
  } = componentProps;
  const {
    state
  } = useNumberFieldRootContext();
  const {
    isScrubbing,
    setIsScrubbing,
    disabled,
    readOnly,
    value,
    inputRef,
    incrementValue,
    getStepAmount
  } = useNumberFieldRootContext();
  const latestValueRef = useLatestRef(value);
  const scrubAreaRef = React.useRef(null);
  const isScrubbingRef = React.useRef(false);
  const scrubAreaCursorRef = React.useRef(null);
  const virtualCursorCoords = React.useRef({
    x: 0,
    y: 0
  });
  const visualScaleRef = React.useRef(1);
  const [isTouchInput, setIsTouchInput] = React.useState(false);
  const [isPointerLockDenied, setIsPointerLockDenied] = React.useState(false);
  React.useEffect(() => {
    if (!isScrubbing || !scrubAreaCursorRef.current) {
      return undefined;
    }
    return subscribeToVisualViewportResize(scrubAreaCursorRef.current, visualScaleRef);
  }, [isScrubbing]);
  const updateCursorTransform = useEventCallback((x, y) => {
    if (scrubAreaCursorRef.current) {
      scrubAreaCursorRef.current.style.transform = `translate3d(${x}px,${y}px,0) scale(${1 / visualScaleRef.current})`;
    }
  });
  const onScrub = React.useCallback(({
    movementX,
    movementY
  }) => {
    const virtualCursor = scrubAreaCursorRef.current;
    const scrubAreaEl = scrubAreaRef.current;
    if (!virtualCursor || !scrubAreaEl) {
      return;
    }
    const rect = getViewportRect(teleportDistance, scrubAreaEl);
    const coords = virtualCursorCoords.current;
    const newCoords = {
      x: Math.round(coords.x + movementX),
      y: Math.round(coords.y + movementY)
    };
    const cursorWidth = virtualCursor.offsetWidth;
    const cursorHeight = virtualCursor.offsetHeight;
    if (newCoords.x + cursorWidth / 2 < rect.x) {
      newCoords.x = rect.width - cursorWidth / 2;
    } else if (newCoords.x + cursorWidth / 2 > rect.width) {
      newCoords.x = rect.x - cursorWidth / 2;
    }
    if (newCoords.y + cursorHeight / 2 < rect.y) {
      newCoords.y = rect.height - cursorHeight / 2;
    } else if (newCoords.y + cursorHeight / 2 > rect.height) {
      newCoords.y = rect.y - cursorHeight / 2;
    }
    virtualCursorCoords.current = newCoords;
    updateCursorTransform(newCoords.x, newCoords.y);
  }, [teleportDistance, updateCursorTransform]);
  const onScrubbingChange = React.useCallback((scrubbingValue, {
    clientX,
    clientY
  }) => {
    ReactDOM.flushSync(() => {
      setIsScrubbing(scrubbingValue);
    });
    const virtualCursor = scrubAreaCursorRef.current;
    if (!virtualCursor || !scrubbingValue) {
      return;
    }
    const initialCoords = {
      x: clientX - virtualCursor.offsetWidth / 2,
      y: clientY - virtualCursor.offsetHeight / 2
    };
    virtualCursorCoords.current = initialCoords;
    updateCursorTransform(initialCoords.x, initialCoords.y);
  }, [setIsScrubbing, updateCursorTransform]);
  React.useEffect(function registerGlobalScrubbingEventListeners() {
    if (!inputRef.current || disabled || readOnly) {
      return undefined;
    }
    let cumulativeDelta = 0;
    function handleScrubPointerUp(event) {
      try {
        // Avoid errors in testing environments.
        ownerDocument(scrubAreaRef.current).exitPointerLock();
      } catch {
        //
      } finally {
        isScrubbingRef.current = false;
        onScrubbingChange(false, event);
      }
    }
    function handleScrubPointerMove(event) {
      if (!isScrubbingRef.current) {
        return;
      }

      // Prevent text selection.
      event.preventDefault();
      onScrub(event);
      const {
        movementX,
        movementY
      } = event;
      cumulativeDelta += direction === 'vertical' ? movementY : movementX;
      if (Math.abs(cumulativeDelta) >= pixelSensitivity) {
        cumulativeDelta = 0;
        const dValue = direction === 'vertical' ? -movementY : movementX;
        incrementValue(dValue * (getStepAmount(event) ?? DEFAULT_STEP), 1);
      }
    }
    const win = ownerWindow(inputRef.current);
    win.addEventListener('pointerup', handleScrubPointerUp, true);
    win.addEventListener('pointermove', handleScrubPointerMove, true);
    return () => {
      win.removeEventListener('pointerup', handleScrubPointerUp, true);
      win.removeEventListener('pointermove', handleScrubPointerMove, true);
    };
  }, [disabled, readOnly, incrementValue, latestValueRef, getStepAmount, inputRef, onScrubbingChange, onScrub, direction, pixelSensitivity]);

  // Prevent scrolling using touch input when scrubbing.
  React.useEffect(function registerScrubberTouchPreventListener() {
    const element = scrubAreaRef.current;
    if (!element || disabled || readOnly) {
      return undefined;
    }
    function handleTouchStart(event) {
      if (event.touches.length === 1) {
        event.preventDefault();
      }
    }
    element.addEventListener('touchstart', handleTouchStart);
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
    };
  }, [disabled, readOnly]);
  const defaultProps = {
    role: 'presentation',
    style: {
      touchAction: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none'
    },
    async onPointerDown(event) {
      const isMainButton = !event.button || event.button === 0;
      if (event.defaultPrevented || readOnly || !isMainButton || disabled) {
        return;
      }
      const isTouch = event.pointerType === 'touch';
      setIsTouchInput(isTouch);
      if (event.pointerType === 'mouse') {
        event.preventDefault();
        inputRef.current?.focus();
      }
      isScrubbingRef.current = true;
      onScrubbingChange(true, event.nativeEvent);

      // WebKit causes significant layout shift with the native message, so we can't use it.
      if (!isTouch && !isWebKit) {
        try {
          // Avoid non-deterministic errors in testing environments. This error sometimes
          // appears:
          // "The root document of this element is not valid for pointer lock."
          await ownerDocument(scrubAreaRef.current).body.requestPointerLock();
          setIsPointerLockDenied(false);
        } catch (error) {
          setIsPointerLockDenied(true);
        } finally {
          ReactDOM.flushSync(() => {
            onScrubbingChange(true, event.nativeEvent);
          });
        }
      }
    }
  };
  const element = useRenderElement('span', componentProps, {
    ref: [forwardedRef, scrubAreaRef],
    state,
    props: [defaultProps, elementProps],
    customStyleHookMapping: styleHookMapping
  });
  const contextValue = React.useMemo(() => ({
    isScrubbing,
    isTouchInput,
    isPointerLockDenied,
    scrubAreaCursorRef,
    scrubAreaRef,
    direction,
    pixelSensitivity,
    teleportDistance
  }), [isScrubbing, isTouchInput, isPointerLockDenied, direction, pixelSensitivity, teleportDistance]);
  return /*#__PURE__*/_jsx(NumberFieldScrubAreaContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") NumberFieldScrubArea.displayName = "NumberFieldScrubArea";