import { transitionStatusMapping } from "../../utils/styleHookMapping.js";
import { fieldValidityMapping } from "../../field/utils/constants.js";
import { RadioRootDataAttributes } from "../root/RadioRootDataAttributes.js";
export const customStyleHookMapping = {
  checked(value) {
    if (value) {
      return {
        [RadioRootDataAttributes.checked]: ''
      };
    }
    return {
      [RadioRootDataAttributes.unchecked]: ''
    };
  },
  ...transitionStatusMapping,
  ...fieldValidityMapping
};