import * as React from 'react';
import type { Timeout } from '@base-ui-components/utils/useTimeout';
import type { HTMLProps } from "../../utils/types.js";
import type { EventWithOptionalKeyState } from "../utils/types.js";
export declare function useNumberFieldButton(params: useNumberFieldButton.Parameters): useNumberFieldButton.ReturnValue;
export declare namespace useNumberFieldButton {
  interface Parameters {
    allowInputSyncRef: React.RefObject<boolean | null>;
    disabled: boolean;
    formatOptionsRef: React.RefObject<Intl.NumberFormatOptions | undefined>;
    getStepAmount: (event?: EventWithOptionalKeyState) => number | undefined;
    id: string | undefined;
    incrementValue: (amount: number, dir: 1 | -1, currentValue?: number | null, event?: Event) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    inputValue: string;
    intentionalTouchCheckTimeout: Timeout;
    isIncrement: boolean;
    isPressedRef: React.RefObject<boolean | null>;
    locale?: Intl.LocalesArgument;
    maxWithDefault: number;
    minWithDefault: number;
    movesAfterTouchRef: React.RefObject<number | null>;
    readOnly: boolean;
    setValue: (unvalidatedValue: number | null, event?: Event) => void;
    startAutoChange: (isIncrement: boolean, event?: React.MouseEvent | Event) => void;
    stopAutoChange: () => void;
    value: number | null;
    valueRef: React.RefObject<number | null>;
  }
  interface ReturnValue {
    props: HTMLProps;
  }
}