"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatingFocusManager = FloatingFocusManager;
var React = _interopRequireWildcard(require("react"));
var _tabbable = require("tabbable");
var _dom = require("@floating-ui/utils/dom");
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _visuallyHidden = require("@base-ui-components/utils/visuallyHidden");
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _useAnimationFrame = require("@base-ui-components/utils/useAnimationFrame");
var _owner = require("@base-ui-components/utils/owner");
var _FocusGuard = require("../../utils/FocusGuard");
var _utils = require("../utils");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _createAttribute = require("../utils/createAttribute");
var _enqueueFocus = require("../utils/enqueueFocus");
var _markOthers = require("../utils/markOthers");
var _FloatingPortal = require("./FloatingPortal");
var _FloatingTree = require("./FloatingTree");
var _constants = require("../../utils/constants");
var _jsxRuntime = require("react/jsx-runtime");
function getEventType(event, lastInteractionType) {
  const win = (0, _owner.ownerWindow)(event.target);
  if (event instanceof win.KeyboardEvent) {
    return 'keyboard';
  }
  if (event instanceof win.FocusEvent) {
    // Focus events can be caused by a preceding pointer interaction (e.g., focusout on outside press).
    // Prefer the last known pointer type if provided, else treat as keyboard.
    return lastInteractionType || 'keyboard';
  }
  if ('pointerType' in event) {
    return event.pointerType || 'keyboard';
  }
  if ('touches' in event) {
    return 'touch';
  }
  if (event instanceof win.MouseEvent) {
    // onClick events may not contain pointer events, and will fall through to here
    return lastInteractionType || (event.detail === 0 ? 'keyboard' : 'mouse');
  }
  return '';
}
const LIST_LIMIT = 20;
let previouslyFocusedElements = [];
function clearDisconnectedPreviouslyFocusedElements() {
  previouslyFocusedElements = previouslyFocusedElements.filter(el => el.isConnected);
}
function addPreviouslyFocusedElement(element) {
  clearDisconnectedPreviouslyFocusedElements();
  if (element && (0, _dom.getNodeName)(element) !== 'body') {
    previouslyFocusedElements.push(element);
    if (previouslyFocusedElements.length > LIST_LIMIT) {
      previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
    }
  }
}
function getPreviouslyFocusedElement() {
  clearDisconnectedPreviouslyFocusedElements();
  return previouslyFocusedElements[previouslyFocusedElements.length - 1];
}
function getFirstTabbableElement(container) {
  if (!container) {
    return null;
  }
  const tabbableOptions = (0, _utils.getTabbableOptions)();
  if ((0, _tabbable.isTabbable)(container, tabbableOptions)) {
    return container;
  }
  return (0, _tabbable.tabbable)(container, tabbableOptions)[0] || container;
}
function handleTabIndex(floatingFocusElement, orderRef) {
  if (!orderRef.current.includes('floating') && !floatingFocusElement.getAttribute('role')?.includes('dialog')) {
    return;
  }
  const options = (0, _utils.getTabbableOptions)();
  const focusableElements = (0, _tabbable.focusable)(floatingFocusElement, options);
  const tabbableContent = focusableElements.filter(element => {
    const dataTabIndex = element.getAttribute('data-tabindex') || '';
    return (0, _tabbable.isTabbable)(element, options) || element.hasAttribute('data-tabindex') && !dataTabIndex.startsWith('-');
  });
  const tabIndex = floatingFocusElement.getAttribute('tabindex');
  if (orderRef.current.includes('floating') || tabbableContent.length === 0) {
    if (tabIndex !== '0') {
      floatingFocusElement.setAttribute('tabindex', '0');
    }
  } else if (tabIndex !== '-1' || floatingFocusElement.hasAttribute('data-tabindex') && floatingFocusElement.getAttribute('data-tabindex') !== '-1') {
    floatingFocusElement.setAttribute('tabindex', '-1');
    floatingFocusElement.setAttribute('data-tabindex', '-1');
  }
}
/**
 * Provides focus management for the floating element.
 * @see https://floating-ui.com/docs/FloatingFocusManager
 * @internal
 */
