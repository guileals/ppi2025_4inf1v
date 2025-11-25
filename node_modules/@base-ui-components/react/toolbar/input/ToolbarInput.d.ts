import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import type { ToolbarRoot } from "../root/ToolbarRoot.js";
/**
 * A native input element that integrates with Toolbar keyboard navigation.
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Toolbar](https://base-ui.com/react/components/toolbar)
 */
export declare const ToolbarInput: React.ForwardRefExoticComponent<ToolbarInput.Props & React.RefAttributes<HTMLInputElement>>;
export declare namespace ToolbarInput {
  interface State extends ToolbarRoot.State {
    disabled: boolean;
    focusable: boolean;
  }
  interface Props extends BaseUIComponentProps<'input', ToolbarRoot.State> {
    /**
     * When `true` the item is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * When `true` the item remains focuseable when disabled.
     * @default true
     */
    focusableWhenDisabled?: boolean;
    defaultValue?: React.ComponentProps<'input'>['defaultValue'];
  }
}