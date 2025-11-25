'use client';

import * as React from 'react';
import { AnimationFrame } from '@base-ui-components/utils/useAnimationFrame';
import { FloatingNode, FloatingTree, useFloatingNodeId, useFloatingTree } from "../floating-ui-react/index.js";
import { MenubarContext, useMenubarContext } from "./MenubarContext.js";
import { useScrollLock } from "../utils/useScrollLock.js";
import { useOpenInteractionType } from "../utils/useOpenInteractionType.js";
import { CompositeRoot } from "../composite/root/CompositeRoot.js";
import { useBaseUiId } from "../utils/useBaseUiId.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * The container for menus.
 *
 * Documentation: [Base UI Menubar](https://base-ui.com/react/components/menubar)
 */
export const Menubar = /*#__PURE__*/React.forwardRef(function Menubar(props, forwardedRef) {
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
  } = useOpenInteractionType(hasSubmenuOpen);
  React.useEffect(() => {
    if (!hasSubmenuOpen) {
      resetOpenInteractionType();
    }
  }, [hasSubmenuOpen, resetOpenInteractionType]);
  useScrollLock({
    enabled: modal && hasSubmenuOpen && openMethod !== 'touch',
    open: hasSubmenuOpen,
    mounted: hasSubmenuOpen,
    referenceElement: contentElement
  });
  const id = useBaseUiId(idProp);
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
  return /*#__PURE__*/_jsx(MenubarContext.Provider, {
    value: context,
    children: /*#__PURE__*/_jsx(FloatingTree, {
      children: /*#__PURE__*/_jsx(MenubarContent, {
        children: /*#__PURE__*/_jsx(CompositeRoot, {
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
  const nodeId = useFloatingNodeId();
  const {
    events: menuEvents
  } = useFloatingTree();
  const openSubmenusRef = React.useRef(new Set());
  const rootContext = useMenubarContext();
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
        AnimationFrame.request(() => {
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
  return /*#__PURE__*/_jsx(FloatingNode, {
    id: nodeId,
    children: props.children
  });
}