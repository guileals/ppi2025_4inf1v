import * as React from 'react';
import type { HTMLProps } from "../../utils/types.js";
export declare function useFieldControlValidation(): {
  getValidationProps: (externalProps?: {}) => import("../../utils/types.js").WithBaseUIEvent<any>;
  getInputValidationProps: (externalProps?: {}) => import("../../utils/types.js").WithBaseUIEvent<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  commitValidation: (value: unknown, revalidate?: any) => Promise<void>;
};
export declare namespace useFieldControlValidation {
  interface ReturnValue {
    getValidationProps: (props?: HTMLProps) => HTMLProps;
    getInputValidationProps: (props?: HTMLProps) => HTMLProps;
    inputRef: React.MutableRefObject<any>;
    commitValidation: (value: unknown, revalidate?: boolean) => void;
  }
}