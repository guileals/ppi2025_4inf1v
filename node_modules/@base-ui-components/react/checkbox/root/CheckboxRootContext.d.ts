import * as React from 'react';
import type { CheckboxRoot } from "./CheckboxRoot.js";
export type CheckboxRootContext = CheckboxRoot.State;
export declare const CheckboxRootContext: React.Context<CheckboxRoot.State | undefined>;
export declare function useCheckboxRootContext(): CheckboxRoot.State;