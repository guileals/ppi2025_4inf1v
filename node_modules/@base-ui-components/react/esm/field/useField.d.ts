export declare function useField(params: useField.Parameters): void;
export declare namespace useField {
  interface Parameters {
    enabled?: boolean;
    value: unknown;
    getValue?: (() => unknown) | undefined;
    id: string | undefined;
    name?: string | undefined;
    commitValidation: (value: unknown) => void;
    /**
     * A ref to a focusable element that receives focus when the field fails
     * validation during form submission.
     */
    controlRef: React.RefObject<any>;
  }
}