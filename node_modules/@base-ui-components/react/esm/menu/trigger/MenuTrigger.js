'use client';

import * as React from 'react';
import { getParentNode, isHTMLElement, isLastTraversableNode } from '@floating-ui/utils/dom';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { useTimeout } from '@base-ui-components/utils/useTimeout';
import { ownerDocument } from '@base-ui-components/utils/owner';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { contains } from "../../floating-ui-react/utils.js";
import { useFloatingTree } from "../../floating-ui-react/index.js";
import { useMenuRootContext } from "../root/MenuRootContext.js";
import { pressableTriggerOpenStateMapping } from "../../utils/popupStateMapping.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { mergeProps } from "../../merge-props/index.js";
import { useButton } from "../../use-button/useButton.js";
import { getPseudoElementBounds } from "../../utils/getPseudoElementBounds.js";
import { CompositeItem } from "../../composite/item/CompositeItem.js";
import { jsx as _jsx } from "react/jsx-runtime";
const BOUNDARY_OFFSET = 2;

/**
 * A button that opens the menu.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export const MenuTrigger = /*#__PURE__*/React.forwardRef(function MenuTrigger(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp = false,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const {
    triggerProps: rootTriggerProps,
    disabled: menuDisabled,
    setTriggerElement,
    open,
    allowMouseUpTriggerRef,
    positionerRef,
    parent,
    lastOpenChangeReason,
    rootId
  } = useMenuRootContext();
  const disabled = disabledProp || menuDisabled;
  const triggerRef = React.useRef(null);
  const allowMouseUpTriggerTimeout = useTimeout();
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const handleRef = useMergedRefs(buttonRef, setTriggerElement);
  const {
    events: menuEvents
  } = useFloatingTree();
  React.useEffect(() => {
    if (!open && parent.type === undefined) {
      allowMouseUpTriggerRef.current = false;
    }
  }, [allowMouseUpTriggerRef, open, parent.type]);
  const handleDocumentMouseUp = useEventCallback(mouseEvent => {
    if (!triggerRef.current) {
      return;
    }
    allowMouseUpTriggerTimeout.clear();
    allowMouseUpTriggerRef.current = false;
    const mouseUpTarget = mouseEvent.target;
    if (contains(triggerRef.current, mouseUpTarget) || contains(positionerRef.current, mouseUpTarget) || mouseUpTarget === triggerRef.current) {
      return;
    }
    if (mouseUpTarget != null && findRootOwnerId(mouseUpTarget) === rootId) {
      return;
    }
    const bounds = getPseudoElementBounds(triggerRef.current);
    if (mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET && mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET && mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET && mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET) {
      return;
    }
    menuEvents.emit('close', {
      domEvent: mouseEvent,
      reason: 'cancel-open'
    });
  });
  React.useEffect(() => {
    if (open && lastOpenChangeReason === 'trigger-hover') {
      const doc = ownerDocument(triggerRef.current);
      doc.addEventListener('mouseup', handleDocumentMouseUp, {
        once: true
      });
    }
  }, [open, handleDocumentMouseUp, lastOpenChangeReason]);
  const isMenubar = parent.type === 'menubar';
  const getTriggerProps = React.useCallback(externalProps => {
    return mergeProps(isMenubar ? {
      role: 'menuitem'
    } : {}, {
      'aria-haspopup': 'menu',
      ref: handleRef,
      onMouseDown: event => {
        if (open) {
          return;
        }

        // mousedown -> mouseup on menu item should not trigger it within 200ms.
        allowMouseUpTriggerTimeout.start(200, () => {
          allowMouseUpTriggerRef.current = true;
        });
        const doc = ownerDocument(event.currentTarget);
        doc.addEventListener('mouseup', handleDocumentMouseUp, {
          once: true
        });
      }
    }, externalProps, getButtonProps);
  }, [getButtonProps, handleRef, open, allowMouseUpTriggerRef, allowMouseUpTriggerTimeout, handleDocumentMouseUp, isMenubar]);
  const state = React.useMemo(() => ({
    disabled,
    open
  }), [disabled, open]);
  const ref = [triggerRef, forwardedRef, buttonRef];
  const props = [rootTriggerProps, elementProps, getTriggerProps];
  const element = useRenderElement('button', componentProps, {
    enabled: !isMenubar,
    customStyleHookMapping: pressableTriggerOpenStateMapping,
    state,
    ref,
    props
  });
  if (isMenubar) {
    return /*#__PURE__*/_jsx(CompositeItem, {
      tag: "button",
      render: render,
      className: className,
      state: state,
      refs: ref,
      props: props,
      customStyleHookMapping: pressableTriggerOpenStateMapping
    });
  }
  return element;
});
if (process.env.NODE_ENV !== "production") MenuTrigger.displayName = "MenuTrigger";
function findRootOwnerId(node) {
  if (isHTMLElement(node) && node.hasAttribute('data-rootownerid')) {
    return node.getAttribute('data-rootownerid') ?? undefined;
  }
  if (isLastTraversableNode(node)) {
    return undefined;
  }
  return findRootOwnerId(getParentNode(node));
}