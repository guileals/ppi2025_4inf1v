import * as React from 'react';
import type { FieldRoot, FieldValidityData } from "./FieldRoot.js";
export interface FieldRootContext {
  invalid: boolean | undefined;
  /**
   * The `id` of the labelable element that corresponds to the `for` attribute of a `Field.Label`.
   * When `null` the association is implicit.
   */
  controlId: string | null | undefined;
  setControlId: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  labelId: string | undefined;
  setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
  messageIds: string[];
  setMessageIds: React.Dispatch<React.SetStateAction<string[]>>;
  name: string | undefined;
  validityData: FieldValidityData;
  setValidityData: React.Dispatch<React.SetStateAction<FieldValidityData>>;
  disabled: boolean | undefined;
  touched: boolean;
  setTouched: React.Dispatch<React.SetStateAction<boolean>>;
  dirty: boolean;
  setDirty: React.Dispatch<React.SetStateAction<boolean>>;
  filled: boolean;
  setFilled: React.Dispatch<React.SetStateAction<boolean>>;
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  validate: (value: unknown, formValues: Record<string, unknown>) => string | string[] | null | Promise<string | string[] | null>;
  validationMode: 'onBlur' | 'onChange';
  validationDebounceTime: number;
  state: FieldRoot.State;
  markedDirtyRef: React.MutableRefObject<boolean>;
}
export declare const FieldRootContext: React.Context<FieldRootContext>;
export declare function useFieldRootContext(optional?: boolean): FieldRootContext;