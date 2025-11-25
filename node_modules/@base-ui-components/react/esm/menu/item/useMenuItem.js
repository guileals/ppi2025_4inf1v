'use client';

import * as React from 'react';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useButton } from "../../use-button/index.js";
import { mergeProps } from "../../merge-props/index.js";
export const REGULAR_ITEM = {
  type: 'regular-item'
};
export function useMenuItem(params) {
  const {
    closeOnClick,
    disabled = false,
    highlighted,
    id,
    menuEvents,
    allowMouseUpTriggerRef,
    typingRef,
    nativeButton,
    itemMetadata,
    nodeId
  } = params;
  const itemRef = React.useRef(null);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton
  });
  const getItemProps = React.useCallback(externalProps => {
    return mergeProps({
      id,
      role: 'menuitem',
      tabIndex: highlighted ? 0 : -1,
      onMouseMove(event) {
        if (!nodeId) {
          return;
        }

        // Inform the floating tree that a menu item within this menu was hovered/moved over
        // so unrelated descendant submenus can be closed.
        menuEvents.emit('itemhover', {
          nodeId,
          target: event.currentTarget
        });
      },
      onMouseEnter() {
        if (itemMetadata.type !== 'submenu-trigger') {
          return;
        }
        itemMetadata.setActive();
      },
      onKeyUp(event) {
        if (event.key === ' ' && typingRef.current) {
          event.preventBaseUIHandler();
        }
      },
      onClick(event) {
        if (closeOnClick) {
          menuEvents.emit('close', {
            domEvent: event,
            reason: 'item-press'
          });
        }
      },
      onMouseUp() {
        if (itemRef.current && allowMouseUpTriggerRef.current) {
          // This fires whenever the user clicks on the trigger, moves the cursor, and releases it over the item.
          // We trigger the click and override the `closeOnClick` preference to always close the menu.
          if (itemMetadata.type === 'regular-item') {
            itemRef.current.click();
          }
        }
      }
    }, externalProps, getButtonProps);
  }, [id, highlighted, getButtonProps, typingRef, closeOnClick, menuEvents, allowMouseUpTriggerRef, itemMetadata, nodeId]);
  const mergedRef = useMergedRefs(itemRef, buttonRef);
  return React.useMemo(() => ({
    getItemProps,
    itemRef: mergedRef
  }), [getItemProps, mergedRef]);
}