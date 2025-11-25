"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useId = require("@base-ui-components/utils/useId");
var _floatingUiReact = require("../../floating-ui-react");
var _MenuRootContext = require("./MenuRootContext");
var _MenubarContext = require("../../menubar/MenubarContext");
var _useTransitionStatus = require("../../utils/useTransitionStatus");
var _constants = require("../../utils/constants");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _DirectionContext = require("../../direction-provider/DirectionContext");
var _useScrollLock = require("../../utils/useScrollLock");
var _useOpenInteractionType = require("../../utils/useOpenInteractionType");
var _ContextMenuRootContext = require("../../context-menu/root/ContextMenuRootContext");
var _MenuSubmenuRootContext = require("../submenu-root/MenuSubmenuRootContext");
var _useMixedToggleClickHander = require("../../utils/useMixedToggleClickHander");
var _mergeProps = require("../../merge-props");
var _FloatingTree = require("../../floating-ui-react/components/FloatingTree");
var _jsxRuntime = require("react/jsx-runtime");
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
const MenuRoot = exports.MenuRoot = function MenuRoot(props) {
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
  const stickIfOpenTimeout = (0, _useTimeout.useTimeout)();
  const contextMenuContext = (0, _ContextMenuRootContext.useContextMenuRootContext)(true);
  const isSubmenu = (0, _MenuSubmenuRootContext.useMenuSubmenuRootContext)();
  const nested = (0, _FloatingTree.useFloatingParentNodeId)() != null;
  let floatingEvents;
  let parent;
  {
    const parentContext = (0, _MenuRootContext.useMenuRootContext)(true);
    const menubarContext = (0, _MenubarContext.useMenubarContext)(true);
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
  let rootId = (0, _useId.useId)();
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
  const [open, setOpenUnwrapped] = (0, _useControlled.useControlled)({
    controlled: openProp,
    default: defaultOpen,
    name: 'MenuRoot',
    state: 'open'
  });
  const allowOutsidePressDismissalRef = React.useRef(parent.type !== 'context-menu');
  const allowOutsidePressDismissalTimeout = (0, _useTimeout.useTimeout)();
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
  } = (0, _useTransitionStatus.useTransitionStatus)(open);
  const {
    openMethod,
    triggerProps: interactionTypeProps,
    reset: resetOpenInteractionType
  } = (0, _useOpenInteractionType.useOpenInteractionType)(open);
  (0, _useScrollLock.useScrollLock)({
    enabled: open && modal && lastOpenChangeReason !== 'trigger-hover' && openMethod !== 'touch',
    mounted,
    open,
    referenceElement: positionerElement
  });
  if (!open && !hoverEnabled) {
    setHoverEnabled(true);
  }
  const handleUnmount = (0, _useEventCallback.useEventCallback)(() => {
    setMounted(false);
    setStickIfOpen(true);
    setAllowMouseEnter(false);
    onOpenChangeComplete?.(false);
    resetOpenInteractionType();
  });
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
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
  const allowTouchToCloseTimeout = (0, _useTimeout.useTimeout)();
  const setOpen = (0, _useEventCallback.useEventCallback)((nextOpen, eventDetails) => {
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
      stickIfOpenTimeout.start(_constants.PATIENT_CLICK_THRESHOLD, () => {
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
  const floatingRootContext = (0, _floatingUiReact.useFloatingRootContext)({
    elements: {
      reference: triggerElement,
      floating: positionerElement
    },
    open,
    onOpenChange: setOpen
  });
  floatingEvents = floatingRootContext.events;
  const hover = (0, _floatingUiReact.useHover)(floatingRootContext, {
    enabled: hoverEnabled && openOnHover && !disabled && parent.type !== 'context-menu' && (parent.type !== 'menubar' || parent.context.hasSubmenuOpen && !open),
    handleClose: (0, _floatingUiReact.safePolygon)({
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
  const focus = (0, _floatingUiReact.useFocus)(floatingRootContext, {
    enabled: !disabled && !open && parent.type === 'menubar' && parent.context.hasSubmenuOpen && !contextMenuContext
  });
  const click = (0, _floatingUiReact.useClick)(floatingRootContext, {
    enabled: !disabled && parent.type !== 'context-menu',
    event: open && parent.type === 'menubar' ? 'click' : 'mousedown',
    toggle: !openOnHover || parent.type !== 'menu',
    ignoreMouse: openOnHover && parent.type === 'menu',
    stickIfOpen: parent.type === undefined ? stickIfOpen : false
  });
  const dismiss = (0, _floatingUiReact.useDismiss)(floatingRootContext, {
    enabled: !disabled,
    bubbles: closeParentOnEsc && parent.type === 'menu',
    outsidePress() {
      if (parent.type !== 'context-menu' || openEventRef.current?.type === 'contextmenu') {
        return true;
      }
      return allowOutsidePressDismissalRef.current;
    }
  });
  const role = (0, _floatingUiReact.useRole)(floatingRootContext, {
    role: 'menu'
  });
  const direction = (0, _DirectionContext.useDirection)();
  const listNavigation = (0, _floatingUiReact.useListNavigation)(floatingRootContext, {
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
  const typeahead = (0, _floatingUiReact.useTypeahead)(floatingRootContext, {
    listRef: itemLabels,
    activeIndex,
    resetMs: _constants.TYPEAHEAD_RESET_MS,
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
  } = (0, _floatingUiReact.useInteractions)([hover, click, dismiss, focus, role, listNavigation, typeahead]);
  const mixedToggleHandlers = (0, _useMixedToggleClickHander.useMixedToggleClickHandler)({
    open,
    enabled: parent.type === 'menubar',
    mouseDownAction: 'open'
  });
  const triggerProps = React.useMemo(() => {
    const referenceProps = (0, _mergeProps.mergeProps)(getReferenceProps(), {
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
  const content = /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuRootContext.MenuRootContext.Provider, {
    value: context,
    children: children
  });
  if (parent.type === undefined || parent.type === 'context-menu') {
    // set up a FloatingTree to provide the context to nested menus
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_floatingUiReact.FloatingTree, {
      children: content
    });
  }
  return content;
};