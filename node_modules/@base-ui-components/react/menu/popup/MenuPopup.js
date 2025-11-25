"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuPopup = void 0;
var React = _interopRequireWildcard(require("react"));
var _floatingUiReact = require("../../floating-ui-react");
var _MenuRootContext = require("../root/MenuRootContext");
var _MenuPositionerContext = require("../positioner/MenuPositionerContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _styleHookMapping = require("../../utils/styleHookMapping");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _constants = require("../../utils/constants");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
const customStyleHookMapping = {
  ..._popupStateMapping.popupStateMapping,
  ..._styleHookMapping.transitionStatusMapping
};

/**
 * A container for the menu items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
const MenuPopup = exports.MenuPopup = /*#__PURE__*/React.forwardRef(function MenuPopup(componentProps, forwardedRef) {
  const {
    render,
    className,
    finalFocus,
    ...elementProps
  } = componentProps;
  const {
    open,
    setOpen,
    popupRef,
    transitionStatus,
    popupProps,
    mounted,
    instantType,
    triggerElement,
    onOpenChangeComplete,
    parent,
    lastOpenChangeReason,
    rootId
  } = (0, _MenuRootContext.useMenuRootContext)();
  const {
    side,
    align,
    floatingContext
  } = (0, _MenuPositionerContext.useMenuPositionerContext)();
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        onOpenChangeComplete?.(true);
      }
    }
  });
  const {
    events: menuEvents
  } = (0, _floatingUiReact.useFloatingTree)();
  React.useEffect(() => {
    function handleClose(event) {
      setOpen(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)(event.reason, event.domEvent));
    }
    menuEvents.on('close', handleClose);
    return () => {
      menuEvents.off('close', handleClose);
    };
  }, [menuEvents, setOpen]);
  const state = React.useMemo(() => ({
    transitionStatus,
    side,
    align,
    open,
    nested: parent.type === 'menu',
    instant: instantType
  }), [transitionStatus, side, align, open, parent.type, instantType]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: [forwardedRef, popupRef],
    customStyleHookMapping,
    props: [popupProps, transitionStatus === 'starting' ? _constants.DISABLED_TRANSITIONS_STYLE : _constants.EMPTY_OBJECT, elementProps, {
      'data-rootownerid': rootId
    }]
  });
  let returnFocus = parent.type === undefined || parent.type === 'context-menu';
  if (triggerElement || parent.type === 'menubar' && lastOpenChangeReason !== 'outside-press') {
    returnFocus = true;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_floatingUiReact.FloatingFocusManager, {
    context: floatingContext,
    modal: false,
    disabled: !mounted,
    returnFocus: finalFocus === undefined ? returnFocus : finalFocus,
    initialFocus: parent.type !== 'menu',
    restoreFocus: true,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") MenuPopup.displayName = "MenuPopup";