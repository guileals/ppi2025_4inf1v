import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
/**
 * A button that closes the popover.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
export declare const PopoverClose: React.ForwardRefExoticComponent<PopoverClose.Props & React.RefAttributes<HTMLButtonElement>>;
export declare namespace PopoverClose {
  interface State {}
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {}
}