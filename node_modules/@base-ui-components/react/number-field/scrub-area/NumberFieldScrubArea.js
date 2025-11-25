"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberFieldScrubArea = void 0;
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _owner = require("@base-ui-components/utils/owner");
var _detectBrowser = require("@base-ui-components/utils/detectBrowser");
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _NumberFieldRootContext = require("../root/NumberFieldRootContext");
var _styleHooks = require("../utils/styleHooks");
var _NumberFieldScrubAreaContext = require("./NumberFieldScrubAreaContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _getViewportRect = require("../utils/getViewportRect");
var _subscribeToVisualViewportResize = require("../utils/subscribeToVisualViewportResize");
var _constants = require("../utils/constants");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * An interactive area where the user can click and drag to change the field value.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Number Field](https://base-ui.com/react/components/number-field)
 */
const NumberFieldScrubArea = exports.NumberFieldScrubArea = /*#__PURE__*/React.forwardRef(function NumberFieldScrubArea(componentProps, forwardedRef) {
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
  } = (0, _NumberFieldRootContext.useNumberFieldRootContext)();
  const {
    isScrubbing,
    setIsScrubbing,
    disabled,
    readOnly,
    value,
    inputRef,
    incrementValue,
    getStepAmount
  } = (0, _NumberFieldRootContext.useNumberFieldRootContext)();
  const latestValueRef = (0, _useLatestRef.useLatestRef)(value);
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
    return (0, _subscribeToVisualViewportResize.subscribeToVisualViewportResize)(scrubAreaCursorRef.current, visualScaleRef);
  }, [isScrubbing]);
  const updateCursorTransform = (0, _useEventCallback.useEventCallback)((x, y) => {
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
    const rect = (0, _getViewportRect.getViewportRect)(teleportDistance, scrubAreaEl);
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
        (0, _owner.ownerDocument)(scrubAreaRef.current).exitPointerLock();
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
        incrementValue(dValue * (getStepAmount(event) ?? _constants.DEFAULT_STEP), 1);
      }
    }
    const win = (0, _owner.ownerWindow)(inputRef.current);
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
      if (!isTouch && !_detectBrowser.isWebKit) {
        try {
          // Avoid non-deterministic errors in testing environments. This error sometimes
          // appears:
          // "The root document of this element is not valid for pointer lock."
          await (0, _owner.ownerDocument)(scrubAreaRef.current).body.requestPointerLock();
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
  const element = (0, _useRenderElement.useRenderElement)('span', componentProps, {
    ref: [forwardedRef, scrubAreaRef],
    state,
    props: [defaultProps, elementProps],
    customStyleHookMapping: _styleHooks.styleHookMapping
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NumberFieldScrubAreaContext.NumberFieldScrubAreaContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") NumberFieldScrubArea.displayName = "NumberFieldScrubArea";