import * as React from 'react';
import type { BaseUIComponentProps, Orientation as BaseOrientation } from "../../utils/types.js";
import type { TabsTab } from "../tab/TabsTab.js";
import { BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
/**
 * Groups the tabs and the corresponding panels.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export declare const TabsRoot: React.ForwardRefExoticComponent<TabsRoot.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace TabsRoot {
  type Orientation = BaseOrientation;
  type State = {
    orientation: Orientation;
    tabActivationDirection: TabsTab.ActivationDirection;
  };
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * The value of the currently selected `Tab`. Use when the component is controlled.
     * When the value is `null`, no Tab will be selected.
     */
    value?: TabsTab.Value;
    /**
     * The default value. Use when the component is not controlled.
     * When the value is `null`, no Tab will be selected.
     * @default 0
     */
    defaultValue?: TabsTab.Value;
    /**
     * The component orientation (layout flow direction).
     * @default 'horizontal'
     */
    orientation?: Orientation;
    /**
     * Callback invoked when new value is being set.
     */
    onValueChange?: (value: TabsTab.Value, eventDetails: ChangeEventDetails) => void;
  }
  type ChangeEventReason = 'none';
  type ChangeEventDetails = BaseUIEventDetails<ChangeEventReason>;
}