import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Groups all parts of the scroll area.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
export declare const ScrollAreaRoot: React.ForwardRefExoticComponent<ScrollAreaRoot.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ScrollAreaRoot {
  interface Props extends BaseUIComponentProps<'div', State> {}
  interface State {}
}