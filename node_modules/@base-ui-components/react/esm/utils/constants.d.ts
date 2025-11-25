export declare const TYPEAHEAD_RESET_MS = 500;
export declare const PATIENT_CLICK_THRESHOLD = 500;
export declare const DISABLED_TRANSITIONS_STYLE: {
  style: {
    transition: string;
  };
};
export declare const EMPTY_OBJECT: {};
export declare const EMPTY_ARRAY: never[];
export declare const CLICK_TRIGGER_IDENTIFIER = "data-base-ui-click-trigger";
/**
 * Used for dropdowns that usually strictly prefer top/bottom placements and
 * use `var(--available-height)` to limit their height.
 */
export declare const DROPDOWN_COLLISION_AVOIDANCE: {
  readonly fallbackAxisSide: "none";
};
/**
 * Used by regular popups that usually aren't scrollable and are allowed to
 * freely flip to any axis of placement.
 */
export declare const POPUP_COLLISION_AVOIDANCE: {
  readonly fallbackAxisSide: "end";
};