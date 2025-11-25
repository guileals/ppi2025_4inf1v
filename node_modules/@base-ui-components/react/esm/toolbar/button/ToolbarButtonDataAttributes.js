export let ToolbarButtonDataAttributes = /*#__PURE__*/function (ToolbarButtonDataAttributes) {
  /**
   * Present when the button is disabled.
   */
  ToolbarButtonDataAttributes["disabled"] = "data-disabled";
  /**
   * Indicates the orientation of the toolbar.
   * @type {'horizontal' | 'vertical'}
   */
  ToolbarButtonDataAttributes["orientation"] = "data-orientation";
  /**
   * Present when the button remains focusable when disabled.
   */
  ToolbarButtonDataAttributes["focusable"] = "data-focusable";
  /**
   * Present when the button is the active item in the toolbar.
   */
  ToolbarButtonDataAttributes["highlighted"] = "data-highlighted";
  return ToolbarButtonDataAttributes;
}({});