"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = void 0;
var _store = require("@base-ui-components/utils/store");
const selectors = exports.selectors = {
  id: (0, _store.createSelector)(state => state.id),
  modal: (0, _store.createSelector)(state => state.modal),
  multiple: (0, _store.createSelector)(state => state.multiple),
  items: (0, _store.createSelector)(state => state.items),
  value: (0, _store.createSelector)(state => state.value),
  label: (0, _store.createSelector)(state => state.label),
  open: (0, _store.createSelector)(state => state.open),
  mounted: (0, _store.createSelector)(state => state.mounted),
  forceMount: (0, _store.createSelector)(state => state.forceMount),
  transitionStatus: (0, _store.createSelector)(state => state.transitionStatus),
  touchModality: (0, _store.createSelector)(state => state.touchModality),
  activeIndex: (0, _store.createSelector)(state => state.activeIndex),
  selectedIndex: (0, _store.createSelector)(state => state.selectedIndex),
  isActive: (0, _store.createSelector)((state, index) => state.activeIndex === index),
  isSelected: (0, _store.createSelector)((state, index, value) => {
    if (state.multiple) {
      return Array.isArray(state.value) && state.value.includes(value);
    }
    // `selectedIndex` is only updated after the items mount for the first time,
    // the value check avoids a re-render for the initially selected item.
    return state.selectedIndex === index || state.value === value;
  }),
  isSelectedByFocus: (0, _store.createSelector)((state, index) => {
    return state.selectedIndex === index;
  }),
  popupProps: (0, _store.createSelector)(state => state.popupProps),
  triggerProps: (0, _store.createSelector)(state => state.triggerProps),
  triggerElement: (0, _store.createSelector)(state => state.triggerElement),
  positionerElement: (0, _store.createSelector)(state => state.positionerElement),
  scrollUpArrowVisible: (0, _store.createSelector)(state => state.scrollUpArrowVisible),
  scrollDownArrowVisible: (0, _store.createSelector)(state => state.scrollDownArrowVisible)
};