'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useTimeout } from '@base-ui-components/utils/useTimeout';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useId } from '@base-ui-components/utils/useId';
import { FloatingTree, useClick, useDismiss, useFloatingRootContext, useFocus, useHover, useInteractions, useListNavigation, useRole, useTypeahead, safePolygon } from "../../floating-ui-react/index.js";
import { MenuRootContext, useMenuRootContext } from "./MenuRootContext.js";
import { useMenubarContext } from "../../menubar/MenubarContext.js";
import { useTransitionStatus } from "../../utils/useTransitionStatus.js";
import { PATIENT_CLICK_THRESHOLD, TYPEAHEAD_RESET_MS } from "../../utils/constants.js";
import { useOpenChangeComplete } from "../../utils/useOpenChangeComplete.js";
import { useDirection } from "../../direction-provider/DirectionContext.js";
import { useScrollLock } from "../../utils/useScrollLock.js";
import { useOpenInteractionType } from "../../utils/useOpenInteractionType.js";
import { useContextMenuRootContext } from "../../context-menu/root/ContextMenuRootContext.js";
import { useMenuSubmenuRootContext } from "../submenu-root/MenuSubmenuRootContext.js";
import { useMixedToggleClickHandler } from "../../utils/useMixedToggleClickHander.js";
import { mergeProps } from "../../merge-props/index.js";
import { useFloatingParentNodeId } from "../../floating-ui-react/components/FloatingTree.js";
import { jsx as _jsx } from "react/jsx-runtime";
const EMPTY_ARRAY = [];
const EMPTY_REF = {
  current: false
};

