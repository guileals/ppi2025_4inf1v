import * as React from 'react';
/**
 * The current value of the combobox.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
export declare function ComboboxValue(props: ComboboxValue.Props): any;
export declare namespace ComboboxValue {
  interface State {}
  interface Props {
    children?: React.ReactNode | ((selectedValue: any) => React.ReactNode);
  }
}