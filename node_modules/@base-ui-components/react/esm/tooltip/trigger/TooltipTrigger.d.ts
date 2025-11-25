import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An element to attach the tooltip to.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */
export declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipTrigger.Props & React.RefAttributes<any>>;
export declare namespace TooltipTrigger {
  interface State {
    /**
     * Whether the tooltip is currently open.
     */
    open: boolean;
  }
  interface Props extends BaseUIComponentProps<'button', State> {}
}