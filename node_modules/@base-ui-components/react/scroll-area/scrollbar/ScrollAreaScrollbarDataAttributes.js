"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollAreaScrollbarDataAttributes = void 0;
let ScrollAreaScrollbarDataAttributes = exports.ScrollAreaScrollbarDataAttributes = /*#__PURE__*/function (ScrollAreaScrollbarDataAttributes) {
  /**
   * Indicates the orientation of the scrollbar.
   * @type {'horizontal' | 'vertical'}
   */
  ScrollAreaScrollbarDataAttributes["orientation"] = "data-orientation";
  /**
   * Present when the pointer is over the scroll area.
   */
  ScrollAreaScrollbarDataAttributes["hovering"] = "data-hovering";
  /**
   * Present when the users scrolls inside the scroll area.
   */
  ScrollAreaScrollbarDataAttributes["scrolling"] = "data-scrolling";
  return ScrollAreaScrollbarDataAttributes;
}({});