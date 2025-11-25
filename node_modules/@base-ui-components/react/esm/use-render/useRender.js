import { useRenderElement } from "../utils/useRenderElement.js";
/**
 * Renders a Base UI element.
 *
 * @public
 */
export function useRender(params) {
  const renderParams = params;
  renderParams.customStyleHookMapping = renderParams.stateAttributesMapping;
  return useRenderElement(renderParams.defaultTagName, renderParams, renderParams);
}