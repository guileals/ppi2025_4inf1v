"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = void 0;
var _store = require("@base-ui-components/utils/store");
const selectors = exports.selectors = {
  id: (0, _store.createSelector)(state => state.id),
  query: (0, _store.createSelector)(state => state.query),
  items: (0, _store.createSelector)(state => state.items),
  selectedValue: (0, _store.createSelector)(state => state.selectedValue),
  inputValue: (0, _store.createSelector)(state => state.inputValue),
  open: (0, _store.createSelector)(state => state.open),
  mounted: (0, _store.createSelector)(state => state.mounted),
  forceMounted: (0, _store.createSelector)(state => state.forceMounted),
  inline: (0, _store.createSelector)(state => state.inline),
  activeIndex: (0, _store.createSelector)(state => state.activeIndex),
  selectedIndex: (0, _store.createSelector)(state => state.selectedIndex),
  isActive: (0, _store.createSelector)((state, index) => state.activeIndex === index),
  isSelected: (0, _store.createSelector)((state, selectedValue) => {
    if (Array.isArray(state.selectedValue)) {
      return state.selectedValue.includes(selectedValue);
    }
    return state.selectedValue === selectedValue;
  }),
  transitionStatus: (0, _store.createSelector)(state => state.transitionStatus),
  popupProps: (0, _store.createSelector)(state => state.popupProps),
  inputProps: (0, _store.createSelector)(state => state.inputProps),
  triggerProps: (0, _store.createSelector)(state => state.triggerProps),
  typeaheadTriggerProps: (0, _store.createSelector)(state => state.typeaheadTriggerProps),
  getItemProps: (0, _store.createSelector)(state => state.getItemProps),
  positionerElement: (0, _store.createSelector)(state => state.positionerElement),
  listElement: (0, _store.createSelector)(state => state.listElement),
  triggerElement: (0, _store.createSelector)(state => state.triggerElement),
  inputElement: (0, _store.createSelector)(state => state.inputElement),
  openMethod: (0, _store.createSelector)(state => state.openMethod),
  inputInsidePopup: (0, _store.createSelector)(state => state.inputInsidePopup),
  selectionMode: (0, _store.createSelector)(state => state.selectionMode),
  listRef: (0, _store.createSelector)(state => state.listRef),
  popupRef: (0, _store.createSelector)(state => state.popupRef),
  inputRef: (0, _store.createSelector)(state => state.inputRef),
  keyboardActiveRef: (0, _store.createSelector)(state => state.keyboardActiveRef),
  chipsContainerRef: (0, _store.createSelector)(state => state.chipsContainerRef),
  clearRef: (0, _store.createSelector)(state => state.clearRef),
  valuesRef: (0, _store.createSelector)(state => state.valuesRef),
  allValuesRef: (0, _store.createSelector)(state => state.allValuesRef),
  name: (0, _store.createSelector)(state => state.name),
  disabled: (0, _store.createSelector)(state => state.disabled),
  readOnly: (0, _store.createSelector)(state => state.readOnly),
  required: (0, _store.createSelector)(state => state.required),
  fieldControlValidation: (0, _store.createSelector)(state => state.fieldControlValidation),
  cols: (0, _store.createSelector)(state => state.cols),
  isGrouped: (0, _store.createSelector)(state => state.isGrouped),
  virtualized: (0, _store.createSelector)(state => state.virtualized),
  onOpenChangeComplete: (0, _store.createSelector)(state => state.onOpenChangeComplete),
  openOnInputClick: (0, _store.createSelector)(state => state.openOnInputClick),
  itemToStringLabel: (0, _store.createSelector)(state => state.itemToStringLabel),
  modal: (0, _store.createSelector)(state => state.modal),
  autoHighlight: (0, _store.createSelector)(state => state.autoHighlight)
};