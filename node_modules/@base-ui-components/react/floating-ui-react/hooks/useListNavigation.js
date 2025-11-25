"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ESCAPE = void 0;
exports.useListNavigation = useListNavigation;
var React = _interopRequireWildcard(require("react"));
var _dom = require("@floating-ui/utils/dom");
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _utils = require("../utils");
var _FloatingTree = require("../components/FloatingTree");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _enqueueFocus = require("../utils/enqueueFocus");
var _constants = require("../utils/constants");
const ESCAPE = exports.ESCAPE = 'Escape';
function doSwitch(orientation, vertical, horizontal) {
  switch (orientation) {
    case 'vertical':
      return vertical;
    case 'horizontal':
      return horizontal;
    default:
      return vertical || horizontal;
  }
}
function isMainOrientationKey(key, orientation) {
  const vertical = key === _constants.ARROW_UP || key === _constants.ARROW_DOWN;
  const horizontal = key === _constants.ARROW_LEFT || key === _constants.ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
  const vertical = key === _constants.ARROW_DOWN;
  const horizontal = rtl ? key === _constants.ARROW_LEFT : key === _constants.ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal) || key === 'Enter' || key === ' ' || key === '';
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
  const vertical = rtl ? key === _constants.ARROW_LEFT : key === _constants.ARROW_RIGHT;
  const horizontal = key === _constants.ARROW_DOWN;
  return doSwitch(orientation, vertical, horizontal);
}
function isCrossOrientationCloseKey(key, orientation, rtl, cols) {
  const vertical = rtl ? key === _constants.ARROW_RIGHT : key === _constants.ARROW_LEFT;
  const horizontal = key === _constants.ARROW_UP;
  if (orientation === 'both' || orientation === 'horizontal' && cols && cols > 1) {
    return key === ESCAPE;
  }
  return doSwitch(orientation, vertical, horizontal);
}
/**
 * Adds arrow key-based navigation of a list of items, either using real DOM
 * focus or virtual focus.
 * @see https://floating-ui.com/docs/useListNavigation
 */
