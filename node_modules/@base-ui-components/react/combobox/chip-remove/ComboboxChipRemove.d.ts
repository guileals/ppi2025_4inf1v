import * as React from 'react';
import { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
/**
 * A button to remove a chip.
 * Renders a `<button>` element.
 */
export declare const ComboboxChipRemove: React.ForwardRefExoticComponent<ComboboxChipRemove.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace ComboboxChipRemove {
  interface State {
    /**
     * Whether the component should ignore user interaction.
     */
    disabled: boolean;
  }
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {}
}