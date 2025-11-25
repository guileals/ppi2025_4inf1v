import * as React from 'react';
import { type BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import type { BaseUIChangeEventReason } from "../../utils/types.js";
/**
 * Groups all parts of the select.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare function SelectRoot<Value, Multiple extends boolean | undefined = false>(props: SelectRoot.Props<Value, Multiple>): React.JSX.Element;
interface SelectRootProps<Value> {
  children?: React.ReactNode;
  /**
   * A ref to access the hidden input element.
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * Identifies the field when a form is submitted.
   */
  name?: string;
  /**
   * The id of the Select.
   */
  id?: string;
  /**
   * Whether the user must choose a value before submitting a form.
   * @default false
   */
  required?: boolean;
  /**
   * Whether the user should be unable to choose a different option from the select menu.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether multiple items can be selected.
   * @default false
   */
  multiple?: boolean;
  /**
   * The value of the select.
   */
  value?: Value;
  /**
   * Callback fired when the value of the select changes. Use when controlled.
   */
  onValueChange?: (value: Value, eventDetails: SelectRoot.ChangeEventDetails) => void;
  /**
   * The uncontrolled value of the select when it’s initially rendered.
   *
   * To render a controlled select, use the `value` prop instead.
   * @default null
   */
  defaultValue?: Value | null;
  /**
   * Whether the select menu is initially open.
   *
   * To render a controlled select menu, use the `open` prop instead.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Event handler called when the select menu is opened or closed.
   */
  onOpenChange?: (open: boolean, eventDetails: SelectRoot.ChangeEventDetails) => void;
  /**
   * Event handler called after any animations complete when the select menu is opened or closed.
   */
  onOpenChangeComplete?: (open: boolean) => void;
  /**
   * Whether the select menu is currently open.
   */
  open?: boolean;
  /**
   * Determines if the select enters a modal state when open.
   * - `true`: user interaction is limited to the select: document page scroll is locked and and pointer interactions on outside elements are disabled.
   * - `false`: user interaction with the rest of the document is allowed.
   * @default true
   */
  modal?: boolean;
  /**
   * A ref to imperative actions.
   * - `unmount`: When specified, the select will not be unmounted when closed.
   * Instead, the `unmount` function must be called to unmount the select manually.
   * Useful when the select's animation is controlled by an external library.
   */
  actionsRef?: React.RefObject<SelectRoot.Actions>;
  /**
   * Data structure of the items rendered in the select menu.
   * When specified, `<Select.Value>` renders the label of the selected item instead of the raw value.
   * @example
   * ```tsx
   * const items = {
   *   sans: 'Sans-serif',
   *   serif: 'Serif',
   *   mono: 'Monospace',
   *   cursive: 'Cursive',
   * };
   * <Select.Root items={items} />
   * ```
   */
  items?: Record<string, React.ReactNode> | Array<{
    label: React.ReactNode;
    value: Value;
  }>;
}
type SelectValueType<Value, Multiple extends boolean | undefined> = Multiple extends true ? Value[] : Value;
export type SelectRootConditionalProps<Value, Multiple extends boolean | undefined = false> = Omit<SelectRootProps<Value>, 'multiple' | 'value' | 'defaultValue' | 'onValueChange'> & {
  /**
   * Whether multiple items can be selected.
   * @default false
   */
  multiple?: Multiple;
  /**
   * The value of the select.
   */
  value?: SelectValueType<Value, Multiple>;
  /**
   * The uncontrolled value of the select when it’s initially rendered.
   *
   * To render a controlled select, use the `value` prop instead.
   * @default null
   */
  defaultValue?: SelectValueType<Value, Multiple> | null;
  /**
   * Callback fired when the value of the select changes. Use when controlled.
   */
  onValueChange?: (value: SelectValueType<Value, Multiple>, eventDetails: SelectRoot.ChangeEventDetails) => void;
};
export declare namespace SelectRoot {
  type Props<Value, Multiple extends boolean | undefined = false> = SelectRootConditionalProps<Value, Multiple>;
  interface State {}
  interface Actions {
    unmount: () => void;
  }
  type ChangeEventReason = BaseUIChangeEventReason | 'window-resize';
  type ChangeEventDetails = BaseUIEventDetails<ChangeEventReason>;
}
export {};