function useListNavigation(context, props) {
  const {
    open,
    onOpenChange,
    elements
  } = context;
  const {
    listRef,
    activeIndex,
    onNavigate: onNavigateProp = () => {},
    enabled = true,
    selectedIndex = null,
    allowEscape = false,
    loop = false,
    nested = false,
    rtl = false,
    virtual = false,
    focusItemOnOpen = 'auto',
    focusItemOnHover = true,
    openOnArrowKeyDown = true,
    disabledIndices = undefined,
    orientation = 'vertical',
    parentOrientation,
    cols = 1,
    scrollItemIntoView = true,
    itemSizes,
    dense = false,
    id
  } = props;
  if (process.env.NODE_ENV !== 'production') {
    if (allowEscape) {
      if (!loop) {
        console.warn('`useListNavigation` looping must be enabled to allow escaping.');
      }
      if (!virtual) {
        console.warn('`useListNavigation` must be virtual to allow escaping.');
      }
    }
    if (orientation === 'vertical' && cols > 1) {
      console.warn('In grid list navigation mode (`cols` > 1), the `orientation` should', 'be either "horizontal" or "both".');
    }
  }
  const floatingFocusElement = (0, _utils.getFloatingFocusElement)(elements.floating);
  const floatingFocusElementRef = (0, _useLatestRef.useLatestRef)(floatingFocusElement);
  const parentId = (0, _FloatingTree.useFloatingParentNodeId)();
  const tree = (0, _FloatingTree.useFloatingTree)();
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    context.dataRef.current.orientation = orientation;
  }, [context, orientation]);
  const typeableComboboxReference = (0, _utils.isTypeableCombobox)(elements.domReference);
  const focusItemOnOpenRef = React.useRef(focusItemOnOpen);
  const indexRef = React.useRef(selectedIndex ?? -1);
  const keyRef = React.useRef(null);
  const isPointerModalityRef = React.useRef(true);
  const onNavigate = (0, _useEventCallback.useEventCallback)(event => {
    onNavigateProp(indexRef.current === -1 ? null : indexRef.current, event);
  });
  const previousOnNavigateRef = React.useRef(onNavigate);
  const previousMountedRef = React.useRef(!!elements.floating);
  const previousOpenRef = React.useRef(open);
  const forceSyncFocusRef = React.useRef(false);
  const forceScrollIntoViewRef = React.useRef(false);
  const disabledIndicesRef = (0, _useLatestRef.useLatestRef)(disabledIndices);
  const latestOpenRef = (0, _useLatestRef.useLatestRef)(open);
  const scrollItemIntoViewRef = (0, _useLatestRef.useLatestRef)(scrollItemIntoView);
  const selectedIndexRef = (0, _useLatestRef.useLatestRef)(selectedIndex);
  const focusItem = (0, _useEventCallback.useEventCallback)(() => {
    function runFocus(item) {
      if (virtual) {
        tree?.events.emit('virtualfocus', item);
      } else {
        (0, _enqueueFocus.enqueueFocus)(item, {
          sync: forceSyncFocusRef.current,
          preventScroll: true
        });
      }
    }
    const initialItem = listRef.current[indexRef.current];
    const forceScrollIntoView = forceScrollIntoViewRef.current;
    if (initialItem) {
      runFocus(initialItem);
    }
    const scheduler = forceSyncFocusRef.current ? v => v() : requestAnimationFrame;
    scheduler(() => {
      const waitedItem = listRef.current[indexRef.current] || initialItem;
      if (!waitedItem) {
        return;
      }
      if (!initialItem) {
        runFocus(waitedItem);
      }
      const scrollIntoViewOptions = scrollItemIntoViewRef.current;
      const shouldScrollIntoView = scrollIntoViewOptions &&
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      item && (forceScrollIntoView || !isPointerModalityRef.current);
      if (shouldScrollIntoView) {
        // JSDOM doesn't support `.scrollIntoView()` but it's widely supported
        // by all browsers.
        waitedItem.scrollIntoView?.(typeof scrollIntoViewOptions === 'boolean' ? {
          block: 'nearest',
          inline: 'nearest'
        } : scrollIntoViewOptions);
      }
    });
  });

  // Sync `selectedIndex` to be the `activeIndex` upon opening the floating
  // element. Also, reset `activeIndex` upon closing the floating element.
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!enabled) {
      return;
    }
    if (open && elements.floating) {
      if (focusItemOnOpenRef.current && selectedIndex != null) {
        // Regardless of the pointer modality, we want to ensure the selected
        // item comes into view when the floating element is opened.
        forceScrollIntoViewRef.current = true;
        indexRef.current = selectedIndex;
        onNavigate();
      }
    } else if (previousMountedRef.current) {
      // Since the user can specify `onNavigate` conditionally
      // (onNavigate: open ? setActiveIndex : setSelectedIndex),
      // we store and call the previous function.
      indexRef.current = -1;
      previousOnNavigateRef.current();
    }
  }, [enabled, open, elements.floating, selectedIndex, onNavigate]);

  // Sync `activeIndex` to be the focused item while the floating element is
  // open.
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!enabled) {
      return;
    }
    if (!open) {
      return;
    }
    if (!elements.floating) {
      return;
    }
    if (activeIndex == null) {
      forceSyncFocusRef.current = false;
      if (selectedIndexRef.current != null) {
        return;
      }

      // Reset while the floating element was open (e.g. the list changed).
      if (previousMountedRef.current) {
        indexRef.current = -1;
        focusItem();
      }

      // Initial sync.
      if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
        let runs = 0;
        const waitForListPopulated = () => {
          if (listRef.current[0] == null) {
            // Avoid letting the browser paint if possible on the first try,
            // otherwise use rAF. Don't try more than twice, since something
            // is wrong otherwise.
            if (runs < 2) {
              const scheduler = runs ? requestAnimationFrame : queueMicrotask;
              scheduler(waitForListPopulated);
            }
            runs += 1;
          } else {
            indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? (0, _utils.getMinListIndex)(listRef, disabledIndicesRef.current) : (0, _utils.getMaxListIndex)(listRef, disabledIndicesRef.current);
            keyRef.current = null;
            onNavigate();
          }
        };
        waitForListPopulated();
      }
    } else if (!(0, _utils.isIndexOutOfListBounds)(listRef, activeIndex)) {
      indexRef.current = activeIndex;
      focusItem();
      forceScrollIntoViewRef.current = false;
    }
  }, [enabled, open, elements.floating, activeIndex, selectedIndexRef, nested, listRef, orientation, rtl, onNavigate, focusItem, disabledIndicesRef]);

  // Ensure the parent floating element has focus when a nested child closes
  // to allow arrow key navigation to work after the pointer leaves the child.
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!enabled || elements.floating || !tree || virtual || !previousMountedRef.current) {
      return;
    }
    const nodes = tree.nodesRef.current;
    const parent = nodes.find(node => node.id === parentId)?.context?.elements.floating;
    const activeEl = (0, _utils.activeElement)((0, _utils.getDocument)(elements.floating));
    const treeContainsActiveEl = nodes.some(node => node.context && (0, _utils.contains)(node.context.elements.floating, activeEl));
    if (parent && !treeContainsActiveEl && isPointerModalityRef.current) {
      parent.focus({
        preventScroll: true
      });
    }
  }, [enabled, elements.floating, tree, parentId, virtual]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    previousOnNavigateRef.current = onNavigate;
    previousOpenRef.current = open;
    previousMountedRef.current = !!elements.floating;
  });
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!open) {
      keyRef.current = null;
      focusItemOnOpenRef.current = focusItemOnOpen;
    }
  }, [open, focusItemOnOpen]);
  const hasActiveIndex = activeIndex != null;
  const item = React.useMemo(() => {
    function syncCurrentTarget(event) {
      if (!latestOpenRef.current) {
        return;
      }
      const index = listRef.current.indexOf(event.currentTarget);
      if (index !== -1 && indexRef.current !== index) {
        indexRef.current = index;
        onNavigate(event);
      }
    }
    const itemProps = {
      onFocus(event) {
        forceSyncFocusRef.current = true;
        syncCurrentTarget(event);
      },
      onClick: ({
        currentTarget
      }) => currentTarget.focus({
        preventScroll: true
      }),
      // Safari
      onMouseMove(event) {
        forceSyncFocusRef.current = true;
        forceScrollIntoViewRef.current = false;
        if (focusItemOnHover) {
          syncCurrentTarget(event);
        }
      },
      onPointerLeave(event) {
        if (!isPointerModalityRef.current || event.pointerType === 'touch') {
          return;
        }
        forceSyncFocusRef.current = true;
        const relatedTarget = event.relatedTarget;
        if (!focusItemOnHover || listRef.current.includes(relatedTarget)) {
          return;
        }
        indexRef.current = -1;
        onNavigate(event);
        if (!virtual) {
          floatingFocusElementRef.current?.focus({
            preventScroll: true
          });
        }
      }
    };
    return itemProps;
  }, [latestOpenRef, floatingFocusElementRef, focusItemOnHover, listRef, onNavigate, virtual]);
  const getParentOrientation = React.useCallback(() => {
    return parentOrientation ?? tree?.nodesRef.current.find(node => node.id === parentId)?.context?.dataRef?.current.orientation;
  }, [parentId, tree, parentOrientation]);
  const commonOnKeyDown = (0, _useEventCallback.useEventCallback)(event => {
    isPointerModalityRef.current = false;
    forceSyncFocusRef.current = true;

    // When composing a character, Chrome fires ArrowDown twice. Firefox/Safari
    // don't appear to suffer from this. `event.isComposing` is avoided due to
    // Safari not supporting it properly (although it's not needed in the first
    // place for Safari, just avoiding any possible issues).
    if (event.which === 229) {
      return;
    }

    // If the floating element is animating out, ignore navigation. Otherwise,
    // the `activeIndex` gets set to 0 despite not being open so the next time
    // the user ArrowDowns, the first item won't be focused.
    if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) {
      return;
    }
    if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl, cols)) {
      // If the nested list's close key is also the parent navigation key,
      // let the parent navigate. Otherwise, stop propagating the event.
      if (!isMainOrientationKey(event.key, getParentOrientation())) {
        (0, _utils.stopEvent)(event);
      }
      onOpenChange(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('list-navigation', event.nativeEvent));
      if ((0, _dom.isHTMLElement)(elements.domReference)) {
        if (virtual) {
          tree?.events.emit('virtualfocus', elements.domReference);
        } else {
          elements.domReference.focus();
        }
      }
      return;
    }
    const currentIndex = indexRef.current;
    const minIndex = (0, _utils.getMinListIndex)(listRef, disabledIndices);
    const maxIndex = (0, _utils.getMaxListIndex)(listRef, disabledIndices);
    if (!typeableComboboxReference) {
      if (event.key === 'Home') {
        (0, _utils.stopEvent)(event);
        indexRef.current = minIndex;
        onNavigate(event);
      }
      if (event.key === 'End') {
        (0, _utils.stopEvent)(event);
        indexRef.current = maxIndex;
        onNavigate(event);
      }
    }

    // Grid navigation.
    if (cols > 1) {
      const sizes = itemSizes || Array.from({
        length: listRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      // To calculate movements on the grid, we use hypothetical cell indices
      // as if every item was 1x1, then convert back to real indices.
      const cellMap = (0, _utils.createGridCellMap)(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex(index => index != null && !(0, _utils.isListIndexDisabled)(listRef, index, disabledIndices));
      // last enabled index
      const maxGridIndex = cellMap.reduce((foundIndex, index, cellIndex) => index != null && !(0, _utils.isListIndexDisabled)(listRef, index, disabledIndices) ? cellIndex : foundIndex, -1);
      const index = cellMap[(0, _utils.getGridNavigatedIndex)({
        current: cellMap.map(itemIndex => itemIndex != null ? listRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loop,
        rtl,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: (0, _utils.getGridCellIndices)([...((typeof disabledIndices !== 'function' ? disabledIndices : null) || listRef.current.map((_, listIndex) => (0, _utils.isListIndexDisabled)(listRef, listIndex, disabledIndices) ? listIndex : undefined)), undefined], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: (0, _utils.getGridCellIndexOfCorner)(indexRef.current > maxIndex ? minIndex : indexRef.current, sizes, cellMap, cols,
        // use a corner matching the edge closest to the direction
        // we're moving in so we don't end up in the same item. Prefer
        // top/left over bottom/right.
        // eslint-disable-next-line no-nested-ternary
        event.key === _constants.ARROW_DOWN ? 'bl' : event.key === (rtl ? _constants.ARROW_LEFT : _constants.ARROW_RIGHT) ? 'tr' : 'tl'),
        stopEvent: true
      })];
      if (index != null) {
        indexRef.current = index;
        onNavigate(event);
      }
      if (orientation === 'both') {
        return;
      }
    }
    if (isMainOrientationKey(event.key, orientation)) {
      (0, _utils.stopEvent)(event);

      // Reset the index if no item is focused.
      if (open && !virtual && (0, _utils.activeElement)(event.currentTarget.ownerDocument) === event.currentTarget) {
        indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
        onNavigate(event);
        return;
      }
      if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
        if (loop) {
          if (currentIndex >= maxIndex) {
            if (allowEscape && currentIndex !== listRef.current.length) {
              indexRef.current = -1;
            } else {
              // Give time for virtualizers to update the listRef.
              forceSyncFocusRef.current = false;
              indexRef.current = minIndex;
            }
          } else {
            indexRef.current = (0, _utils.findNonDisabledListIndex)(listRef, {
              startingIndex: currentIndex,
              disabledIndices
            });
          }
        } else {
          indexRef.current = Math.min(maxIndex, (0, _utils.findNonDisabledListIndex)(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          }));
        }
      } else if (loop) {
        if (currentIndex <= minIndex) {
          if (allowEscape && currentIndex !== -1) {
            indexRef.current = listRef.current.length;
          } else {
            // Give time for virtualizers to update the listRef.
            forceSyncFocusRef.current = false;
            indexRef.current = maxIndex;
          }
        } else {
          indexRef.current = (0, _utils.findNonDisabledListIndex)(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          });
        }
      } else {
        indexRef.current = Math.max(minIndex, (0, _utils.findNonDisabledListIndex)(listRef, {
          startingIndex: currentIndex,
          decrement: true,
          disabledIndices
        }));
      }
      if ((0, _utils.isIndexOutOfListBounds)(listRef, indexRef.current)) {
        indexRef.current = -1;
      }
      onNavigate(event);
    }
  });
  const ariaActiveDescendantProp = React.useMemo(() => {
    return virtual && open && hasActiveIndex && {
      'aria-activedescendant': `${id}-${activeIndex}`
    };
  }, [virtual, open, hasActiveIndex, id, activeIndex]);
  const floating = React.useMemo(() => {
    return {
      'aria-orientation': orientation === 'both' ? undefined : orientation,
      ...(!typeableComboboxReference ? ariaActiveDescendantProp : {}),
      onKeyDown(event) {
        // Close submenu on Shift+Tab
        if (event.key === 'Tab' && event.shiftKey && open && !virtual) {
          (0, _utils.stopEvent)(event);
          onOpenChange(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('list-navigation', event.nativeEvent));
          if ((0, _dom.isHTMLElement)(elements.domReference)) {
            elements.domReference.focus();
          }
          return;
        }
        commonOnKeyDown(event);
      },
      onPointerMove() {
        isPointerModalityRef.current = true;
      }
    };
  }, [ariaActiveDescendantProp, commonOnKeyDown, orientation, typeableComboboxReference, onOpenChange, open, virtual, elements.domReference]);
  const reference = React.useMemo(() => {
    function checkVirtualMouse(event) {
      if (focusItemOnOpen === 'auto' && (0, _utils.isVirtualClick)(event.nativeEvent)) {
        focusItemOnOpenRef.current = !virtual;
      }
    }
    function checkVirtualPointer(event) {
      // `pointerdown` fires first, reset the state then perform the checks.
      focusItemOnOpenRef.current = focusItemOnOpen;
      if (focusItemOnOpen === 'auto' && (0, _utils.isVirtualPointerEvent)(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    return {
      ...ariaActiveDescendantProp,
      onKeyDown(event) {
        isPointerModalityRef.current = false;
        const isArrowKey = event.key.startsWith('Arrow');
        const isParentCrossOpenKey = isCrossOrientationOpenKey(event.key, getParentOrientation(), rtl);
        const isMainKey = isMainOrientationKey(event.key, orientation);
        const isNavigationKey = (nested ? isParentCrossOpenKey : isMainKey) || event.key === 'Enter' || event.key.trim() === '';
        if (virtual && open) {
          return commonOnKeyDown(event);
        }

        // If a floating element should not open on arrow key down, avoid
        // setting `activeIndex` while it's closed.
        if (!open && !openOnArrowKeyDown && isArrowKey) {
          return undefined;
        }
        if (isNavigationKey) {
          const isParentMainKey = isMainOrientationKey(event.key, getParentOrientation());
          keyRef.current = nested && isParentMainKey ? null : event.key;
        }
        if (nested) {
          if (isParentCrossOpenKey) {
            (0, _utils.stopEvent)(event);
            if (open) {
              indexRef.current = (0, _utils.getMinListIndex)(listRef, disabledIndicesRef.current);
              onNavigate(event);
            } else {
              onOpenChange(true, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('list-navigation', event.nativeEvent));
            }
          }
          return undefined;
        }
        if (isMainKey) {
          if (selectedIndex != null) {
            indexRef.current = selectedIndex;
          }
          (0, _utils.stopEvent)(event);
          if (!open && openOnArrowKeyDown) {
            onOpenChange(true, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('list-navigation', event.nativeEvent));
          } else {
            commonOnKeyDown(event);
          }
          if (open) {
            onNavigate(event);
          }
        }
        return undefined;
      },
      onFocus(event) {
        if (open && !virtual) {
          indexRef.current = -1;
          onNavigate(event);
        }
      },
      onPointerDown: checkVirtualPointer,
      onPointerEnter: checkVirtualPointer,
      onMouseDown: checkVirtualMouse,
      onClick: checkVirtualMouse
    };
  }, [ariaActiveDescendantProp, commonOnKeyDown, disabledIndicesRef, focusItemOnOpen, listRef, nested, onNavigate, onOpenChange, open, openOnArrowKeyDown, orientation, getParentOrientation, rtl, selectedIndex, virtual]);
  return React.useMemo(() => enabled ? {
    reference,
    floating,
    item
  } : {}, [enabled, reference, floating, item]);
}