import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A heading that labels the dialog.
 * Renders an `<h2>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
export declare const AlertDialogTitle: React.ForwardRefExoticComponent<AlertDialogTitle.Props & React.RefAttributes<HTMLParagraphElement>>;
export declare namespace AlertDialogTitle {
  interface Props extends BaseUIComponentProps<'h2', State> {}
  interface State {}
}