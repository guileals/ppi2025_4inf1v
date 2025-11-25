import * as React from 'react';
import type { BaseUIComponentProps, Orientation } from "../utils/types.js";
/**
 * A separator element accessible to screen readers.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Separator](https://base-ui.com/react/components/separator)
 */
export declare const Separator: React.ForwardRefExoticComponent<Separator.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace Separator {
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * The orientation of the separator.
     * @default 'horizontal'
     */
    orientation?: Orientation;
  }
  interface State {
    /**
     * The orientation of the separator.
     */
    orientation: Orientation;
  }
}