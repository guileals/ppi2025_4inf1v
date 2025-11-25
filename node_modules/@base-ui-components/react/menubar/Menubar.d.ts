import * as React from 'react';
import { type MenuRoot } from "../menu/root/MenuRoot.js";
import { BaseUIComponentProps } from "../utils/types.js";
/**
 * The container for menus.
 *
 * Documentation: [Base UI Menubar](https://base-ui.com/react/components/menubar)
 */
export declare const Menubar: React.ForwardRefExoticComponent<Menubar.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace Menubar {
  interface State {}
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * Whether the menubar is modal.
     * @default true
     */
    modal?: boolean;
    /**
     * Whether the whole menubar is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * The orientation of the menubar.
     * @default 'horizontal'
     */
    orientation?: MenuRoot.Orientation;
    /**
     * Whether to loop keyboard focus back to the first item
     * when the end of the list is reached while using the arrow keys.
     * @default true
     */
    loop?: boolean;
  }
}