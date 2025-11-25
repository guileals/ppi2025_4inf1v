"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleGroup = void 0;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useRenderElement = require("../utils/useRenderElement");
var _CompositeRoot = require("../composite/root/CompositeRoot");
var _ToolbarRootContext = require("../toolbar/root/ToolbarRootContext");
var _ToggleGroupContext = require("./ToggleGroupContext");
var _ToggleGroupDataAttributes = require("./ToggleGroupDataAttributes");
var _createBaseUIEventDetails = require("../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
const customStyleHookMapping = {
  multiple(value) {
    if (value) {
      return {
        [_ToggleGroupDataAttributes.ToggleGroupDataAttributes.multiple]: ''
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
const ToggleGroup = exports.ToggleGroup = /*#__PURE__*/React.forwardRef(function ToggleGroup(componentProps, forwardedRef) {
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
  const toolbarContext = (0, _ToolbarRootContext.useToolbarRootContext)(true);
  const defaultValue = React.useMemo(() => {
    if (valueProp === undefined) {
      return defaultValueProp ?? [];
    }
    return undefined;
  }, [valueProp, defaultValueProp]);
  const disabled = (toolbarContext?.disabled ?? false) || disabledProp;
  const [groupValue, setValueState] = (0, _useControlled.useControlled)({
    controlled: valueProp,
    default: defaultValue,
    name: 'ToggleGroup',
    state: 'value'
  });
  const setGroupValue = (0, _useEventCallback.useEventCallback)((newValue, nextPressed, event) => {
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
      const details = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event);
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
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    enabled: Boolean(toolbarContext),
    state,
    ref: forwardedRef,
    props: [defaultProps, elementProps],
    customStyleHookMapping
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleGroupContext.ToggleGroupContext.Provider, {
    value: contextValue,
    children: toolbarContext ? element : /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeRoot.CompositeRoot, {
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