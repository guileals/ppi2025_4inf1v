import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { TabsRoot } from "../root/TabsRoot.js";
import type { TabsTab } from "../tab/TabsTab.js";
/**
 * A panel displayed when the corresponding tab is active.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export declare const TabsPanel: React.ForwardRefExoticComponent<TabsPanel.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace TabsPanel {
  interface Metadata {
    id?: string;
    value: TabsTab.Value;
  }
  interface State extends TabsRoot.State {
    hidden: boolean;
  }
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
     * If not provided, it will fall back to the index of the panel.
     * It is recommended to explicitly provide it, as it's required for the tab panel to be rendered on the server.
     */
    value?: TabsTab.Value;
    /**
     * Whether to keep the HTML element in the DOM while the panel is hidden.
     * @default false
     */
    keepMounted?: boolean;
  }
}