"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBaseUIEventDetails = createBaseUIEventDetails;
/**
 * Maps an open-change `reason` string to the corresponding native event type.
 */

/**
 * Details of custom events emitted by Base UI components.
 */

/**
 * Creates a Base UI event details object with the given reason and utilities
 * for preventing Base UI's internal event handling.
 */
function createBaseUIEventDetails(reason, event) {
  let canceled = false;
  let allowPropagation = false;
  return {
    reason,
    event: event ?? new Event('base-ui'),
    cancel() {
      canceled = true;
    },
    allowPropagation() {
      allowPropagation = true;
    },
    get isCanceled() {
      return canceled;
    },
    get isPropagationAllowed() {
      return allowPropagation;
    }
  };
}