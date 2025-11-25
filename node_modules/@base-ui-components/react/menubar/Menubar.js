"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menubar = void 0;
var React = _interopRequireWildcard(require("react"));
var _useAnimationFrame = require("@base-ui-components/utils/useAnimationFrame");
var _floatingUiReact = require("../floating-ui-react");
var _MenubarContext = require("./MenubarContext");
var _useScrollLock = require("../utils/useScrollLock");
var _useOpenInteractionType = require("../utils/useOpenInteractionType");
var _CompositeRoot = require("../composite/root/CompositeRoot");
var _useBaseUiId = require("../utils/useBaseUiId");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * The container for menus.
 *
 * Documentation: [Base UI Menubar](https://base-ui.com/react/components/menubar)
 */
const Menubar = exports.Menubar = /*#__PURE__*/React.forwardRef(function Menubar(props, forwardedRef) {
  const {
    orientation = 'horizontal',
    loop = true,
    render,
    className,
    modal = true,
    id: idProp,
    ...elementProps
  } = props;
  const [contentElement, setContentElement] = React.useState(null);
  const [hasSubmenuOpen, setHasSubmenuOpen] = React.useState(false);
  const {
    openMethod,
    triggerProps: interactionTypeProps,
    reset: resetOpenInteractionType
  } = (0, _useOpenInteractionType.useOpenInteractionType)(hasSubmenuOpen);
  React.useEffect(() => {
    if (!hasSubmenuOpen) {
      resetOpenInteractionType();
    }
  }, [hasSubmenuOpen, resetOpenInteractionType]);
  (0, _useScrollLock.useScrollLock)({
    enabled: modal && hasSubmenuOpen && openMethod !== 'touch',
    open: hasSubmenuOpen,
    mounted: hasSubmenuOpen,
    referenceElement: contentElement
  });
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  const state = React.useMemo(() => ({
    orientation,
    modal
  }), [orientation, modal]);
  const contentRef = React.useRef(null);
  const allowMouseUpTriggerRef = React.useRef(false);
  const context = React.useMemo(() => ({
    contentElement,
    setContentElement,
    setHasSubmenuOpen,
    hasSubmenuOpen,
    modal,
    orientation,
    allowMouseUpTriggerRef,
    rootId: id
  }), [contentElement, hasSubmenuOpen, modal, orientation, id]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenubarContext.MenubarContext.Provider, {
    value: context,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_floatingUiReact.FloatingTree, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(MenubarContent, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeRoot.CompositeRoot, {
          render: render,
          className: className,
          state: state,
          refs: [forwardedRef, setContentElement, contentRef],
          props: [{
            role: 'menubar',
            id
          }, interactionTypeProps, elementProps],
          orientation: orientation,
          loop: loop,
          highlightItemOnHover: hasSubmenuOpen
        })
      })
    })
  });
});
if (process.env.NODE_ENV !== "production") Menubar.displayName = "Menubar";
function MenubarContent(props) {
  const nodeId = (0, _floatingUiReact.useFloatingNodeId)();
  const {
    events: menuEvents
  } = (0, _floatingUiReact.useFloatingTree)();
  const openSubmenusRef = React.useRef(new Set());
  const rootContext = (0, _MenubarContext.useMenubarContext)();
  React.useEffect(() => {
    function onSubmenuOpenChange(details) {
      if (!details.nodeId || details.parentNodeId !== nodeId) {
        return;
      }
      if (details.open) {
        openSubmenusRef.current.add(details.nodeId);
      } else {
        openSubmenusRef.current.delete(details.nodeId);
      }
      const isAnyOpen = openSubmenusRef.current.size > 0;
      if (isAnyOpen) {
        rootContext.setHasSubmenuOpen(true);
      } else if (rootContext.hasSubmenuOpen) {
        // wait for the next frame to set the state to make sure another menu doesn't open
        // immediately after the previous one is closed
        _useAnimationFrame.AnimationFrame.request(() => {
          if (openSubmenusRef.current.size === 0) {
            rootContext.setHasSubmenuOpen(false);
          }
        });
      }
    }
    menuEvents.on('menuopenchange', onSubmenuOpenChange);
    return () => {
      menuEvents.off('menuopenchange', onSubmenuOpenChange);
    };
  }, [menuEvents, nodeId, rootContext]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_floatingUiReact.FloatingNode, {
    id: nodeId,
    children: props.children
  });
}