"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuCheckboxItem = void 0;
var React = _interopRequireWildcard(require("react"));
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _useControlled = require("@base-ui-components/utils/useControlled");
var _floatingUiReact = require("../../floating-ui-react");
var _MenuCheckboxItemContext = require("./MenuCheckboxItemContext");
var _useMenuItem = require("../item/useMenuItem");
var _useCompositeListItem = require("../../composite/list/useCompositeListItem");
var _MenuRootContext = require("../root/MenuRootContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _styleHookMapping = require("../utils/styleHookMapping");
var _MenuPositionerContext = require("../positioner/MenuPositionerContext");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
const InnerMenuCheckboxItem = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function InnerMenuCheckboxItem(componentProps, forwardedRef) {
  const {
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    className,
    closeOnClick,
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
  const [checked, setChecked] = (0, _useControlled.useControlled)({
    controlled: checkedProp,
    default: defaultChecked ?? false,
    name: 'MenuCheckboxItem',
    state: 'checked'
  });
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
    highlighted,
    checked
  }), [disabled, highlighted, checked]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    customStyleHookMapping: _styleHookMapping.itemMapping,
    props: [itemProps, {
      role: 'menuitemcheckbox',
      'aria-checked': checked,
      onClick(event) {
        const details = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('item-press', event.nativeEvent);
        onCheckedChange?.(!checked, details);
        if (details.isCanceled) {
          return;
        }
        setChecked(currentlyChecked => !currentlyChecked);
      }
    }, elementProps, getItemProps],
    ref: [itemRef, forwardedRef]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuCheckboxItemContext.MenuCheckboxItemContext.Provider, {
    value: state,
    children: element
  });
}));

/**
 * A menu item that toggles a setting on or off.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
if (process.env.NODE_ENV !== "production") InnerMenuCheckboxItem.displayName = "InnerMenuCheckboxItem";
const MenuCheckboxItem = exports.MenuCheckboxItem = /*#__PURE__*/React.forwardRef(function MenuCheckboxItem(props, forwardedRef) {
  const {
    id: idProp,
    label,
    closeOnClick = false,
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
  // MenuCheckboxItem reads the context and re-renders the actual MenuCheckboxItem
  // only when it needs to.

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(InnerMenuCheckboxItem, {
    ...other,
    id: id,
    ref: mergedRef,
    highlighted: highlighted,
    menuEvents: menuEvents,
    itemProps: itemProps,
    allowMouseUpTriggerRef: allowMouseUpTriggerRef,
    typingRef: typingRef,
    closeOnClick: closeOnClick,
    nativeButton: nativeButton,
    nodeId: menuPositionerContext?.floatingContext.nodeId
  });
});
if (process.env.NODE_ENV !== "production") MenuCheckboxItem.displayName = "MenuCheckboxItem";