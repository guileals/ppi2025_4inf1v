'use client';

import * as React from 'react';
import { useStore } from '@base-ui-components/utils/store';
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useSelectRootContext } from "../root/SelectRootContext.js";
import { selectors } from "../store.js";
const customStyleHookMapping = {
  value: () => null
};

/**
 * A text label of the currently selected item.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export const SelectValue = /*#__PURE__*/React.forwardRef(function SelectValue(componentProps, forwardedRef) {
  const {
    className,
    render,
    children: childrenProp,
    ...elementProps
  } = componentProps;
  const {
    store,
    valueRef
  } = useSelectRootContext();
  const value = useStore(store, selectors.value);
  const items = useStore(store, selectors.items);
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
  const element = useRenderElement('span', componentProps, {
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