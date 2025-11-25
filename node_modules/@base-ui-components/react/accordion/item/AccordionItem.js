"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordionItem = void 0;
var React = _interopRequireWildcard(require("react"));
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _useCollapsibleRoot = require("../../collapsible/root/useCollapsibleRoot");
var _CollapsibleRootContext = require("../../collapsible/root/CollapsibleRootContext");
var _useCompositeListItem = require("../../composite/list/useCompositeListItem");
var _AccordionRootContext = require("../root/AccordionRootContext");
var _AccordionItemContext = require("./AccordionItemContext");
var _styleHooks = require("./styleHooks");
var _useRenderElement = require("../../utils/useRenderElement");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Groups an accordion header with the corresponding panel.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
const AccordionItem = exports.AccordionItem = /*#__PURE__*/React.forwardRef(function AccordionItem(componentProps, forwardedRef) {
  const {
    className,
    disabled: disabledProp = false,
    onOpenChange: onOpenChangeProp,
    render,
    value: valueProp,
    ...elementProps
  } = componentProps;
  const {
    ref: listItemRef,
    index
  } = (0, _useCompositeListItem.useCompositeListItem)();
  const mergedRef = (0, _useMergedRefs.useMergedRefs)(forwardedRef, listItemRef);
  const {
    disabled: contextDisabled,
    handleValueChange,
    state: rootState,
    value: openValues
  } = (0, _AccordionRootContext.useAccordionRootContext)();
  const value = valueProp ?? index;
  const disabled = disabledProp || contextDisabled;
  const isOpen = React.useMemo(() => {
    if (!openValues) {
      return false;
    }
    for (let i = 0; i < openValues.length; i += 1) {
      if (openValues[i] === value) {
        return true;
      }
    }
    return false;
  }, [openValues, value]);
  const onOpenChange = (0, _useEventCallback.useEventCallback)(nextOpen => {
    handleValueChange(value, nextOpen);
    onOpenChangeProp?.(nextOpen);
  });
  const collapsible = (0, _useCollapsibleRoot.useCollapsibleRoot)({
    open: isOpen,
    onOpenChange,
    disabled
  });
  const collapsibleState = React.useMemo(() => ({
    open: collapsible.open,
    disabled: collapsible.disabled,
    hidden: !collapsible.mounted
  }), [collapsible.open, collapsible.disabled, collapsible.mounted]);
  const collapsibleContext = React.useMemo(() => ({
    ...collapsible,
    onOpenChange,
    state: collapsibleState,
    transitionStatus: collapsible.transitionStatus
  }), [collapsible, collapsibleState, onOpenChange]);
  const state = React.useMemo(() => ({
    ...rootState,
    index,
    disabled,
    open: isOpen
  }), [disabled, index, isOpen, rootState]);
  const [triggerId, setTriggerId] = React.useState((0, _useBaseUiId.useBaseUiId)());
  const accordionItemContext = React.useMemo(() => ({
    open: isOpen,
    state,
    setTriggerId,
    triggerId
  }), [isOpen, state, setTriggerId, triggerId]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: mergedRef,
    props: elementProps,
    customStyleHookMapping: _styleHooks.accordionStyleHookMapping
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CollapsibleRootContext.CollapsibleRootContext.Provider, {
    value: collapsibleContext,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AccordionItemContext.AccordionItemContext.Provider, {
      value: accordionItemContext,
      children: element
    })
  });
});
if (process.env.NODE_ENV !== "production") AccordionItem.displayName = "AccordionItem";