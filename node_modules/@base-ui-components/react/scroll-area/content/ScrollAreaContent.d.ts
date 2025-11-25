import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A container for the content of the scroll area.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
export declare const ScrollAreaContent: React.ForwardRefExoticComponent<ScrollAreaContent.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ScrollAreaContent {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}