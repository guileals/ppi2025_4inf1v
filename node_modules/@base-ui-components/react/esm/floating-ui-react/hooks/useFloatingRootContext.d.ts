import type { FloatingRootContext } from "../types.js";
import type { BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
export interface UseFloatingRootContextOptions {
  open?: boolean;
  onOpenChange?: (open: boolean, eventDetails: BaseUIEventDetails) => void;
  elements: {
    reference: Element | null;
    floating: HTMLElement | null;
  };
  /**
   * Whether to prevent the auto-emitted `openchange` event.
   */
  noEmit?: boolean;
}
export declare function useFloatingRootContext(options: UseFloatingRootContextOptions): FloatingRootContext;