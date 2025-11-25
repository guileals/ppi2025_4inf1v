"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTypeahead = useTypeahead;
var React = _interopRequireWildcard(require("react"));
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _utils = require("../utils");
/**
 * Provides a matching callback that can be used to focus an item as the user
 * types, often used in tandem with `useListNavigation()`.
 * @see https://floating-ui.com/docs/useTypeahead
 */
function useTypeahead(context, props) {
  const {
    open,
    dataRef
  } = context;
  const {
    listRef,
    activeIndex,
    onMatch: onMatchProp,
    onTypingChange: onTypingChangeProp,
    enabled = true,
    findMatch = null,
    resetMs = 750,
    ignoreKeys = [],
    selectedIndex = null
  } = props;
  const timeout = (0, _useTimeout.useTimeout)();
  const stringRef = React.useRef('');
  const prevIndexRef = React.useRef(selectedIndex ?? activeIndex ?? -1);
  const matchIndexRef = React.useRef(null);
  const onMatch = (0, _useEventCallback.useEventCallback)(onMatchProp);
  const onTypingChange = (0, _useEventCallback.useEventCallback)(onTypingChangeProp);
  const findMatchRef = (0, _useLatestRef.useLatestRef)(findMatch);
  const ignoreKeysRef = (0, _useLatestRef.useLatestRef)(ignoreKeys);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (open) {
      timeout.clear();
      matchIndexRef.current = null;
      stringRef.current = '';
    }
  }, [open, timeout]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    // Sync arrow key navigation but not typeahead navigation.
    if (open && stringRef.current === '') {
      prevIndexRef.current = selectedIndex ?? activeIndex ?? -1;
    }
  }, [open, selectedIndex, activeIndex]);
  const setTypingChange = (0, _useEventCallback.useEventCallback)(value => {
    if (value) {
      if (!dataRef.current.typing) {
        dataRef.current.typing = value;
        onTypingChange(value);
      }
    } else if (dataRef.current.typing) {
      dataRef.current.typing = value;
      onTypingChange(value);
    }
  });
  const onKeyDown = (0, _useEventCallback.useEventCallback)(event => {
    function getMatchingIndex(list, orderedList, string) {
      const str = findMatchRef.current ? findMatchRef.current(orderedList, string) : orderedList.find(text => text?.toLocaleLowerCase().indexOf(string.toLocaleLowerCase()) === 0);
      return str ? list.indexOf(str) : -1;
    }
    const listContent = listRef.current;
    if (stringRef.current.length > 0 && stringRef.current[0] !== ' ') {
      if (getMatchingIndex(listContent, listContent, stringRef.current) === -1) {
        setTypingChange(false);
      } else if (event.key === ' ') {
        (0, _utils.stopEvent)(event);
      }
    }
    if (listContent == null || ignoreKeysRef.current.includes(event.key) ||
    // Character key.
    event.key.length !== 1 ||
    // Modifier key.
    event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    if (open && event.key !== ' ') {
      (0, _utils.stopEvent)(event);
      setTypingChange(true);
    }

    // Bail out if the list contains a word like "llama" or "aaron". TODO:
    // allow it in this case, too.
    const allowRapidSuccessionOfFirstLetter = listContent.every(text => text ? text[0]?.toLocaleLowerCase() !== text[1]?.toLocaleLowerCase() : true);

    // Allows the user to cycle through items that start with the same letter
    // in rapid succession.
    if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
      stringRef.current = '';
      prevIndexRef.current = matchIndexRef.current;
    }
    stringRef.current += event.key;
    timeout.start(resetMs, () => {
      stringRef.current = '';
      prevIndexRef.current = matchIndexRef.current;
      setTypingChange(false);
    });
    const prevIndex = prevIndexRef.current;
    const index = getMatchingIndex(listContent, [...listContent.slice((prevIndex || 0) + 1), ...listContent.slice(0, (prevIndex || 0) + 1)], stringRef.current);
    if (index !== -1) {
      onMatch(index);
      matchIndexRef.current = index;
    } else if (event.key !== ' ') {
      stringRef.current = '';
      setTypingChange(false);
    }
  });
  const reference = React.useMemo(() => ({
    onKeyDown
  }), [onKeyDown]);
  const floating = React.useMemo(() => {
    return {
      onKeyDown,
      onKeyUp(event) {
        if (event.key === ' ') {
          setTypingChange(false);
        }
      }
    };
  }, [onKeyDown, setTypingChange]);
  return React.useMemo(() => enabled ? {
    reference,
    floating
  } : {}, [enabled, reference, floating]);
}