import type { Store } from "./Store.js";
export declare function useStore<State, Value>(store: Store<State>, selector: (state: State) => Value): Value;
export declare function useStore<State, Value, A1>(store: Store<State>, selector: (state: State, a1: A1) => Value, a1: A1): Value;
export declare function useStore<State, Value, A1, A2>(store: Store<State>, selector: (state: State, a1: A1, a2: A2) => Value, a1: A1, a2: A2): Value;
export declare function useStore<State, Value, A1, A2, A3>(store: Store<State>, selector: (state: State, a1: A1, a2: A2, a3: A3) => Value, a1: A1, a2: A2, a3: A3): Value;