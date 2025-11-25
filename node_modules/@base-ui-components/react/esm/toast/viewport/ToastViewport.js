'use client';

import * as React from 'react';
import { useLatestRef } from '@base-ui-components/utils/useLatestRef';
import { ownerDocument, ownerWindow } from '@base-ui-components/utils/owner';
import { visuallyHidden } from '@base-ui-components/utils/visuallyHidden';
import { activeElement, contains, getTarget } from "../../floating-ui-react/utils.js";
import { FocusGuard } from "../../utils/FocusGuard.js";
import { ToastViewportContext } from "./ToastViewportContext.js";
import { useToastContext } from "../provider/ToastProviderContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { isFocusVisible } from "../utils/focusVisible.js";

/**
 * A container viewport for toasts.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ToastViewport = /*#__PURE__*/React.forwardRef(function ToastViewport(componentProps, forwardedRef) {
  const {
    render,
    className,
    children,
    ...elementProps
  } = componentProps;
  const {
    toasts,
    pauseTimers,
    resumeTimers,
    setHovering,
    setFocused,
    viewportRef,
    windowFocusedRef,
    prevFocusElement,
    setPrevFocusElement,
    hovering,
    focused,
    hasDifferingHeights
  } = useToastContext();
  const handlingFocusGuardRef = React.useRef(false);
  const focusedRef = useLatestRef(focused);
  const numToasts = toasts.length;

  // Listen globally for F6 so we can force-focus the viewport.
  React.useEffect(() => {
    if (!viewportRef.current) {
      return undefined;
    }
    function handleGlobalKeyDown(event) {
      if (numToasts === 0) {
        return;
      }
      if (event.key === 'F6' && event.target !== viewportRef.current) {
        event.preventDefault();
        setPrevFocusElement(activeElement(ownerDocument(viewportRef.current)));
        viewportRef.current?.focus();
        pauseTimers();
        setFocused(true);
      }
    }
    const win = ownerWindow(viewportRef.current);
    win.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      win.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [pauseTimers, setFocused, setPrevFocusElement, numToasts, viewportRef]);
  React.useEffect(() => {
    if (!viewportRef.current || !numToasts) {
      return undefined;
    }
    const win = ownerWindow(viewportRef.current);
    function handleWindowBlur(event) {
      if (event.target !== win) {
        return;
      }
      windowFocusedRef.current = false;
      pauseTimers();
    }
    function handleWindowFocus(event) {
      if (event.relatedTarget || event.target === win) {
        return;
      }
      const target = getTarget(event);
      const activeEl = activeElement(ownerDocument(viewportRef.current));
      if (!contains(viewportRef.current, target) || !isFocusVisible(activeEl)) {
        resumeTimers();
      }

      // Wait for the `handleFocus` event to fire.
      setTimeout(() => {
        windowFocusedRef.current = true;
      });
    }
    win.addEventListener('blur', handleWindowBlur, true);
    win.addEventListener('focus', handleWindowFocus, true);
    return () => {
      win.removeEventListener('blur', handleWindowBlur, true);
      win.removeEventListener('focus', handleWindowFocus, true);
    };
  }, [pauseTimers, resumeTimers, viewportRef, windowFocusedRef, setFocused, focusedRef,
  // `viewportRef.current` isn't available on the first render,
  // since the portal node hasn't yet been created.
  // By adding this dependency, we ensure the window listeners
  // are added when toasts have been created, once the ref is available.
  numToasts]);
  function handleFocusGuard(event) {
    if (!viewportRef.current) {
      return;
    }
    handlingFocusGuardRef.current = true;

    // If we're coming off the container, move to the first toast
    if (event.relatedTarget === viewportRef.current) {
      toasts[0]?.ref?.current?.focus();
    } else {
      prevFocusElement?.focus({
        preventScroll: true
      });
    }
  }
  function handleKeyDown(event) {
    if (event.key === 'Tab' && event.shiftKey && event.target === viewportRef.current) {
      event.preventDefault();
      prevFocusElement?.focus({
        preventScroll: true
      });
      resumeTimers();
    }
  }
  function handleMouseEnter() {
    pauseTimers();
    setHovering(true);
  }
  function handleMouseLeave() {
    const activeEl = activeElement(ownerDocument(viewportRef.current));
    if (contains(viewportRef.current, activeEl) && isFocusVisible(activeEl)) {
      return;
    }
    resumeTimers();
    setHovering(false);
  }
  function handleFocus() {
    if (handlingFocusGuardRef.current) {
      handlingFocusGuardRef.current = false;
      return;
    }
    if (focused) {
      return;
    }

    // If the window was previously blurred, the focus must be visible to
    // pause the timers, since for pointers it's unexpected that focus is
    // considered inside the viewport at this point.
    const activeEl = activeElement(ownerDocument(viewportRef.current));
    if (!windowFocusedRef.current && !isFocusVisible(activeEl)) {
      return;
    }
    setFocused(true);
    pauseTimers();
  }
  function handleBlur(event) {
    if (!focused || contains(viewportRef.current, event.relatedTarget)) {
      return;
    }
    setFocused(false);
    resumeTimers();
  }
  const defaultProps = {
    tabIndex: -1,
    role: 'region',
    'aria-live': 'polite',
    'aria-atomic': false,
    'aria-relevant': 'additions text',
    'aria-label': 'Notifications',
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onClick: handleFocus
  };
  const state = React.useMemo(() => ({
    expanded: hovering || focused || hasDifferingHeights
  }), [hovering, focused, hasDifferingHeights]);
  const element = useRenderElement('div', componentProps, {
    ref: [forwardedRef, viewportRef],
    state,
    props: [defaultProps, {
      ...elementProps,
      children: /*#__PURE__*/_jsxs(React.Fragment, {
        children: [numToasts > 0 && prevFocusElement && /*#__PURE__*/_jsx(FocusGuard, {
          onFocus: handleFocusGuard
        }), children, numToasts > 0 && prevFocusElement && /*#__PURE__*/_jsx(FocusGuard, {
          onFocus: handleFocusGuard
        })]
      })
    }]
  });
  const contextValue = React.useMemo(() => ({
    viewportRef
  }), [viewportRef]);
  const highPriorityToasts = React.useMemo(() => toasts.filter(toast => toast.priority === 'high'), [toasts]);
  return /*#__PURE__*/_jsxs(ToastViewportContext.Provider, {
    value: contextValue,
    children: [numToasts > 0 && prevFocusElement && /*#__PURE__*/_jsx(FocusGuard, {
      onFocus: handleFocusGuard
    }), element, !focused && highPriorityToasts.length > 0 && /*#__PURE__*/_jsx("div", {
      style: visuallyHidden,
      children: highPriorityToasts.map(toast => /*#__PURE__*/_jsxs("div", {
        role: "alert",
        "aria-atomic": true,
        children: [/*#__PURE__*/_jsx("div", {
          children: toast.title
        }), /*#__PURE__*/_jsx("div", {
          children: toast.description
        })]
      }, toast.id))
    })]
  });
});
if (process.env.NODE_ENV !== "production") ToastViewport.displayName = "ToastViewport";