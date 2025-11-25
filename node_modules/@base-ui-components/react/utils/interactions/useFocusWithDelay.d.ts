import type { FloatingRootContext, ElementProps } from "../../floating-ui-react/index.js";
interface UseFocusWithDelayProps {
  delay?: number;
}
/**
 * Adds support for delay, since Floating UI's `useFocus` hook does not support it.
 */
export declare function useFocusWithDelay(context: FloatingRootContext, props?: UseFocusWithDelayProps): ElementProps;
export {};