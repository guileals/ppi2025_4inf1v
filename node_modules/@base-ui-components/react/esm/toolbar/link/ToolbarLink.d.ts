import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import type { ToolbarRoot } from "../root/ToolbarRoot.js";
/**
 * A link component.
 * Renders an `<a>` element.
 *
 * Documentation: [Base UI Toolbar](https://base-ui.com/react/components/toolbar)
 */
export declare const ToolbarLink: React.ForwardRefExoticComponent<ToolbarLink.Props & React.RefAttributes<HTMLAnchorElement>>;
export declare namespace ToolbarLink {
  interface State {
    orientation: ToolbarRoot.Orientation;
  }
  interface Props extends BaseUIComponentProps<'a', State> {}
}