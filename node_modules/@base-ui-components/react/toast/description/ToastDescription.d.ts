import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A description that describes the toast.
 * Can be used as the default message for the toast when no title is provided.
 * Renders a `<p>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
export declare const ToastDescription: React.ForwardRefExoticComponent<ToastDescription.Props & React.RefAttributes<HTMLParagraphElement>>;
export declare namespace ToastDescription {
  interface State {
    /**
     * The type of the toast.
     */
    type: string | undefined;
  }
  interface Props extends BaseUIComponentProps<'p', State> {}
}