"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItem = void 0;
var React = _interopRequireWildcard(require("react"));
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _floatingUiReact = require("../../floating-ui-react");
var _useMenuItem = require("./useMenuItem");
var _MenuRootContext = require("../root/MenuRootContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _useCompositeListItem = require("../../composite/list/useCompositeListItem");
var _MenuPositionerContext = require("../positioner/MenuPositionerContext");
var _jsxRuntime = require("react/jsx-runtime");
const InnerMenuItem = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function InnerMenuItem(componentProps, forwardedRef) {
  const {
    className,
    closeOnClick = true,
    disabled = false,
    highlighted,
    id,
    menuEvents,
    itemProps,
    render,
    allowMouseUpTriggerRef,
    typingRef,
    nativeButton,
    nodeId,
    ...elementProps
  } = componentProps;
  const {
    getItemProps,
    itemRef
  } = (0, _useMenuItem.useMenuItem)({
    closeOnClick,
    disabled,
    highlighted,
    id,
    menuEvents,
    allowMouseUpTriggerRef,
    typingRef,
    nativeButton,
    nodeId,
    itemMetadata: _useMenuItem.REGULAR_ITEM
  });
  const state = React.useMemo(() => ({
    disabled,
    highlighted
  }), [disabled, highlighted]);
  return (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: [itemRef, forwardedRef],
    props: [itemProps, elementProps, getItemProps]
  });
}));

/**
 * An individual interactive item in the menu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
if (process.env.NODE_ENV !== "production") InnerMenuItem.displayName = "InnerMenuItem";
const MenuItem = exports.MenuItem = /*#__PURE__*/React.forwardRef(function MenuItem(props, forwardedRef) {
  const {
    id: idProp,
    label,
    nativeButton = false,
    ...other
  } = props;
  const itemRef = React.useRef(null);
  const listItem = (0, _useCompositeListItem.useCompositeListItem)({
    label
  });
  const mergedRef = (0, _useMergedRefs.useMergedRefs)(forwardedRef, listItem.ref, itemRef);
  const {
    itemProps,
    activeIndex,
    allowMouseUpTriggerRef,
    typingRef
  } = (0, _MenuRootContext.useMenuRootContext)();
  const menuPositionerContext = (0, _MenuPositionerContext.useMenuPositionerContext)(true);
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  const highlighted = listItem.index === activeIndex;
  const {
    events: menuEvents
  } = (0, _floatingUiReact.useFloatingTree)();

  // This wrapper component is used as a performance optimization.
  // MenuItem reads the context and re-renders the actual MenuItem
  // only when it needs to.

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(InnerMenuItem, {
    ...other,
    id: id,
    ref: mergedRef,
    highlighted: highlighted,
    menuEvents: menuEvents,
    itemProps: itemProps,
    allowMouseUpTriggerRef: allowMouseUpTriggerRef,
    typingRef: typingRef,
    nativeButton: nativeButton,
    nodeId: menuPositionerContext?.floatingContext.nodeId
  });
});
if (process.env.NODE_ENV !== "production") MenuItem.displayName = "MenuItem";