"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDialogRoot = useDialogRoot;
var React = _interopRequireWildcard(require("react"));
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _floatingUiReact = require("../../floating-ui-react");
var _utils = require("../../floating-ui-react/utils");
var _useScrollLock = require("../../utils/useScrollLock");
var _useTransitionStatus = require("../../utils/useTransitionStatus");
var _useOpenInteractionType = require("../../utils/useOpenInteractionType");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
function useDialogRoot(params) {
  const {
    defaultOpen,
    dismissible,
    modal,
    onNestedDialogClose,
    onNestedDialogOpen,
    onOpenChange: onOpenChangeParameter,
    open: openParam,
    onOpenChangeComplete
  } = params;
  const [open, setOpenUnwrapped] = (0, _useControlled.useControlled)({
    controlled: openParam,
    default: defaultOpen,
    name: 'DialogRoot',
    state: 'open'
  });
  const popupRef = React.useRef(null);
  const backdropRef = React.useRef(null);
  const internalBackdropRef = React.useRef(null);
  const [titleElementId, setTitleElementId] = React.useState(undefined);
  const [descriptionElementId, setDescriptionElementId] = React.useState(undefined);
  const [triggerElement, setTriggerElement] = React.useState(null);
  const [popupElement, setPopupElement] = React.useState(null);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = (0, _useTransitionStatus.useTransitionStatus)(open);
  const {
    openMethod,
    triggerProps,
    reset: resetOpenInteractionType
  } = (0, _useOpenInteractionType.useOpenInteractionType)(open);
  const nested = (0, _floatingUiReact.useFloatingParentNodeId)() != null;
  let floatingEvents;
  const setOpen = (0, _useEventCallback.useEventCallback)((nextOpen, eventDetails) => {
    onOpenChangeParameter?.(nextOpen, eventDetails);
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
    setOpenUnwrapped(nextOpen);
  });
  const handleUnmount = (0, _useEventCallback.useEventCallback)(() => {
    setMounted(false);
    onOpenChangeComplete?.(false);
    resetOpenInteractionType();
  });
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
    enabled: !params.actionsRef,
    open,
    ref: popupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  React.useImperativeHandle(params.actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  const context = (0, _floatingUiReact.useFloatingRootContext)({
    elements: {
      reference: triggerElement,
      floating: popupElement
    },
    open,
    onOpenChange: setOpen,
    noEmit: true
  });
  floatingEvents = context.events;
  const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = React.useState(0);
  const isTopmost = ownNestedOpenDialogs === 0;
  const role = (0, _floatingUiReact.useRole)(context);
  const click = (0, _floatingUiReact.useClick)(context);
  const dismiss = (0, _floatingUiReact.useDismiss)(context, {
    outsidePressEvent() {
      if (internalBackdropRef.current || backdropRef.current) {
        return 'intentional';
      }
      // Ensure `aria-hidden` on outside elements is removed immediately
      // on outside press when trapping focus.
      return {
        mouse: modal === 'trap-focus' ? 'sloppy' : 'intentional',
        touch: 'sloppy'
      };
    },
    outsidePress(event) {
      if (event.button !== 0) {
        return false;
      }
      const target = (0, _utils.getTarget)(event);
      if (isTopmost && dismissible) {
        const eventTarget = target;
        // Only close if the click occurred on the dialog's owning backdrop.
        // This supports multiple modal dialogs that aren't nested in the React tree:
        // https://github.com/mui/base-ui/issues/1320
        if (modal) {
          return internalBackdropRef.current || backdropRef.current ? internalBackdropRef.current === eventTarget || backdropRef.current === eventTarget : true;
        }
        return true;
      }
      return false;
    },
    escapeKey: isTopmost
  });
  (0, _useScrollLock.useScrollLock)({
    enabled: open && modal === true,
    mounted,
    open,
    referenceElement: popupElement
  });
  const {
    getReferenceProps,
    getFloatingProps
  } = (0, _floatingUiReact.useInteractions)([role, click, dismiss]);
  React.useEffect(() => {
    if (onNestedDialogOpen && open) {
      onNestedDialogOpen(ownNestedOpenDialogs);
    }
    if (onNestedDialogClose && !open) {
      onNestedDialogClose();
    }
    return () => {
      if (onNestedDialogClose && open) {
        onNestedDialogClose();
      }
    };
  }, [open, onNestedDialogClose, onNestedDialogOpen, ownNestedOpenDialogs]);
  const handleNestedDialogOpen = React.useCallback(ownChildrenCount => {
    setOwnNestedOpenDialogs(ownChildrenCount + 1);
  }, []);
  const handleNestedDialogClose = React.useCallback(() => {
    setOwnNestedOpenDialogs(0);
  }, []);
  const dialogTriggerProps = React.useMemo(() => getReferenceProps(triggerProps), [getReferenceProps, triggerProps]);
  return React.useMemo(() => {
    return {
      modal,
      setOpen,
      open,
      titleElementId,
      setTitleElementId,
      descriptionElementId,
      setDescriptionElementId,
      onNestedDialogOpen: handleNestedDialogOpen,
      onNestedDialogClose: handleNestedDialogClose,
      nestedOpenDialogCount: ownNestedOpenDialogs,
      openMethod,
      mounted,
      transitionStatus,
      triggerProps: dialogTriggerProps,
      getPopupProps: getFloatingProps,
      setTriggerElement,
      setPopupElement,
      popupRef,
      backdropRef,
      internalBackdropRef,
      floatingRootContext: context
    };
  }, [modal, setOpen, open, titleElementId, descriptionElementId, handleNestedDialogOpen, handleNestedDialogClose, ownNestedOpenDialogs, openMethod, mounted, transitionStatus, dialogTriggerProps, getFloatingProps, context]);
}