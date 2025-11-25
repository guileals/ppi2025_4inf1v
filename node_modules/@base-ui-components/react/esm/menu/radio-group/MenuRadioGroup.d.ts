import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import type { MenuRoot } from "../root/MenuRoot.js";
/**
 * Groups related radio items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export declare const MenuRadioGroup: React.NamedExoticComponent<MenuRadioGroup.Props & React.RefAttributes<Element>>;
export declare namespace MenuRadioGroup {
  interface Props extends BaseUIComponentProps<'div', State> {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The controlled value of the radio item that should be currently selected.
     *
     * To render an uncontrolled radio group, use the `defaultValue` prop instead.
     */
    value?: any;
    /**
     * The uncontrolled value of the radio item that should be initially selected.
     *
     * To render a controlled radio group, use the `value` prop instead.
     */
    defaultValue?: any;
    /**
     * Function called when the selected value changes.
     *
     * @default () => {}
     */
    onValueChange?: (value: any, eventDetails: MenuRoot.ChangeEventDetails) => void;
    /**
     * Whether the component should ignore user interaction.
     *
     * @default false
     */
    disabled?: boolean;
  }
  type State = {
    disabled: boolean;
  };
}