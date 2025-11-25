'use client';

import * as React from 'react';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useClick, useDismiss, useFloatingParentNodeId, useFloatingRootContext, useInteractions, useRole } from "../../floating-ui-react/index.js";
import { getTarget } from "../../floating-ui-react/utils.js";
import { useScrollLock } from "../../utils/useScrollLock.js";
import { useTransitionStatus } from "../../utils/useTransitionStatus.js";
import { useOpenInteractionType } from "../../utils/useOpenInteractionType.js";
import { useOpenChangeComplete } from "../../utils/useOpenChangeComplete.js";
export function useDialogRoot(params) {
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
  const [open, setOpenUnwrapped] = useControlled({
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
  } = useTransitionStatus(open);
  const {
    openMethod,
    triggerProps,
    reset: resetOpenInteractionType
  } = useOpenInteractionType(open);
  const nested = useFloatingParentNodeId() != null;
  let floatingEvents;
  const setOpen = useEventCallback((nextOpen, eventDetails) => {
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
  const handleUnmount = useEventCallback(() => {
    setMounted(false);
    onOpenChangeComplete?.(false);
    resetOpenInteractionType();
  });
  useOpenChangeComplete({
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
  const context = useFloatingRootContext({
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
  const role = useRole(context);
  const click = useClick(context);
  const dismiss = useDismiss(context, {
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
      const target = getTarget(event);
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
  useScrollLock({
    enabled: open && modal === true,
    mounted,
    open,
    referenceElement: popupElement
  });
  const {
    getReferenceProps,
    getFloatingProps
  } = useInteractions([role, click, dismiss]);
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