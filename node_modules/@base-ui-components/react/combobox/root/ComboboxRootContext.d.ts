import * as React from 'react';
import { ComboboxStore } from "../store.js";
import type { FloatingRootContext } from "../../floating-ui-react/index.js";
export interface ComboboxDerivedItemsContext {
  query: string;
  filteredItems: any[];
  flatFilteredItems: any[];
}
export declare const ComboboxRootContext: React.Context<ComboboxStore | undefined>;
export declare const ComboboxFloatingContext: React.Context<FloatingRootContext<import("../../floating-ui-react/index.js").ReferenceType> | undefined>;
export declare const ComboboxDerivedItemsContext: React.Context<ComboboxDerivedItemsContext | undefined>;
export declare function useComboboxRootContext(): ComboboxStore;
export declare function useComboboxFloatingContext(): FloatingRootContext<import("../../floating-ui-react/index.js").ReferenceType>;
export declare function useComboboxDerivedItemsContext(): ComboboxDerivedItemsContext;