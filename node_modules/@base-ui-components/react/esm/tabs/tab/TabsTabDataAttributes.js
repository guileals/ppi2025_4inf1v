export let TabsTabDataAttributes = /*#__PURE__*/function (TabsTabDataAttributes) {
  /**
   * Indicates the direction of the activation (based on the previous selected tab).
   * @type {'left' | 'right' | 'up' | 'down' | 'none'}
   */
  TabsTabDataAttributes["activationDirection"] = "data-activation-direction";
  /**
   * Indicates the orientation of the tabs.
   * @type {'horizontal' | 'vertical'}
   */
  TabsTabDataAttributes["orientation"] = "data-orientation";
  /**
   * Present when the tab is disabled.
   */
  TabsTabDataAttributes["disabled"] = "data-disabled";
  /**
   * Present when the tab is highlighted.
   */
  TabsTabDataAttributes["highlighted"] = "data-highlighted";
  /**
   * Present when the tab is selected.
   */
  TabsTabDataAttributes["selected"] = "data-selected";
  return TabsTabDataAttributes;
}({});