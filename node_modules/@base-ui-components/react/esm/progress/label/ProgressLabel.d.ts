import * as React from 'react';
import type { ProgressRoot } from "../root/ProgressRoot.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An accessible label for the progress bar.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
 */
export declare const ProgressLabel: React.ForwardRefExoticComponent<ProgressLabel.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace ProgressLabel {
  interface Props extends BaseUIComponentProps<'span', ProgressRoot.State> {}
}