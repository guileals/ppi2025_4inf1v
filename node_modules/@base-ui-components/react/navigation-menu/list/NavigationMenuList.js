"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationMenuList = void 0;
var React = _interopRequireWildcard(require("react"));
var _CompositeRoot = require("../../composite/root/CompositeRoot");
var _NavigationMenuRootContext = require("../root/NavigationMenuRootContext");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Contains a list of navigation menu items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 */
const NavigationMenuList = exports.NavigationMenuList = /*#__PURE__*/React.forwardRef(function NavigationMenuList(componentProps, forwardedRef) {
  const {
    className,
    render,
    ...elementProps
  } = componentProps;
  const {
    orientation,
    open
  } = (0, _NavigationMenuRootContext.useNavigationMenuRootContext)();
  const state = React.useMemo(() => ({
    open
  }), [open]);
  const defaultProps = {
    // `stopEventPropagation` won't stop the propagation if the end of the list is reached,
    // but we want to block it in this case.
    onKeyDown(event) {
      const shouldStop = orientation === 'horizontal' && (event.key === 'ArrowLeft' || event.key === 'ArrowRight') || orientation === 'vertical' && (event.key === 'ArrowUp' || event.key === 'ArrowDown');
      if (shouldStop) {
        event.stopPropagation();
      }
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeRoot.CompositeRoot, {
    render: render,
    className: className,
    state: state,
    refs: [forwardedRef],
    props: [defaultProps, elementProps],
    loop: false,
    orientation: orientation,
    tag: "ul",
    stopEventPropagation: true
  });
});
if (process.env.NODE_ENV !== "production") NavigationMenuList.displayName = "NavigationMenuList";