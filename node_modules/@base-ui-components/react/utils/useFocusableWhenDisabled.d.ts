import * as React from 'react';
export declare function useFocusableWhenDisabled(parameters: useFocusableWhenDisabled.Parameters): useFocusableWhenDisabled.ReturnValue;
interface FocusableWhenDisabledProps {
  'aria-disabled'?: boolean;
  disabled?: boolean;
  onKeyDown: (event: React.KeyboardEvent) => void;
  tabIndex: number;
}
export declare namespace useFocusableWhenDisabled {
  interface Parameters {
    /**
     * Whether the component should be focusable when disabled.
     * When `undefined`, composite items are focusable when disabled by default.
     */
    focusableWhenDisabled?: boolean | undefined;
    /**
     * The disabled state of the component.
     */
    disabled: boolean;
    /**
     * Whether this is a composite item or not.
     * @default false
     */
    composite?: boolean;
    /**
     * @default 0
     */
    tabIndex?: number;
    /**
     * @default true
     */
    isNativeButton: boolean;
  }
  interface ReturnValue {
    props: FocusableWhenDisabledProps;
  }
}
export {};