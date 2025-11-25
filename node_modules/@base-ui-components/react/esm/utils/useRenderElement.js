import * as React from 'react';
import { useMergedRefs, useMergedRefsN } from '@base-ui-components/utils/useMergedRefs';
import { isReactVersionAtLeast } from '@base-ui-components/utils/reactVersion';
import { mergeObjects } from '@base-ui-components/utils/mergeObjects';
import { getStyleHookProps } from "./getStyleHookProps.js";
import { resolveClassName } from "./resolveClassName.js";
import { mergeProps, mergePropsN, mergeClassNames } from "../merge-props/index.js";
import { EMPTY_OBJECT } from "./constants.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Renders a Base UI element.
 *
 * @param element The default HTML element to render. Can be overridden by the `render` prop.
 * @param componentProps An object containing the `render` and `className` props to be used for element customization. Other props are ignored.
 * @param params Additional parameters for rendering the element.
 */
export function useRenderElement(element, componentProps, params = {}) {
  const renderProp = componentProps.render;
  const outProps = useRenderElementProps(componentProps, params);
  if (params.enabled === false) {
    return null;
  }
  const state = params.state ?? EMPTY_OBJECT;
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
    state = EMPTY_OBJECT,
    ref,
    props,
    disableStyleHooks,
    customStyleHookMapping,
    enabled = true
  } = params;
  const className = enabled ? resolveClassName(classNameProp, state) : undefined;
  let styleHooks;
  if (disableStyleHooks !== true) {
    // SAFETY: We use typings to ensure `disableStyleHooks` is either always set or
    // always unset, so this `if` block is stable across renders.
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    styleHooks = React.useMemo(() => enabled ? getStyleHookProps(state, customStyleHookMapping) : EMPTY_OBJECT, [state, customStyleHookMapping, enabled]);
  }
  const outProps = enabled ? mergeObjects(styleHooks, Array.isArray(props) ? mergePropsN(props) : props) ?? EMPTY_OBJECT : EMPTY_OBJECT;

  // SAFETY: The `useMergedRefs` functions use a single hook to store the same value,
  // switching between them at runtime is safe. If this assertion fails, React will
  // throw at runtime anyway.
  // This also skips the `useMergedRefs` call on the server, which is fine because
  // refs are not used on the server side.
  /* eslint-disable react-hooks/rules-of-hooks */
  if (typeof document !== 'undefined') {
    if (!enabled) {
      useMergedRefs(null, null);
    } else if (Array.isArray(ref)) {
      outProps.ref = useMergedRefsN([outProps.ref, getChildRef(renderProp), ...ref]);
    } else {
      outProps.ref = useMergedRefs(outProps.ref, getChildRef(renderProp), ref);
    }
  }
  if (!enabled) {
    return EMPTY_OBJECT;
  }
  if (className !== undefined) {
    outProps.className = mergeClassNames(outProps.className, className);
  }
  return outProps;
}
function evaluateRenderProp(element, render, props, state) {
  if (render) {
    if (typeof render === 'function') {
      return render(props, state);
    }
    const mergedProps = mergeProps(props, render.props);
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
    return /*#__PURE__*/_jsx("button", {
      type: "button",
      ...props
    });
  }
  if (Tag === 'img') {
    return /*#__PURE__*/_jsx("img", {
      alt: "",
      ...props
    });
  }
  return /*#__PURE__*/React.createElement(Tag, props);
}
function getChildRef(render) {
  if (render && typeof render !== 'function') {
    return isReactVersionAtLeast(19) ? render.props.ref : render.ref;
  }
  return null;
}