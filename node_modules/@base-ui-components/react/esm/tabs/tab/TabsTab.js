'use client';

import * as React from 'react';
import { ownerDocument } from '@base-ui-components/utils/owner';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useButton } from "../../use-button/index.js";
import { ACTIVE_COMPOSITE_ITEM } from "../../composite/constants.js";
import { useCompositeItem } from "../../composite/item/useCompositeItem.js";
import { useTabsRootContext } from "../root/TabsRootContext.js";
import { useTabsListContext } from "../list/TabsListContext.js";
import { activeElement, contains } from "../../floating-ui-react/utils.js";

/**
 * An individual interactive tab button that toggles the corresponding panel.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export const TabsTab = /*#__PURE__*/React.forwardRef(function TabsTab(componentProps, forwardedRef) {
  const {
    className,
    disabled = false,
    render,
    value: valueProp,
    id: idProp,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const {
    value: selectedTabValue,
    getTabPanelIdByTabValueOrIndex,
    orientation
  } = useTabsRootContext();
  const {
    activateOnFocus,
    highlightedTabIndex,
    onTabActivation,
    setHighlightedTabIndex,
    tabsListRef
  } = useTabsListContext();
  const id = useBaseUiId(idProp);
  const tabMetadata = React.useMemo(() => ({
    disabled,
    id,
    value: valueProp
  }), [disabled, id, valueProp]);
  const {
    compositeProps,
    compositeRef,
    index
    // hook is used instead of the CompositeItem component
    // because the index is needed for Tab internals
  } = useCompositeItem({
    metadata: tabMetadata
  });
  const tabValue = valueProp ?? index;

  // the `selected` state isn't set on the server (it relies on effects to be calculated),
  // so we fall back to checking the `value` param with the selectedTabValue from the TabsContext
  const selected = React.useMemo(() => {
    if (valueProp === undefined) {
      return index < 0 ? false : index === selectedTabValue;
    }
    return valueProp === selectedTabValue;
  }, [index, selectedTabValue, valueProp]);
  const isNavigatingRef = React.useRef(false);

  // Keep the highlighted item in sync with the currently selected tab
  // when the value prop changes externally (controlled mode)
  useIsoLayoutEffect(() => {
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }
    if (!(selected && index > -1 && highlightedTabIndex !== index)) {
      return;
    }

    // If focus is currently within the tabs list, don't override the roving
    // focus highlight. This keeps keyboard navigation relative to the focused
    // item after an external/asynchronous selection change.
    const listElement = tabsListRef.current;
    const activeEl = activeElement(ownerDocument(listElement));
    if (listElement && activeEl && contains(listElement, activeEl)) {
      return;
    }
    setHighlightedTabIndex(index);
  }, [selected, index, highlightedTabIndex, setHighlightedTabIndex, disabled, tabsListRef]);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton,
    focusableWhenDisabled: true
  });
  const tabPanelId = index > -1 ? getTabPanelIdByTabValueOrIndex(valueProp, index) : undefined;
  const isPressingRef = React.useRef(false);
  const isMainButtonRef = React.useRef(false);
  const onClick = useEventCallback(event => {
    if (selected || disabled) {
      return;
    }
    onTabActivation(tabValue, event.nativeEvent);
  });
  const onFocus = useEventCallback(event => {
    if (selected) {
      return;
    }
    if (index > -1) {
      setHighlightedTabIndex(index);
    }
    if (disabled) {
      return;
    }
    if (activateOnFocus && !isPressingRef.current ||
    // keyboard focus
    isPressingRef.current && isMainButtonRef.current // focus caused by pointerdown
    ) {
      onTabActivation(tabValue, event.nativeEvent);
    }
  });
  const onPointerDown = useEventCallback(event => {
    if (selected || disabled) {
      return;
    }
    isPressingRef.current = true;
    function handlePointerUp() {
      isPressingRef.current = false;
      isMainButtonRef.current = false;
    }
    if (!event.button || event.button === 0) {
      isMainButtonRef.current = true;
      const doc = ownerDocument(event.currentTarget);
      doc.addEventListener('pointerup', handlePointerUp, {
        once: true
      });
    }
  });
  const state = React.useMemo(() => ({
    disabled,
    selected,
    orientation
  }), [disabled, selected, orientation]);
  const element = useRenderElement('button', componentProps, {
    state,
    ref: [forwardedRef, buttonRef, compositeRef],
    props: [compositeProps, {
      role: 'tab',
      'aria-controls': tabPanelId,
      'aria-selected': selected,
      id,
      onClick,
      onFocus,
      onPointerDown,
      [ACTIVE_COMPOSITE_ITEM]: selected ? '' : undefined,
      onKeyDownCapture() {
        isNavigatingRef.current = true;
      }
    }, elementProps, getButtonProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") TabsTab.displayName = "TabsTab";