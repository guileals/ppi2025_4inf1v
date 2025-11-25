import * as React from 'react';
import { FieldRoot } from "../root/FieldRoot.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A paragraph with additional information about the field.
 * Renders a `<p>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */
export declare const FieldDescription: React.ForwardRefExoticComponent<FieldDescription.Props & React.RefAttributes<HTMLParagraphElement>>;
export declare namespace FieldDescription {
  type State = FieldRoot.State;
  interface Props extends BaseUIComponentProps<'p', State> {}
}