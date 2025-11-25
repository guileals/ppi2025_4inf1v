'use client';

import * as React from 'react';
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useCompositeListItem } from "../../composite/list/useCompositeListItem.js";
import { tabsStyleHookMapping } from "../root/styleHooks.js";
import { useTabsRootContext } from "../root/TabsRootContext.js";
import { TabsPanelDataAttributes } from "./TabsPanelDataAttributes.js";

/**
 * A panel displayed when the corresponding tab is active.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export const TabsPanel = /*#__PURE__*/React.forwardRef(function TabPanel(componentProps, forwardedRef) {
  const {
    children,
    className,
    value: valueProp,
    render,
    keepMounted = false,
    ...elementProps
  } = componentProps;
  const {
    value: selectedValue,
    getTabIdByPanelValueOrIndex,
    orientation,
    tabActivationDirection
  } = useTabsRootContext();
  const id = useBaseUiId();
  const metadata = React.useMemo(() => ({
    id,
    value: valueProp
  }), [id, valueProp]);
  const {
    ref: listItemRef,
    index
  } = useCompositeListItem({
    metadata
  });
  const tabPanelValue = valueProp ?? index;
  const hidden = tabPanelValue !== selectedValue;
  const correspondingTabId = React.useMemo(() => {
    return getTabIdByPanelValueOrIndex(valueProp, index);
  }, [getTabIdByPanelValueOrIndex, index, valueProp]);
  const state = React.useMemo(() => ({
    hidden,
    orientation,
    tabActivationDirection
  }), [hidden, orientation, tabActivationDirection]);
  const element = useRenderElement('div', componentProps, {
    state,
    ref: [forwardedRef, listItemRef],
    props: [{
      'aria-labelledby': correspondingTabId,
      hidden,
      id: id ?? undefined,
      role: 'tabpanel',
      tabIndex: hidden ? -1 : 0,
      [TabsPanelDataAttributes.index]: index
    }, elementProps, {
      children: hidden && !keepMounted ? undefined : children
    }],
    customStyleHookMapping: tabsStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") TabsPanel.displayName = "TabsPanel";