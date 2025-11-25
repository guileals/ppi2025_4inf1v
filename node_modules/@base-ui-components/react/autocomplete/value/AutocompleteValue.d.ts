import * as React from 'react';
/**
 * The current value of the autocomplete.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete)
 */
export declare function AutocompleteValue(props: AutocompleteValue.Props): React.ReactNode;
export declare namespace AutocompleteValue {
  interface Props {
    children?: React.ReactNode | ((value: string) => React.ReactNode);
  }
}