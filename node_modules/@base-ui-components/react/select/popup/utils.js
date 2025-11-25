"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearPositionerStyles = clearPositionerStyles;
function clearPositionerStyles(positionerElement, originalPositionerStyles) {
  Object.assign(positionerElement.style, originalPositionerStyles);
}