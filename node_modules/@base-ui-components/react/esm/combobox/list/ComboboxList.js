'use client';

import * as React from 'react';
import { useStore } from '@base-ui-components/utils/store';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useComboboxFloatingContext, useComboboxRootContext } from "../root/ComboboxRootContext.js";
import { useComboboxPositionerContext } from "../positioner/ComboboxPositionerContext.js";
import { selectors } from "../store.js";
import { ComboboxCollection } from "../collection/ComboboxCollection.js";
import { stopEvent } from "../../floating-ui-react/utils.js";

/**
 * A list container for the items.
 * Renders a `<div>` element.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const ComboboxList = /*#__PURE__*/React.forwardRef(function ComboboxList(componentProps, forwardedRef) {
  var _ComboboxCollection;
  const {
    render,
    className,
    children,
    ...elementProps
  } = componentProps;
  const store = useComboboxRootContext();
  const floatingRootContext = useComboboxFloatingContext();
  const hasPositionerContext = Boolean(useComboboxPositionerContext(true));
  const selectionMode = useStore(store, selectors.selectionMode);
  const cols = useStore(store, selectors.cols);
  const popupRef = useStore(store, selectors.popupRef);
  const popupProps = useStore(store, selectors.popupProps);
  const multiple = selectionMode === 'multiple';
  const setPositionerElement = useEventCallback(element => {
    store.set('positionerElement', element);
  });
  const setListElement = useEventCallback(element => {
    store.set('listElement', element);
  });
  useIsoLayoutEffect(() => {
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
      return _ComboboxCollection || (_ComboboxCollection = /*#__PURE__*/_jsx(ComboboxCollection, {
        children: children
      }));
    }
    return children;
  }, [children]);
  return useRenderElement('div', componentProps, {
    ref: [forwardedRef, setListElement, hasPositionerContext ? null : setPositionerElement],
    props: [popupProps, {
      children: resolvedChildren,
      tabIndex: -1,
      id: floatingRootContext.floatingId,
      role: cols > 1 ? 'grid' : 'listbox',
      'aria-multiselectable': multiple ? 'true' : undefined,
      onKeyDown(event) {
        if (event.key === 'Enter') {
          stopEvent(event);
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