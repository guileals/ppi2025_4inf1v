type Callback = (...args: any[]) => any;
export declare function useEventCallback<T extends Callback>(callback: T | undefined): T;
export {};