export declare function useLatestRef<T>(value: T): {
  current: T;
  next: T;
  effect: () => void;
};