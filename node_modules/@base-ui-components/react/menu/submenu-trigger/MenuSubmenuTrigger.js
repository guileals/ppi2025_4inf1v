"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuSubmenuTrigger = void 0;
var React = _interopRequireWildcard(require("react"));
var _floatingUiReact = require("../../floating-ui-react");
var _MenuRootContext = require("../root/MenuRootContext");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _useCompositeListItem = require("../../composite/list/useCompositeListItem");
var _useMenuItem = require("../item/useMenuItem");
var _useRenderElement = require("../../utils/useRenderElement");
var _MenuPositionerContext = require("../positioner/MenuPositionerContext");
/**
 * A menu item that opens a submenu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
const MenuSubmenuTrigger = exports.MenuSubmenuTrigger = /*#__PURE__*/React.forwardRef(function SubmenuTriggerComponent(componentProps, forwardedRef) {
  const {
    render,
    className,
    label,
    id: idProp,
    nativeButton = false,
    ...elementProps
  } = componentProps;
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  const {
    triggerProps: rootTriggerProps,
    parent,
    setTriggerElement,
    open,
    typingRef,
    disabled,
    allowMouseUpTriggerRef
  } = (0, _MenuRootContext.useMenuRootContext)();
  const menuPositionerContext = (0, _MenuPositionerContext.useMenuPositionerContext)();
  if (parent.type !== 'menu') {
    throw new Error('Base UI: <Menu.SubmenuTrigger> must be placed in <Menu.SubmenuRoot>.');
  }
  const parentMenuContext = parent.context;
  const {
    activeIndex,
    itemProps,
    setActiveIndex
  } = parentMenuContext;
  const item = (0, _useCompositeListItem.useCompositeListItem)();
  const highlighted = activeIndex === item.index;
  const {
    events: menuEvents
  } = (0, _floatingUiReact.useFloatingTree)();
  const itemMetadata = React.useMemo(() => ({
    type: 'submenu-trigger',
    setActive: () => setActiveIndex(item.index),
    allowMouseEnterEnabled: parentMenuContext.allowMouseEnter
  }), [setActiveIndex, item.index, parentMenuContext.allowMouseEnter]);
  const {
    getItemProps,
    itemRef
  } = (0, _useMenuItem.useMenuItem)({
    closeOnClick: false,
    disabled,
    highlighted,
    id,
    menuEvents,
    allowMouseUpTriggerRef,
    typingRef,
    nativeButton,
    itemMetadata,
    nodeId: menuPositionerContext?.floatingContext.nodeId
  });
  const state = React.useMemo(() => ({
    disabled,
    highlighted,
    open
  }), [disabled, highlighted, open]);
  return (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: [forwardedRef, item.ref, itemRef, setTriggerElement],
    customStyleHookMapping: _popupStateMapping.triggerOpenStateMapping,
    props: [rootTriggerProps, itemProps, elementProps, getItemProps, {
      tabIndex: open || highlighted ? 0 : -1,
      onBlur() {
        if (highlighted) {
          setActiveIndex(null);
        }
      }
    }]
  });
});
if (process.env.NODE_ENV !== "production") MenuSubmenuTrigger.displayName = "MenuSubmenuTrigger";