"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFloatingRootContext = useFloatingRootContext;
var React = _interopRequireWildcard(require("react"));
var _dom = require("@floating-ui/utils/dom");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useId = require("@base-ui-components/utils/useId");
var _createEventEmitter = require("../utils/createEventEmitter");
var _FloatingTree = require("../components/FloatingTree");
function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange: onOpenChangeProp,
    elements: elementsProp
  } = options;
  const floatingId = (0, _useId.useId)();
  const dataRef = React.useRef({});
  const [events] = React.useState(() => (0, _createEventEmitter.createEventEmitter)());
  const nested = (0, _FloatingTree.useFloatingParentNodeId)() != null;
  if (process.env.NODE_ENV !== 'production') {
    const optionDomReference = elementsProp.reference;
    if (optionDomReference && !(0, _dom.isElement)(optionDomReference)) {
      console.error('Cannot pass a virtual element to the `elements.reference` option,', 'as it must be a real DOM element. Use `refs.setPositionReference()`', 'instead.');
    }
  }
  const [positionReference, setPositionReference] = React.useState(elementsProp.reference);
  const onOpenChange = (0, _useEventCallback.useEventCallback)((newOpen, eventDetails) => {
    dataRef.current.openEvent = newOpen ? eventDetails.event : undefined;
    if (!options.noEmit) {
      const details = {
        open: newOpen,
        reason: eventDetails.reason,
        nativeEvent: eventDetails.event,
        nested
      };
      events.emit('openchange', details);
    }
    onOpenChangeProp?.(newOpen, eventDetails);
  });
  const refs = React.useMemo(() => ({
    setPositionReference
  }), []);
  const elements = React.useMemo(() => ({
    reference: positionReference || elementsProp.reference || null,
    floating: elementsProp.floating || null,
    domReference: elementsProp.reference
  }), [positionReference, elementsProp.reference, elementsProp.floating]);
  return React.useMemo(() => ({
    dataRef,
    open,
    onOpenChange,
    elements,
    events,
    floatingId,
    refs
  }), [open, onOpenChange, elements, events, floatingId, refs]);
}