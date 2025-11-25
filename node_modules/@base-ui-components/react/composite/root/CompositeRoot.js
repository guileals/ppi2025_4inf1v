"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompositeRoot = CompositeRoot;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _CompositeList = require("../list/CompositeList");
var _useCompositeRoot = require("./useCompositeRoot");
var _CompositeRootContext = require("./CompositeRootContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _DirectionContext = require("../../direction-provider/DirectionContext");
var _constants = require("../../utils/constants");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * @internal
 */
function CompositeRoot(componentProps) {
  const {
    render,
    className,
    refs = _constants.EMPTY_ARRAY,
    props = _constants.EMPTY_ARRAY,
    state = _constants.EMPTY_OBJECT,
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
  const direction = (0, _DirectionContext.useDirection)();
  const {
    props: defaultProps,
    highlightedIndex,
    onHighlightedIndexChange,
    elementsRef,
    onMapChange: onMapChangeUnwrapped
  } = (0, _useCompositeRoot.useCompositeRoot)({
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
  const onMapChange = (0, _useEventCallback.useEventCallback)(newMap => {
    onMapChangeProp?.(newMap);
    onMapChangeUnwrapped(newMap);
  });
  const element = (0, _useRenderElement.useRenderElement)(tag, componentProps, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeRootContext.CompositeRootContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeList.CompositeList, {
      elementsRef: elementsRef,
      onMapChange: onMapChange,
      children: element
    })
  });
}