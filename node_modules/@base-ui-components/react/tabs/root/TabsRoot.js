"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useRenderElement = require("../../utils/useRenderElement");
var _CompositeList = require("../../composite/list/CompositeList");
var _DirectionContext = require("../../direction-provider/DirectionContext");
var _TabsRootContext = require("./TabsRootContext");
var _styleHooks = require("./styleHooks");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Groups the tabs and the corresponding panels.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
const TabsRoot = exports.TabsRoot = /*#__PURE__*/React.forwardRef(function TabsRoot(componentProps, forwardedRef) {
  const {
    className,
    defaultValue = 0,
    onValueChange: onValueChangeProp,
    orientation = 'horizontal',
    render,
    value: valueProp,
    ...elementProps
  } = componentProps;
  const direction = (0, _DirectionContext.useDirection)();
  const tabPanelRefs = React.useRef([]);
  const [value, setValue] = (0, _useControlled.useControlled)({
    controlled: valueProp,
    default: defaultValue,
    name: 'Tabs',
    state: 'value'
  });
  const [tabPanelMap, setTabPanelMap] = React.useState(() => new Map());
  const [tabMap, setTabMap] = React.useState(() => new Map());
  const [tabActivationDirection, setTabActivationDirection] = React.useState('none');
  const onValueChange = (0, _useEventCallback.useEventCallback)((newValue, activationDirection, event) => {
    const details = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event);
    onValueChangeProp?.(newValue, details);
    if (details.isCanceled) {
      return;
    }
    setValue(newValue);
    setTabActivationDirection(activationDirection);
  });

  // get the `id` attribute of <Tabs.Panel> to set as the value of `aria-controls` on <Tabs.Tab>
  const getTabPanelIdByTabValueOrIndex = React.useCallback((tabValue, index) => {
    if (tabValue === undefined && index < 0) {
      return undefined;
    }
    for (const tabPanelMetadata of tabPanelMap.values()) {
      // find by tabValue
      if (tabValue !== undefined && tabPanelMetadata && tabValue === tabPanelMetadata?.value) {
        return tabPanelMetadata.id;
      }

      // find by index
      if (tabValue === undefined && tabPanelMetadata?.index && tabPanelMetadata?.index === index) {
        return tabPanelMetadata.id;
      }
    }
    return undefined;
  }, [tabPanelMap]);

  // get the `id` attribute of <Tabs.Tab> to set as the value of `aria-labelledby` on <Tabs.Panel>
  const getTabIdByPanelValueOrIndex = React.useCallback((tabPanelValue, index) => {
    if (tabPanelValue === undefined && index < 0) {
      return undefined;
    }
    for (const tabMetadata of tabMap.values()) {
      // find by tabPanelValue
      if (tabPanelValue !== undefined && index > -1 && tabPanelValue === (tabMetadata?.value ?? tabMetadata?.index ?? undefined)) {
        return tabMetadata?.id;
      }

      // find by index
      if (tabPanelValue === undefined && index > -1 && index === (tabMetadata?.value ?? tabMetadata?.index ?? undefined)) {
        return tabMetadata?.id;
      }
    }
    return undefined;
  }, [tabMap]);

  // used in `useActivationDirectionDetector` for setting data-activation-direction
  const getTabElementBySelectedValue = React.useCallback(selectedValue => {
    if (selectedValue === undefined) {
      return null;
    }
    for (const [tabElement, tabMetadata] of tabMap.entries()) {
      if (tabMetadata != null && selectedValue === (tabMetadata.value ?? tabMetadata.index)) {
        return tabElement;
      }
    }
    return null;
  }, [tabMap]);
  const tabsContextValue = React.useMemo(() => ({
    direction,
    getTabElementBySelectedValue,
    getTabIdByPanelValueOrIndex,
    getTabPanelIdByTabValueOrIndex,
    onValueChange,
    orientation,
    setTabMap,
    tabActivationDirection,
    value
  }), [direction, getTabElementBySelectedValue, getTabIdByPanelValueOrIndex, getTabPanelIdByTabValueOrIndex, onValueChange, orientation, setTabMap, tabActivationDirection, value]);
  const state = {
    orientation,
    tabActivationDirection
  };
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    customStyleHookMapping: _styleHooks.tabsStyleHookMapping
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabsRootContext.TabsRootContext.Provider, {
    value: tabsContextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeList.CompositeList, {
      elementsRef: tabPanelRefs,
      onMapChange: setTabPanelMap,
      children: element
    })
  });
});
if (process.env.NODE_ENV !== "production") TabsRoot.displayName = "TabsRoot";