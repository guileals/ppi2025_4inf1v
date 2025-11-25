interface FilterOptions extends Intl.CollatorOptions {
  /**
   * The locale to use for string comparison.
   * Defaults to the user's runtime locale.
   */
  locale?: Intl.LocalesArgument;
}
export interface Filter {
  contains: (item: any, query: string) => boolean;
  startsWith: (item: any, query: string) => boolean;
  endsWith: (item: any, query: string) => boolean;
}
declare function getFilter(options?: FilterOptions): Filter;
/**
 * Matches items against a query using `Intl.Collator` for robust string matching.
 */
export declare const useCoreFilter: typeof getFilter;
export type UseComboboxFilterOptions = FilterOptions & {
  /**
   * Whether the combobox is in multiple selection mode.
   * @default false
   */
  multiple?: boolean;
  /**
   * The current value of the combobox.
   */
  value?: any;
};
/**
 * Matches items against a query using `Intl.Collator` for robust string matching.
 */
export declare function useComboboxFilter(options?: UseComboboxFilterOptions): Filter;
export {};