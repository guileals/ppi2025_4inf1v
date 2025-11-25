"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatingPortal = FloatingPortal;
exports.useFloatingPortalNode = useFloatingPortalNode;
exports.usePortalContext = void 0;
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _dom = require("@floating-ui/utils/dom");
var _useId = require("@base-ui-components/utils/useId");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _visuallyHidden = require("@base-ui-components/utils/visuallyHidden");
var _FocusGuard = require("../../utils/FocusGuard");
var _utils = require("../utils");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _createAttribute = require("../utils/createAttribute");
var _jsxRuntime = require("react/jsx-runtime");
const PortalContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== "production") PortalContext.displayName = "PortalContext";
const usePortalContext = () => React.useContext(PortalContext);
exports.usePortalContext = usePortalContext;
const attr = (0, _createAttribute.createAttribute)('portal');
/**
 * @see https://floating-ui.com/docs/FloatingPortal#usefloatingportalnode
 */
function useFloatingPortalNode(props = {}) {
  const {
    id,
    root
  } = props;
  const uniqueId = (0, _useId.useId)();
  const portalContext = usePortalContext();
  const [portalNode, setPortalNode] = React.useState(null);
  const portalNodeRef = React.useRef(null);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    return () => {
      portalNode?.remove();
      // Allow the subsequent layout effects to create a new node on updates.
      // The portal node will still be cleaned up on unmount.
      // https://github.com/floating-ui/floating-ui/issues/2454
      queueMicrotask(() => {
        portalNodeRef.current = null;
      });
    };
  }, [portalNode]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    // Wait for the uniqueId to be generated before creating the portal node in
    // React <18 (using `useFloatingId` instead of the native `useId`).
    // https://github.com/floating-ui/floating-ui/issues/2778
    if (!uniqueId) {
      return;
    }
    if (portalNodeRef.current) {
      return;
    }
    const existingIdRoot = id ? document.getElementById(id) : null;
    if (!existingIdRoot) {
      return;
    }
    const subRoot = document.createElement('div');
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, '');
    existingIdRoot.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, uniqueId]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    // Wait for the root to exist before creating the portal node. The root must
    // be stored in state, not a ref, for this to work reactively.
    if (root === null) {
      return;
    }
    if (!uniqueId) {
      return;
    }
    if (portalNodeRef.current) {
      return;
    }
    let container = root || portalContext?.portalNode;
    if (container && !(0, _dom.isNode)(container)) {
      container = container.current;
    }
    container = container || document.body;
    let idWrapper = null;
    if (id) {
      idWrapper = document.createElement('div');
      idWrapper.id = id;
      container.appendChild(idWrapper);
    }
    const subRoot = document.createElement('div');
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, '');
    container = idWrapper || container;
    container.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, root, uniqueId, portalContext]);
  return portalNode;
}
/**
 * Portals the floating element into a given container element — by default,
 * outside of the app root and into the body.
 * This is necessary to ensure the floating element can appear outside any
 * potential parent containers that cause clipping (such as `overflow: hidden`),
 * while retaining its location in the React tree.
 * @see https://floating-ui.com/docs/FloatingPortal
 * @internal
 */
function FloatingPortal(props) {
  const {
    children,
    id,
    root,
    preserveTabOrder = true
  } = props;
  const portalNode = useFloatingPortalNode({
    id,
    root
  });
  const [focusManagerState, setFocusManagerState] = React.useState(null);
  const beforeOutsideRef = React.useRef(null);
  const afterOutsideRef = React.useRef(null);
  const beforeInsideRef = React.useRef(null);
  const afterInsideRef = React.useRef(null);
  const modal = focusManagerState?.modal;
  const open = focusManagerState?.open;
  const shouldRenderGuards =
  // The FocusManager and therefore floating element are currently open/
  // rendered.
  !!focusManagerState &&
  // Guards are only for non-modal focus management.
  !focusManagerState.modal &&
  // Don't render if unmount is transitioning.
  focusManagerState.open && preserveTabOrder && !!(root || portalNode);

  // https://codesandbox.io/s/tabbable-portal-f4tng?file=/src/TabbablePortal.tsx
  React.useEffect(() => {
    if (!portalNode || !preserveTabOrder || modal) {
      return undefined;
    }

    // Make sure elements inside the portal element are tabbable only when the
    // portal has already been focused, either by tabbing into a focus trap
    // element outside or using the mouse.
    function onFocus(event) {
      if (portalNode && (0, _utils.isOutsideEvent)(event)) {
        const focusing = event.type === 'focusin';
        const manageFocus = focusing ? _utils.enableFocusInside : _utils.disableFocusInside;
        manageFocus(portalNode);
      }
    }
    // Listen to the event on the capture phase so they run before the focus
    // trap elements onFocus prop is called.
    portalNode.addEventListener('focusin', onFocus, true);
    portalNode.addEventListener('focusout', onFocus, true);
    return () => {
      portalNode.removeEventListener('focusin', onFocus, true);
      portalNode.removeEventListener('focusout', onFocus, true);
    };
  }, [portalNode, preserveTabOrder, modal]);
  React.useEffect(() => {
    if (!portalNode) {
      return;
    }
    if (open) {
      return;
    }
    (0, _utils.enableFocusInside)(portalNode);
  }, [open, portalNode]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(PortalContext.Provider, {
    value: React.useMemo(() => ({
      preserveTabOrder,
      beforeOutsideRef,
      afterOutsideRef,
      beforeInsideRef,
      afterInsideRef,
      portalNode,
      setFocusManagerState
    }), [preserveTabOrder, portalNode]),
    children: [shouldRenderGuards && portalNode && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FocusGuard.FocusGuard, {
      "data-type": "outside",
      ref: beforeOutsideRef,
      onFocus: event => {
        if ((0, _utils.isOutsideEvent)(event, portalNode)) {
          beforeInsideRef.current?.focus();
        } else {
          const domReference = focusManagerState ? focusManagerState.domReference : null;
          const prevTabbable = (0, _utils.getPreviousTabbable)(domReference);
          prevTabbable?.focus();
        }
      }
    }), shouldRenderGuards && portalNode && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      "aria-owns": portalNode.id,
      style: _visuallyHidden.visuallyHidden
    }), portalNode && /*#__PURE__*/ReactDOM.createPortal(children, portalNode), shouldRenderGuards && portalNode && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FocusGuard.FocusGuard, {
      "data-type": "outside",
      ref: afterOutsideRef,
      onFocus: event => {
        if ((0, _utils.isOutsideEvent)(event, portalNode)) {
          afterInsideRef.current?.focus();
        } else {
          const domReference = focusManagerState ? focusManagerState.domReference : null;
          const nextTabbable = (0, _utils.getNextTabbable)(domReference);
          nextTabbable?.focus();
          if (focusManagerState?.closeOnFocusOut) {
            focusManagerState?.onOpenChange(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('focus-out', event.nativeEvent));
          }
        }
      }
    })]
  });
}