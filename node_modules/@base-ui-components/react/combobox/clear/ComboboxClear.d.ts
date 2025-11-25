import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
import { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * Clears the value when clicked.
 * Renders a `<button>` element.
 */
export declare const ComboboxClear: React.ForwardRefExoticComponent<ComboboxClear.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace ComboboxClear {
  interface State {
    /**
     * Whether the popup is open.
     */
    open: boolean;
    /**
     * Whether the component should ignore user interaction.
     */
    disabled: boolean;
    transitionStatus: TransitionStatus;
  }
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the component should remain mounted in the DOM when not visible.
     * @default false
     */
    keepMounted?: boolean;
  }
}