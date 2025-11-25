import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * The draggable part of the the scrollbar that indicates the current scroll position.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
export declare const ScrollAreaThumb: React.ForwardRefExoticComponent<ScrollAreaThumb.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ScrollAreaThumb {
  interface State {
    orientation?: 'horizontal' | 'vertical';
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}