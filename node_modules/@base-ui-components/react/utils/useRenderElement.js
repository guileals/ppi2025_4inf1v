"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRenderElement = useRenderElement;
var React = _interopRequireWildcard(require("react"));
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _reactVersion = require("@base-ui-components/utils/reactVersion");
var _mergeObjects = require("@base-ui-components/utils/mergeObjects");
var _getStyleHookProps = require("./getStyleHookProps");
var _resolveClassName = require("./resolveClassName");
var _mergeProps = require("../merge-props");
var _constants = require("./constants");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Renders a Base UI element.
 *
 * @param element The default HTML element to render. Can be overridden by the `render` prop.
 * @param componentProps An object containing the `render` and `className` props to be used for element customization. Other props are ignored.
 * @param params Additional parameters for rendering the element.
 */
function useRenderElement(element, componentProps, params = {}) {
  const renderProp = componentProps.render;
  const outProps = useRenderElementProps(componentProps, params);
  if (params.enabled === false) {
    return null;
  }
  const state = params.state ?? _constants.EMPTY_OBJECT;
  return evaluateRenderProp(element, renderProp, outProps, state);
}

/**
 * Computes render element final props.
 */
function useRenderElementProps(componentProps, params = {}) {
  const {
    className: classNameProp,
    render: renderProp
  } = componentProps;
  const {
    state = _constants.EMPTY_OBJECT,
    ref,
    props,
    disableStyleHooks,
    customStyleHookMapping,
    enabled = true
  } = params;
  const className = enabled ? (0, _resolveClassName.resolveClassName)(classNameProp, state) : undefined;
  let styleHooks;
  if (disableStyleHooks !== true) {
    // SAFETY: We use typings to ensure `disableStyleHooks` is either always set or
    // always unset, so this `if` block is stable across renders.
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    styleHooks = React.useMemo(() => enabled ? (0, _getStyleHookProps.getStyleHookProps)(state, customStyleHookMapping) : _constants.EMPTY_OBJECT, [state, customStyleHookMapping, enabled]);
  }
  const outProps = enabled ? (0, _mergeObjects.mergeObjects)(styleHooks, Array.isArray(props) ? (0, _mergeProps.mergePropsN)(props) : props) ?? _constants.EMPTY_OBJECT : _constants.EMPTY_OBJECT;

  // SAFETY: The `useMergedRefs` functions use a single hook to store the same value,
  // switching between them at runtime is safe. If this assertion fails, React will
  // throw at runtime anyway.
  // This also skips the `useMergedRefs` call on the server, which is fine because
  // refs are not used on the server side.
  /* eslint-disable react-hooks/rules-of-hooks */
  if (typeof document !== 'undefined') {
    if (!enabled) {
      (0, _useMergedRefs.useMergedRefs)(null, null);
    } else if (Array.isArray(ref)) {
      outProps.ref = (0, _useMergedRefs.useMergedRefsN)([outProps.ref, getChildRef(renderProp), ...ref]);
    } else {
      outProps.ref = (0, _useMergedRefs.useMergedRefs)(outProps.ref, getChildRef(renderProp), ref);
    }
  }
  if (!enabled) {
    return _constants.EMPTY_OBJECT;
  }
  if (className !== undefined) {
    outProps.className = (0, _mergeProps.mergeClassNames)(outProps.className, className);
  }
  return outProps;
}
function evaluateRenderProp(element, render, props, state) {
  if (render) {
    if (typeof render === 'function') {
      return render(props, state);
    }
    const mergedProps = (0, _mergeProps.mergeProps)(props, render.props);
    mergedProps.ref = props.ref;
    return /*#__PURE__*/React.cloneElement(render, mergedProps);
  }
  if (element) {
    if (typeof element === 'string') {
      return renderTag(element, props);
    }
  }
  // Unreachable, but the typings on `useRenderElement` need to be reworked
  // to annotate it correctly.
  throw new Error('Base UI: Render element or function are not defined.');
}
function renderTag(Tag, props) {
  if (Tag === 'button') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      type: "button",
      ...props
    });
  }
  if (Tag === 'img') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      alt: "",
      ...props
    });
  }
  return /*#__PURE__*/React.createElement(Tag, props);
}
function getChildRef(render) {
  if (render && typeof render !== 'function') {
    return (0, _reactVersion.isReactVersionAtLeast)(19) ? render.props.ref : render.ref;
  }
  return null;
}