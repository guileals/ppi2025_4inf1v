'use client';

import * as React from 'react';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { useLatestRef } from '@base-ui-components/utils/useLatestRef';
import { isMouseWithinBounds } from '@base-ui-components/utils/isMouseWithinBounds';
import { useTimeout } from '@base-ui-components/utils/useTimeout';
import { useStore } from '@base-ui-components/utils/store';
import { useSelectRootContext } from "../root/SelectRootContext.js";
import { useCompositeListItem, IndexGuessBehavior } from "../../composite/list/useCompositeListItem.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { SelectItemContext } from "./SelectItemContext.js";
import { selectors } from "../store.js";
import { useButton } from "../../use-button/index.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";

/**
 * An individual option in the select menu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const SelectItem = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function SelectItem(componentProps, forwardedRef) {
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
  const listItem = useCompositeListItem({
    label,
    textRef,
    indexGuessBehavior: IndexGuessBehavior.GuessFromOrder
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
  } = useSelectRootContext();
  const highlightTimeout = useTimeout();
  const highlighted = useStore(store, selectors.isActive, listItem.index);
  const selected = useStore(store, selectors.isSelected, listItem.index, value);
  const rootValue = useStore(store, selectors.value);
  const selectedByFocus = useStore(store, selectors.isSelectedByFocus, listItem.index);
  const itemRef = React.useRef(null);
  const indexRef = useLatestRef(listItem.index);
  const hasRegistered = listItem.index !== -1;
  useIsoLayoutEffect(() => {
    if (!hasRegistered) {
      return undefined;
    }
    const values = valuesRef.current;
    values[listItem.index] = value;
    return () => {
      delete values[listItem.index];
    };
  }, [hasRegistered, listItem.index, value, valuesRef]);
  useIsoLayoutEffect(() => {
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
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton
  });
  function commitSelection(event) {
    if (multiple) {
      const currentValue = Array.isArray(rootValue) ? rootValue : [];
      const nextValue = selected ? currentValue.filter(v => v !== value) : [...currentValue, value];
      setValue(nextValue, createBaseUIEventDetails('none', event));
    } else {
      setValue(value, createBaseUIEventDetails('none', event));
      setOpen(false, createBaseUIEventDetails('item-press', event));
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
      if (keyboardActiveRef.current || isMouseWithinBounds(event)) {
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
  const element = useRenderElement('div', componentProps, {
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
  return /*#__PURE__*/_jsx(SelectItemContext.Provider, {
    value: contextValue,
    children: element
  });
}));
if (process.env.NODE_ENV !== "production") SelectItem.displayName = "SelectItem";