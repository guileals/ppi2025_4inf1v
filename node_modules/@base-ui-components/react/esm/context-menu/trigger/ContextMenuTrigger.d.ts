import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An area that opens the menu on right click or long press.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Context Menu](https://base-ui.com/react/components/context-menu)
 */
export declare const ContextMenuTrigger: React.ForwardRefExoticComponent<ContextMenuTrigger.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace ContextMenuTrigger {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {}
}