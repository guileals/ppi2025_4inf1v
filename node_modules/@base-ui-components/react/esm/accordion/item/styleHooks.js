import { collapsibleOpenStateMapping as baseMapping } from "../../utils/collapsibleOpenStateMapping.js";
import { transitionStatusMapping } from "../../utils/styleHookMapping.js";
import { AccordionItemDataAttributes } from "./AccordionItemDataAttributes.js";
export const accordionStyleHookMapping = {
  ...baseMapping,
  index: value => {
    return Number.isInteger(value) ? {
      [AccordionItemDataAttributes.index]: String(value)
    } : null;
  },
  ...transitionStatusMapping,
  value: () => null
};