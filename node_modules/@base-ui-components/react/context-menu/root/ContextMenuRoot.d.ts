import * as React from 'react';
import { Menu } from "../../menu/index.js";
import { BaseUIEventDetails } from "../../types/index.js";
import { BaseUIChangeEventReason } from "../../utils/types.js";
/**
 * A component that creates a context menu activated by right clicking or long pressing.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Context Menu](https://base-ui.com/react/components/context-menu)
 */
export declare function ContextMenuRoot(props: ContextMenuRoot.Props): React.JSX.Element;
export declare namespace ContextMenuRoot {
  interface State {}
  interface Props extends Omit<Menu.Root.Props, 'modal' | 'openOnHover' | 'delay' | 'closeDelay' | 'onOpenChange'> {
    /**
     * Event handler called when the menu is opened or closed.
     */
    onOpenChange?: (open: boolean, eventDetails: ChangeEventDetails) => void;
  }
  type ChangeEventReason = BaseUIChangeEventReason | 'sibling-open';
  type ChangeEventDetails = BaseUIEventDetails<ChangeEventReason>;
}