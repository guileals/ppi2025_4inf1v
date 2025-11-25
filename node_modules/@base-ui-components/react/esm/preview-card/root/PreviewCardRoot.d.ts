import * as React from 'react';
import { type BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import type { BaseUIChangeEventReason } from "../../utils/types.js";
/**
 * Groups all parts of the preview card.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
 */
export declare function PreviewCardRoot(props: PreviewCardRoot.Props): React.JSX.Element;
export declare namespace PreviewCardRoot {
  interface State {}
  interface Props {
    children?: React.ReactNode;
    /**
     * Whether the preview card is initially open.
     *
     * To render a controlled preview card, use the `open` prop instead.
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * Whether the preview card is currently open.
     */
    open?: boolean;
    /**
     * Event handler called when the preview card is opened or closed.
     */
    onOpenChange?: (open: boolean, eventDetails: ChangeEventDetails) => void;
    /**
     * Event handler called after any animations complete when the preview card is opened or closed.
     */
    onOpenChangeComplete?: (open: boolean) => void;
    /**
     * How long to wait before the preview card opens. Specified in milliseconds.
     * @default 600
     */
    delay?: number;
    /**
     * How long to wait before closing the preview card. Specified in milliseconds.
     * @default 300
     */
    closeDelay?: number;
    /**
     * A ref to imperative actions.
     * - `unmount`: When specified, the preview card will not be unmounted when closed.
     * Instead, the `unmount` function must be called to unmount the preview card manually.
     * Useful when the preview card's animation is controlled by an external library.
     */
    actionsRef?: React.RefObject<Actions>;
  }
  interface Actions {
    unmount: () => void;
  }
  type ChangeEventReason = BaseUIChangeEventReason;
  type ChangeEventDetails = BaseUIEventDetails<ChangeEventReason>;
}