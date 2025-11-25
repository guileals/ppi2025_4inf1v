"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsIndicator = void 0;
var React = _interopRequireWildcard(require("react"));
var _generateId = require("@base-ui-components/utils/generateId");
var _useForcedRerendering = require("@base-ui-components/utils/useForcedRerendering");
var _useOnMount = require("@base-ui-components/utils/useOnMount");
var _useRenderElement = require("../../utils/useRenderElement");
var _DirectionContext = require("../../direction-provider/DirectionContext");
var _TabsRootContext = require("../root/TabsRootContext");
var _styleHooks = require("../root/styleHooks");
var _TabsListContext = require("../list/TabsListContext");
var _prehydrationScript = require("./prehydrationScript.min");
var _TabsIndicatorCssVars = require("./TabsIndicatorCssVars");
var _jsxRuntime = require("react/jsx-runtime");
const customStyleHookMapping = {
  ..._styleHooks.tabsStyleHookMapping,
  selectedTabPosition: () => null,
  selectedTabSize: () => null
};

/**
 * A visual indicator that can be styled to match the position of the currently active tab.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
const TabsIndicator = exports.TabsIndicator = /*#__PURE__*/React.forwardRef(function TabIndicator(componentProps, forwardedRef) {
  const {
    className,
    render,
    renderBeforeHydration = false,
    ...elementProps
  } = componentProps;
  const {
    getTabElementBySelectedValue,
    orientation,
    tabActivationDirection,
    value
  } = (0, _TabsRootContext.useTabsRootContext)();
  const {
    tabsListRef
  } = (0, _TabsListContext.useTabsListContext)();
  const [instanceId] = React.useState(() => (0, _generateId.generateId)('tab'));
  const [isMounted, setIsMounted] = React.useState(false);
  const {
    value: activeTabValue
  } = (0, _TabsRootContext.useTabsRootContext)();
  const direction = (0, _DirectionContext.useDirection)();
  (0, _useOnMount.useOnMount)(() => setIsMounted(true));
  const rerender = (0, _useForcedRerendering.useForcedRerendering)();
  React.useEffect(() => {
    if (value != null && tabsListRef.current != null && typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        rerender();
      });
      resizeObserver.observe(tabsListRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
    return undefined;
  }, [value, tabsListRef, rerender]);
  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;
  let width = 0;
  let height = 0;
  let isTabSelected = false;
  if (value != null && tabsListRef.current != null) {
    const selectedTab = getTabElementBySelectedValue(value);
    const tabsList = tabsListRef.current;
    isTabSelected = true;
    if (selectedTab != null) {
      // Use offset-based positioning, but determine size using sub-pixel
      // precision and floor it to avoid potential overflow.
      // See https://github.com/mui/base-ui/issues/2235.
      left = selectedTab.offsetLeft - tabsList.clientLeft;
      top = selectedTab.offsetTop - tabsList.clientTop;
      const {
        width: rectWidth,
        height: rectHeight
      } = selectedTab.getBoundingClientRect();
      width = Math.floor(rectWidth);
      height = Math.floor(rectHeight);
      right = direction === 'ltr' ? tabsList.scrollWidth - selectedTab.offsetLeft - width - tabsList.clientLeft : selectedTab.offsetLeft - tabsList.clientLeft;
      bottom = tabsList.scrollHeight - selectedTab.offsetTop - height - tabsList.clientTop;
    }
  }
  const selectedTabPosition = React.useMemo(() => isTabSelected ? {
    left,
    right,
    top,
    bottom
  } : null, [left, right, top, bottom, isTabSelected]);
  const selectedTabSize = React.useMemo(() => isTabSelected ? {
    width,
    height
  } : null, [width, height, isTabSelected]);
  const style = React.useMemo(() => {
    if (!isTabSelected) {
      return undefined;
    }
    return {
      [_TabsIndicatorCssVars.TabsIndicatorCssVars.activeTabLeft]: `${left}px`,
      [_TabsIndicatorCssVars.TabsIndicatorCssVars.activeTabRight]: `${right}px`,
      [_TabsIndicatorCssVars.TabsIndicatorCssVars.activeTabTop]: `${top}px`,
      [_TabsIndicatorCssVars.TabsIndicatorCssVars.activeTabBottom]: `${bottom}px`,
      [_TabsIndicatorCssVars.TabsIndicatorCssVars.activeTabWidth]: `${width}px`,
      [_TabsIndicatorCssVars.TabsIndicatorCssVars.activeTabHeight]: `${height}px`
    };
  }, [left, right, top, bottom, width, height, isTabSelected]);
  const displayIndicator = isTabSelected && width > 0 && height > 0;
  const state = React.useMemo(() => ({
    orientation,
    selectedTabPosition,
    selectedTabSize,
    tabActivationDirection
  }), [orientation, selectedTabPosition, selectedTabSize, tabActivationDirection]);
  const element = (0, _useRenderElement.useRenderElement)('span', componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: 'presentation',
      style,
      hidden: !displayIndicator // do not display the indicator before the layout is settled
    }, elementProps, {
      ['data-instance-id']: !(isMounted && renderBeforeHydration) ? instanceId : undefined,
      suppressHydrationWarning: true
    }],
    customStyleHookMapping
  });
  if (activeTabValue == null) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [element, !isMounted && renderBeforeHydration && /*#__PURE__*/(0, _jsxRuntime.jsx)("script", {
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML: {
        __html: _prehydrationScript.script
      },
      suppressHydrationWarning: true
    })]
  });
});
if (process.env.NODE_ENV !== "production") TabsIndicator.displayName = "TabsIndicator";