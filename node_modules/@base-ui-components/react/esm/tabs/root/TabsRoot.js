'use client';

import * as React from 'react';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useRenderElement } from "../../utils/useRenderElement.js";
import { CompositeList } from "../../composite/list/CompositeList.js";
import { useDirection } from "../../direction-provider/DirectionContext.js";
import { TabsRootContext } from "./TabsRootContext.js";
import { tabsStyleHookMapping } from "./styleHooks.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";

/**
 * Groups the tabs and the corresponding panels.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const TabsRoot = /*#__PURE__*/React.forwardRef(function TabsRoot(componentProps, forwardedRef) {
  const {
    className,
    defaultValue = 0,
    onValueChange: onValueChangeProp,
    orientation = 'horizontal',
    render,
    value: valueProp,
    ...elementProps
  } = componentProps;
  const direction = useDirection();
  const tabPanelRefs = React.useRef([]);
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Tabs',
    state: 'value'
  });
  const [tabPanelMap, setTabPanelMap] = React.useState(() => new Map());
  const [tabMap, setTabMap] = React.useState(() => new Map());
  const [tabActivationDirection, setTabActivationDirection] = React.useState('none');
  const onValueChange = useEventCallback((newValue, activationDirection, event) => {
    const details = createBaseUIEventDetails('none', event);
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
  const element = useRenderElement('div', componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    customStyleHookMapping: tabsStyleHookMapping
  });
  return /*#__PURE__*/_jsx(TabsRootContext.Provider, {
    value: tabsContextValue,
    children: /*#__PURE__*/_jsx(CompositeList, {
      elementsRef: tabPanelRefs,
      onMapChange: setTabPanelMap,
      children: element
    })
  });
});
if (process.env.NODE_ENV !== "production") TabsRoot.displayName = "TabsRoot";