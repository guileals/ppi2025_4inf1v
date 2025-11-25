import type { ReferenceType, UseFloatingOptions, UseFloatingReturn } from "../types.js";
/**
 * Provides data to position a floating element and context to add interactions.
 * @see https://floating-ui.com/docs/useFloating
 */
export declare function useFloating<RT extends ReferenceType = ReferenceType>(options?: UseFloatingOptions): UseFloatingReturn<RT>;