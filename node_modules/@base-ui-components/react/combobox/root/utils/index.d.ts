import type { Filter } from "./useFilter.js";
export interface Group<Item = any> {
  value: unknown;
  items: Item[];
}
export declare function isGroupedItems(items: (any | Group<any>)[] | undefined): items is Group<any>[];
export declare function stringifyItem(item: any | null | undefined, itemToStringLabel?: (item: any) => string): string;
/**
 * Converts an item into a string suitable for value serialization (e.g., form submission).
 * Prefers:
 * - itemToStringValue when provided
 * - object's `value` when the item looks like { value, label, ... }
 * - serializeValue fallback for all other cases
 */
export declare function stringifyItemValue(item: any | null | undefined, itemToStringValue?: (item: any) => string): string;
/**
 * Enhanced filter using Intl.Collator for more robust string matching.
 * Uses the provided `itemToStringLabel` function if available, otherwise falls back to:
 * • When `item` is an object with a `value` property, that property is used.
 * • When `item` is a primitive (e.g. `string`), it is used directly.
 */
export declare function createCollatorItemFilter(collatorFilter: Filter, itemToStringLabel?: (item: any) => string): (item: any, query: string) => boolean;
/**
 * Enhanced filter for single selection mode using Intl.Collator that shows all items
 * when query is empty or matches the current selection, making it easier to browse options.
 */
export declare function createSingleSelectionCollatorFilter(collatorFilter: Filter, itemToStringLabel?: (item: any) => string, selectedValue?: any): (item: any, query: string) => boolean;