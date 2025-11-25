import { FloatingRootContext } from "../../floating-ui-react/index.js";
import type { SelectRootContext } from "./SelectRootContext.js";
import type { SelectRootConditionalProps } from "./SelectRoot.js";
export declare function useSelectRoot<Value, Multiple extends boolean | undefined>(params: useSelectRoot.Parameters<Value, Multiple>): useSelectRoot.ReturnValue;
export declare namespace useSelectRoot {
  interface Parameters<Value, Multiple extends boolean | undefined = false> extends Omit<SelectRootConditionalProps<Value, Multiple>, 'children' | 'inputRef'> {}
  type ReturnValue = {
    rootContext: SelectRootContext;
    floatingContext: FloatingRootContext;
    value: any;
  };
}