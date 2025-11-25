"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldLabel = void 0;
var React = _interopRequireWildcard(require("react"));
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _utils = require("../../floating-ui-react/utils");
var _FieldRootContext = require("../root/FieldRootContext");
var _constants = require("../utils/constants");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _useRenderElement = require("../../utils/useRenderElement");
/**
 * An accessible label that is automatically associated with the field control.
 * Renders a `<label>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */
const FieldLabel = exports.FieldLabel = /*#__PURE__*/React.forwardRef(function FieldLabel(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    labelId,
    setLabelId,
    state,
    controlId
  } = (0, _FieldRootContext.useFieldRootContext)(false);
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  const htmlFor = controlId ?? undefined;
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (controlId != null || idProp) {
      setLabelId(id);
    }
    return () => {
      setLabelId(undefined);
    };
  }, [controlId, id, idProp, setLabelId]);
  const element = (0, _useRenderElement.useRenderElement)('label', componentProps, {
    ref: forwardedRef,
    state,
    props: [{
      id: labelId,
      htmlFor,
      onMouseDown(event) {
        const target = (0, _utils.getTarget)(event.nativeEvent);
        if (target?.closest('button,input,select,textarea')) {
          return;
        }

        // Prevent text selection when double clicking label.
        if (!event.defaultPrevented && event.detail > 1) {
          event.preventDefault();
        }
      }
    }, elementProps],
    customStyleHookMapping: _constants.fieldValidityMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") FieldLabel.displayName = "FieldLabel";