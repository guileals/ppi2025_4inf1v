"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLatestRef = useLatestRef;
var _useIsoLayoutEffect = require("./useIsoLayoutEffect");
var _useRefWithInit = require("./useRefWithInit");
function useLatestRef(value) {
  const latest = (0, _useRefWithInit.useRefWithInit)(createLatestRef, value).current;
  latest.next = value;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(latest.effect);
  return latest;
}
function createLatestRef(value) {
  const latest = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next;
    }
  };
  return latest;
}