"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffset = getOffset;
function getOffset(element, prop, axis) {
  if (!element) {
    return 0;
  }
  const styles = getComputedStyle(element);
  const start = axis === 'x' ? 'Left' : 'Top';
  const end = axis === 'x' ? 'Right' : 'Bottom';
  return parseFloat(styles[`${prop}${start}`]) + parseFloat(styles[`${prop}${end}`]);
}