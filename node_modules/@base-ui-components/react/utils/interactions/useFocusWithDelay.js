"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFocusWithDelay = useFocusWithDelay;
var React = _interopRequireWildcard(require("react"));
var _dom = require("@floating-ui/utils/dom");
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _createBaseUIEventDetails = require("../createBaseUIEventDetails");
var _utils = require("../../floating-ui-react/utils");
/**
 * Adds support for delay, since Floating UI's `useFocus` hook does not support it.
 */
function useFocusWithDelay(context, props = {}) {
  const {
    onOpenChange,
    elements,
    open,
    dataRef
  } = context;
  const {
    delay
  } = props;
  const timeout = (0, _useTimeout.useTimeout)();
  const blockFocusRef = React.useRef(false);
  React.useEffect(() => {
    const win = (0, _dom.getWindow)(elements.domReference);

    // If the reference was focused and the user left the tab/window, and the preview card was not
    // open, the focus should be blocked when they return to the tab/window.
    function handleBlur() {
      if (!open && (0, _dom.isHTMLElement)(elements.domReference) && elements.domReference === (0, _utils.activeElement)((0, _utils.getDocument)(elements.domReference))) {
        blockFocusRef.current = true;
      }
    }
    win.addEventListener('blur', handleBlur);
    return () => {
      win.removeEventListener('blur', handleBlur);
    };
  }, [elements.domReference, open]);
  const reference = React.useMemo(() => ({
    onFocus(event) {
      const {
        nativeEvent
      } = event;
      timeout.start(delay ?? 0, () => {
        onOpenChange(true, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('trigger-focus', nativeEvent));
      });
    },
    onBlur(event) {
      blockFocusRef.current = false;
      const {
        relatedTarget,
        nativeEvent
      } = event;

      // Wait for the window blur listener to fire.
      timeout.start(0, () => {
        const activeEl = (0, _utils.activeElement)(elements.domReference ? elements.domReference.ownerDocument : document);

        // Focus left the page, keep it open.
        if (!relatedTarget && activeEl === elements.domReference) {
          return;
        }

        // When focusing the reference element (e.g. regular click), then
        // clicking into the floating element, prevent it from hiding.
        // Note: it must be focusable, e.g. `tabindex="-1"`.
        // We can not rely on relatedTarget to point to the correct element
        // as it will only point to the shadow host of the newly focused element
        // and not the element that actually has received focus if it is located
        // inside a shadow root.
        if ((0, _utils.contains)(dataRef.current.floatingContext?.refs.floating.current, activeEl) || (0, _utils.contains)(elements.domReference, activeEl)) {
          return;
        }
        onOpenChange(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('trigger-focus', nativeEvent));
      });
    }
  }), [delay, onOpenChange, elements.domReference, dataRef, timeout]);
  return React.useMemo(() => ({
    reference
  }), [reference]);
}