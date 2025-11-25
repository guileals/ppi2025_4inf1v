'use client';

import * as React from 'react';
import { useFloatingTree } from "../../floating-ui-react/index.js";
import { useMenuRootContext } from "../root/MenuRootContext.js";
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { triggerOpenStateMapping } from "../../utils/popupStateMapping.js";
import { useCompositeListItem } from "../../composite/list/useCompositeListItem.js";
import { useMenuItem } from "../item/useMenuItem.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useMenuPositionerContext } from "../positioner/MenuPositionerContext.js";

/**
 * A menu item that opens a submenu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export const MenuSubmenuTrigger = /*#__PURE__*/React.forwardRef(function SubmenuTriggerComponent(componentProps, forwardedRef) {
  const {
    render,
    className,
    label,
    id: idProp,
    nativeButton = false,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const {
    triggerProps: rootTriggerProps,
    parent,
    setTriggerElement,
    open,
    typingRef,
    disabled,
    allowMouseUpTriggerRef
  } = useMenuRootContext();
  const menuPositionerContext = useMenuPositionerContext();
  if (parent.type !== 'menu') {
    throw new Error('Base UI: <Menu.SubmenuTrigger> must be placed in <Menu.SubmenuRoot>.');
  }
  const parentMenuContext = parent.context;
  const {
    activeIndex,
    itemProps,
    setActiveIndex
  } = parentMenuContext;
  const item = useCompositeListItem();
  const highlighted = activeIndex === item.index;
  const {
    events: menuEvents
  } = useFloatingTree();
  const itemMetadata = React.useMemo(() => ({
    type: 'submenu-trigger',
    setActive: () => setActiveIndex(item.index),
    allowMouseEnterEnabled: parentMenuContext.allowMouseEnter
  }), [setActiveIndex, item.index, parentMenuContext.allowMouseEnter]);
  const {
    getItemProps,
    itemRef
  } = useMenuItem({
    closeOnClick: false,
    disabled,
    highlighted,
    id,
    menuEvents,
    allowMouseUpTriggerRef,
    typingRef,
    nativeButton,
    itemMetadata,
    nodeId: menuPositionerContext?.floatingContext.nodeId
  });
  const state = React.useMemo(() => ({
    disabled,
    highlighted,
    open
  }), [disabled, highlighted, open]);
  return useRenderElement('div', componentProps, {
    state,
    ref: [forwardedRef, item.ref, itemRef, setTriggerElement],
    customStyleHookMapping: triggerOpenStateMapping,
    props: [rootTriggerProps, itemProps, elementProps, getItemProps, {
      tabIndex: open || highlighted ? 0 : -1,
      onBlur() {
        if (highlighted) {
          setActiveIndex(null);
        }
      }
    }]
  });
});
if (process.env.NODE_ENV !== "production") MenuSubmenuTrigger.displayName = "MenuSubmenuTrigger";