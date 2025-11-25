import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A small rectangular area that appears at the intersection of horizontal and vertical scrollbars.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
export declare const ScrollAreaCorner: React.ForwardRefExoticComponent<ScrollAreaCorner.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ScrollAreaCorner {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}