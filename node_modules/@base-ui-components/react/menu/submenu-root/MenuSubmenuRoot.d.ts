import * as React from 'react';
import { MenuRoot } from "../root/MenuRoot.js";
export { useMenuSubmenuRootContext } from "./MenuSubmenuRootContext.js";
/**
 * Groups all parts of a submenu.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export declare function MenuSubmenuRoot(props: MenuSubmenuRoot.Props): React.JSX.Element;
export declare namespace MenuSubmenuRoot {
  interface Props extends Omit<MenuRoot.Props, 'modal' | 'openOnHover'> {
    /**
     * Whether the submenu should open when the trigger is hovered.
     * @default true
     */
    openOnHover?: MenuRoot.Props['openOnHover'];
  }
  interface State {}
}