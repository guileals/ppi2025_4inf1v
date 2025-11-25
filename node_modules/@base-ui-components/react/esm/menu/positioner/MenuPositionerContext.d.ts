import * as React from 'react';
import type { FloatingContext } from "../../floating-ui-react/index.js";
import type { Side, Align } from "../../utils/useAnchorPositioning.js";
export interface MenuPositionerContext {
  /**
   * The side of the anchor element the popup is positioned relative to.
   */
  side: Side;
  /**
   * How to align the popup relative to the specified side.
   */
  align: Align;
  arrowRef: React.MutableRefObject<Element | null>;
  arrowUncentered: boolean;
  arrowStyles: React.CSSProperties;
  floatingContext: FloatingContext;
}
export declare const MenuPositionerContext: React.Context<MenuPositionerContext | undefined>;
export declare function useMenuPositionerContext(optional?: false): MenuPositionerContext;
export declare function useMenuPositionerContext(optional: true): MenuPositionerContext | undefined;