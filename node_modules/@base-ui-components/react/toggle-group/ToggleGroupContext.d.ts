import * as React from 'react';
import type { Orientation } from "../utils/types.js";
export interface ToggleGroupContext {
  value: readonly any[];
  setGroupValue: (newValue: string, nextPressed: boolean, event: Event) => void;
  disabled: boolean;
  orientation: Orientation;
}
export declare const ToggleGroupContext: React.Context<ToggleGroupContext | undefined>;
export declare function useToggleGroupContext(optional?: boolean): ToggleGroupContext | undefined;