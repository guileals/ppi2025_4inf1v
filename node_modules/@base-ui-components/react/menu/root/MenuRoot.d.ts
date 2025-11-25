import * as React from 'react';
import { MenuRootContext } from "./MenuRootContext.js";
import { MenubarContext } from "../../menubar/MenubarContext.js";
import type { BaseUIChangeEventReason } from "../../utils/types.js";
import type { BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { ContextMenuRootContext } from "../../context-menu/root/ContextMenuRootContext.js";
/**
 * Groups all parts of the menu.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export declare const MenuRoot: React.FC<MenuRoot.Props>;
export declare namespace MenuRoot {
  interface Props {
    children: React.ReactNode;
    /**
     * Whether the menu is initially open.
     *
     * To render a controlled menu, use the `open` prop instead.
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * Whether to loop keyboard focus back to the first item
     * when the end of the list is reached while using the arrow keys.
     * @default true
     */
    loop?: boolean;
    /**
     * Determines if the menu enters a modal state when open.
     * - `true`: user interaction is limited to the menu: document page scroll is locked and and pointer interactions on outside elements are disabled.
     * - `false`: user interaction with the rest of the document is allowed.
     * @default true
     */
    modal?: boolean;
    /**
     * Event handler called when the menu is opened or closed.
     */
    onOpenChange?: (open: boolean, eventDetails: ChangeEventDetails) => void;
    /**
     * Event handler called after any animations complete when the menu is closed.
     */
    onOpenChangeComplete?: (open: boolean) => void;
    /**
     * Whether the menu is currently open.
     */
    open?: boolean;
    /**
     * The visual orientation of the menu.
     * Controls whether roving focus uses up/down or left/right arrow keys.
     * @default 'vertical'
     */
    orientation?: Orientation;
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: boolean;
    /**
     * When in a submenu, determines whether pressing the Escape key
     * closes the entire menu, or only the current child menu.
     * @default true
     */
    closeParentOnEsc?: boolean;
    /**
     * How long to wait before the menu may be opened on hover. Specified in milliseconds.
     *
     * Requires the `openOnHover` prop.
     * @default 100
     */
    delay?: number;
    /**
     * How long to wait before closing the menu that was opened on hover.
     * Specified in milliseconds.
     *
     * Requires the `openOnHover` prop.
     * @default 0
     */
    closeDelay?: number;
    /**
     * Whether the menu should also open when the trigger is hovered.
     */
    openOnHover?: boolean;
    /**
     * A ref to imperative actions.
     * - `unmount`: When specified, the menu will not be unmounted when closed.
     * Instead, the `unmount` function must be called to unmount the menu manually.
     * Useful when the menu's animation is controlled by an external library.
     */
    actionsRef?: React.RefObject<Actions>;
  }
  interface Actions {
    unmount: () => void;
  }
  type ChangeEventDetails = BaseUIEventDetails<ChangeEventReason>;
  type ChangeEventReason = BaseUIChangeEventReason | 'sibling-open';
  type Orientation = 'horizontal' | 'vertical';
  interface Actions {
    unmount: () => void;
  }
}
export type MenuParent = {
  type: 'menu';
  context: MenuRootContext;
} | {
  type: 'menubar';
  context: MenubarContext;
} | {
  type: 'context-menu';
  context: ContextMenuRootContext;
} | {
  type: 'nested-context-menu';
  context: ContextMenuRootContext;
  menuContext: MenuRootContext;
} | {
  type: undefined;
};