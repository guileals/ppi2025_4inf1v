"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDialogTitle = void 0;
var React = _interopRequireWildcard(require("react"));
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _AlertDialogRootContext = require("../root/AlertDialogRootContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _useBaseUiId = require("../../utils/useBaseUiId");
/**
 * A heading that labels the dialog.
 * Renders an `<h2>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
const AlertDialogTitle = exports.AlertDialogTitle = /*#__PURE__*/React.forwardRef(function AlertDialogTitle(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    setTitleElementId
  } = (0, _AlertDialogRootContext.useAlertDialogRootContext)();
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    setTitleElementId(id);
    return () => {
      setTitleElementId(undefined);
    };
  }, [id, setTitleElementId]);
  return (0, _useRenderElement.useRenderElement)('h2', componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
});
if (process.env.NODE_ENV !== "production") AlertDialogTitle.displayName = "AlertDialogTitle";