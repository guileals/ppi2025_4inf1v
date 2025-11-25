import { ProgressRootDataAttributes } from "./ProgressRootDataAttributes.js";
export const progressStyleHookMapping = {
  status(value) {
    if (value === 'progressing') {
      return {
        [ProgressRootDataAttributes.progressing]: ''
      };
    }
    if (value === 'complete') {
      return {
        [ProgressRootDataAttributes.complete]: ''
      };
    }
    if (value === 'indeterminate') {
      return {
        [ProgressRootDataAttributes.indeterminate]: ''
      };
    }
    return null;
  }
};