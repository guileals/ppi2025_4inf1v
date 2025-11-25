'use client';

import * as React from 'react';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useFloatingTree } from "../../floating-ui-react/index.js";
import { MenuCheckboxItemContext } from "./MenuCheckboxItemContext.js";
import { REGULAR_ITEM, useMenuItem } from "../item/useMenuItem.js";
import { useCompositeListItem } from "../../composite/list/useCompositeListItem.js";
import { useMenuRootContext } from "../root/MenuRootContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { itemMapping } from "../utils/styleHookMapping.js";
import { useMenuPositionerContext } from "../positioner/MenuPositionerContext.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { jsx as _jsx } from "react/jsx-runtime";
const InnerMenuCheckboxItem = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function InnerMenuCheckboxItem(componentProps, forwardedRef) {
  const {
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    className,
    closeOnClick,
    disabled = false,
    highlighted,
    id,
    menuEvents,
    itemProps,
    render,
    allowMouseUpTriggerRef,
    typingRef,
    nativeButton,
    nodeId,
    ...elementProps
  } = componentProps;
  const [checked, setChecked] = useControlled({
    controlled: checkedProp,
    default: defaultChecked ?? false,
    name: 'MenuCheckboxItem',
    state: 'checked'
  });
  const {
    getItemProps,
    itemRef
  } = useMenuItem({
    closeOnClick,
    disabled,
    highlighted,
    id,
    menuEvents,
    allowMouseUpTriggerRef,
    typingRef,
    nativeButton,
    nodeId,
    itemMetadata: REGULAR_ITEM
  });
  const state = React.useMemo(() => ({
    disabled,
    highlighted,
    checked
  }), [disabled, highlighted, checked]);
  const element = useRenderElement('div', componentProps, {
    state,
    customStyleHookMapping: itemMapping,
    props: [itemProps, {
      role: 'menuitemcheckbox',
      'aria-checked': checked,
      onClick(event) {
        const details = createBaseUIEventDetails('item-press', event.nativeEvent);
        onCheckedChange?.(!checked, details);
        if (details.isCanceled) {
          return;
        }
        setChecked(currentlyChecked => !currentlyChecked);
      }
    }, elementProps, getItemProps],
    ref: [itemRef, forwardedRef]
  });
  return /*#__PURE__*/_jsx(MenuCheckboxItemContext.Provider, {
    value: state,
    children: element
  });
}));

/**
 * A menu item that toggles a setting on or off.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
if (process.env.NODE_ENV !== "production") InnerMenuCheckboxItem.displayName = "InnerMenuCheckboxItem";
export const MenuCheckboxItem = /*#__PURE__*/React.forwardRef(function MenuCheckboxItem(props, forwardedRef) {
  const {
    id: idProp,
    label,
    closeOnClick = false,
    nativeButton = false,
    ...other
  } = props;
  const itemRef = React.useRef(null);
  const listItem = useCompositeListItem({
    label
  });
  const mergedRef = useMergedRefs(forwardedRef, listItem.ref, itemRef);
  const {
    itemProps,
    activeIndex,
    allowMouseUpTriggerRef,
    typingRef
  } = useMenuRootContext();
  const menuPositionerContext = useMenuPositionerContext(true);
  const id = useBaseUiId(idProp);
  const highlighted = listItem.index === activeIndex;
  const {
    events: menuEvents
  } = useFloatingTree();

  // This wrapper component is used as a performance optimization.
  // MenuCheckboxItem reads the context and re-renders the actual MenuCheckboxItem
  // only when it needs to.

  return /*#__PURE__*/_jsx(InnerMenuCheckboxItem, {
    ...other,
    id: id,
    ref: mergedRef,
    highlighted: highlighted,
    menuEvents: menuEvents,
    itemProps: itemProps,
    allowMouseUpTriggerRef: allowMouseUpTriggerRef,
    typingRef: typingRef,
    closeOnClick: closeOnClick,
    nativeButton: nativeButton,
    nodeId: menuPositionerContext?.floatingContext.nodeId
  });
});
if (process.env.NODE_ENV !== "production") MenuCheckboxItem.displayName = "MenuCheckboxItem";