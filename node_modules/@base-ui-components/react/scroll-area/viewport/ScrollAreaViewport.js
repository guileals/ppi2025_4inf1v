"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollAreaViewport = void 0;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _ScrollAreaRootContext = require("../root/ScrollAreaRootContext");
var _ScrollAreaViewportContext = require("./ScrollAreaViewportContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _DirectionContext = require("../../direction-provider/DirectionContext");
var _getOffset = require("../utils/getOffset");
var _constants = require("../constants");
var _clamp = require("../../utils/clamp");
var _styles = require("../../utils/styles");
var _onVisible = require("../utils/onVisible");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * The actual scrollable container of the scroll area.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
const ScrollAreaViewport = exports.ScrollAreaViewport = /*#__PURE__*/React.forwardRef(function ScrollAreaViewport(componentProps, forwardedRef) {
  const {
    render,
    className,
    ...elementProps
  } = componentProps;
  const {
    viewportRef,
    scrollbarYRef,
    scrollbarXRef,
    thumbYRef,
    thumbXRef,
    cornerRef,
    setCornerSize,
    setThumbSize,
    rootId,
    setHiddenState,
    hiddenState,
    handleScroll,
    setHovering
  } = (0, _ScrollAreaRootContext.useScrollAreaRootContext)();
  const direction = (0, _DirectionContext.useDirection)();
  const programmaticScrollRef = React.useRef(true);
  const scrollEndTimeout = (0, _useTimeout.useTimeout)();
  const computeThumbPosition = (0, _useEventCallback.useEventCallback)(() => {
    const viewportEl = viewportRef.current;
    const scrollbarYEl = scrollbarYRef.current;
    const scrollbarXEl = scrollbarXRef.current;
    const thumbYEl = thumbYRef.current;
    const thumbXEl = thumbXRef.current;
    const cornerEl = cornerRef.current;
    if (!viewportEl) {
      return;
    }
    const scrollableContentHeight = viewportEl.scrollHeight;
    const scrollableContentWidth = viewportEl.scrollWidth;
    const viewportHeight = viewportEl.clientHeight;
    const viewportWidth = viewportEl.clientWidth;
    const scrollTop = viewportEl.scrollTop;
    const scrollLeft = viewportEl.scrollLeft;
    if (scrollableContentHeight === 0 || scrollableContentWidth === 0) {
      return;
    }
    const scrollbarYHidden = viewportHeight >= scrollableContentHeight;
    const scrollbarXHidden = viewportWidth >= scrollableContentWidth;
    const ratioX = viewportWidth / scrollableContentWidth;
    const ratioY = viewportHeight / scrollableContentHeight;
    const nextWidth = scrollbarXHidden ? 0 : viewportWidth;
    const nextHeight = scrollbarYHidden ? 0 : viewportHeight;
    const scrollbarXOffset = (0, _getOffset.getOffset)(scrollbarXEl, 'padding', 'x');
    const scrollbarYOffset = (0, _getOffset.getOffset)(scrollbarYEl, 'padding', 'y');
    const thumbXOffset = (0, _getOffset.getOffset)(thumbXEl, 'margin', 'x');
    const thumbYOffset = (0, _getOffset.getOffset)(thumbYEl, 'margin', 'y');
    const idealNextWidth = nextWidth - scrollbarXOffset - thumbXOffset;
    const idealNextHeight = nextHeight - scrollbarYOffset - thumbYOffset;
    const maxNextWidth = scrollbarXEl ? Math.min(scrollbarXEl.offsetWidth, idealNextWidth) : idealNextWidth;
    const maxNextHeight = scrollbarYEl ? Math.min(scrollbarYEl.offsetHeight, idealNextHeight) : idealNextHeight;
    const clampedNextWidth = Math.max(_constants.MIN_THUMB_SIZE, maxNextWidth * ratioX);
    const clampedNextHeight = Math.max(_constants.MIN_THUMB_SIZE, maxNextHeight * ratioY);
    setThumbSize(prevSize => {
      if (prevSize.height === clampedNextHeight && prevSize.width === clampedNextWidth) {
        return prevSize;
      }
      return {
        width: clampedNextWidth,
        height: clampedNextHeight
      };
    });

    // Handle Y (vertical) scroll
    if (scrollbarYEl && thumbYEl) {
      const maxThumbOffsetY = scrollbarYEl.offsetHeight - clampedNextHeight - scrollbarYOffset - thumbYOffset;
      const scrollRatioY = scrollTop / (scrollableContentHeight - viewportHeight);

      // In Safari, don't allow it to go negative or too far as `scrollTop` considers the rubber
      // band effect.
      const thumbOffsetY = Math.min(maxThumbOffsetY, Math.max(0, scrollRatioY * maxThumbOffsetY));
      thumbYEl.style.transform = `translate3d(0,${thumbOffsetY}px,0)`;
    }

    // Handle X (horizontal) scroll
    if (scrollbarXEl && thumbXEl) {
      const maxThumbOffsetX = scrollbarXEl.offsetWidth - clampedNextWidth - scrollbarXOffset - thumbXOffset;
      const scrollRatioX = scrollLeft / (scrollableContentWidth - viewportWidth);

      // In Safari, don't allow it to go negative or too far as `scrollLeft` considers the rubber
      // band effect.
      const thumbOffsetX = direction === 'rtl' ? (0, _clamp.clamp)(scrollRatioX * maxThumbOffsetX, -maxThumbOffsetX, 0) : (0, _clamp.clamp)(scrollRatioX * maxThumbOffsetX, 0, maxThumbOffsetX);
      thumbXEl.style.transform = `translate3d(${thumbOffsetX}px,0,0)`;
    }
    if (cornerEl) {
      if (scrollbarXHidden || scrollbarYHidden) {
        setCornerSize({
          width: 0,
          height: 0
        });
      } else if (!scrollbarXHidden && !scrollbarYHidden) {
        const width = scrollbarYEl?.offsetWidth || 0;
        const height = scrollbarXEl?.offsetHeight || 0;
        setCornerSize({
          width,
          height
        });
      }
    }
    setHiddenState(prevState => {
      const cornerHidden = scrollbarYHidden || scrollbarXHidden;
      if (prevState.scrollbarYHidden === scrollbarYHidden && prevState.scrollbarXHidden === scrollbarXHidden && prevState.cornerHidden === cornerHidden) {
        return prevState;
      }
      return {
        scrollbarYHidden,
        scrollbarXHidden,
        cornerHidden
      };
    });
  });
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!viewportRef.current) {
      return undefined;
    }
    const cleanup = (0, _onVisible.onVisible)(viewportRef.current, computeThumbPosition);
    return cleanup;
  }, [computeThumbPosition, viewportRef]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    // Wait for scrollbar-related refs to be set
    queueMicrotask(computeThumbPosition);
  }, [computeThumbPosition, hiddenState, direction]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    // `onMouseEnter` doesn't fire upon load, so we need to check if the viewport is already
    // being hovered.
    if (viewportRef.current?.matches(':hover')) {
      setHovering(true);
    }
  }, [viewportRef, setHovering]);
  React.useEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const ro = new ResizeObserver(computeThumbPosition);
    if (viewportRef.current) {
      ro.observe(viewportRef.current);
    }
    return () => {
      ro.disconnect();
    };
  }, [computeThumbPosition, viewportRef]);
  const handleUserInteraction = (0, _useEventCallback.useEventCallback)(() => {
    programmaticScrollRef.current = false;
  });
  const props = {
    role: 'presentation',
    ...(rootId && {
      'data-id': `${rootId}-viewport`
    }),
    // https://accessibilityinsights.io/info-examples/web/scrollable-region-focusable/
    ...((!hiddenState.scrollbarXHidden || !hiddenState.scrollbarYHidden) && {
      tabIndex: 0
    }),
    className: _styles.styleDisableScrollbar.className,
    style: {
      overflow: 'scroll'
    },
    onScroll() {
      if (!viewportRef.current) {
        return;
      }
      computeThumbPosition();
      if (!programmaticScrollRef.current) {
        handleScroll({
          x: viewportRef.current.scrollLeft,
          y: viewportRef.current.scrollTop
        });
      }

      // Debounce the restoration of the programmatic flag so that it only
      // flips back to `true` once scrolling has come to a rest. This ensures
      // that momentum scrolling (where no further user-interaction events fire)
      // is still treated as user-driven.
      // 100 ms without scroll events ≈ scroll end
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollend_event
      scrollEndTimeout.start(100, () => {
        programmaticScrollRef.current = true;
      });
    },
    onWheel: handleUserInteraction,
    onTouchMove: handleUserInteraction,
    onPointerMove: handleUserInteraction,
    onPointerEnter: handleUserInteraction,
    onKeyDown: handleUserInteraction
  };
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    ref: [forwardedRef, viewportRef],
    props: [props, elementProps]
  });
  const contextValue = React.useMemo(() => ({
    computeThumbPosition
  }), [computeThumbPosition]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScrollAreaViewportContext.ScrollAreaViewportContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") ScrollAreaViewport.displayName = "ScrollAreaViewport";