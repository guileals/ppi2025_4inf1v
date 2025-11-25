import * as React from 'react';
import { useFieldControlValidation } from "../field/control/useFieldControlValidation.js";
import type { BaseUIEventDetails } from "../utils/createBaseUIEventDetails.js";
export interface RadioGroupContext {
  disabled: boolean | undefined;
  readOnly: boolean | undefined;
  required: boolean | undefined;
  name: string | undefined;
  checkedValue: unknown;
  setCheckedValue: (value: unknown, eventDetails: BaseUIEventDetails<'none'>) => void;
  onValueChange: (value: unknown, eventDetails: BaseUIEventDetails<'none'>) => void;
  touched: boolean;
  setTouched: React.Dispatch<React.SetStateAction<boolean>>;
  fieldControlValidation?: ReturnType<typeof useFieldControlValidation>;
  registerControlRef: (element: HTMLElement | null) => void;
}
export declare const RadioGroupContext: React.Context<RadioGroupContext>;
export declare function useRadioGroupContext(): RadioGroupContext;