/**
 * Groups all parts of the menu.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export const MenuRoot = function MenuRoot(props) {
  const {
    children,
    open: openProp,
    onOpenChange,
    onOpenChangeComplete,
    defaultOpen = false,
    disabled = false,
    modal: modalProp,
    loop = true,
    orientation = 'vertical',
    actionsRef,
    openOnHover: openOnHoverProp,
    delay = 100,
    closeDelay = 0,
    closeParentOnEsc = true
  } = props;
  const [triggerElement, setTriggerElement] = React.useState(null);
  const [positionerElement, setPositionerElementUnwrapped] = React.useState(null);
  const [instantType, setInstantType] = React.useState();
  const [hoverEnabled, setHoverEnabled] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [lastOpenChangeReason, setLastOpenChangeReason] = React.useState(null);
  const [stickIfOpen, setStickIfOpen] = React.useState(true);
  const [allowMouseEnterState, setAllowMouseEnterState] = React.useState(false);
  const openEventRef = React.useRef(null);
  const popupRef = React.useRef(null);
  const positionerRef = React.useRef(null);
  const itemDomElements = React.useRef([]);
  const itemLabels = React.useRef([]);
  const stickIfOpenTimeout = useTimeout();
  const contextMenuContext = useContextMenuRootContext(true);
  const isSubmenu = useMenuSubmenuRootContext();
  const nested = useFloatingParentNodeId() != null;
  let floatingEvents;
  let parent;
  {
    const parentContext = useMenuRootContext(true);
    const menubarContext = useMenubarContext(true);
    if (isSubmenu && parentContext) {
      parent = {
        type: 'menu',
        context: parentContext
      };
    } else if (menubarContext) {
      parent = {
        type: 'menubar',
        context: menubarContext
      };
      // Ensure this is not a Menu nested inside ContextMenu.Trigger.
      // ContextMenu parentContext is always undefined as ContextMenu.Root is instantiated with
      // <MenuRootContext.Provider value={undefined}>
    } else if (contextMenuContext && !parentContext) {
      parent = {
        type: 'context-menu',
        context: contextMenuContext
      };
    } else {
      parent = {
        type: undefined
      };
    }
  }
  let rootId = useId();
  if (parent.type !== undefined) {
    rootId = parent.context.rootId;
  }
  const modal = (parent.type === undefined || parent.type === 'context-menu') && (modalProp ?? true);

  // If this menu is a submenu, it should inherit `allowMouseEnter` from its
  // parent. Otherwise it manages the state on its own.
  const allowMouseEnter = parent.type === 'menu' ? parent.context.allowMouseEnter : allowMouseEnterState;
  const setAllowMouseEnter = parent.type === 'menu' ? parent.context.setAllowMouseEnter : setAllowMouseEnterState;
  if (process.env.NODE_ENV !== 'production') {
    if (parent.type !== undefined && modalProp !== undefined) {
      console.warn('Base UI: The `modal` prop is not supported on nested menus. It will be ignored.');
    }
  }
  const openOnHover = openOnHoverProp ?? (parent.type === 'menu' || parent.type === 'menubar' && parent.context.hasSubmenuOpen);
  const [open, setOpenUnwrapped] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: 'MenuRoot',
    state: 'open'
  });
  const allowOutsidePressDismissalRef = React.useRef(parent.type !== 'context-menu');
  const allowOutsidePressDismissalTimeout = useTimeout();
  React.useEffect(() => {
    if (!open) {
      openEventRef.current = null;
    }
    if (parent.type !== 'context-menu') {
      return;
    }
    if (!open) {
      allowOutsidePressDismissalTimeout.clear();
      allowOutsidePressDismissalRef.current = false;
      return;
    }

    // With `mousedown` outside press events and long press touch input, there
    // needs to be a grace period after opening to ensure the dismissal event
    // doesn't fire immediately after open.
    allowOutsidePressDismissalTimeout.start(500, () => {
      allowOutsidePressDismissalRef.current = true;
    });
  }, [allowOutsidePressDismissalTimeout, open, parent.type]);
  const setPositionerElement = React.useCallback(value => {
    positionerRef.current = value;
    setPositionerElementUnwrapped(value);
  }, []);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  const {
    openMethod,
    triggerProps: interactionTypeProps,
    reset: resetOpenInteractionType
  } = useOpenInteractionType(open);
  useScrollLock({
    enabled: open && modal && lastOpenChangeReason !== 'trigger-hover' && openMethod !== 'touch',
    mounted,
    open,
    referenceElement: positionerElement
  });
  if (!open && !hoverEnabled) {
    setHoverEnabled(true);
  }
  const handleUnmount = useEventCallback(() => {
    setMounted(false);
    setStickIfOpen(true);
    setAllowMouseEnter(false);
    onOpenChangeComplete?.(false);
    resetOpenInteractionType();
  });
  useOpenChangeComplete({
    enabled: !actionsRef,
    open,
    ref: popupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  const allowTouchToCloseRef = React.useRef(true);
  const allowTouchToCloseTimeout = useTimeout();
  const setOpen = useEventCallback((nextOpen, eventDetails) => {
    const reason = eventDetails.reason;
    if (open === nextOpen) {
      return;
    }
    onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    const details = {
      open: nextOpen,
      nativeEvent: eventDetails.event,
      reason: eventDetails.reason,
      nested
    };
    floatingEvents?.emit('openchange', details);
    const nativeEvent = eventDetails.event;
    if (nextOpen === false && nativeEvent?.type === 'click' && nativeEvent.pointerType === 'touch' && !allowTouchToCloseRef.current) {
      return;
    }

    // Workaround `enableFocusInside` in Floating UI setting `tabindex=0` of a non-highlighted
    // option upon close when tabbing out due to `keepMounted=true`:
    // https://github.com/floating-ui/floating-ui/pull/3004/files#diff-962a7439cdeb09ea98d4b622a45d517bce07ad8c3f866e089bda05f4b0bbd875R194-R199
    // This otherwise causes options to retain `tabindex=0` incorrectly when the popup is closed
    // when tabbing outside.
    if (!nextOpen && activeIndex !== null) {
      const activeOption = itemDomElements.current[activeIndex];
      // Wait for Floating UI's focus effect to have fired
      queueMicrotask(() => {
        activeOption?.setAttribute('tabindex', '-1');
      });
    }

    // Prevent the menu from closing on mobile devices that have a delayed click event.
    // In some cases the menu, when tapped, will fire the focus event first and then the click event.
    // Without this guard, the menu will close immediately after opening.
    if (nextOpen && reason === 'trigger-focus') {
      allowTouchToCloseRef.current = false;
      allowTouchToCloseTimeout.start(300, () => {
        allowTouchToCloseRef.current = true;
      });
    } else {
      allowTouchToCloseRef.current = true;
      allowTouchToCloseTimeout.clear();
    }
    const isKeyboardClick = (reason === 'trigger-press' || reason === 'item-press') && nativeEvent.detail === 0 && nativeEvent?.isTrusted;
    const isDismissClose = !nextOpen && (reason === 'escape-key' || reason == null);
    function changeState() {
      setOpenUnwrapped(nextOpen);
      setLastOpenChangeReason(reason ?? null);
      openEventRef.current = eventDetails.event ?? null;
    }
    if (reason === 'trigger-hover') {
      // Only allow "patient" clicks to close the menu if it's open.
      // If they clicked within 500ms of the menu opening, keep it open.
      setStickIfOpen(true);
      stickIfOpenTimeout.start(PATIENT_CLICK_THRESHOLD, () => {
        setStickIfOpen(false);
      });
      ReactDOM.flushSync(changeState);
    } else {
      changeState();
    }
    if (parent.type === 'menubar' && (reason === 'trigger-focus' || reason === 'focus-out' || reason === 'trigger-hover' || reason === 'list-navigation' || reason === 'sibling-open')) {
      setInstantType('group');
    } else if (isKeyboardClick || isDismissClose) {
      setInstantType(isKeyboardClick ? 'click' : 'dismiss');
    } else {
      setInstantType(undefined);
    }
  });
  React.useImperativeHandle(actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  let ctx;
  if (parent.type === 'context-menu') {
    ctx = parent.context;
  }
  React.useImperativeHandle(ctx?.positionerRef, () => positionerElement, [positionerElement]);
  React.useImperativeHandle(ctx?.actionsRef, () => ({
    setOpen
  }), [setOpen]);
  React.useEffect(() => {
    if (!open) {
      stickIfOpenTimeout.clear();
    }
  }, [stickIfOpenTimeout, open]);
  const floatingRootContext = useFloatingRootContext({
    elements: {
      reference: triggerElement,
      floating: positionerElement
    },
    open,
    onOpenChange: setOpen
  });
  floatingEvents = floatingRootContext.events;
  const hover = useHover(floatingRootContext, {
    enabled: hoverEnabled && openOnHover && !disabled && parent.type !== 'context-menu' && (parent.type !== 'menubar' || parent.context.hasSubmenuOpen && !open),
    handleClose: safePolygon({
      blockPointerEvents: true
    }),
    mouseOnly: true,
    move: parent.type === 'menu',
    restMs: parent.type === undefined || parent.type === 'menu' && allowMouseEnter ? delay : undefined,
    delay: parent.type === 'menu' ? {
      open: allowMouseEnter ? delay : 10 ** 10,
      close: closeDelay
    } : {
      close: closeDelay
    }
  });
  const focus = useFocus(floatingRootContext, {
    enabled: !disabled && !open && parent.type === 'menubar' && parent.context.hasSubmenuOpen && !contextMenuContext
  });
  const click = useClick(floatingRootContext, {
    enabled: !disabled && parent.type !== 'context-menu',
    event: open && parent.type === 'menubar' ? 'click' : 'mousedown',
    toggle: !openOnHover || parent.type !== 'menu',
    ignoreMouse: openOnHover && parent.type === 'menu',
    stickIfOpen: parent.type === undefined ? stickIfOpen : false
  });
  const dismiss = useDismiss(floatingRootContext, {
    enabled: !disabled,
    bubbles: closeParentOnEsc && parent.type === 'menu',
    outsidePress() {
      if (parent.type !== 'context-menu' || openEventRef.current?.type === 'contextmenu') {
        return true;
      }
      return allowOutsidePressDismissalRef.current;
    }
  });
  const role = useRole(floatingRootContext, {
    role: 'menu'
  });
  const direction = useDirection();
  const listNavigation = useListNavigation(floatingRootContext, {
    enabled: !disabled,
    listRef: itemDomElements,
    activeIndex,
    nested: parent.type !== undefined,
    loop,
    orientation,
    parentOrientation: parent.type === 'menubar' ? parent.context.orientation : undefined,
    rtl: direction === 'rtl',
    disabledIndices: EMPTY_ARRAY,
    onNavigate: setActiveIndex,
    openOnArrowKeyDown: parent.type !== 'context-menu'
  });
  const typingRef = React.useRef(false);
  const onTypingChange = React.useCallback(nextTyping => {
    typingRef.current = nextTyping;
  }, []);
  const typeahead = useTypeahead(floatingRootContext, {
    listRef: itemLabels,
    activeIndex,
    resetMs: TYPEAHEAD_RESET_MS,
    onMatch: index => {
      if (open && index !== activeIndex) {
        setActiveIndex(index);
      }
    },
    onTypingChange
  });
  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = useInteractions([hover, click, dismiss, focus, role, listNavigation, typeahead]);
  const mixedToggleHandlers = useMixedToggleClickHandler({
    open,
    enabled: parent.type === 'menubar',
    mouseDownAction: 'open'
  });
  const triggerProps = React.useMemo(() => {
    const referenceProps = mergeProps(getReferenceProps(), {
      onMouseEnter() {
        setHoverEnabled(true);
      },
      onMouseMove() {
        setAllowMouseEnter(true);
      }
    }, interactionTypeProps, mixedToggleHandlers);
    delete referenceProps.role;
    return referenceProps;
  }, [getReferenceProps, mixedToggleHandlers, setAllowMouseEnter, interactionTypeProps]);
  const popupProps = React.useMemo(() => getFloatingProps({
    onMouseEnter() {
      if (!openOnHover || parent.type === 'menu') {
        setHoverEnabled(false);
      }
    },
    onMouseMove() {
      setAllowMouseEnter(true);
    },
    onClick() {
      if (openOnHover) {
        setHoverEnabled(false);
      }
    }
  }), [getFloatingProps, openOnHover, parent.type, setAllowMouseEnter]);
  const itemProps = React.useMemo(() => getItemProps(), [getItemProps]);
  const context = React.useMemo(() => ({
    activeIndex,
    setActiveIndex,
    allowMouseUpTriggerRef: parent.type ? parent.context.allowMouseUpTriggerRef : EMPTY_REF,
    floatingRootContext,
    itemProps,
    popupProps,
    triggerProps,
    itemDomElements,
    itemLabels,
    mounted,
    open,
    popupRef,
    positionerRef,
    setOpen,
    setPositionerElement,
    triggerElement,
    setTriggerElement,
    transitionStatus,
    lastOpenChangeReason,
    instantType,
    onOpenChangeComplete,
    setHoverEnabled,
    typingRef,
    modal,
    disabled,
    parent,
    rootId,
    allowMouseEnter,
    setAllowMouseEnter
  }), [activeIndex, floatingRootContext, itemProps, popupProps, triggerProps, itemDomElements, itemLabels, mounted, open, positionerRef, setOpen, transitionStatus, triggerElement, setPositionerElement, lastOpenChangeReason, instantType, onOpenChangeComplete, modal, disabled, parent, rootId, allowMouseEnter, setAllowMouseEnter]);
  const content = /*#__PURE__*/_jsx(MenuRootContext.Provider, {
    value: context,
    children: children
  });
  if (parent.type === undefined || parent.type === 'context-menu') {
    // set up a FloatingTree to provide the context to nested menus
    return /*#__PURE__*/_jsx(FloatingTree, {
      children: content
    });
  }
  return content;
};