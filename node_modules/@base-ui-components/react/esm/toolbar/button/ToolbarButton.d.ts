import * as React from 'react';
import { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
import type { ToolbarRoot } from "../root/ToolbarRoot.js";
/**
 * A button that can be used as-is or as a trigger for other components.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Toolbar](https://base-ui.com/react/components/toolbar)
 */
export declare const ToolbarButton: React.ForwardRefExoticComponent<ToolbarButton.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace ToolbarButton {
  interface State extends ToolbarRoot.State {
    disabled: boolean;
    focusable: boolean;
  }
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', ToolbarRoot.State> {
    /**
     * When `true` the item is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * When `true` the item remains focuseable when disabled.
     * @default true
     */
    focusableWhenDisabled?: boolean;
  }
}