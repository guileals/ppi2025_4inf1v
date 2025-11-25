import * as React from 'react';
import type { MeterRoot } from "../root/MeterRoot.js";
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An accessible label for the meter.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Meter](https://base-ui.com/react/components/meter)
 */
export declare const MeterLabel: React.ForwardRefExoticComponent<MeterLabel.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace MeterLabel {
  interface Props extends BaseUIComponentProps<'span', MeterRoot.State> {}
}