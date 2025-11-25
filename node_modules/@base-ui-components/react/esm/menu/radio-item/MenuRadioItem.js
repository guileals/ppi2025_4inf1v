'use client';

import * as React from 'react';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useFloatingTree } from "../../floating-ui-react/index.js";
import { useMenuRootContext } from "../root/MenuRootContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { useMenuRadioGroupContext } from "../radio-group/MenuRadioGroupContext.js";
import { MenuRadioItemContext } from "./MenuRadioItemContext.js";
import { itemMapping } from "../utils/styleHookMapping.js";
import { useCompositeListItem } from "../../composite/list/useCompositeListItem.js";
import { REGULAR_ITEM, useMenuItem } from "../item/useMenuItem.js";
import { useMenuPositionerContext } from "../positioner/MenuPositionerContext.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { jsx as _jsx } from "react/jsx-runtime";
const InnerMenuRadioItem = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function InnerMenuRadioItem(componentProps, forwardedRef) {
  const {
    checked,
    setChecked,
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
    itemMetadata: REGULAR_ITEM,
    nodeId
  });
  const state = React.useMemo(() => ({
    disabled,
    highlighted,
    checked
  }), [disabled, highlighted, checked]);
  return useRenderElement('div', componentProps, {
    state,
    customStyleHookMapping: itemMapping,
    ref: [itemRef, forwardedRef],
    props: [itemProps, {
      role: 'menuitemradio',
      'aria-checked': checked,
      onClick(event) {
        setChecked(createBaseUIEventDetails('item-press', event.nativeEvent));
      }
    }, elementProps, getItemProps]
  });
}));

/**
 * A menu item that works like a radio button in a given group.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
if (process.env.NODE_ENV !== "production") InnerMenuRadioItem.displayName = "InnerMenuRadioItem";
export const MenuRadioItem = /*#__PURE__*/React.forwardRef(function MenuRadioItem(props, forwardedRef) {
  const {
    id: idProp,
    value,
    label,
    disabled: disabledProp = false,
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
  const {
    value: selectedValue,
    setValue: setSelectedValue,
    disabled: groupDisabled
  } = useMenuRadioGroupContext();
  const disabled = groupDisabled || disabledProp;

  // This wrapper component is used as a performance optimization.
  // MenuRadioItem reads the context and re-renders the actual MenuRadioItem
  // only when it needs to.

  const checked = selectedValue === value;
  const setChecked = React.useCallback(eventDetails => {
    setSelectedValue(value, eventDetails);
  }, [setSelectedValue, value]);
  const contextValue = React.useMemo(() => ({
    checked,
    highlighted,
    disabled
  }), [checked, highlighted, disabled]);
  return /*#__PURE__*/_jsx(MenuRadioItemContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(InnerMenuRadioItem, {
      ...other,
      id: id,
      ref: mergedRef,
      disabled: disabled,
      highlighted: highlighted,
      menuEvents: menuEvents,
      itemProps: itemProps,
      allowMouseUpTriggerRef: allowMouseUpTriggerRef,
      checked: selectedValue === value,
      setChecked: setChecked,
      typingRef: typingRef,
      closeOnClick: closeOnClick,
      nativeButton: nativeButton,
      nodeId: menuPositionerContext?.floatingContext.nodeId
    })
  });
});
if (process.env.NODE_ENV !== "production") MenuRadioItem.displayName = "MenuRadioItem";