function FloatingFocusManager(props) {
  const {
    context,
    children,
    disabled = false,
    order = ['content'],
    initialFocus = true,
    returnFocus = true,
    restoreFocus = false,
    modal = true,
    closeOnFocusOut = true,
    openInteractionType = '',
    getInsideElements: getInsideElementsProp = () => []
  } = props;
  const {
    open,
    onOpenChange,
    events,
    dataRef,
    elements: {
      domReference,
      floating
    }
  } = context;
  const getNodeId = (0, _useEventCallback.useEventCallback)(() => dataRef.current.floatingContext?.nodeId);
  const getInsideElements = (0, _useEventCallback.useEventCallback)(getInsideElementsProp);
  const ignoreInitialFocus = initialFocus === false;
  // If the reference is a combobox and is typeable (e.g. input/textarea),
  // there are different focus semantics. The guards should not be rendered, but
  // aria-hidden should be applied to all nodes still. Further, the visually
  // hidden dismiss button should only appear at the end of the list, not the
  // start.
  const isUntrappedTypeableCombobox = (0, _utils.isTypeableCombobox)(domReference) && ignoreInitialFocus;
  const orderRef = (0, _useLatestRef.useLatestRef)(order);
  const initialFocusRef = (0, _useLatestRef.useLatestRef)(initialFocus);
  const returnFocusRef = (0, _useLatestRef.useLatestRef)(returnFocus);
  const openInteractionTypeRef = (0, _useLatestRef.useLatestRef)(openInteractionType);
  const tree = (0, _FloatingTree.useFloatingTree)();
  const portalContext = (0, _FloatingPortal.usePortalContext)();
  const startDismissButtonRef = React.useRef(null);
  const endDismissButtonRef = React.useRef(null);
  const preventReturnFocusRef = React.useRef(false);
  const isPointerDownRef = React.useRef(false);
  const tabbableIndexRef = React.useRef(-1);
  const closeTypeRef = React.useRef('');
  const lastInteractionTypeRef = React.useRef('');
  const blurTimeout = (0, _useTimeout.useTimeout)();
  const pointerDownTimeout = (0, _useTimeout.useTimeout)();
  const restoreFocusFrame = (0, _useAnimationFrame.useAnimationFrame)();
  const isInsidePortal = portalContext != null;
  const floatingFocusElement = (0, _utils.getFloatingFocusElement)(floating);
  const getTabbableContent = (0, _useEventCallback.useEventCallback)((container = floatingFocusElement) => {
    return container ? (0, _tabbable.tabbable)(container, (0, _utils.getTabbableOptions)()) : [];
  });
  const getTabbableElements = (0, _useEventCallback.useEventCallback)(container => {
    const content = getTabbableContent(container);
    return orderRef.current.map(() => content).filter(Boolean).flat();
  });
  React.useEffect(() => {
    if (disabled) {
      return undefined;
    }
    if (!modal) {
      return undefined;
    }
    function onKeyDown(event) {
      if (event.key === 'Tab') {
        // The focus guards have nothing to focus, so we need to stop the event.
        if ((0, _utils.contains)(floatingFocusElement, (0, _utils.activeElement)((0, _utils.getDocument)(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
          (0, _utils.stopEvent)(event);
        }
      }
    }
    const doc = (0, _utils.getDocument)(floatingFocusElement);
    doc.addEventListener('keydown', onKeyDown);
    return () => {
      doc.removeEventListener('keydown', onKeyDown);
    };
  }, [disabled, domReference, floatingFocusElement, modal, orderRef, isUntrappedTypeableCombobox, getTabbableContent, getTabbableElements]);
  React.useEffect(() => {
    if (disabled) {
      return undefined;
    }
    if (!floating) {
      return undefined;
    }
    function handleFocusIn(event) {
      const target = (0, _utils.getTarget)(event);
      const tabbableContent = getTabbableContent();
      const tabbableIndex = tabbableContent.indexOf(target);
      if (tabbableIndex !== -1) {
        tabbableIndexRef.current = tabbableIndex;
      }
    }
    floating.addEventListener('focusin', handleFocusIn);
    return () => {
      floating.removeEventListener('focusin', handleFocusIn);
    };
  }, [disabled, floating, getTabbableContent]);

  // Track the last interaction type at the document level to disambiguate focus events
  React.useEffect(() => {
    if (disabled || !open) {
      return undefined;
    }
    const doc = (0, _utils.getDocument)(floatingFocusElement);
    function onPointerDown(event) {
      lastInteractionTypeRef.current = event.pointerType || 'keyboard';
    }
    function onKeyDown() {
      lastInteractionTypeRef.current = 'keyboard';
    }
    doc.addEventListener('pointerdown', onPointerDown, true);
    doc.addEventListener('keydown', onKeyDown, true);
    return () => {
      doc.removeEventListener('pointerdown', onPointerDown, true);
      doc.removeEventListener('keydown', onKeyDown, true);
    };
  }, [disabled, floating, domReference, floatingFocusElement, open]);
  React.useEffect(() => {
    if (disabled) {
      return undefined;
    }
    if (!closeOnFocusOut) {
      return undefined;
    }

    // In Safari, buttons lose focus when pressing them.
    function handlePointerDown() {
      isPointerDownRef.current = true;
      pointerDownTimeout.start(0, () => {
        isPointerDownRef.current = false;
      });
    }
    function handleFocusOutside(event) {
      const relatedTarget = event.relatedTarget;
      const currentTarget = event.currentTarget;
      const target = (0, _utils.getTarget)(event);
      queueMicrotask(() => {
        const nodeId = getNodeId();
        const movedToUnrelatedNode = !((0, _utils.contains)(domReference, relatedTarget) || (0, _utils.contains)(floating, relatedTarget) || (0, _utils.contains)(relatedTarget, floating) || (0, _utils.contains)(portalContext?.portalNode, relatedTarget) || relatedTarget?.hasAttribute((0, _createAttribute.createAttribute)('focus-guard')) || tree && ((0, _utils.getNodeChildren)(tree.nodesRef.current, nodeId).find(node => (0, _utils.contains)(node.context?.elements.floating, relatedTarget) || (0, _utils.contains)(node.context?.elements.domReference, relatedTarget)) || (0, _utils.getNodeAncestors)(tree.nodesRef.current, nodeId).find(node => [node.context?.elements.floating, (0, _utils.getFloatingFocusElement)(node.context?.elements.floating)].includes(relatedTarget) || node.context?.elements.domReference === relatedTarget)));
        if (currentTarget === domReference && floatingFocusElement) {
          handleTabIndex(floatingFocusElement, orderRef);
        }

        // Restore focus to the previous tabbable element index to prevent
        // focus from being lost outside the floating tree.
        if (restoreFocus && currentTarget !== domReference && !target?.isConnected && (0, _utils.activeElement)((0, _utils.getDocument)(floatingFocusElement)) === (0, _utils.getDocument)(floatingFocusElement).body) {
          // Let `FloatingPortal` effect knows that focus is still inside the
          // floating tree.
          if ((0, _dom.isHTMLElement)(floatingFocusElement)) {
            floatingFocusElement.focus();
            // If explicitly requested to restore focus to the popup container, do not search
            // for the next/previous tabbable element.
            if (restoreFocus === 'popup') {
              // If the element is removed on pointerdown, focus tries to move it,
              // but since it's removed at the same time, focus gets lost as it
              // happens after the .focus() call above.
              // In this case, focus needs to be moved asynchronously.
              restoreFocusFrame.request(() => {
                floatingFocusElement.focus();
              });
              return;
            }
          }
          const prevTabbableIndex = tabbableIndexRef.current;
          const tabbableContent = getTabbableContent();
          const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
          if ((0, _dom.isHTMLElement)(nodeToFocus)) {
            nodeToFocus.focus();
          }
        }

        // https://github.com/floating-ui/floating-ui/issues/3060
        if (dataRef.current.insideReactTree) {
          dataRef.current.insideReactTree = false;
          return;
        }

        // Focus did not move inside the floating tree, and there are no tabbable
        // portal guards to handle closing.
        if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode &&
        // Fix React 18 Strict Mode returnFocus due to double rendering.
        relatedTarget !== getPreviouslyFocusedElement()) {
          preventReturnFocusRef.current = true;
          onOpenChange(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('focus-out', event));
        }
      });
    }
    const shouldHandleBlurCapture = Boolean(!tree && portalContext);
    function markInsideReactTree() {
      dataRef.current.insideReactTree = true;
      blurTimeout.start(0, () => {
        dataRef.current.insideReactTree = false;
      });
    }
    if (floating && (0, _dom.isHTMLElement)(domReference)) {
      domReference.addEventListener('focusout', handleFocusOutside);
      domReference.addEventListener('pointerdown', handlePointerDown);
      floating.addEventListener('focusout', handleFocusOutside);
      if (shouldHandleBlurCapture) {
        floating.addEventListener('focusout', markInsideReactTree, true);
      }
      return () => {
        domReference.removeEventListener('focusout', handleFocusOutside);
        domReference.removeEventListener('pointerdown', handlePointerDown);
        floating.removeEventListener('focusout', handleFocusOutside);
        if (shouldHandleBlurCapture) {
          floating.removeEventListener('focusout', markInsideReactTree, true);
        }
      };
    }
    return undefined;
  }, [disabled, domReference, floating, floatingFocusElement, modal, tree, portalContext, onOpenChange, closeOnFocusOut, restoreFocus, getTabbableContent, isUntrappedTypeableCombobox, getNodeId, orderRef, dataRef, blurTimeout, pointerDownTimeout, restoreFocusFrame]);
  const beforeGuardRef = React.useRef(null);
  const afterGuardRef = React.useRef(null);
  const mergedBeforeGuardRef = (0, _useMergedRefs.useMergedRefs)(beforeGuardRef, portalContext?.beforeInsideRef);
  const mergedAfterGuardRef = (0, _useMergedRefs.useMergedRefs)(afterGuardRef, portalContext?.afterInsideRef);
  React.useEffect(() => {
    if (disabled || !floating || !open) {
      return undefined;
    }

    // Don't hide portals nested within the parent portal.
    const portalNodes = Array.from(portalContext?.portalNode?.querySelectorAll(`[${(0, _createAttribute.createAttribute)('portal')}]`) || []);
    const ancestors = tree ? (0, _utils.getNodeAncestors)(tree.nodesRef.current, getNodeId()) : [];
    const rootAncestorComboboxDomReference = ancestors.find(node => (0, _utils.isTypeableCombobox)(node.context?.elements.domReference || null))?.context?.elements.domReference;
    const insideElements = [floating, rootAncestorComboboxDomReference, ...portalNodes, ...getInsideElements(), startDismissButtonRef.current, endDismissButtonRef.current, beforeGuardRef.current, afterGuardRef.current, portalContext?.beforeOutsideRef.current, portalContext?.afterOutsideRef.current, isUntrappedTypeableCombobox ? domReference : null].filter(x => x != null);
    const cleanup = (0, _markOthers.markOthers)(insideElements, modal || isUntrappedTypeableCombobox);
    return () => {
      cleanup();
    };
  }, [open, disabled, domReference, floating, modal, orderRef, portalContext, isUntrappedTypeableCombobox, tree, getNodeId, getInsideElements]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (disabled || !(0, _dom.isHTMLElement)(floatingFocusElement)) {
      return;
    }
    const doc = (0, _utils.getDocument)(floatingFocusElement);
    const previouslyFocusedElement = (0, _utils.activeElement)(doc);

    // Wait for any layout effect state setters to execute to set `tabIndex`.
    queueMicrotask(() => {
      const focusableElements = getTabbableElements(floatingFocusElement);
      const initialFocusValueOrFn = initialFocusRef.current;
      const resolvedInitialFocus = typeof initialFocusValueOrFn === 'function' ? initialFocusValueOrFn(openInteractionTypeRef.current || '') : initialFocusValueOrFn;

      // `null` should fallback to default behavior in case of an empty ref.
      if (resolvedInitialFocus === undefined || resolvedInitialFocus === false) {
        return;
      }
      let elToFocus;
      if (resolvedInitialFocus === true || resolvedInitialFocus === null) {
        elToFocus = focusableElements[0] || floatingFocusElement;
      } else if ('current' in resolvedInitialFocus) {
        elToFocus = resolvedInitialFocus.current;
      } else {
        elToFocus = resolvedInitialFocus;
      }
      elToFocus = elToFocus || focusableElements[0] || floatingFocusElement;
      const focusAlreadyInsideFloatingEl = (0, _utils.contains)(floatingFocusElement, previouslyFocusedElement);
      if (!focusAlreadyInsideFloatingEl && open) {
        (0, _enqueueFocus.enqueueFocus)(elToFocus, {
          preventScroll: elToFocus === floatingFocusElement
        });
      }
    });
  }, [disabled, open, floatingFocusElement, ignoreInitialFocus, getTabbableElements, initialFocusRef, openInteractionTypeRef]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (disabled || !floatingFocusElement) {
      return undefined;
    }
    const doc = (0, _utils.getDocument)(floatingFocusElement);
    const previouslyFocusedElement = (0, _utils.activeElement)(doc);
    addPreviouslyFocusedElement(previouslyFocusedElement);

    // Dismissing via outside press should always ignore `returnFocus` to
    // prevent unwanted scrolling.
    function onOpenChangeLocal(details) {
      if (!details.open) {
        closeTypeRef.current = getEventType(details.nativeEvent, lastInteractionTypeRef.current);
      }
      if (details.reason === 'trigger-hover' && details.nativeEvent.type === 'mouseleave') {
        preventReturnFocusRef.current = true;
      }
      if (details.reason !== 'outside-press') {
        return;
      }
      if (details.nested) {
        preventReturnFocusRef.current = false;
      } else if ((0, _utils.isVirtualClick)(details.nativeEvent) || (0, _utils.isVirtualPointerEvent)(details.nativeEvent)) {
        preventReturnFocusRef.current = false;
      } else {
        let isPreventScrollSupported = false;
        document.createElement('div').focus({
          get preventScroll() {
            isPreventScrollSupported = true;
            return false;
          }
        });
        if (isPreventScrollSupported) {
          preventReturnFocusRef.current = false;
        } else {
          preventReturnFocusRef.current = true;
        }
      }
    }
    events.on('openchange', onOpenChangeLocal);
    const fallbackEl = doc.createElement('span');
    fallbackEl.setAttribute('tabindex', '-1');
    fallbackEl.setAttribute('aria-hidden', 'true');
    Object.assign(fallbackEl.style, _visuallyHidden.visuallyHidden);
    if (isInsidePortal && domReference) {
      domReference.insertAdjacentElement('afterend', fallbackEl);
    }
    function getReturnElement() {
      const returnFocusValueOrFn = returnFocusRef.current;
      let resolvedReturnFocusValue = typeof returnFocusValueOrFn === 'function' ? returnFocusValueOrFn(closeTypeRef.current) : returnFocusValueOrFn;

      // `null` should fallback to default behavior in case of an empty ref.
      if (resolvedReturnFocusValue === undefined || resolvedReturnFocusValue === false) {
        return null;
      }
      if (resolvedReturnFocusValue === null) {
        resolvedReturnFocusValue = true;
      }
      if (typeof resolvedReturnFocusValue === 'boolean') {
        const el = domReference || getPreviouslyFocusedElement();
        return el && el.isConnected ? el : fallbackEl;
      }
      const fallback = domReference || getPreviouslyFocusedElement() || fallbackEl;
      if ('current' in resolvedReturnFocusValue) {
        return resolvedReturnFocusValue.current || fallback;
      }
      return resolvedReturnFocusValue || fallback;
    }
    return () => {
      events.off('openchange', onOpenChangeLocal);
      const activeEl = (0, _utils.activeElement)(doc);
      const isFocusInsideFloatingTree = (0, _utils.contains)(floating, activeEl) || tree && (0, _utils.getNodeChildren)(tree.nodesRef.current, getNodeId(), false).some(node => (0, _utils.contains)(node.context?.elements.floating, activeEl));
      const returnElement = getReturnElement();
      queueMicrotask(() => {
        // This is `returnElement`, if it's tabbable, or its first tabbable child.
        const tabbableReturnElement = getFirstTabbableElement(returnElement);
        const hasExplicitReturnFocus = typeof returnFocusRef.current !== 'boolean';
        if (
        // eslint-disable-next-line react-hooks/exhaustive-deps
        returnFocusRef.current && !preventReturnFocusRef.current && (0, _dom.isHTMLElement)(tabbableReturnElement) && (
        // If the focus moved somewhere else after mount, avoid returning focus
        // since it likely entered a different element which should be
        // respected: https://github.com/floating-ui/floating-ui/issues/2607
        !hasExplicitReturnFocus && tabbableReturnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)) {
          tabbableReturnElement.focus({
            preventScroll: true
          });
        }
        fallbackEl.remove();
      });
    };
  }, [disabled, floating, floatingFocusElement, returnFocusRef, dataRef, events, tree, isInsidePortal, domReference, getNodeId]);
  React.useEffect(() => {
    // The `returnFocus` cleanup behavior is inside a microtask; ensure we
    // wait for it to complete before resetting the flag.
    queueMicrotask(() => {
      preventReturnFocusRef.current = false;
    });
  }, [disabled]);
  React.useEffect(() => {
    if (disabled || !open) {
      return undefined;
    }
    function handlePointerDown(event) {
      const target = (0, _utils.getTarget)(event);
      if (target?.closest(`[${_constants.CLICK_TRIGGER_IDENTIFIER}]`)) {
        isPointerDownRef.current = true;
      }
    }
    const doc = (0, _utils.getDocument)(floatingFocusElement);
    doc.addEventListener('pointerdown', handlePointerDown, true);
    return () => {
      doc.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [disabled, open, floatingFocusElement]);

  // Synchronize the `context` & `modal` value to the FloatingPortal context.
  // It will decide whether or not it needs to render its own guards.
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (disabled) {
      return undefined;
    }
    if (!portalContext) {
      return undefined;
    }
    portalContext.setFocusManagerState({
      modal,
      closeOnFocusOut,
      open,
      onOpenChange,
      domReference
    });
    return () => {
      portalContext.setFocusManagerState(null);
    };
  }, [disabled, portalContext, modal, open, onOpenChange, closeOnFocusOut, domReference]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (disabled || !floatingFocusElement) {
      return undefined;
    }
    handleTabIndex(floatingFocusElement, orderRef);
    return () => {
      queueMicrotask(clearDisconnectedPreviouslyFocusedElements);
    };
  }, [disabled, floatingFocusElement, orderRef]);
  const shouldRenderGuards = !disabled && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [shouldRenderGuards && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FocusGuard.FocusGuard, {
      "data-type": "inside",
      ref: mergedBeforeGuardRef,
      onFocus: event => {
        if (modal) {
          const els = getTabbableElements();
          (0, _enqueueFocus.enqueueFocus)(els[els.length - 1]);
        } else if (portalContext?.preserveTabOrder && portalContext.portalNode) {
          preventReturnFocusRef.current = false;
          if ((0, _utils.isOutsideEvent)(event, portalContext.portalNode)) {
            const nextTabbable = (0, _utils.getNextTabbable)(domReference);
            nextTabbable?.focus();
          } else {
            portalContext.beforeOutsideRef.current?.focus();
          }
        }
      }
    }), children, shouldRenderGuards && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FocusGuard.FocusGuard, {
      "data-type": "inside",
      ref: mergedAfterGuardRef,
      onFocus: event => {
        if (modal) {
          (0, _enqueueFocus.enqueueFocus)(getTabbableElements()[0]);
        } else if (portalContext?.preserveTabOrder && portalContext.portalNode) {
          if (closeOnFocusOut) {
            preventReturnFocusRef.current = true;
          }
          if ((0, _utils.isOutsideEvent)(event, portalContext.portalNode)) {
            const prevTabbable = (0, _utils.getPreviousTabbable)(domReference);
            prevTabbable?.focus();
          } else {
            portalContext.afterOutsideRef.current?.focus();
          }
        }
      }
    })]
  });
}