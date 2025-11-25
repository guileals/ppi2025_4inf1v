import * as React from 'react';
import { ComboboxRootInternal } from "../../combobox/root/ComboboxRootInternal.js";
import { type Group } from "../../combobox/root/utils/index.js";
/**
 * Groups all parts of the autocomplete.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete)
 */
export declare function AutocompleteRoot<Value>(props: Omit<AutocompleteRoot.Props<Value>, 'items'> & {
  items: Group<Value>[];
}): React.JSX.Element;
export declare function AutocompleteRoot<Value>(props: Omit<AutocompleteRoot.Props<Value>, 'items'> & {
  items?: Value[];
}): React.JSX.Element;
export declare namespace AutocompleteRoot {
  interface Props<ItemValue> extends Omit<ComboboxRootInternal.Props<ItemValue, 'none'>, 'selectionMode' | 'selectedValue' | 'defaultSelectedValue' | 'onSelectedValueChange' | 'fillInputOnItemPress' | 'clearInputOnCloseComplete' | 'itemToStringValue' | 'inputValue' | 'defaultInputValue' | 'onInputValueChange' | 'autoComplete' | 'itemToStringLabel' | 'actionsRef'> {
    /**
     * Controls how the autocomplete behaves with respect to list filtering and inline autocompletion.
     * - `list` (default): items are dynamically filtered based on the input value. The input value does not change based on the active item.
     * - `both`: items are dynamically filtered based on the input value, which will temporarily change based on the active item (inline autocompletion).
     * - `inline`: items are static (not filtered), and the input value will temporarily change based on the active item (inline autocompletion).
     * - `none`: items are static (not filtered), and the input value will not change based on the active item.
     * @default 'list'
     */
    mode?: 'list' | 'both' | 'inline' | 'none';
    /**
     * The uncontrolled input value of the autocomplete when it's initially rendered.
     *
     * To render a controlled autocomplete, use the `value` prop instead.
     */
    defaultValue?: ComboboxRootInternal.Props<React.ComponentProps<'input'>['defaultValue'], 'none'>['defaultInputValue'];
    /**
     * The input value of the autocomplete. Use when controlled.
     */
    value?: ComboboxRootInternal.Props<React.ComponentProps<'input'>['value'], 'none'>['inputValue'];
    /**
     * Callback fired when the input value of the autocomplete changes.
     */
    onValueChange?: (value: string, eventDetails: ChangeEventDetails) => void;
    /**
     * When items' values are objects, converts its value to a string representation for display in the input.
     */
    itemToStringValue?: (itemValue: ItemValue) => string;
    /**
     * A ref to imperative actions.
     * - `unmount`: When specified, the autocomplete will not be unmounted when closed.
     * Instead, the `unmount` function must be called to unmount the autocomplete manually.
     * Useful when the autocomplete's animation is controlled by an external library.
     */
    actionsRef?: React.RefObject<AutocompleteRoot.Actions>;
  }
  type State = ComboboxRootInternal.State;
  type Actions = ComboboxRootInternal.Actions;
  type ChangeEventReason = ComboboxRootInternal.ChangeEventReason;
  type ChangeEventDetails = ComboboxRootInternal.ChangeEventDetails;
}