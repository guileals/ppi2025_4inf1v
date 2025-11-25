import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import type { TabsRoot } from "../root/TabsRoot.js";
/**
 * Groups the individual tab buttons.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export declare const TabsList: React.ForwardRefExoticComponent<TabsList.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace TabsList {
  interface State extends TabsRoot.State {}
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * Whether to automatically change the active tab on arrow key focus.
     * Otherwise, tabs will be activated using Enter or Spacebar key press.
     * @default true
     */
    activateOnFocus?: boolean;
    /**
     * Whether to loop keyboard focus back to the first item
     * when the end of the list is reached while using the arrow keys.
     * @default true
     */
    loop?: boolean;
  }
}