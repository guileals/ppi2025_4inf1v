"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuRadioItem = void 0;
var React = _interopRequireWildcard(require("react"));
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _floatingUiReact = require("../../floating-ui-react");
var _MenuRootContext = require("../root/MenuRootContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _MenuRadioGroupContext = require("../radio-group/MenuRadioGroupContext");
var _MenuRadioItemContext = require("./MenuRadioItemContext");
var _styleHookMapping = require("../utils/styleHookMapping");
var _useCompositeListItem = require("../../composite/list/useCompositeListItem");
var _useMenuItem = require("../item/useMenuItem");
var _MenuPositionerContext = require("../positioner/MenuPositionerContext");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
const InnerMenuRadioItem = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function InnerMenuRadioItem(componentProps, forwardedRef) {
  const {
    checked,
    setChecked,
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
    itemMetadata: _useMenuItem.REGULAR_ITEM,
    nodeId
  });
  const state = React.useMemo(() => ({
    disabled,
    highlighted,
    checked
  }), [disabled, highlighted, checked]);
  return (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    customStyleHookMapping: _styleHookMapping.itemMapping,
    ref: [itemRef, forwardedRef],
    props: [itemProps, {
      role: 'menuitemradio',
      'aria-checked': checked,
      onClick(event) {
        setChecked((0, _createBaseUIEventDetails.createBaseUIEventDetails)('item-press', event.nativeEvent));
      }
    }, elementProps, getItemProps]
  });
}));

/**
 * A menu item that works like a radio button in a given group.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
if (process.env.NODE_ENV !== "production") InnerMenuRadioItem.displayName = "InnerMenuRadioItem";
const MenuRadioItem = exports.MenuRadioItem = /*#__PURE__*/React.forwardRef(function MenuRadioItem(props, forwardedRef) {
  const {
    id: idProp,
    value,
    label,
    disabled: disabledProp = false,
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
  const {
    value: selectedValue,
    setValue: setSelectedValue,
    disabled: groupDisabled
  } = (0, _MenuRadioGroupContext.useMenuRadioGroupContext)();
  const disabled = groupDisabled || disabledProp;

  // This wrapper component is used as a performance optimization.
  // MenuRadioItem reads the context and re-renders the actual MenuRadioItem
  // only when it needs to.

  const checked = selectedValue === value;
  const setChecked = React.useCallback(eventDetails => {
    setSelectedValue(value, eventDetails);
  }, [setSelectedValue, value]);
  const contextValue = React.useMemo(() => ({
    checked,
    highlighted,
    disabled
  }), [checked, highlighted, disabled]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuRadioItemContext.MenuRadioItemContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(InnerMenuRadioItem, {
      ...other,
      id: id,
      ref: mergedRef,
      disabled: disabled,
      highlighted: highlighted,
      menuEvents: menuEvents,
      itemProps: itemProps,
      allowMouseUpTriggerRef: allowMouseUpTriggerRef,
      checked: selectedValue === value,
      setChecked: setChecked,
      typingRef: typingRef,
      closeOnClick: closeOnClick,
      nativeButton: nativeButton,
      nodeId: menuPositionerContext?.floatingContext.nodeId
    })
  });
});
if (process.env.NODE_ENV !== "production") MenuRadioItem.displayName = "MenuRadioItem";