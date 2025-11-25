'use client';

import * as React from 'react';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { CompositeList } from "../list/CompositeList.js";
import { useCompositeRoot } from "./useCompositeRoot.js";
import { CompositeRootContext } from "./CompositeRootContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useDirection } from "../../direction-provider/DirectionContext.js";
import { EMPTY_ARRAY, EMPTY_OBJECT } from "../../utils/constants.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @internal
 */
export function CompositeRoot(componentProps) {
  const {
    render,
    className,
    refs = EMPTY_ARRAY,
    props = EMPTY_ARRAY,
    state = EMPTY_OBJECT,
    customStyleHookMapping,
    highlightedIndex: highlightedIndexProp,
    onHighlightedIndexChange: onHighlightedIndexChangeProp,
    orientation,
    dense,
    itemSizes,
    loop,
    cols,
    enableHomeAndEndKeys,
    onMapChange: onMapChangeProp,
    stopEventPropagation,
    rootRef,
    disabledIndices,
    modifierKeys,
    highlightItemOnHover = false,
    tag = 'div',
    ...elementProps
  } = componentProps;
  const direction = useDirection();
  const {
    props: defaultProps,
    highlightedIndex,
    onHighlightedIndexChange,
    elementsRef,
    onMapChange: onMapChangeUnwrapped
  } = useCompositeRoot({
    itemSizes,
    cols,
    loop,
    dense,
    orientation,
    highlightedIndex: highlightedIndexProp,
    onHighlightedIndexChange: onHighlightedIndexChangeProp,
    rootRef,
    stopEventPropagation,
    enableHomeAndEndKeys,
    direction,
    disabledIndices,
    modifierKeys
  });
  const onMapChange = useEventCallback(newMap => {
    onMapChangeProp?.(newMap);
    onMapChangeUnwrapped(newMap);
  });
  const element = useRenderElement(tag, componentProps, {
    state,
    ref: refs,
    props: [defaultProps, ...props, elementProps],
    customStyleHookMapping
  });
  const contextValue = React.useMemo(() => ({
    highlightedIndex,
    onHighlightedIndexChange,
    highlightItemOnHover
  }), [highlightedIndex, onHighlightedIndexChange, highlightItemOnHover]);
  return /*#__PURE__*/_jsx(CompositeRootContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(CompositeList, {
      elementsRef: elementsRef,
      onMapChange: onMapChange,
      children: element
    })
  });
}