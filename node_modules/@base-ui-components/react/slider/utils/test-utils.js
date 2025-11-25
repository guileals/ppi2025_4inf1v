"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTouches = createTouches;
exports.getHorizontalSliderRect = getHorizontalSliderRect;
function createTouches(touches) {
  return {
    changedTouches: touches.map(touch => new Touch({
      target: document.body,
      ...touch
    }))
  };
}
function getHorizontalSliderRect(width = 100) {
  return {
    width,
    height: 10,
    bottom: 10,
    left: 0,
    x: 0,
    y: 0,
    top: 0,
    right: width,
    toJSON() {}
  };
}