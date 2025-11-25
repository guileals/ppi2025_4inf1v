import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
/**
 * A button that opens the popover.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
export declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverTrigger.Props & React.RefAttributes<any>>;
export declare namespace PopoverTrigger {
  interface State {
    /**
     * Whether the popover is currently disabled.
     */
    disabled: boolean;
    /**
     * Whether the popover is currently open.
     */
    open: boolean;
  }
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {}
}