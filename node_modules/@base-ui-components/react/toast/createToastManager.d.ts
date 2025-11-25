import { useToastManager } from "./useToastManager.js";
export interface ToastManagerEvent {
  action: 'add' | 'close' | 'update' | 'promise';
  options: any;
}
/**
 * Creates a new toast manager.
 */
export declare function createToastManager(): createToastManager.ToastManager;
export declare namespace createToastManager {
  interface ToastManager {
    ' subscribe': (listener: (data: ToastManagerEvent) => void) => () => void;
    add: <Data extends object>(options: useToastManager.AddOptions<Data>) => string;
    close: (id: string) => void;
    update: <Data extends object>(id: string, updates: useToastManager.UpdateOptions<Data>) => void;
    promise: <Value, Data extends object>(promiseValue: Promise<Value>, options: useToastManager.PromiseOptions<Value, Data>) => Promise<Value>;
  }
}