import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import { useCollapsibleRoot } from "./useCollapsibleRoot.js";
/**
 * Groups all parts of the collapsible.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
export declare const CollapsibleRoot: React.ForwardRefExoticComponent<CollapsibleRoot.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace CollapsibleRoot {
  interface State extends Pick<useCollapsibleRoot.ReturnValue, 'open' | 'disabled'> {}
  interface Props extends Omit<BaseUIComponentProps<'div', State>, 'render'> {
    /**
     * Whether the collapsible panel is currently open.
     *
     * To render an uncontrolled collapsible, use the `defaultOpen` prop instead.
     */
    open?: boolean;
    /**
     * Whether the collapsible panel is initially open.
     *
     * To render a controlled collapsible, use the `open` prop instead.
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * Event handler called when the panel is opened or closed.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: boolean;
    render?: BaseUIComponentProps<'div', State>['render'] | null;
  }
}