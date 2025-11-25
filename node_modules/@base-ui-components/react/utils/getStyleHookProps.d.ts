export type StateAttributesMapping<State> = { [Property in keyof State]?: (state: State[Property]) => Record<string, string> | null };
/**
 * @deprecated Use `StateAttributesMapping` instead.
 */
export type CustomStyleHookMapping<State> = { [Property in keyof State]?: (state: State[Property]) => Record<string, string> | null };
export declare function getStyleHookProps<State extends Record<string, any>>(state: State, customMapping?: StateAttributesMapping<State>): Record<string, string>;