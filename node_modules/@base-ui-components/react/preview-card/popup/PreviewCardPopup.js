"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewCardPopup = void 0;
var React = _interopRequireWildcard(require("react"));
var _PreviewCardContext = require("../root/PreviewCardContext");
var _PreviewCardPositionerContext = require("../positioner/PreviewCardPositionerContext");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _styleHookMapping = require("../../utils/styleHookMapping");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _useRenderElement = require("../../utils/useRenderElement");
var _constants = require("../../utils/constants");
const customStyleHookMapping = {
  ..._popupStateMapping.popupStateMapping,
  ..._styleHookMapping.transitionStatusMapping
};

/**
 * A container for the preview card contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
 */
const PreviewCardPopup = exports.PreviewCardPopup = /*#__PURE__*/React.forwardRef(function PreviewCardPopup(componentProps, forwardedRef) {
  const {
    className,
    render,
    ...elementProps
  } = componentProps;
  const {
    open,
    transitionStatus,
    popupRef,
    onOpenChangeComplete,
    popupProps
  } = (0, _PreviewCardContext.usePreviewCardRootContext)();
  const {
    side,
    align
  } = (0, _PreviewCardPositionerContext.usePreviewCardPositionerContext)();
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        onOpenChangeComplete?.(true);
      }
    }
  });
  const state = React.useMemo(() => ({
    open,
    side,
    align,
    transitionStatus
  }), [open, side, align, transitionStatus]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    ref: [popupRef, forwardedRef],
    state,
    props: [popupProps, transitionStatus === 'starting' ? _constants.DISABLED_TRANSITIONS_STYLE : _constants.EMPTY_OBJECT, elementProps],
    customStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PreviewCardPopup.displayName = "PreviewCardPopup";