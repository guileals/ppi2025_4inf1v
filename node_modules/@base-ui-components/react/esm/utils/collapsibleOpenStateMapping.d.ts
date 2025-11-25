import type { CustomStyleHookMapping } from "./getStyleHookProps.js";
export declare const triggerOpenStateMapping: CustomStyleHookMapping<{
  open: boolean;
}>;
export declare const collapsibleOpenStateMapping: {
  open(value: boolean): {
    "data-open": string;
  } | {
    "data-closed": string;
  };
};