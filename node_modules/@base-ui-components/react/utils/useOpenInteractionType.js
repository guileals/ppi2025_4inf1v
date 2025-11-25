"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOpenInteractionType = useOpenInteractionType;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useEnhancedClickHandler = require("@base-ui-components/utils/useEnhancedClickHandler");
/**
 * Determines the interaction type (keyboard, mouse, touch, etc.) that opened the component.
 *
 * @param open The open state of the component.
 */
function useOpenInteractionType(open) {
  const [openMethod, setOpenMethod] = React.useState(null);
  const handleTriggerClick = (0, _useEventCallback.useEventCallback)((_, interactionType) => {
    if (!open) {
      setOpenMethod(interactionType);
    }
  });
  const reset = (0, _useEventCallback.useEventCallback)(() => {
    setOpenMethod(null);
  });
  const {
    onClick,
    onPointerDown
  } = (0, _useEnhancedClickHandler.useEnhancedClickHandler)(handleTriggerClick);
  return React.useMemo(() => ({
    openMethod,
    reset,
    triggerProps: {
      onClick,
      onPointerDown
    }
  }), [openMethod, reset, onClick, onPointerDown]);
}