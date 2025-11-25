"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFloatingPointErrors = removeFloatingPointErrors;
exports.toValidatedNumber = toValidatedNumber;
var _formatNumber = require("../../utils/formatNumber");
var _clamp = require("../../utils/clamp");
function removeFloatingPointErrors(value, format = {}) {
  return parseFloat((0, _formatNumber.getFormatter)('en-US', {
    maximumFractionDigits: format.maximumFractionDigits,
    minimumFractionDigits: format.minimumFractionDigits,
    useGrouping: false
  }).format(value));
}
function toValidatedNumber(value, {
  step,
  minWithDefault,
  maxWithDefault,
  minWithZeroDefault,
  format,
  snapOnStep,
  small
}) {
  if (value === null) {
    return value;
  }
  const clampedValue = (0, _clamp.clamp)(value, minWithDefault, maxWithDefault);
  if (step != null && snapOnStep) {
    if (small) {
      const stepsFromMin = (clampedValue - minWithZeroDefault) / step;
      const roundedSteps = Math.round(stepsFromMin);
      const snappedValue = minWithZeroDefault + roundedSteps * step;
      return removeFloatingPointErrors(snappedValue, format);
    }

    // If a real minimum is provided, use it
    const base = minWithDefault !== Number.MIN_SAFE_INTEGER ? minWithDefault : minWithZeroDefault;
    if (step > 0) {
      // "Undo" the increment by subtracting step, then snap.
      const unsnapped = clampedValue - step;
      const steps = Math.floor((unsnapped - base) / step);
      // Reapply the increment by adding step
      return removeFloatingPointErrors(base + steps * step + step, format);
    }
    if (step < 0) {
      const absStep = Math.abs(step);
      const unsnapped = clampedValue - step;
      const steps = Math.ceil((unsnapped - base) / absStep);
      return removeFloatingPointErrors(base + steps * absStep + step, format);
    }
  }
  return removeFloatingPointErrors(clampedValue, format);
}