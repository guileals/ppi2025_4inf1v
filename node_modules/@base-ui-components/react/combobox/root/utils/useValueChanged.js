"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useValueChanged = useValueChanged;
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
function useValueChanged(valueRef, value, onChangeParam) {
  const onChange = (0, _useEventCallback.useEventCallback)(onChangeParam);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (valueRef.current === value) {
      return;
    }
    onChange(valueRef.current);
  }, [valueRef, value, onChange]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    valueRef.current = value;
  }, [valueRef, value]);
}