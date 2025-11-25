import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An icon that indicates that the trigger button opens a select menu.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectIcon: React.ForwardRefExoticComponent<SelectIcon.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace SelectIcon {
  interface State {}
  interface Props extends BaseUIComponentProps<'span', State> {}
}