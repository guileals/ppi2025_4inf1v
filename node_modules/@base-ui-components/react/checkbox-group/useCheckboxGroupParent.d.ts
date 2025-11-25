import * as React from 'react';
import type { BaseUIEventDetails } from "../utils/createBaseUIEventDetails.js";
export declare function useCheckboxGroupParent(params: useCheckboxGroupParent.Parameters): useCheckboxGroupParent.ReturnValue;
export declare namespace useCheckboxGroupParent {
  interface Parameters {
    allValues?: string[];
    value?: string[];
    onValueChange?: (value: string[], eventDetails: BaseUIEventDetails<'none'>) => void;
  }
  interface ReturnValue {
    id: string | undefined;
    indeterminate: boolean;
    disabledStatesRef: React.RefObject<Map<string, boolean>>;
    getParentProps: () => {
      id: string | undefined;
      indeterminate: boolean;
      checked: boolean;
      'aria-controls': string;
      onCheckedChange: (checked: boolean, eventDetails: BaseUIEventDetails<'none'>) => void;
    };
    getChildProps: (name: string) => {
      name: string;
      id: string;
      checked: boolean;
      onCheckedChange: (checked: boolean, eventDetails: BaseUIEventDetails<'none'>) => void;
    };
  }
}