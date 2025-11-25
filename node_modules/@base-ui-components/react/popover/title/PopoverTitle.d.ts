import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A heading that labels the popover.
 * Renders an `<h2>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
export declare const PopoverTitle: React.ForwardRefExoticComponent<PopoverTitle.Props & React.RefAttributes<HTMLHeadingElement>>;
export declare namespace PopoverTitle {
  interface State {}
  interface Props extends BaseUIComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', State> {}
}