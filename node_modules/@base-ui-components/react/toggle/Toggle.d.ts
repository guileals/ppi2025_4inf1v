import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../utils/types.js";
import { BaseUIEventDetails } from "../utils/createBaseUIEventDetails.js";
/**
 * A two-state button that can be on or off.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Toggle](https://base-ui.com/react/components/toggle)
 */
export declare const Toggle: React.ForwardRefExoticComponent<Toggle.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace Toggle {
  interface State {
    /**
     * Whether the toggle is currently pressed.
     */
    pressed: boolean;
    /**
     * Whether the toggle should ignore user interaction.
     */
    disabled: boolean;
  }
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {
    /**
     * Whether the toggle button is currently pressed.
     * This is the controlled counterpart of `defaultPressed`.
     */
    pressed?: boolean;
    /**
     * Whether the toggle button is currently pressed.
     * This is the uncontrolled counterpart of `pressed`.
     * @default false
     */
    defaultPressed?: boolean;
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: boolean;
    /**
     * Callback fired when the pressed state is changed.
     *
     * @param {boolean} pressed The new pressed state.
     * @param {Event} event The corresponding event that initiated the change.
     */
    onPressedChange?: (pressed: boolean, eventDetails: ChangeEventDetails) => void;
    /**
     * A unique string that identifies the toggle when used
     * inside a toggle group.
     */
    value?: string;
  }
  type ChangeEventReason = 'none';
  type ChangeEventDetails = BaseUIEventDetails<ChangeEventReason>;
}