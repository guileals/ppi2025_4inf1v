import * as React from 'react';
import type { ProgressRoot } from "../root/ProgressRoot.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Contains the progress bar indicator.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
 */
export declare const ProgressTrack: React.ForwardRefExoticComponent<ProgressTrack.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ProgressTrack {
  interface Props extends BaseUIComponentProps<'div', ProgressRoot.State> {}
}