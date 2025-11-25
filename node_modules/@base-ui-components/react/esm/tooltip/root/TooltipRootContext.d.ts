import * as React from 'react';
import type { FloatingRootContext } from "../../floating-ui-react/index.js";
import type { HTMLProps } from "../../utils/types.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
import { BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
export interface TooltipRootContext {
  open: boolean;
  setOpen: (open: boolean, eventDetails: BaseUIEventDetails) => void;
  setTriggerElement: (el: Element | null) => void;
  positionerElement: HTMLElement | null;
  setPositionerElement: (el: HTMLElement | null) => void;
  popupRef: React.RefObject<HTMLElement | null>;
  delay: number;
  closeDelay: number;
  mounted: boolean;
  setMounted: React.Dispatch<React.SetStateAction<boolean>>;
  triggerProps: HTMLProps;
  popupProps: HTMLProps;
  instantType: 'delay' | 'dismiss' | 'focus' | undefined;
  floatingRootContext: FloatingRootContext;
  trackCursorAxis: 'none' | 'x' | 'y' | 'both';
  transitionStatus: TransitionStatus;
  onOpenChangeComplete: ((open: boolean) => void) | undefined;
  hoverable: boolean;
}
export declare const TooltipRootContext: React.Context<TooltipRootContext | undefined>;
export declare function useTooltipRootContext(): TooltipRootContext;