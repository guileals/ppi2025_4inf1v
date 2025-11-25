import * as React from 'react';
type FocusManagerState = {
  modal: boolean;
  open: boolean;
  onOpenChange(open: boolean, data?: {
    reason?: string;
    event?: Event;
  }): void;
  domReference: Element | null;
  closeOnFocusOut: boolean;
} | null;
export declare const usePortalContext: () => {
  preserveTabOrder: boolean;
  portalNode: HTMLElement | null;
  setFocusManagerState: React.Dispatch<React.SetStateAction<FocusManagerState>>;
  beforeInsideRef: React.RefObject<HTMLSpanElement | null>;
  afterInsideRef: React.RefObject<HTMLSpanElement | null>;
  beforeOutsideRef: React.RefObject<HTMLSpanElement | null>;
  afterOutsideRef: React.RefObject<HTMLSpanElement | null>;
} | null;
export interface UseFloatingPortalNodeProps {
  id?: string;
  root?: HTMLElement | ShadowRoot | null | React.RefObject<HTMLElement | ShadowRoot | null>;
}
/**
 * @see https://floating-ui.com/docs/FloatingPortal#usefloatingportalnode
 */
export declare function useFloatingPortalNode(props?: UseFloatingPortalNodeProps): HTMLElement | null;
export interface FloatingPortalProps {
  children?: React.ReactNode;
  /**
   * Optionally selects the node with the id if it exists, or create it and
   * append it to the specified `root` (by default `document.body`).
   */
  id?: string;
  /**
   * Specifies the root node the portal container will be appended to.
   */
  root?: UseFloatingPortalNodeProps['root'];
  /**
   * When using non-modal focus management using `FloatingFocusManager`, this
   * will preserve the tab order context based on the React tree instead of the
   * DOM tree.
   */
  preserveTabOrder?: boolean;
}
/**
 * Portals the floating element into a given container element — by default,
 * outside of the app root and into the body.
 * This is necessary to ensure the floating element can appear outside any
 * potential parent containers that cause clipping (such as `overflow: hidden`),
 * while retaining its location in the React tree.
 * @see https://floating-ui.com/docs/FloatingPortal
 * @internal
 */
export declare function FloatingPortal(props: FloatingPortalProps): React.JSX.Element;
export {};