"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectValue = void 0;
var React = _interopRequireWildcard(require("react"));
var _store = require("@base-ui-components/utils/store");
var _useRenderElement = require("../../utils/useRenderElement");
var _SelectRootContext = require("../root/SelectRootContext");
var _store2 = require("../store");
const customStyleHookMapping = {
  value: () => null
};

/**
 * A text label of the currently selected item.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectValue = exports.SelectValue = /*#__PURE__*/React.forwardRef(function SelectValue(componentProps, forwardedRef) {
  const {
    className,
    render,
    children: childrenProp,
    ...elementProps
  } = componentProps;
  const {
    store,
    valueRef
  } = (0, _SelectRootContext.useSelectRootContext)();
  const value = (0, _store.useStore)(store, _store2.selectors.value);
  const items = (0, _store.useStore)(store, _store2.selectors.items);
  const isChildrenPropFunction = typeof childrenProp === 'function';
  const labelFromItems = React.useMemo(() => {
    if (isChildrenPropFunction) {
      return undefined;
    }

    // `multiple` selects should always use a custom `children` render function
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (!items) {
      return undefined;
    }
    if (Array.isArray(items)) {
      return items.find(item => item.value === value)?.label;
    }
    return items[value];
  }, [value, items, isChildrenPropFunction]);
  const state = React.useMemo(() => ({
    value
  }), [value]);
  const children = typeof childrenProp === 'function' ? childrenProp(value) : childrenProp ?? labelFromItems ?? value;
  const element = (0, _useRenderElement.useRenderElement)('span', componentProps, {
    state,
    ref: [forwardedRef, valueRef],
    props: [{
      children
    }, elementProps],
    customStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SelectValue.displayName = "SelectValue";