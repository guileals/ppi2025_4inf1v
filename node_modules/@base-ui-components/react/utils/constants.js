"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPEAHEAD_RESET_MS = exports.POPUP_COLLISION_AVOIDANCE = exports.PATIENT_CLICK_THRESHOLD = exports.EMPTY_OBJECT = exports.EMPTY_ARRAY = exports.DROPDOWN_COLLISION_AVOIDANCE = exports.DISABLED_TRANSITIONS_STYLE = exports.CLICK_TRIGGER_IDENTIFIER = void 0;
const TYPEAHEAD_RESET_MS = exports.TYPEAHEAD_RESET_MS = 500;
const PATIENT_CLICK_THRESHOLD = exports.PATIENT_CLICK_THRESHOLD = 500;
const DISABLED_TRANSITIONS_STYLE = exports.DISABLED_TRANSITIONS_STYLE = {
  style: {
    transition: 'none'
  }
};
const EMPTY_OBJECT = exports.EMPTY_OBJECT = {};
const EMPTY_ARRAY = exports.EMPTY_ARRAY = [];
const CLICK_TRIGGER_IDENTIFIER = exports.CLICK_TRIGGER_IDENTIFIER = 'data-base-ui-click-trigger';

/**
 * Used for dropdowns that usually strictly prefer top/bottom placements and
 * use `var(--available-height)` to limit their height.
 */
const DROPDOWN_COLLISION_AVOIDANCE = exports.DROPDOWN_COLLISION_AVOIDANCE = {
  fallbackAxisSide: 'none'
};

/**
 * Used by regular popups that usually aren't scrollable and are allowed to
 * freely flip to any axis of placement.
 */
const POPUP_COLLISION_AVOIDANCE = exports.POPUP_COLLISION_AVOIDANCE = {
  fallbackAxisSide: 'end'
};