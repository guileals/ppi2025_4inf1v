'use client';

import * as React from 'react';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useRenderElement } from "../utils/useRenderElement.js";
import { CompositeRoot } from "../composite/root/CompositeRoot.js";
import { useToolbarRootContext } from "../toolbar/root/ToolbarRootContext.js";
import { ToggleGroupContext } from "./ToggleGroupContext.js";
import { ToggleGroupDataAttributes } from "./ToggleGroupDataAttributes.js";
import { createBaseUIEventDetails } from "../utils/createBaseUIEventDetails.js";
import { jsx as _jsx } from "react/jsx-runtime";
const customStyleHookMapping = {
  multiple(value) {
    if (value) {
      return {
        [ToggleGroupDataAttributes.multiple]: ''
      };
    }
    return null;
  }
};

/**
 * Provides a shared state to a series of toggle buttons.
 *
 * Documentation: [Base UI Toggle Group](https://base-ui.com/react/components/toggle-group)
 */
export const ToggleGroup = /*#__PURE__*/React.forwardRef(function ToggleGroup(componentProps, forwardedRef) {
  const {
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    loop = true,
    onValueChange,
    orientation = 'horizontal',
    toggleMultiple = false,
    value: valueProp,
    className,
    render,
    ...elementProps
  } = componentProps;
  const toolbarContext = useToolbarRootContext(true);
  const defaultValue = React.useMemo(() => {
    if (valueProp === undefined) {
      return defaultValueProp ?? [];
    }
    return undefined;
  }, [valueProp, defaultValueProp]);
  const disabled = (toolbarContext?.disabled ?? false) || disabledProp;
  const [groupValue, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'ToggleGroup',
    state: 'value'
  });
  const setGroupValue = useEventCallback((newValue, nextPressed, event) => {
    let newGroupValue;
    if (toggleMultiple) {
      newGroupValue = groupValue.slice();
      if (nextPressed) {
        newGroupValue.push(newValue);
      } else {
        newGroupValue.splice(groupValue.indexOf(newValue), 1);
      }
    } else {
      newGroupValue = nextPressed ? [newValue] : [];
    }
    if (Array.isArray(newGroupValue)) {
      const details = createBaseUIEventDetails('none', event);
      onValueChange?.(newGroupValue, details);
      if (details.isCanceled) {
        return;
      }
      setValueState(newGroupValue);
    }
  });
  const state = React.useMemo(() => ({
    disabled,
    multiple: toggleMultiple,
    orientation
  }), [disabled, orientation, toggleMultiple]);
  const contextValue = React.useMemo(() => ({
    disabled,
    orientation,
    setGroupValue,
    value: groupValue
  }), [disabled, orientation, setGroupValue, groupValue]);
  const defaultProps = {
    role: 'group'
  };
  const element = useRenderElement('div', componentProps, {
    enabled: Boolean(toolbarContext),
    state,
    ref: forwardedRef,
    props: [defaultProps, elementProps],
    customStyleHookMapping
  });
  return /*#__PURE__*/_jsx(ToggleGroupContext.Provider, {
    value: contextValue,
    children: toolbarContext ? element : /*#__PURE__*/_jsx(CompositeRoot, {
      render: render,
      className: className,
      state: state,
      refs: [forwardedRef],
      props: [defaultProps, elementProps],
      customStyleHookMapping: customStyleHookMapping,
      loop: loop,
      stopEventPropagation: true
    })
  });
});
if (process.env.NODE_ENV !== "production") ToggleGroup.displayName = "ToggleGroup";