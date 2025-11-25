"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuTrigger = void 0;
var React = _interopRequireWildcard(require("react"));
var _dom = require("@floating-ui/utils/dom");
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _owner = require("@base-ui-components/utils/owner");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _utils = require("../../floating-ui-react/utils");
var _index = require("../../floating-ui-react/index");
var _MenuRootContext = require("../root/MenuRootContext");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _useRenderElement = require("../../utils/useRenderElement");
var _mergeProps = require("../../merge-props");
var _useButton = require("../../use-button/useButton");
var _getPseudoElementBounds = require("../../utils/getPseudoElementBounds");
var _CompositeItem = require("../../composite/item/CompositeItem");
var _jsxRuntime = require("react/jsx-runtime");
const BOUNDARY_OFFSET = 2;

/**
 * A button that opens the menu.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
const MenuTrigger = exports.MenuTrigger = /*#__PURE__*/React.forwardRef(function MenuTrigger(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp = false,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const {
    triggerProps: rootTriggerProps,
    disabled: menuDisabled,
    setTriggerElement,
    open,
    allowMouseUpTriggerRef,
    positionerRef,
    parent,
    lastOpenChangeReason,
    rootId
  } = (0, _MenuRootContext.useMenuRootContext)();
  const disabled = disabledProp || menuDisabled;
  const triggerRef = React.useRef(null);
  const allowMouseUpTriggerTimeout = (0, _useTimeout.useTimeout)();
  const {
    getButtonProps,
    buttonRef
  } = (0, _useButton.useButton)({
    disabled,
    native: nativeButton
  });
  const handleRef = (0, _useMergedRefs.useMergedRefs)(buttonRef, setTriggerElement);
  const {
    events: menuEvents
  } = (0, _index.useFloatingTree)();
  React.useEffect(() => {
    if (!open && parent.type === undefined) {
      allowMouseUpTriggerRef.current = false;
    }
  }, [allowMouseUpTriggerRef, open, parent.type]);
  const handleDocumentMouseUp = (0, _useEventCallback.useEventCallback)(mouseEvent => {
    if (!triggerRef.current) {
      return;
    }
    allowMouseUpTriggerTimeout.clear();
    allowMouseUpTriggerRef.current = false;
    const mouseUpTarget = mouseEvent.target;
    if ((0, _utils.contains)(triggerRef.current, mouseUpTarget) || (0, _utils.contains)(positionerRef.current, mouseUpTarget) || mouseUpTarget === triggerRef.current) {
      return;
    }
    if (mouseUpTarget != null && findRootOwnerId(mouseUpTarget) === rootId) {
      return;
    }
    const bounds = (0, _getPseudoElementBounds.getPseudoElementBounds)(triggerRef.current);
    if (mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET && mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET && mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET && mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET) {
      return;
    }
    menuEvents.emit('close', {
      domEvent: mouseEvent,
      reason: 'cancel-open'
    });
  });
  React.useEffect(() => {
    if (open && lastOpenChangeReason === 'trigger-hover') {
      const doc = (0, _owner.ownerDocument)(triggerRef.current);
      doc.addEventListener('mouseup', handleDocumentMouseUp, {
        once: true
      });
    }
  }, [open, handleDocumentMouseUp, lastOpenChangeReason]);
  const isMenubar = parent.type === 'menubar';
  const getTriggerProps = React.useCallback(externalProps => {
    return (0, _mergeProps.mergeProps)(isMenubar ? {
      role: 'menuitem'
    } : {}, {
      'aria-haspopup': 'menu',
      ref: handleRef,
      onMouseDown: event => {
        if (open) {
          return;
        }

        // mousedown -> mouseup on menu item should not trigger it within 200ms.
        allowMouseUpTriggerTimeout.start(200, () => {
          allowMouseUpTriggerRef.current = true;
        });
        const doc = (0, _owner.ownerDocument)(event.currentTarget);
        doc.addEventListener('mouseup', handleDocumentMouseUp, {
          once: true
        });
      }
    }, externalProps, getButtonProps);
  }, [getButtonProps, handleRef, open, allowMouseUpTriggerRef, allowMouseUpTriggerTimeout, handleDocumentMouseUp, isMenubar]);
  const state = React.useMemo(() => ({
    disabled,
    open
  }), [disabled, open]);
  const ref = [triggerRef, forwardedRef, buttonRef];
  const props = [rootTriggerProps, elementProps, getTriggerProps];
  const element = (0, _useRenderElement.useRenderElement)('button', componentProps, {
    enabled: !isMenubar,
    customStyleHookMapping: _popupStateMapping.pressableTriggerOpenStateMapping,
    state,
    ref,
    props
  });
  if (isMenubar) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeItem.CompositeItem, {
      tag: "button",
      render: render,
      className: className,
      state: state,
      refs: ref,
      props: props,
      customStyleHookMapping: _popupStateMapping.pressableTriggerOpenStateMapping
    });
  }
  return element;
});
if (process.env.NODE_ENV !== "production") MenuTrigger.displayName = "MenuTrigger";
function findRootOwnerId(node) {
  if ((0, _dom.isHTMLElement)(node) && node.hasAttribute('data-rootownerid')) {
    return node.getAttribute('data-rootownerid') ?? undefined;
  }
  if ((0, _dom.isLastTraversableNode)(node)) {
    return undefined;
  }
  return findRootOwnerId((0, _dom.getParentNode)(node));
}