import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { TabsRoot } from "../root/TabsRoot.js";
import type { TabsTab } from "../tab/TabsTab.js";
/**
 * A visual indicator that can be styled to match the position of the currently active tab.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export declare const TabsIndicator: React.ForwardRefExoticComponent<TabsIndicator.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace TabsIndicator {
  interface State extends TabsRoot.State {
    selectedTabPosition: TabsTab.Position | null;
    selectedTabSize: TabsTab.Size | null;
    orientation: TabsRoot.Orientation;
  }
  interface Props extends BaseUIComponentProps<'span', State> {
    /**
     * Whether to render itself before React hydrates.
     * This minimizes the time that the indicator isn’t visible after server-side rendering.
     * @default false
     */
    renderBeforeHydration?: boolean;
  }
}