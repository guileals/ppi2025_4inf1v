"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsTab = void 0;
var React = _interopRequireWildcard(require("react"));
var _owner = require("@base-ui-components/utils/owner");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _useRenderElement = require("../../utils/useRenderElement");
var _useButton = require("../../use-button");
var _constants = require("../../composite/constants");
var _useCompositeItem = require("../../composite/item/useCompositeItem");
var _TabsRootContext = require("../root/TabsRootContext");
var _TabsListContext = require("../list/TabsListContext");
var _utils = require("../../floating-ui-react/utils");
/**
 * An individual interactive tab button that toggles the corresponding panel.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
const TabsTab = exports.TabsTab = /*#__PURE__*/React.forwardRef(function TabsTab(componentProps, forwardedRef) {
  const {
    className,
    disabled = false,
    render,
    value: valueProp,
    id: idProp,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const {
    value: selectedTabValue,
    getTabPanelIdByTabValueOrIndex,
    orientation
  } = (0, _TabsRootContext.useTabsRootContext)();
  const {
    activateOnFocus,
    highlightedTabIndex,
    onTabActivation,
    setHighlightedTabIndex,
    tabsListRef
  } = (0, _TabsListContext.useTabsListContext)();
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  const tabMetadata = React.useMemo(() => ({
    disabled,
    id,
    value: valueProp
  }), [disabled, id, valueProp]);
  const {
    compositeProps,
    compositeRef,
    index
    // hook is used instead of the CompositeItem component
    // because the index is needed for Tab internals
  } = (0, _useCompositeItem.useCompositeItem)({
    metadata: tabMetadata
  });
  const tabValue = valueProp ?? index;

  // the `selected` state isn't set on the server (it relies on effects to be calculated),
  // so we fall back to checking the `value` param with the selectedTabValue from the TabsContext
  const selected = React.useMemo(() => {
    if (valueProp === undefined) {
      return index < 0 ? false : index === selectedTabValue;
    }
    return valueProp === selectedTabValue;
  }, [index, selectedTabValue, valueProp]);
  const isNavigatingRef = React.useRef(false);

  // Keep the highlighted item in sync with the currently selected tab
  // when the value prop changes externally (controlled mode)
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }
    if (!(selected && index > -1 && highlightedTabIndex !== index)) {
      return;
    }

    // If focus is currently within the tabs list, don't override the roving
    // focus highlight. This keeps keyboard navigation relative to the focused
    // item after an external/asynchronous selection change.
    const listElement = tabsListRef.current;
    const activeEl = (0, _utils.activeElement)((0, _owner.ownerDocument)(listElement));
    if (listElement && activeEl && (0, _utils.contains)(listElement, activeEl)) {
      return;
    }
    setHighlightedTabIndex(index);
  }, [selected, index, highlightedTabIndex, setHighlightedTabIndex, disabled, tabsListRef]);
  const {
    getButtonProps,
    buttonRef
  } = (0, _useButton.useButton)({
    disabled,
    native: nativeButton,
    focusableWhenDisabled: true
  });
  const tabPanelId = index > -1 ? getTabPanelIdByTabValueOrIndex(valueProp, index) : undefined;
  const isPressingRef = React.useRef(false);
  const isMainButtonRef = React.useRef(false);
  const onClick = (0, _useEventCallback.useEventCallback)(event => {
    if (selected || disabled) {
      return;
    }
    onTabActivation(tabValue, event.nativeEvent);
  });
  const onFocus = (0, _useEventCallback.useEventCallback)(event => {
    if (selected) {
      return;
    }
    if (index > -1) {
      setHighlightedTabIndex(index);
    }
    if (disabled) {
      return;
    }
    if (activateOnFocus && !isPressingRef.current ||
    // keyboard focus
    isPressingRef.current && isMainButtonRef.current // focus caused by pointerdown
    ) {
      onTabActivation(tabValue, event.nativeEvent);
    }
  });
  const onPointerDown = (0, _useEventCallback.useEventCallback)(event => {
    if (selected || disabled) {
      return;
    }
    isPressingRef.current = true;
    function handlePointerUp() {
      isPressingRef.current = false;
      isMainButtonRef.current = false;
    }
    if (!event.button || event.button === 0) {
      isMainButtonRef.current = true;
      const doc = (0, _owner.ownerDocument)(event.currentTarget);
      doc.addEventListener('pointerup', handlePointerUp, {
        once: true
      });
    }
  });
  const state = React.useMemo(() => ({
    disabled,
    selected,
    orientation
  }), [disabled, selected, orientation]);
  const element = (0, _useRenderElement.useRenderElement)('button', componentProps, {
    state,
    ref: [forwardedRef, buttonRef, compositeRef],
    props: [compositeProps, {
      role: 'tab',
      'aria-controls': tabPanelId,
      'aria-selected': selected,
      id,
      onClick,
      onFocus,
      onPointerDown,
      [_constants.ACTIVE_COMPOSITE_ITEM]: selected ? '' : undefined,
      onKeyDownCapture() {
        isNavigatingRef.current = true;
      }
    }, elementProps, getButtonProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") TabsTab.displayName = "TabsTab";