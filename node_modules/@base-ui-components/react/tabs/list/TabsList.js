"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsList = void 0;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _CompositeRoot = require("../../composite/root/CompositeRoot");
var _styleHooks = require("../root/styleHooks");
var _TabsRootContext = require("../root/TabsRootContext");
var _TabsListContext = require("./TabsListContext");
var _jsxRuntime = require("react/jsx-runtime");
const EMPTY_ARRAY = [];

/**
 * Groups the individual tab buttons.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
const TabsList = exports.TabsList = /*#__PURE__*/React.forwardRef(function TabsList(componentProps, forwardedRef) {
  const {
    activateOnFocus = true,
    className,
    loop = true,
    render,
    ...elementProps
  } = componentProps;
  const {
    getTabElementBySelectedValue,
    onValueChange,
    orientation,
    value,
    setTabMap,
    tabActivationDirection
  } = (0, _TabsRootContext.useTabsRootContext)();
  const [highlightedTabIndex, setHighlightedTabIndex] = React.useState(0);
  const tabsListRef = React.useRef(null);
  const detectActivationDirection = useActivationDirectionDetector(value,
  // the old value
  orientation, tabsListRef, getTabElementBySelectedValue);
  const onTabActivation = (0, _useEventCallback.useEventCallback)((newValue, event) => {
    if (newValue !== value) {
      const activationDirection = detectActivationDirection(newValue);
      onValueChange(newValue, activationDirection, event);
    }
  });
  const state = React.useMemo(() => ({
    orientation,
    tabActivationDirection
  }), [orientation, tabActivationDirection]);
  const defaultProps = {
    'aria-orientation': orientation === 'vertical' ? 'vertical' : undefined,
    role: 'tablist'
  };
  const tabsListContextValue = React.useMemo(() => ({
    activateOnFocus,
    highlightedTabIndex,
    onTabActivation,
    setHighlightedTabIndex,
    tabsListRef,
    value
  }), [activateOnFocus, highlightedTabIndex, onTabActivation, setHighlightedTabIndex, tabsListRef, value]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabsListContext.TabsListContext.Provider, {
    value: tabsListContextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeRoot.CompositeRoot, {
      render: render,
      className: className,
      state: state,
      refs: [forwardedRef, tabsListRef],
      props: [defaultProps, elementProps],
      customStyleHookMapping: _styleHooks.tabsStyleHookMapping,
      highlightedIndex: highlightedTabIndex,
      enableHomeAndEndKeys: true,
      loop: loop,
      orientation: orientation,
      onHighlightedIndexChange: setHighlightedTabIndex,
      onMapChange: setTabMap,
      disabledIndices: EMPTY_ARRAY
    })
  });
});
if (process.env.NODE_ENV !== "production") TabsList.displayName = "TabsList";
function getInset(tab, tabsList) {
  const {
    left: tabLeft,
    top: tabTop
  } = tab.getBoundingClientRect();
  const {
    left: listLeft,
    top: listTop
  } = tabsList.getBoundingClientRect();
  const left = tabLeft - listLeft;
  const top = tabTop - listTop;
  return {
    left,
    top
  };
}
function useActivationDirectionDetector(
// the old value
selectedTabValue, orientation, tabsListRef, getTabElement) {
  const previousTabEdge = React.useRef(null);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    // Whenever orientation changes, reset the state.
    if (selectedTabValue == null || tabsListRef.current == null) {
      previousTabEdge.current = null;
      return;
    }
    const activeTab = getTabElement(selectedTabValue);
    if (activeTab == null) {
      previousTabEdge.current = null;
      return;
    }
    const {
      left,
      top
    } = getInset(activeTab, tabsListRef.current);
    previousTabEdge.current = orientation === 'horizontal' ? left : top;
  }, [orientation, getTabElement, tabsListRef, selectedTabValue]);
  return React.useCallback(newValue => {
    if (newValue === selectedTabValue) {
      return 'none';
    }
    if (newValue == null) {
      previousTabEdge.current = null;
      return 'none';
    }
    if (newValue != null && tabsListRef.current != null) {
      const selectedTabElement = getTabElement(newValue);
      if (selectedTabElement != null) {
        const {
          left,
          top
        } = getInset(selectedTabElement, tabsListRef.current);
        if (previousTabEdge.current == null) {
          previousTabEdge.current = orientation === 'horizontal' ? left : top;
          return 'none';
        }
        if (orientation === 'horizontal') {
          if (left < previousTabEdge.current) {
            previousTabEdge.current = left;
            return 'left';
          }
          if (left > previousTabEdge.current) {
            previousTabEdge.current = left;
            return 'right';
          }
        } else if (top < previousTabEdge.current) {
          previousTabEdge.current = top;
          return 'up';
        } else if (top > previousTabEdge.current) {
          previousTabEdge.current = top;
          return 'down';
        }
      }
    }
    return 'none';
  }, [getTabElement, orientation, previousTabEdge, tabsListRef, selectedTabValue]);
}