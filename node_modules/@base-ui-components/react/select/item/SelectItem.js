"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectItem = void 0;
var React = _interopRequireWildcard(require("react"));
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _isMouseWithinBounds = require("@base-ui-components/utils/isMouseWithinBounds");
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _store = require("@base-ui-components/utils/store");
var _SelectRootContext = require("../root/SelectRootContext");
var _useCompositeListItem = require("../../composite/list/useCompositeListItem");
var _useRenderElement = require("../../utils/useRenderElement");
var _SelectItemContext = require("./SelectItemContext");
var _store2 = require("../store");
var _useButton = require("../../use-button");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * An individual option in the select menu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectItem = exports.SelectItem = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function SelectItem(componentProps, forwardedRef) {
  const {
    render,
    className,
    value = null,
    label,
    disabled = false,
    nativeButton = false,
    ...elementProps
  } = componentProps;
  const textRef = React.useRef(null);
  const listItem = (0, _useCompositeListItem.useCompositeListItem)({
    label,
    textRef,
    indexGuessBehavior: _useCompositeListItem.IndexGuessBehavior.GuessFromOrder
  });
  const {
    store,
    getItemProps,
    setOpen,
    setValue,
    selectionRef,
    typingRef,
    valuesRef,
    registerItemIndex,
    keyboardActiveRef,
    multiple
  } = (0, _SelectRootContext.useSelectRootContext)();
  const highlightTimeout = (0, _useTimeout.useTimeout)();
  const highlighted = (0, _store.useStore)(store, _store2.selectors.isActive, listItem.index);
  const selected = (0, _store.useStore)(store, _store2.selectors.isSelected, listItem.index, value);
  const rootValue = (0, _store.useStore)(store, _store2.selectors.value);
  const selectedByFocus = (0, _store.useStore)(store, _store2.selectors.isSelectedByFocus, listItem.index);
  const itemRef = React.useRef(null);
  const indexRef = (0, _useLatestRef.useLatestRef)(listItem.index);
  const hasRegistered = listItem.index !== -1;
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!hasRegistered) {
      return undefined;
    }
    const values = valuesRef.current;
    values[listItem.index] = value;
    return () => {
      delete values[listItem.index];
    };
  }, [hasRegistered, listItem.index, value, valuesRef]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (hasRegistered) {
      if (multiple) {
        const isValueSelected = Array.isArray(rootValue) && rootValue.includes(value);
        if (isValueSelected) {
          registerItemIndex(listItem.index);
        }
      } else if (value === rootValue) {
        registerItemIndex(listItem.index);
      }
    }
  }, [hasRegistered, listItem.index, registerItemIndex, value, rootValue, multiple]);
  const state = React.useMemo(() => ({
    disabled,
    selected,
    highlighted
  }), [disabled, selected, highlighted]);
  const rootProps = getItemProps({
    active: highlighted,
    selected
  });
  // With our custom `focusItemOnHover` implementation, this interferes with the logic and can
  // cause the index state to be stuck when leaving the select popup.
  delete rootProps.onFocus;
  delete rootProps.id;
  const lastKeyRef = React.useRef(null);
  const pointerTypeRef = React.useRef('mouse');
  const didPointerDownRef = React.useRef(false);
  const {
    getButtonProps,
    buttonRef
  } = (0, _useButton.useButton)({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton
  });
  function commitSelection(event) {
    if (multiple) {
      const currentValue = Array.isArray(rootValue) ? rootValue : [];
      const nextValue = selected ? currentValue.filter(v => v !== value) : [...currentValue, value];
      setValue(nextValue, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event));
    } else {
      setValue(value, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event));
      setOpen(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('item-press', event));
    }
  }
  const defaultProps = {
    'aria-disabled': disabled || undefined,
    tabIndex: highlighted ? 0 : -1,
    onFocus() {
      store.set('activeIndex', indexRef.current);
    },
    onMouseEnter() {
      if (!keyboardActiveRef.current && store.state.selectedIndex === null) {
        store.set('activeIndex', indexRef.current);
      }
    },
    onMouseMove() {
      store.set('activeIndex', indexRef.current);
    },
    onMouseLeave(event) {
      if (keyboardActiveRef.current || (0, _isMouseWithinBounds.isMouseWithinBounds)(event)) {
        return;
      }
      highlightTimeout.start(0, () => {
        if (store.state.activeIndex === indexRef.current) {
          store.set('activeIndex', null);
        }
      });
    },
    onTouchStart() {
      selectionRef.current = {
        allowSelectedMouseUp: false,
        allowUnselectedMouseUp: false
      };
    },
    onKeyDown(event) {
      lastKeyRef.current = event.key;
      store.set('activeIndex', indexRef.current);
    },
    onClick(event) {
      didPointerDownRef.current = false;

      // Prevent double commit on {Enter}
      if (event.type === 'keydown' && lastKeyRef.current === null) {
        return;
      }
      if (disabled || lastKeyRef.current === ' ' && typingRef.current || pointerTypeRef.current !== 'touch' && !highlighted) {
        return;
      }
      lastKeyRef.current = null;
      commitSelection(event.nativeEvent);
    },
    onPointerEnter(event) {
      pointerTypeRef.current = event.pointerType;
    },
    onPointerDown(event) {
      pointerTypeRef.current = event.pointerType;
      didPointerDownRef.current = true;
    },
    onMouseUp(event) {
      if (disabled) {
        return;
      }
      if (didPointerDownRef.current) {
        didPointerDownRef.current = false;
        return;
      }
      const disallowSelectedMouseUp = !selectionRef.current.allowSelectedMouseUp && selected;
      const disallowUnselectedMouseUp = !selectionRef.current.allowUnselectedMouseUp && !selected;
      if (disallowSelectedMouseUp || disallowUnselectedMouseUp || pointerTypeRef.current !== 'touch' && !highlighted) {
        return;
      }
      commitSelection(event.nativeEvent);
    }
  };
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    ref: [buttonRef, forwardedRef, listItem.ref, itemRef],
    state,
    props: [rootProps, defaultProps, elementProps, getButtonProps]
  });
  const contextValue = React.useMemo(() => ({
    selected,
    indexRef,
    textRef,
    selectedByFocus
  }), [selected, indexRef, textRef, selectedByFocus]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectItemContext.SelectItemContext.Provider, {
    value: contextValue,
    children: element
  });
}));
if (process.env.NODE_ENV !== "production") SelectItem.displayName = "SelectItem";