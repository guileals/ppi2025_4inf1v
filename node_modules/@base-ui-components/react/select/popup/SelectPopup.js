"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectPopup = void 0;
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _detectBrowser = require("@base-ui-components/utils/detectBrowser");
var _owner = require("@base-ui-components/utils/owner");
var _isMouseWithinBounds = require("@base-ui-components/utils/isMouseWithinBounds");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _store = require("@base-ui-components/utils/store");
var _useAnimationFrame = require("@base-ui-components/utils/useAnimationFrame");
var _floatingUiReact = require("../../floating-ui-react");
var _SelectRootContext = require("../root/SelectRootContext");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _SelectPositionerContext = require("../positioner/SelectPositionerContext");
var _styles = require("../../utils/styles");
var _styleHookMapping = require("../../utils/styleHookMapping");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _useRenderElement = require("../../utils/useRenderElement");
var _store2 = require("../store");
var _utils = require("./utils");
var _constants = require("../../utils/constants");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
const customStyleHookMapping = {
  ..._popupStateMapping.popupStateMapping,
  ..._styleHookMapping.transitionStatusMapping
};

/**
 * A container for the select items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectPopup = exports.SelectPopup = /*#__PURE__*/React.forwardRef(function SelectPopup(componentProps, forwardedRef) {
  const {
    render,
    className,
    ...elementProps
  } = componentProps;
  const {
    store,
    popupRef,
    onOpenChangeComplete,
    setOpen,
    valueRef,
    selectedItemTextRef,
    keyboardActiveRef,
    multiple,
    handleScrollArrowVisibility
  } = (0, _SelectRootContext.useSelectRootContext)();
  const {
    side,
    align,
    context,
    alignItemWithTriggerActive,
    setControlledAlignItemWithTrigger,
    scrollDownArrowRef,
    scrollUpArrowRef
  } = (0, _SelectPositionerContext.useSelectPositionerContext)();
  const highlightTimeout = (0, _useTimeout.useTimeout)();
  const open = (0, _store.useStore)(store, _store2.selectors.open);
  const mounted = (0, _store.useStore)(store, _store2.selectors.mounted);
  const popupProps = (0, _store.useStore)(store, _store2.selectors.popupProps);
  const transitionStatus = (0, _store.useStore)(store, _store2.selectors.transitionStatus);
  const triggerElement = (0, _store.useStore)(store, _store2.selectors.triggerElement);
  const positionerElement = (0, _store.useStore)(store, _store2.selectors.positionerElement);
  const scrollArrowFrame = (0, _useAnimationFrame.useAnimationFrame)();
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        onOpenChangeComplete?.(true);
      }
    }
  });
  const state = React.useMemo(() => ({
    open,
    transitionStatus,
    side,
    align
  }), [open, transitionStatus, side, align]);
  const initialHeightRef = React.useRef(0);
  const reachedMaxHeightRef = React.useRef(false);
  const maxHeightRef = React.useRef(0);
  const initialPlacedRef = React.useRef(false);
  const originalPositionerStylesRef = React.useRef({});
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!positionerElement || Object.keys(originalPositionerStylesRef.current).length) {
      return;
    }
    originalPositionerStylesRef.current = {
      top: positionerElement.style.top || '0',
      left: positionerElement.style.left || '0',
      right: positionerElement.style.right,
      height: positionerElement.style.height,
      bottom: positionerElement.style.bottom,
      minHeight: positionerElement.style.minHeight,
      maxHeight: positionerElement.style.maxHeight,
      marginTop: positionerElement.style.marginTop,
      marginBottom: positionerElement.style.marginBottom
    };
  }, [positionerElement]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (mounted || alignItemWithTriggerActive) {
      return;
    }
    initialPlacedRef.current = false;
    reachedMaxHeightRef.current = false;
    initialHeightRef.current = 0;
    maxHeightRef.current = 0;
    if (positionerElement) {
      (0, _utils.clearPositionerStyles)(positionerElement, originalPositionerStylesRef.current);
    }
  }, [mounted, alignItemWithTriggerActive, positionerElement]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    const popupElement = popupRef.current;
    if (!mounted || !triggerElement || !positionerElement || !popupElement) {
      return;
    }
    if (!alignItemWithTriggerActive) {
      initialPlacedRef.current = true;
      scrollArrowFrame.request(handleScrollArrowVisibility);
      return;
    }

    // Wait for `selectedItemTextRef.current` to be set.
    queueMicrotask(() => {
      const positionerStyles = getComputedStyle(positionerElement);
      const popupStyles = getComputedStyle(popupElement);
      const doc = (0, _owner.ownerDocument)(triggerElement);
      const win = (0, _owner.ownerWindow)(positionerElement);
      const triggerRect = triggerElement.getBoundingClientRect();
      const positionerRect = positionerElement.getBoundingClientRect();
      const triggerX = triggerRect.left;
      const triggerHeight = triggerRect.height;
      const scrollHeight = popupElement.scrollHeight;
      const borderBottom = parseFloat(popupStyles.borderBottomWidth);
      const marginTop = parseFloat(positionerStyles.marginTop) || 10;
      const marginBottom = parseFloat(positionerStyles.marginBottom) || 10;
      const minHeight = parseFloat(positionerStyles.minHeight) || 100;
      const paddingLeft = 5;
      const paddingRight = 5;
      const triggerCollisionThreshold = 20;
      const viewportHeight = doc.documentElement.clientHeight - marginTop - marginBottom;
      const viewportWidth = doc.documentElement.clientWidth;
      const availableSpaceBeneathTrigger = viewportHeight - triggerRect.bottom + triggerHeight;
      const textElement = selectedItemTextRef.current;
      const valueElement = valueRef.current;
      let offsetX = 0;
      let offsetY = 0;
      if (textElement && valueElement) {
        const valueRect = valueElement.getBoundingClientRect();
        const textRect = textElement.getBoundingClientRect();
        const valueLeftFromTriggerLeft = valueRect.left - triggerX;
        const textLeftFromPositionerLeft = textRect.left - positionerRect.left;
        const valueCenterFromPositionerTop = valueRect.top - triggerRect.top + valueRect.height / 2;
        const textCenterFromTriggerTop = textRect.top - positionerRect.top + textRect.height / 2;
        offsetX = valueLeftFromTriggerLeft - textLeftFromPositionerLeft;
        offsetY = textCenterFromTriggerTop - valueCenterFromPositionerTop;
      }
      const idealHeight = availableSpaceBeneathTrigger + offsetY + marginBottom + borderBottom;
      let height = Math.min(viewportHeight, idealHeight);
      const maxHeight = viewportHeight - marginTop - marginBottom;
      const scrollTop = idealHeight - height;
      const left = Math.max(paddingLeft, triggerX + offsetX);
      const maxRight = viewportWidth - paddingRight;
      const rightOverflow = Math.max(0, left + positionerRect.width - maxRight);
      positionerElement.style.left = `${left - rightOverflow}px`;
      positionerElement.style.height = `${height}px`;
      positionerElement.style.maxHeight = 'auto';
      positionerElement.style.marginTop = `${marginTop}px`;
      positionerElement.style.marginBottom = `${marginBottom}px`;
      const maxScrollTop = popupElement.scrollHeight - popupElement.clientHeight;
      const isTopPositioned = scrollTop >= maxScrollTop;
      if (isTopPositioned) {
        height = Math.min(viewportHeight, positionerRect.height) - (scrollTop - maxScrollTop);
      }

      // When the trigger is too close to the top or bottom of the viewport, or the minHeight is
      // reached, we fallback to aligning the popup to the trigger as the UX is poor otherwise.
      const fallbackToAlignPopupToTrigger = triggerRect.top < triggerCollisionThreshold || triggerRect.bottom > viewportHeight - triggerCollisionThreshold || height < Math.min(scrollHeight, minHeight);

      // Safari doesn't position the popup correctly when pinch-zoomed.
      const isPinchZoomed = (win.visualViewport?.scale ?? 1) !== 1 && _detectBrowser.isWebKit;
      if (fallbackToAlignPopupToTrigger || isPinchZoomed) {
        initialPlacedRef.current = true;
        (0, _utils.clearPositionerStyles)(positionerElement, originalPositionerStylesRef.current);
        ReactDOM.flushSync(() => setControlledAlignItemWithTrigger(false));
        return;
      }
      if (isTopPositioned) {
        const topOffset = Math.max(0, viewportHeight - idealHeight);
        positionerElement.style.top = positionerRect.height >= maxHeight ? '0' : `${topOffset}px`;
        positionerElement.style.height = `${height}px`;
        popupElement.scrollTop = popupElement.scrollHeight - popupElement.clientHeight;
        initialHeightRef.current = Math.max(minHeight, height);
      } else {
        positionerElement.style.bottom = '0';
        initialHeightRef.current = Math.max(minHeight, height);
        popupElement.scrollTop = scrollTop;
      }
      if (initialHeightRef.current === viewportHeight) {
        reachedMaxHeightRef.current = true;
      }
      handleScrollArrowVisibility();

      // Avoid the `onScroll` event logic from triggering before the popup is placed.
      setTimeout(() => {
        initialPlacedRef.current = true;
      });
    });
  }, [store, mounted, positionerElement, triggerElement, valueRef, selectedItemTextRef, popupRef, handleScrollArrowVisibility, alignItemWithTriggerActive, setControlledAlignItemWithTrigger, scrollArrowFrame, scrollDownArrowRef, scrollUpArrowRef]);
  React.useEffect(() => {
    if (!alignItemWithTriggerActive || !positionerElement || !mounted) {
      return undefined;
    }
    const win = (0, _owner.ownerWindow)(positionerElement);
    function handleResize(event) {
      setOpen(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('window-resize', event));
    }
    win.addEventListener('resize', handleResize);
    return () => {
      win.removeEventListener('resize', handleResize);
    };
  }, [setOpen, alignItemWithTriggerActive, positionerElement, mounted]);
  const defaultProps = {
    'aria-multiselectable': multiple || undefined,
    onKeyDown() {
      keyboardActiveRef.current = true;
    },
    onMouseMove() {
      keyboardActiveRef.current = false;
    },
    onPointerLeave(event) {
      if ((0, _isMouseWithinBounds.isMouseWithinBounds)(event) || event.pointerType === 'touch') {
        return;
      }
      const popup = event.currentTarget;
      highlightTimeout.start(0, () => {
        store.set('activeIndex', null);
        popup.focus({
          preventScroll: true
        });
      });
    },
    onScroll(event) {
      if (!positionerElement || !popupRef.current || !initialPlacedRef.current) {
        return;
      }
      if (reachedMaxHeightRef.current || !alignItemWithTriggerActive) {
        handleScrollArrowVisibility();
        return;
      }
      const isTopPositioned = positionerElement.style.top === '0px';
      const isBottomPositioned = positionerElement.style.bottom === '0px';
      const currentHeight = positionerElement.getBoundingClientRect().height;
      const doc = (0, _owner.ownerDocument)(positionerElement);
      const positionerStyles = getComputedStyle(positionerElement);
      const marginTop = parseFloat(positionerStyles.marginTop);
      const marginBottom = parseFloat(positionerStyles.marginBottom);
      const viewportHeight = doc.documentElement.clientHeight - marginTop - marginBottom;
      if (isTopPositioned) {
        const scrollTop = event.currentTarget.scrollTop;
        const maxScrollTop = event.currentTarget.scrollHeight - event.currentTarget.clientHeight;
        const diff = maxScrollTop - scrollTop;
        const nextHeight = Math.min(currentHeight + diff, viewportHeight);
        positionerElement.style.height = `${Math.min(currentHeight + diff, viewportHeight)}px`;
        if (nextHeight !== viewportHeight) {
          event.currentTarget.scrollTop = maxScrollTop;
        } else {
          reachedMaxHeightRef.current = true;
        }
      } else if (isBottomPositioned) {
        const scrollTop = event.currentTarget.scrollTop;
        const minScrollTop = 0;
        const diff = scrollTop - minScrollTop;
        const nextHeight = Math.min(currentHeight + diff, viewportHeight);
        const idealHeight = currentHeight + diff;
        const overshoot = idealHeight - viewportHeight;
        positionerElement.style.height = `${Math.min(idealHeight, viewportHeight)}px`;
        if (nextHeight !== viewportHeight) {
          event.currentTarget.scrollTop = 0;
        } else {
          reachedMaxHeightRef.current = true;
          if (event.currentTarget.scrollTop < event.currentTarget.scrollHeight - event.currentTarget.clientHeight) {
            event.currentTarget.scrollTop -= diff - overshoot;
          }
        }
      }
      handleScrollArrowVisibility();
    },
    ...(alignItemWithTriggerActive && {
      style: {
        position: 'relative',
        maxHeight: '100%',
        overflowX: 'hidden',
        overflowY: 'auto'
      }
    })
  };
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    ref: [forwardedRef, popupRef],
    state,
    customStyleHookMapping,
    props: [popupProps, defaultProps, {
      style: transitionStatus === 'starting' ? _constants.DISABLED_TRANSITIONS_STYLE.style : undefined,
      className: alignItemWithTriggerActive ? _styles.styleDisableScrollbar.className : undefined
    }, elementProps]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [_styles.styleDisableScrollbar.element, /*#__PURE__*/(0, _jsxRuntime.jsx)(_floatingUiReact.FloatingFocusManager, {
      context: context,
      modal: false,
      disabled: !mounted,
      restoreFocus: true,
      children: element
    })]
  });
});
if (process.env.NODE_ENV !== "production") SelectPopup.displayName = "SelectPopup";