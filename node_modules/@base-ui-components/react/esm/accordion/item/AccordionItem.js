'use client';

import * as React from 'react';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { useCollapsibleRoot } from "../../collapsible/root/useCollapsibleRoot.js";
import { CollapsibleRootContext } from "../../collapsible/root/CollapsibleRootContext.js";
import { useCompositeListItem } from "../../composite/list/useCompositeListItem.js";
import { useAccordionRootContext } from "../root/AccordionRootContext.js";
import { AccordionItemContext } from "./AccordionItemContext.js";
import { accordionStyleHookMapping } from "./styleHooks.js";
import { useRenderElement } from "../../utils/useRenderElement.js";

/**
 * Groups an accordion header with the corresponding panel.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const AccordionItem = /*#__PURE__*/React.forwardRef(function AccordionItem(componentProps, forwardedRef) {
  const {
    className,
    disabled: disabledProp = false,
    onOpenChange: onOpenChangeProp,
    render,
    value: valueProp,
    ...elementProps
  } = componentProps;
  const {
    ref: listItemRef,
    index
  } = useCompositeListItem();
  const mergedRef = useMergedRefs(forwardedRef, listItemRef);
  const {
    disabled: contextDisabled,
    handleValueChange,
    state: rootState,
    value: openValues
  } = useAccordionRootContext();
  const value = valueProp ?? index;
  const disabled = disabledProp || contextDisabled;
  const isOpen = React.useMemo(() => {
    if (!openValues) {
      return false;
    }
    for (let i = 0; i < openValues.length; i += 1) {
      if (openValues[i] === value) {
        return true;
      }
    }
    return false;
  }, [openValues, value]);
  const onOpenChange = useEventCallback(nextOpen => {
    handleValueChange(value, nextOpen);
    onOpenChangeProp?.(nextOpen);
  });
  const collapsible = useCollapsibleRoot({
    open: isOpen,
    onOpenChange,
    disabled
  });
  const collapsibleState = React.useMemo(() => ({
    open: collapsible.open,
    disabled: collapsible.disabled,
    hidden: !collapsible.mounted
  }), [collapsible.open, collapsible.disabled, collapsible.mounted]);
  const collapsibleContext = React.useMemo(() => ({
    ...collapsible,
    onOpenChange,
    state: collapsibleState,
    transitionStatus: collapsible.transitionStatus
  }), [collapsible, collapsibleState, onOpenChange]);
  const state = React.useMemo(() => ({
    ...rootState,
    index,
    disabled,
    open: isOpen
  }), [disabled, index, isOpen, rootState]);
  const [triggerId, setTriggerId] = React.useState(useBaseUiId());
  const accordionItemContext = React.useMemo(() => ({
    open: isOpen,
    state,
    setTriggerId,
    triggerId
  }), [isOpen, state, setTriggerId, triggerId]);
  const element = useRenderElement('div', componentProps, {
    state,
    ref: mergedRef,
    props: elementProps,
    customStyleHookMapping: accordionStyleHookMapping
  });
  return /*#__PURE__*/_jsx(CollapsibleRootContext.Provider, {
    value: collapsibleContext,
    children: /*#__PURE__*/_jsx(AccordionItemContext.Provider, {
      value: accordionItemContext,
      children: element
    })
  });
});
if (process.env.NODE_ENV !== "production") AccordionItem.displayName = "AccordionItem";