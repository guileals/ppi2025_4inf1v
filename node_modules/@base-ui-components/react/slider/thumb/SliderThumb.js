"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderThumb = void 0;
var React = _interopRequireWildcard(require("react"));
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _visuallyHidden = require("@base-ui-components/utils/visuallyHidden");
var _formatNumber = require("../../utils/formatNumber");
var _mergeProps = require("../../merge-props");
var _useBaseUiId = require("../../utils/useBaseUiId");
var _useRenderElement = require("../../utils/useRenderElement");
var _composite = require("../../composite/composite");
var _useCompositeListItem = require("../../composite/list/useCompositeListItem");
var _DirectionContext = require("../../direction-provider/DirectionContext");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _getSliderValue = require("../utils/getSliderValue");
var _roundValueToStep = require("../utils/roundValueToStep");
var _valueArrayToPercentages = require("../utils/valueArrayToPercentages");
var _SliderRootContext = require("../root/SliderRootContext");
var _styleHooks = require("../root/styleHooks");
var _SliderThumbDataAttributes = require("./SliderThumbDataAttributes");
var _jsxRuntime = require("react/jsx-runtime");
const PAGE_UP = 'PageUp';
const PAGE_DOWN = 'PageDown';
const ALL_KEYS = new Set([_composite.ARROW_UP, _composite.ARROW_DOWN, _composite.ARROW_LEFT, _composite.ARROW_RIGHT, _composite.HOME, _composite.END, PAGE_UP, PAGE_DOWN]);
function getDefaultAriaValueText(values, index, format, locale) {
  if (index < 0) {
    return undefined;
  }
  if (values.length === 2) {
    if (index === 0) {
      return `${(0, _formatNumber.formatNumber)(values[index], locale, format)} start range`;
    }
    return `${(0, _formatNumber.formatNumber)(values[index], locale, format)} end range`;
  }
  return format ? (0, _formatNumber.formatNumber)(values[index], locale, format) : undefined;
}
function getNewValue(thumbValue, step, direction, min, max) {
  return direction === 1 ? Math.min(thumbValue + step, max) : Math.max(thumbValue - step, min);
}

