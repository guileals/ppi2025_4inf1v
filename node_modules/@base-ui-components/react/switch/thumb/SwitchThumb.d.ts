import * as React from 'react';
import type { SwitchRoot } from "../root/SwitchRoot.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * The movable part of the switch that indicates whether the switch is on or off.
 * Renders a `<span>`.
 *
 * Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
 */
export declare const SwitchThumb: React.ForwardRefExoticComponent<SwitchThumb.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace SwitchThumb {
  interface Props extends BaseUIComponentProps<'span', State> {}
  interface State extends SwitchRoot.State {}
}