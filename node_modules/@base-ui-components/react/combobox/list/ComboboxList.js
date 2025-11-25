"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxList = void 0;
var React = _interopRequireWildcard(require("react"));
var _store = require("@base-ui-components/utils/store");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useRenderElement = require("../../utils/useRenderElement");
var _ComboboxRootContext = require("../root/ComboboxRootContext");
var _ComboboxPositionerContext = require("../positioner/ComboboxPositionerContext");
var _store2 = require("../store");
var _ComboboxCollection2 = require("../collection/ComboboxCollection");
var _utils = require("../../floating-ui-react/utils");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * A list container for the items.
 * Renders a `<div>` element.
 */
const ComboboxList = exports.ComboboxList = /*#__PURE__*/React.forwardRef(function ComboboxList(componentProps, forwardedRef) {
  var _ComboboxCollection;
  const {
    render,
    className,
    children,
    ...elementProps
  } = componentProps;
  const store = (0, _ComboboxRootContext.useComboboxRootContext)();
  const floatingRootContext = (0, _ComboboxRootContext.useComboboxFloatingContext)();
  const hasPositionerContext = Boolean((0, _ComboboxPositionerContext.useComboboxPositionerContext)(true));
  const selectionMode = (0, _store.useStore)(store, _store2.selectors.selectionMode);
  const cols = (0, _store.useStore)(store, _store2.selectors.cols);
  const popupRef = (0, _store.useStore)(store, _store2.selectors.popupRef);
  const popupProps = (0, _store.useStore)(store, _store2.selectors.popupProps);
  const multiple = selectionMode === 'multiple';
  const setPositionerElement = (0, _useEventCallback.useEventCallback)(element => {
    store.set('positionerElement', element);
  });
  const setListElement = (0, _useEventCallback.useEventCallback)(element => {
    store.set('listElement', element);
  });
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    // Only force inline mode when there is no Positioner AND no Popup present
    if (hasPositionerContext || popupRef.current) {
      return undefined;
    }
    store.set('inline', true);
    return () => {
      store.set('inline', false);
    };
  }, [hasPositionerContext, store, popupRef]);

  // Support "closed template" API: if children is a function, implicitly wrap it
  // with a Combobox.Collection that reads items from context/root.
  // Ensures this component's `popupProps` subscription does not cause <Combobox.Item>
  // to re-render on every active index change.
  const resolvedChildren = React.useMemo(() => {
    if (typeof children === 'function') {
      return _ComboboxCollection || (_ComboboxCollection = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ComboboxCollection2.ComboboxCollection, {
        children: children
      }));
    }
    return children;
  }, [children]);
  return (0, _useRenderElement.useRenderElement)('div', componentProps, {
    ref: [forwardedRef, setListElement, hasPositionerContext ? null : setPositionerElement],
    props: [popupProps, {
      children: resolvedChildren,
      tabIndex: -1,
      id: floatingRootContext.floatingId,
      role: cols > 1 ? 'grid' : 'listbox',
      'aria-multiselectable': multiple ? 'true' : undefined,
      onKeyDown(event) {
        if (event.key === 'Enter') {
          (0, _utils.stopEvent)(event);
          store.state.handleEnterSelection(event.nativeEvent);
        }
      },
      onKeyDownCapture() {
        store.state.keyboardActiveRef.current = true;
      },
      onPointerMoveCapture() {
        store.state.keyboardActiveRef.current = false;
      }
    }, elementProps]
  });
});
if (process.env.NODE_ENV !== "production") ComboboxList.displayName = "ComboboxList";