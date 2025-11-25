"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDialogPopup = useDialogPopup;
var React = _interopRequireWildcard(require("react"));
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _composite = require("../../composite/composite");
function useDialogPopup(parameters) {
  const {
    descriptionElementId,
    mounted,
    ref,
    setPopupElement,
    titleElementId
  } = parameters;
  const popupRef = React.useRef(null);
  const handleRef = (0, _useMergedRefs.useMergedRefs)(ref, popupRef, setPopupElement);
  const popupProps = {
    'aria-labelledby': titleElementId ?? undefined,
    'aria-describedby': descriptionElementId ?? undefined,
    role: 'dialog',
    tabIndex: -1,
    ref: handleRef,
    hidden: !mounted,
    onKeyDown(event) {
      if (_composite.COMPOSITE_KEYS.has(event.key)) {
        event.stopPropagation();
      }
    }
  };
  return {
    popupProps
  };
}