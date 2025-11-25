import { CommonTriggerDataAttributes } from "../../utils/popupStateMapping.js";
export let ComboboxInputDataAttributes = function (ComboboxInputDataAttributes) {
  /**
   * Present when the corresponding popup is open.
   */
  ComboboxInputDataAttributes[ComboboxInputDataAttributes["popupOpen"] = CommonTriggerDataAttributes.popupOpen] = "popupOpen";
  /**
   * Present when the input is pressed.
   */
  ComboboxInputDataAttributes[ComboboxInputDataAttributes["pressed"] = CommonTriggerDataAttributes.pressed] = "pressed";
  /**
   * Present when the component is disabled.
   */
  ComboboxInputDataAttributes["disabled"] = "data-disabled";
  /**
   * Present when the component is readonly.
   */
  ComboboxInputDataAttributes["readonly"] = "data-readonly";
  /**
   * Present when the component is required.
   */
  ComboboxInputDataAttributes["required"] = "data-required";
  /**
   * Present when the component is in valid state (when wrapped in Field.Root).
   */
  ComboboxInputDataAttributes["valid"] = "data-valid";
  /**
   * Present when the component is in invalid state (when wrapped in Field.Root).
   */
  ComboboxInputDataAttributes["invalid"] = "data-invalid";
  /**
   * Present when the component has been touched (when wrapped in Field.Root).
   */
  ComboboxInputDataAttributes["touched"] = "data-touched";
  /**
   * Present when the component's value has changed (when wrapped in Field.Root).
   */
  ComboboxInputDataAttributes["dirty"] = "data-dirty";
  /**
   * Present when the component has a value (when wrapped in Field.Root).
   */
  ComboboxInputDataAttributes["filled"] = "data-filled";
  /**
   * Present when the input is focused (when wrapped in Field.Root).
   */
  ComboboxInputDataAttributes["focused"] = "data-focused";
  return ComboboxInputDataAttributes;
}({});