import { CommonTriggerDataAttributes } from "../../utils/popupStateMapping.js";
export let MenuSubmenuTriggerDataAttributes = function (MenuSubmenuTriggerDataAttributes) {
  /**
   * Present when the corresponding submenu is open.
   */
  MenuSubmenuTriggerDataAttributes[MenuSubmenuTriggerDataAttributes["popupOpen"] = CommonTriggerDataAttributes.popupOpen] = "popupOpen";
  return MenuSubmenuTriggerDataAttributes;
}({});