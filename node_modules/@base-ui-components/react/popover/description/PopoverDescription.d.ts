import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A paragraph with additional information about the popover.
 * Renders a `<p>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
export declare const PopoverDescription: React.ForwardRefExoticComponent<PopoverDescription.Props & React.RefAttributes<HTMLParagraphElement>>;
export declare namespace PopoverDescription {
  interface State {}
  interface Props extends BaseUIComponentProps<'p', State> {}
}