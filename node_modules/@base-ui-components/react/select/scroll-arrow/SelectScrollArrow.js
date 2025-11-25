"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectScrollArrow = void 0;
var React = _interopRequireWildcard(require("react"));
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _store = require("@base-ui-components/utils/store");
var _SelectRootContext = require("../root/SelectRootContext");
var _SelectPositionerContext = require("../positioner/SelectPositionerContext");
var _useTransitionStatus = require("../../utils/useTransitionStatus");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _useRenderElement = require("../../utils/useRenderElement");
var _store2 = require("../store");
/**
 * @internal
 */
const SelectScrollArrow = exports.SelectScrollArrow = /*#__PURE__*/React.forwardRef(function SelectScrollArrow(componentProps, forwardedRef) {
  const {
    render,
    className,
    direction,
    keepMounted = false,
    ...elementProps
  } = componentProps;
  const {
    store,
    popupRef,
    listRef,
    handleScrollArrowVisibility
  } = (0, _SelectRootContext.useSelectRootContext)();
  const {
    side,
    scrollDownArrowRef,
    scrollUpArrowRef,
    alignItemWithTriggerActive
  } = (0, _SelectPositionerContext.useSelectPositionerContext)();
  const selector = direction === 'up' ? _store2.selectors.scrollUpArrowVisible : _store2.selectors.scrollDownArrowVisible;
  const visible = (0, _store.useStore)(store, selector);
  const timeout = (0, _useTimeout.useTimeout)();
  const scrollArrowRef = direction === 'up' ? scrollUpArrowRef : scrollDownArrowRef;
  const {
    mounted,
    transitionStatus,
    setMounted
  } = (0, _useTransitionStatus.useTransitionStatus)(visible);
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
    open: visible,
    ref: scrollArrowRef,
    onComplete() {
      if (!visible) {
        setMounted(false);
      }
    }
  });
  const state = React.useMemo(() => ({
    direction,
    visible,
    side,
    transitionStatus
  }), [direction, visible, side, transitionStatus]);
  const defaultProps = {
    hidden: !mounted,
    'aria-hidden': true,
    children: direction === 'up' ? '▲' : '▼',
    style: {
      position: 'absolute'
    },
    onMouseMove(event) {
      if (event.movementX === 0 && event.movementY === 0 || timeout.isStarted()) {
        return;
      }
      store.set('activeIndex', null);
      function scrollNextItem() {
        const popupElement = popupRef.current;
        if (!popupElement) {
          return;
        }
        store.set('activeIndex', null);
        handleScrollArrowVisibility();
        const isScrolledToTop = popupElement.scrollTop === 0;
        const isScrolledToBottom = Math.round(popupElement.scrollTop + popupElement.clientHeight) >= popupElement.scrollHeight;
        const list = listRef.current;

        // Fallback when there are no items registered yet.
        if (list.length === 0) {
          if (direction === 'up') {
            store.set('scrollUpArrowVisible', !isScrolledToTop);
          } else {
            store.set('scrollDownArrowVisible', !isScrolledToBottom);
          }
        }
        if (direction === 'up' && isScrolledToTop || direction === 'down' && isScrolledToBottom) {
          timeout.clear();
          return;
        }
        if (popupRef.current && listRef.current && listRef.current.length > 0) {
          const items = listRef.current;
          const scrollArrowHeight = scrollArrowRef.current?.offsetHeight || 0;
          if (direction === 'up') {
            let firstVisibleIndex = 0;
            const scrollTop = popupElement.scrollTop + scrollArrowHeight;
            for (let i = 0; i < items.length; i += 1) {
              const item = items[i];
              if (item) {
                const itemTop = item.offsetTop;
                if (itemTop >= scrollTop) {
                  firstVisibleIndex = i;
                  break;
                }
              }
            }
            const targetIndex = Math.max(0, firstVisibleIndex - 1);
            if (targetIndex < firstVisibleIndex) {
              const targetItem = items[targetIndex];
              if (targetItem) {
                popupElement.scrollTop = Math.max(0, targetItem.offsetTop - scrollArrowHeight);
              }
            } else {
              // Already at the first item; ensure we reach the absolute top to account for group labels.
              popupElement.scrollTop = 0;
            }
          } else {
            let lastVisibleIndex = items.length - 1;
            const scrollBottom = popupElement.scrollTop + popupElement.clientHeight - scrollArrowHeight;
            for (let i = 0; i < items.length; i += 1) {
              const item = items[i];
              if (item) {
                const itemBottom = item.offsetTop + item.offsetHeight;
                if (itemBottom > scrollBottom) {
                  lastVisibleIndex = Math.max(0, i - 1);
                  break;
                }
              }
            }
            const targetIndex = Math.min(items.length - 1, lastVisibleIndex + 1);
            if (targetIndex > lastVisibleIndex) {
              const targetItem = items[targetIndex];
              if (targetItem) {
                popupElement.scrollTop = targetItem.offsetTop + targetItem.offsetHeight - popupElement.clientHeight + scrollArrowHeight;
              }
            } else {
              // Already at the last item; ensure we reach the true bottom.
              popupElement.scrollTop = popupElement.scrollHeight - popupElement.clientHeight;
            }
          }
        }
        timeout.start(40, scrollNextItem);
      }
      timeout.start(40, scrollNextItem);
    },
    onMouseLeave() {
      timeout.clear();
    }
  };
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    ref: [forwardedRef, scrollArrowRef],
    state,
    props: [defaultProps, elementProps]
  });
  if (!alignItemWithTriggerActive) {
    return null;
  }
  const shouldRender = visible || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (process.env.NODE_ENV !== "production") SelectScrollArrow.displayName = "SelectScrollArrow";