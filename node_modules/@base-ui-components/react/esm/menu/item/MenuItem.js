'use client';

import * as React from 'react';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useFloatingTree } from "../../floating-ui-react/index.js";
import { REGULAR_ITEM, useMenuItem } from "./useMenuItem.js";
import { useMenuRootContext } from "../root/MenuRootContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { useCompositeListItem } from "../../composite/list/useCompositeListItem.js";
import { useMenuPositionerContext } from "../positioner/MenuPositionerContext.js";
import { jsx as _jsx } from "react/jsx-runtime";
const InnerMenuItem = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function InnerMenuItem(componentProps, forwardedRef) {
  const {
    className,
    closeOnClick = true,
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
    nodeId,
    itemMetadata: REGULAR_ITEM
  });
  const state = React.useMemo(() => ({
    disabled,
    highlighted
  }), [disabled, highlighted]);
  return useRenderElement('div', componentProps, {
    state,
    ref: [itemRef, forwardedRef],
    props: [itemProps, elementProps, getItemProps]
  });
}));

/**
 * An individual interactive item in the menu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
if (process.env.NODE_ENV !== "production") InnerMenuItem.displayName = "InnerMenuItem";
export const MenuItem = /*#__PURE__*/React.forwardRef(function MenuItem(props, forwardedRef) {
  const {
    id: idProp,
    label,
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
  // MenuItem reads the context and re-renders the actual MenuItem
  // only when it needs to.

  return /*#__PURE__*/_jsx(InnerMenuItem, {
    ...other,
    id: id,
    ref: mergedRef,
    highlighted: highlighted,
    menuEvents: menuEvents,
    itemProps: itemProps,
    allowMouseUpTriggerRef: allowMouseUpTriggerRef,
    typingRef: typingRef,
    nativeButton: nativeButton,
    nodeId: menuPositionerContext?.floatingContext.nodeId
  });
});
if (process.env.NODE_ENV !== "production") MenuItem.displayName = "MenuItem";