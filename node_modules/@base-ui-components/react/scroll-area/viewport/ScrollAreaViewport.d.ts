import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * The actual scrollable container of the scroll area.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
export declare const ScrollAreaViewport: React.ForwardRefExoticComponent<ScrollAreaViewport.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ScrollAreaViewport {
  interface Props extends BaseUIComponentProps<'div', State> {}
  interface State {}
}