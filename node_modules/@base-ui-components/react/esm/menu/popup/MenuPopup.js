'use client';

import * as React from 'react';
import { FloatingFocusManager, useFloatingTree } from "../../floating-ui-react/index.js";
import { useMenuRootContext } from "../root/MenuRootContext.js";
import { useMenuPositionerContext } from "../positioner/MenuPositionerContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { popupStateMapping as baseMapping } from "../../utils/popupStateMapping.js";
import { transitionStatusMapping } from "../../utils/styleHookMapping.js";
import { useOpenChangeComplete } from "../../utils/useOpenChangeComplete.js";
import { EMPTY_OBJECT, DISABLED_TRANSITIONS_STYLE } from "../../utils/constants.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { jsx as _jsx } from "react/jsx-runtime";
const customStyleHookMapping = {
  ...baseMapping,
  ...transitionStatusMapping
};

/**
 * A container for the menu items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export const MenuPopup = /*#__PURE__*/React.forwardRef(function MenuPopup(componentProps, forwardedRef) {
  const {
    render,
    className,
    finalFocus,
    ...elementProps
  } = componentProps;
  const {
    open,
    setOpen,
    popupRef,
    transitionStatus,
    popupProps,
    mounted,
    instantType,
    triggerElement,
    onOpenChangeComplete,
    parent,
    lastOpenChangeReason,
    rootId
  } = useMenuRootContext();
  const {
    side,
    align,
    floatingContext
  } = useMenuPositionerContext();
  useOpenChangeComplete({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        onOpenChangeComplete?.(true);
      }
    }
  });
  const {
    events: menuEvents
  } = useFloatingTree();
  React.useEffect(() => {
    function handleClose(event) {
      setOpen(false, createBaseUIEventDetails(event.reason, event.domEvent));
    }
    menuEvents.on('close', handleClose);
    return () => {
      menuEvents.off('close', handleClose);
    };
  }, [menuEvents, setOpen]);
  const state = React.useMemo(() => ({
    transitionStatus,
    side,
    align,
    open,
    nested: parent.type === 'menu',
    instant: instantType
  }), [transitionStatus, side, align, open, parent.type, instantType]);
  const element = useRenderElement('div', componentProps, {
    state,
    ref: [forwardedRef, popupRef],
    customStyleHookMapping,
    props: [popupProps, transitionStatus === 'starting' ? DISABLED_TRANSITIONS_STYLE : EMPTY_OBJECT, elementProps, {
      'data-rootownerid': rootId
    }]
  });
  let returnFocus = parent.type === undefined || parent.type === 'context-menu';
  if (triggerElement || parent.type === 'menubar' && lastOpenChangeReason !== 'outside-press') {
    returnFocus = true;
  }
  return /*#__PURE__*/_jsx(FloatingFocusManager, {
    context: floatingContext,
    modal: false,
    disabled: !mounted,
    returnFocus: finalFocus === undefined ? returnFocus : finalFocus,
    initialFocus: parent.type !== 'menu',
    restoreFocus: true,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") MenuPopup.displayName = "MenuPopup";