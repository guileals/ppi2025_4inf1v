import * as React from 'react';
import type { SwitchRoot } from "./SwitchRoot.js";
export type SwitchRootContext = SwitchRoot.State;
export declare const SwitchRootContext: React.Context<SwitchRoot.State | undefined>;
export declare function useSwitchRootContext(): SwitchRoot.State;