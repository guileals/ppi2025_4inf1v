import * as React from 'react';
import { FloatingEvents } from "../../floating-ui-react/index.js";
import { HTMLProps } from "../../utils/types.js";
export declare const REGULAR_ITEM: {
  type: "regular-item";
};
export declare function useMenuItem(params: useMenuItem.Parameters): useMenuItem.ReturnValue;
export declare namespace useMenuItem {
  interface Parameters {
    /**
     * Whether to close the menu when the item is clicked.
     */
    closeOnClick: boolean;
    /**
     * Whether the component should ignore user interaction.
     */
    disabled: boolean;
    /**
     * Determines if the menu item is highlighted.
     */
    highlighted: boolean;
    /**
     * The id of the menu item.
     */
    id: string | undefined;
    /**
     * The FloatingEvents instance of the menu's root.
     */
    menuEvents: FloatingEvents;
    /**
     * Whether to treat mouseup events as clicks.
     */
    allowMouseUpTriggerRef: React.RefObject<boolean>;
    /**
     * A ref that is set to `true` when the user is using the typeahead feature.
     */
    typingRef: React.RefObject<boolean>;
    /**
     * Whether the component renders a native `<button>` element when replacing it
     * via the `render` prop.
     * Set to `false` if the rendered element is not a button (e.g. `<div>`).
     * @default false
     */
    nativeButton: boolean;
    /**
     * Additional data specific to the item type.
     */
    itemMetadata: Metadata;
    /**
     * The node id of the menu positioner.
     */
    nodeId: string | undefined;
  }
  type Metadata = typeof REGULAR_ITEM | {
    type: 'submenu-trigger';
    setActive: () => void;
    allowMouseEnterEnabled: boolean;
  };
  interface ReturnValue {
    /**
     * Resolver for the root slot's props.
     * @param externalProps event handlers for the root slot
     * @returns props that should be spread on the root slot
     */
    getItemProps: (externalProps?: HTMLProps) => HTMLProps;
    /**
     * The ref to the component's root DOM element.
     */
    itemRef: React.RefCallback<Element> | null;
  }
}