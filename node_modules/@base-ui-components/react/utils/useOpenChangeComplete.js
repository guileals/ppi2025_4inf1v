"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOpenChangeComplete = useOpenChangeComplete;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _useAnimationsFinished = require("./useAnimationsFinished");
/**
 * Calls the provided function when the CSS open/close animation or transition completes.
 */
function useOpenChangeComplete(parameters) {
  const {
    enabled = true,
    open,
    ref,
    onComplete: onCompleteParam
  } = parameters;
  const openRef = (0, _useLatestRef.useLatestRef)(open);
  const onComplete = (0, _useEventCallback.useEventCallback)(onCompleteParam);
  const runOnceAnimationsFinish = (0, _useAnimationsFinished.useAnimationsFinished)(ref, open);
  React.useEffect(() => {
    if (!enabled) {
      return;
    }
    runOnceAnimationsFinish(() => {
      if (open === openRef.current) {
        onComplete();
      }
    });
  }, [enabled, open, onComplete, runOnceAnimationsFinish, openRef]);
}