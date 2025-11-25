import { createSelector } from '@base-ui-components/utils/store';
export const selectors = {
  id: createSelector(state => state.id),
  modal: createSelector(state => state.modal),
  multiple: createSelector(state => state.multiple),
  items: createSelector(state => state.items),
  value: createSelector(state => state.value),
  label: createSelector(state => state.label),
  open: createSelector(state => state.open),
  mounted: createSelector(state => state.mounted),
  forceMount: createSelector(state => state.forceMount),
  transitionStatus: createSelector(state => state.transitionStatus),
  touchModality: createSelector(state => state.touchModality),
  activeIndex: createSelector(state => state.activeIndex),
  selectedIndex: createSelector(state => state.selectedIndex),
  isActive: createSelector((state, index) => state.activeIndex === index),
  isSelected: createSelector((state, index, value) => {
    if (state.multiple) {
      return Array.isArray(state.value) && state.value.includes(value);
    }
    // `selectedIndex` is only updated after the items mount for the first time,
    // the value check avoids a re-render for the initially selected item.
    return state.selectedIndex === index || state.value === value;
  }),
  isSelectedByFocus: createSelector((state, index) => {
    return state.selectedIndex === index;
  }),
  popupProps: createSelector(state => state.popupProps),
  triggerProps: createSelector(state => state.triggerProps),
  triggerElement: createSelector(state => state.triggerElement),
  positionerElement: createSelector(state => state.positionerElement),
  scrollUpArrowVisible: createSelector(state => state.scrollUpArrowVisible),
  scrollDownArrowVisible: createSelector(state => state.scrollDownArrowVisible)
};