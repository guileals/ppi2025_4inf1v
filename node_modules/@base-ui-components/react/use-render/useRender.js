"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRender = useRender;
var _useRenderElement = require("../utils/useRenderElement");
/**
 * Renders a Base UI element.
 *
 * @public
 */
function useRender(params) {
  const renderParams = params;
  renderParams.customStyleHookMapping = renderParams.stateAttributesMapping;
  return (0, _useRenderElement.useRenderElement)(renderParams.defaultTagName, renderParams, renderParams);
}