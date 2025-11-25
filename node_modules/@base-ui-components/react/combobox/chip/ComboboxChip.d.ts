import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An individual chip that represents a value in a multiselectable input.
 * Renders a `<div>` element.
 */
export declare const ComboboxChip: React.ForwardRefExoticComponent<ComboboxChip.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ComboboxChip {
  interface State {
    /**
     * Whether the component should ignore user interaction.
     */
    disabled: boolean;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}