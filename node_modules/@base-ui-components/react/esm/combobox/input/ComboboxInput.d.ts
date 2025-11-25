import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import type { FieldRoot } from "../../field/root/FieldRoot.js";
/**
 * A text input to search for items in the list.
 * Renders an `<input>` element.
 */
export declare const ComboboxInput: React.ForwardRefExoticComponent<ComboboxInput.Props & React.RefAttributes<HTMLInputElement>>;
export declare namespace ComboboxInput {
  interface State extends FieldRoot.State {
    /**
     * Whether the popup is open.
     */
    open: boolean;
  }
  interface Props extends BaseUIComponentProps<'input', State> {
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: boolean;
  }
}