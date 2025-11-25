import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A title that labels the toast.
 * Renders an `<h2>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
export declare const ToastTitle: React.ForwardRefExoticComponent<ToastTitle.Props & React.RefAttributes<HTMLHeadingElement>>;
export declare namespace ToastTitle {
  interface State {
    /**
     * The type of the toast.
     */
    type: string | undefined;
  }
  interface Props extends BaseUIComponentProps<'h2', State> {}
}