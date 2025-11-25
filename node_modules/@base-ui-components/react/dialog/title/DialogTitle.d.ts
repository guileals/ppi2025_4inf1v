import * as React from 'react';
import { type BaseUIComponentProps } from "../../utils/types.js";
/**
 * A heading that labels the dialog.
 * Renders an `<h2>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
export declare const DialogTitle: React.ForwardRefExoticComponent<DialogTitle.Props & React.RefAttributes<HTMLParagraphElement>>;
export declare namespace DialogTitle {
  interface Props extends BaseUIComponentProps<'h2', State> {}
  interface State {}
}