import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A paragraph with additional information about the dialog.
 * Renders a `<p>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
export declare const DialogDescription: React.ForwardRefExoticComponent<DialogDescription.Props & React.RefAttributes<HTMLParagraphElement>>;
export declare namespace DialogDescription {
  interface Props extends BaseUIComponentProps<'p', State> {}
  interface State {}
}