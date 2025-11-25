import * as React from 'react';
import type { MeterRoot } from "../root/MeterRoot.js";
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Contains the meter indicator and represents the entire range of the meter.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Meter](https://base-ui.com/react/components/meter)
 */
export declare const MeterTrack: React.ForwardRefExoticComponent<MeterTrack.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace MeterTrack {
  interface Props extends BaseUIComponentProps<'div', MeterRoot.State> {}
}