import * as React from 'react';
import { type BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import type { BaseUIChangeEventReason } from "../../utils/types.js";
import { type Group } from "./utils/index.js";
/**
 * @internal
 */
export declare function ComboboxRootInternal<Value, Mode extends SelectionMode = 'none'>(props: Omit<ComboboxRootConditionalProps<Value, Mode>, 'items'> & {
  items: Group<Value>[];
}): React.JSX.Element;
export declare function ComboboxRootInternal<Value, Mode extends SelectionMode = 'none'>(props: Omit<ComboboxRootConditionalProps<Value, Mode>, 'items'> & {
  items?: Value[];
}): React.JSX.Element;
type SelectionMode = 'single' | 'multiple' | 'none';
type ComboboxItemValueType<ItemValue, Mode extends SelectionMode> = Mode extends 'multiple' ? ItemValue[] : ItemValue;
interface ComboboxRootProps<ItemValue> {
  children?: React.ReactNode;
  /**
   * Identifies the field when a form is submitted.
   */
  name?: string;
  /**
   * The id of the component.
   */
  id?: string;
  /**
   * Whether the user must choose a value before submitting a form.
   * @default false
   */
  required?: boolean;
  /**
   * Whether the user should be unable to choose a different option from the popup.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the popup is initially open.
   *
   * To render a controlled popup, use the `open` prop instead.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Whether the popup is currently open.
   */
  open?: boolean;
  /**
   * Event handler called when the popup is opened or closed.
   */
  onOpenChange?: (open: boolean, eventDetails: ComboboxRootInternal.ChangeEventDetails) => void;
  /**
   * Event handler called after any animations complete when the popup is opened or closed.
   */
  onOpenChangeComplete?: (open: boolean) => void;
  /**
   * Whether the popup opens when clicking the input.
   * @default true
   */
  openOnInputClick?: boolean;
  /**
   * Whether to automatically highlight the first item when the popup opens.
   * @default false
   */
  autoHighlight?: boolean;
  /**
   * The input value of the combobox.
   */
  inputValue?: React.ComponentProps<'input'>['value'];
  /**
   * Callback fired when the input value of the combobox changes.
   */
  onInputValueChange?: (value: string, eventDetails: ComboboxRootInternal.ChangeEventDetails) => void;
  /**
   * The uncontrolled input value when initially rendered.
   */
  defaultInputValue?: React.ComponentProps<'input'>['defaultValue'];
  /**
   * A ref to imperative actions.
   * - `unmount`: When specified, the combobox will not be unmounted when closed.
   * Instead, the `unmount` function must be called to unmount the combobox manually.
   * Useful when the combobox's animation is controlled by an external library.
   */
  actionsRef?: React.RefObject<ComboboxRootInternal.Actions>;
  /**
   * Callback fired when the user navigates the list and highlights an item.
   * Passes the item and the type of navigation or `undefined` when no item is highlighted.
   * - `keyboard`: The item was highlighted via keyboard navigation.
   * - `pointer`: The item was highlighted via pointer navigation.
   * - `none`: The item was highlighted via programmatic navigation.
   */
  onItemHighlighted?: (itemValue: ItemValue | undefined, data: {
    type: 'keyboard' | 'pointer' | 'none';
    index: number;
  }) => void;
  /**
   * A ref to the hidden input element.
   */
  inputRef?: React.RefObject<HTMLInputElement>;
  /**
   * The maximum number of columns present when the items are rendered in grid layout.
   * A value of more than `1` turns the listbox into a grid.
   * @default 1
   */
  cols?: number;
  /**
   * The items to be displayed in the list.
   * Can be either a flat array of items or an array of groups with items.
   */
  items?: ItemValue[] | Group<ItemValue>[];
  /**
   * Filter function used to match items vs input query.
   * The `itemToStringLabel` function is provided to help convert items to strings for comparison.
   */
  filter?: null | ((itemValue: ItemValue, query: string, itemToStringLabel?: (itemValue: ItemValue) => string) => boolean);
  /**
   * When items' values are objects, converts its value to a string label for display.
   */
  itemToStringLabel?: (itemValue: ItemValue) => string;
  /**
   * When items' values are objects, converts its value to a string value for form submission.
   */
  itemToStringValue?: (itemValue: ItemValue) => string;
  /**
   * Whether the items are being externally virtualized.
   * @default false
   */
  virtualized?: boolean;
  /**
   * Determines if the popup enters a modal state when open.
   * - `true`: user interaction is limited to the popup: document page scroll is locked and pointer interactions on outside elements are disabled.
   * - `false`: user interaction with the rest of the document is allowed.
   * @default false
   */
  modal?: boolean;
  /**
   * The maximum number of items to display in the list.
   * @default -1
   */
  limit?: number;
  /**
   * Controls how the component behaves with respect to list filtering and inline autocompletion.
   * - `list` (default): items are dynamically filtered based on the input value. The input value does not change based on the active item.
   * - `both`: items are dynamically filtered based on the input value, which will temporarily change based on the active item (inline autocompletion).
   * - `inline`: items are static (not filtered), and the input value will temporarily change based on the active item (inline autocompletion).
   * - `none`: items are static (not filtered), and the input value will not change based on the active item.
   * @default 'list'
   */
  autoComplete?: 'list' | 'both' | 'inline' | 'none';
  /**
   * The locale to use for string comparison.
   * Defaults to the user's runtime locale.
   */
  locale?: Intl.LocalesArgument;
  /**
   * INTERNAL: Clears the input value after close animation completes.
   * Useful for wrappers like FilterableMenu so they don't need to reset externally.
   * @default false
   */
  clearInputOnCloseComplete?: boolean;
  /**
   * INTERNAL: When `selectionMode` is `none`, controls whether selecting an item fills the input.
   */
  fillInputOnItemPress?: boolean;
}
export type ComboboxRootConditionalProps<Value, Mode extends SelectionMode = 'none'> = Omit<ComboboxRootProps<Value>, 'selectionMode' | 'selectedValue' | 'defaultSelectedValue' | 'onSelectedValueChange'> & {
  /**
   * How the combobox should remember the selected value.
   * - `single`: Remembers the last selected value.
   * - `multiple`: Remember all selected values.
   * - `none`: Do not remember the selected value.
   * @default 'none'
   */
  selectionMode?: Mode;
  /**
   * The selected value of the combobox. Use when controlled.
   */
  selectedValue?: ComboboxItemValueType<Value, Mode>;
  /**
   * The uncontrolled selected value of the combobox when it's initially rendered.
   *
   * To render a controlled combobox, use the `selectedValue` prop instead.
   */
  defaultSelectedValue?: ComboboxItemValueType<Value, Mode> | null;
  /**
   * Callback fired when the selected value of the combobox changes.
   */
  onSelectedValueChange?: (value: ComboboxItemValueType<Value, Mode>, eventDetails: ComboboxRootInternal.ChangeEventDetails) => void;
};
export declare namespace ComboboxRootInternal {
  type Props<Value, Mode extends SelectionMode = 'none'> = ComboboxRootConditionalProps<Value, Mode>;
  interface State {}
  interface Actions {
    unmount: () => void;
  }
  type ChangeEventReason = BaseUIChangeEventReason | 'input-change' | 'input-clear' | 'clear-press' | 'chip-remove-press';
  type ChangeEventDetails = BaseUIEventDetails<ChangeEventReason>;
}
export {};