/**
 * The draggable part of the the slider at the tip of the indicator.
 * Renders a `<div>` element and a nested `<input type="range">`.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
const SliderThumb = exports.SliderThumb = /*#__PURE__*/React.forwardRef(function SliderThumb(componentProps, forwardedRef) {
  const {
    render,
    children: childrenProp,
    className,
    'aria-describedby': ariaDescribedByProp,
    'aria-label': ariaLabelProp,
    'aria-labelledby': ariaLabelledByProp,
    disabled: disabledProp = false,
    getAriaLabel: getAriaLabelProp,
    getAriaValueText: getAriaValueTextProp,
    id: idProp,
    index: indexProp,
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    onKeyDown: onKeyDownProp,
    tabIndex: tabIndexProp,
    ...elementProps
  } = componentProps;
  const id = (0, _useBaseUiId.useBaseUiId)(idProp);
  const inputId = `${id}-input`;
  const {
    active: activeIndex,
    disabled: contextDisabled,
    pressedInputRef,
    fieldControlValidation,
    formatOptionsRef,
    handleInputChange,
    labelId,
    largeStep,
    locale,
    max,
    min,
    minStepsBetweenValues,
    orientation,
    setActive,
    state,
    step,
    values: sliderValues
  } = (0, _SliderRootContext.useSliderRootContext)();
  const disabled = disabledProp || contextDisabled;
  const direction = (0, _DirectionContext.useDirection)();
  const {
    controlId,
    setControlId,
    setTouched,
    setFocused,
    validationMode
  } = (0, _FieldRootContext.useFieldRootContext)();
  const thumbRef = React.useRef(null);
  const inputRef = React.useRef(null);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    setControlId(inputId);
    return () => {
      setControlId(undefined);
    };
  }, [controlId, inputId, setControlId]);
  const thumbMetadata = React.useMemo(() => ({
    inputId
  }), [inputId]);
  const {
    ref: listItemRef,
    index: compositeIndex
  } = (0, _useCompositeListItem.useCompositeListItem)({
    metadata: thumbMetadata
  });
  const index = indexProp ?? compositeIndex;
  const thumbValue = sliderValues[index];
  const percentageValues = (0, _valueArrayToPercentages.valueArrayToPercentages)(sliderValues.slice(), min, max);
  // for SSR, don't wait for the index if there's only one thumb
  const percent = percentageValues.length === 1 ? percentageValues[0] : percentageValues[index];
  const isRtl = direction === 'rtl';
  const getThumbStyle = React.useCallback(() => {
    const isVertical = orientation === 'vertical';
    if (!Number.isFinite(percent)) {
      return _visuallyHidden.visuallyHidden;
    }
    return {
      position: 'absolute',
      [{
        horizontal: 'insetInlineStart',
        vertical: 'bottom'
      }[orientation]]: `${percent}%`,
      [isVertical ? 'left' : 'top']: '50%',
      transform: `translate(${(isVertical || !isRtl ? -1 : 1) * 50}%, ${(isVertical ? 1 : -1) * 50}%)`,
      zIndex: activeIndex === index ? 1 : undefined
    };
  }, [activeIndex, isRtl, orientation, percent, index]);
  let cssWritingMode;
  if (orientation === 'vertical') {
    cssWritingMode = isRtl ? 'vertical-rl' : 'vertical-lr';
  }
  const inputProps = (0, _mergeProps.mergeProps)({
    'aria-label': typeof getAriaLabelProp === 'function' ? getAriaLabelProp(index) : ariaLabelProp,
    'aria-labelledby': ariaLabelledByProp ?? labelId,
    'aria-describedby': ariaDescribedByProp,
    'aria-orientation': orientation,
    'aria-valuemax': max,
    'aria-valuemin': min,
    'aria-valuenow': thumbValue,
    'aria-valuetext': typeof getAriaValueTextProp === 'function' ? getAriaValueTextProp((0, _formatNumber.formatNumber)(thumbValue, locale, formatOptionsRef.current ?? undefined), thumbValue, index) : getDefaultAriaValueText(sliderValues, index, formatOptionsRef.current ?? undefined, locale),
    disabled,
    id: inputId,
    max,
    min,
    onChange(event) {
      handleInputChange(event.target.valueAsNumber, index, event);
    },
    onFocus() {
      setActive(index);
      setFocused(true);
    },
    onBlur() {
      if (!thumbRef.current) {
        return;
      }
      setActive(-1);
      setTouched(true);
      setFocused(false);
      if (validationMode === 'onBlur') {
        fieldControlValidation.commitValidation((0, _getSliderValue.getSliderValue)(thumbValue, index, min, max, sliderValues.length > 1, sliderValues));
      }
    },
    onKeyDown(event) {
      if (!ALL_KEYS.has(event.key)) {
        return;
      }
      if (_composite.COMPOSITE_KEYS.has(event.key)) {
        event.stopPropagation();
      }
      let newValue = null;
      const isRange = sliderValues.length > 1;
      const roundedValue = (0, _roundValueToStep.roundValueToStep)(thumbValue, step, min);
      switch (event.key) {
        case _composite.ARROW_UP:
          newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, 1, min, max);
          break;
        case _composite.ARROW_RIGHT:
          newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, isRtl ? -1 : 1, min, max);
          break;
        case _composite.ARROW_DOWN:
          newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, -1, min, max);
          break;
        case _composite.ARROW_LEFT:
          newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, isRtl ? 1 : -1, min, max);
          break;
        case PAGE_UP:
          newValue = getNewValue(roundedValue, largeStep, 1, min, max);
          break;
        case PAGE_DOWN:
          newValue = getNewValue(roundedValue, largeStep, -1, min, max);
          break;
        case _composite.END:
          newValue = max;
          if (isRange) {
            newValue = Number.isFinite(sliderValues[index + 1]) ? sliderValues[index + 1] - step * minStepsBetweenValues : max;
          }
          break;
        case _composite.HOME:
          newValue = min;
          if (isRange) {
            newValue = Number.isFinite(sliderValues[index - 1]) ? sliderValues[index - 1] + step * minStepsBetweenValues : min;
          }
          break;
        default:
          break;
      }
      if (newValue !== null) {
        handleInputChange(newValue, index, event);
        event.preventDefault();
      }
    },
    step,
    style: {
      ..._visuallyHidden.visuallyHidden,
      // So that VoiceOver's focus indicator matches the thumb's dimensions
      width: '100%',
      height: '100%',
      writingMode: cssWritingMode
    },
    tabIndex: tabIndexProp ?? undefined,
    type: 'range',
    value: thumbValue ?? ''
  }, fieldControlValidation.getValidationProps);
  const children = childrenProp ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [childrenProp, /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ref: inputRef,
      ...inputProps
    })]
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
    ref: inputRef,
    ...inputProps
  });
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    ref: [forwardedRef, listItemRef, thumbRef],
    props: [{
      [_SliderThumbDataAttributes.SliderThumbDataAttributes.index]: index,
      children,
      id,
      onBlur: onBlurProp,
      onFocus: onFocusProp,
      onPointerDown() {
        if (inputRef.current != null && pressedInputRef.current !== inputRef.current) {
          pressedInputRef.current = inputRef.current;
        }
      },
      style: getThumbStyle(),
      tabIndex: -1
    }, elementProps],
    customStyleHookMapping: _styleHooks.sliderStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") SliderThumb.displayName = "SliderThumb";