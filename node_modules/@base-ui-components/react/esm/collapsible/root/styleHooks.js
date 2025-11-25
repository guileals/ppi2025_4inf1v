import { collapsibleOpenStateMapping as baseMapping } from "../../utils/collapsibleOpenStateMapping.js";
import { transitionStatusMapping } from "../../utils/styleHookMapping.js";
export const collapsibleStyleHookMapping = {
  ...baseMapping,
  ...transitionStatusMapping
};