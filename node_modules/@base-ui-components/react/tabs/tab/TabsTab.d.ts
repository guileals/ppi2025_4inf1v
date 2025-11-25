import * as React from 'react';
import type { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
import type { TabsRoot } from "../root/TabsRoot.js";
/**
 * An individual interactive tab button that toggles the corresponding panel.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export declare const TabsTab: React.ForwardRefExoticComponent<TabsTab.Props & React.RefAttributes<Element>>;
export declare namespace TabsTab {
  type Value = any | null;
  type ActivationDirection = 'left' | 'right' | 'up' | 'down' | 'none';
  interface Position {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }
  interface Size {
    width: number;
    height: number;
  }
  interface Metadata {
    disabled: boolean;
    id: string | undefined;
    value: any | undefined;
  }
  interface State {
    /**
     * Whether the component should ignore user interaction.
     */
    disabled: boolean;
    selected: boolean;
    orientation: TabsRoot.Orientation;
  }
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', State> {
    /**
     * The value of the Tab.
     * When not specified, the value is the child position index.
     */
    value?: Value;
  }
}