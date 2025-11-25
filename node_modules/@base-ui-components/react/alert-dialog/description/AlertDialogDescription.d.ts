import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A paragraph with additional information about the alert dialog.
 * Renders a `<p>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
export declare const AlertDialogDescription: React.ForwardRefExoticComponent<AlertDialogDescription.Props & React.RefAttributes<HTMLParagraphElement>>;
export declare namespace AlertDialogDescription {
  interface Props extends BaseUIComponentProps<'p', State> {}
  interface State {}
}