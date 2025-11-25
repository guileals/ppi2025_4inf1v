import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import type { MeterRoot } from "../root/MeterRoot.js";
/**
 * Visualizes the position of the value along the range.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Meter](https://base-ui.com/react/components/meter)
 */
export declare const MeterIndicator: React.ForwardRefExoticComponent<MeterIndicator.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace MeterIndicator {
  interface Props extends BaseUIComponentProps<'div', MeterRoot.State> {}
}