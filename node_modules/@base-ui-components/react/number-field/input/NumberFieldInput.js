"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberFieldInput = void 0;
var React = _interopRequireWildcard(require("react"));
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _utils = require("../../floating-ui-react/utils");
var _NumberFieldRootContext = require("../root/NumberFieldRootContext");
var _FieldRootContext = require("../../field/root/FieldRootContext");
var _useFieldControlValidation = require("../../field/control/useFieldControlValidation");
var _constants = require("../../field/utils/constants");
var _constants2 = require("../utils/constants");
var _parse = require("../utils/parse");
var _styleHooks = require("../utils/styleHooks");
var _useField = require("../../field/useField");
var _FormContext = require("../../form/FormContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _formatNumber = require("../../utils/formatNumber");
const customStyleHookMapping = {
  ..._constants.fieldValidityMapping,
  ..._styleHooks.styleHookMapping
};
const NAVIGATE_KEYS = new Set(['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Escape']);

/**
 * The native input control in the number field.
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Number Field](https://base-ui.com/react/components/number-field)
 */
const NumberFieldInput = exports.NumberFieldInput = /*#__PURE__*/React.forwardRef(function NumberFieldInput(componentProps, forwardedRef) {
  const {
    render,
    className,
    ...elementProps
  } = componentProps;
  const {
    allowInputSyncRef,
    disabled,
    formatOptionsRef,
    getAllowedNonNumericKeys,
    getStepAmount,
    id,
    incrementValue,
    inputMode,
    inputValue,
    max,
    min,
    name,
    readOnly,
    required,
    setValue,
    state,
    setInputValue,
    locale,
    inputRef,
    value
  } = (0, _NumberFieldRootContext.useNumberFieldRootContext)();
  const {
    clearErrors
  } = (0, _FormContext.useFormContext)();
  const {
    labelId,
    validationMode,
    setTouched,
    setFocused,
    invalid
  } = (0, _FieldRootContext.useFieldRootContext)();
  const {
    getInputValidationProps,
    getValidationProps,
    commitValidation,
    inputRef: inputValidationRef
  } = (0, _useFieldControlValidation.useFieldControlValidation)();
  const hasTouchedInputRef = React.useRef(false);
  const blockRevalidationRef = React.useRef(false);
  (0, _useField.useField)({
    id,
    commitValidation,
    value,
    controlRef: inputRef,
    name,
    getValue: () => value ?? null
  });
  const prevValueRef = React.useRef(value);
  const prevInputValueRef = React.useRef(inputValue);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (prevValueRef.current === value && prevInputValueRef.current === inputValue) {
      return;
    }
    clearErrors(name);
    if (validationMode === 'onChange') {
      commitValidation(value);
    }
  }, [value, inputValue, name, clearErrors, validationMode, commitValidation]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (prevValueRef.current === value || validationMode === 'onChange') {
      return;
    }
    if (blockRevalidationRef.current) {
      blockRevalidationRef.current = false;
      return;
    }
    commitValidation(value, true);
  }, [commitValidation, validationMode, value]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    prevValueRef.current = value;
    prevInputValueRef.current = inputValue;
  }, [value, inputValue]);
  const inputProps = {
    id,
    required,
    disabled,
    readOnly,
    inputMode,
    value: inputValue,
    type: 'text',
    autoComplete: 'off',
    autoCorrect: 'off',
    spellCheck: 'false',
    'aria-roledescription': 'Number field',
    'aria-invalid': invalid || undefined,
    'aria-labelledby': labelId,
    // If the server's locale does not match the client's locale, the formatting may not match,
    // causing a hydration mismatch.
    suppressHydrationWarning: true,
    onFocus(event) {
      if (event.defaultPrevented || readOnly || disabled || hasTouchedInputRef.current) {
        return;
      }
      hasTouchedInputRef.current = true;
      setFocused(true);

      // Browsers set selection at the start of the input field by default. We want to set it at
      // the end for the first focus.
      const target = event.currentTarget;
      const length = target.value.length;
      target.setSelectionRange(length, length);
    },
    onBlur(event) {
      if (event.defaultPrevented || readOnly || disabled) {
        return;
      }
      setTouched(true);
      setFocused(false);
      allowInputSyncRef.current = true;
      if (inputValue.trim() === '') {
        setValue(null);
        if (validationMode === 'onBlur') {
          commitValidation(null);
        }
        return;
      }
      const formatOptions = formatOptionsRef.current;
      const parsedValue = (0, _parse.parseNumber)(inputValue, locale, formatOptions);
      const canonicalText = (0, _formatNumber.formatNumber)(parsedValue, locale, formatOptions);
      const maxPrecisionText = (0, _formatNumber.formatNumberMaxPrecision)(parsedValue, locale, formatOptions);
      const canonical = (0, _parse.parseNumber)(canonicalText, locale, formatOptions);
      const maxPrecision = (0, _parse.parseNumber)(maxPrecisionText, locale, formatOptions);
      if (parsedValue === null) {
        return;
      }
      blockRevalidationRef.current = true;
      if (validationMode === 'onBlur') {
        commitValidation(canonical);
      }
      const hasExplicitPrecision = formatOptions?.maximumFractionDigits != null || formatOptions?.minimumFractionDigits != null;
      if (hasExplicitPrecision) {
        // When the consumer explicitly requests a precision, always round the number to that
        // precision and normalize the displayed text accordingly.
        if (value !== canonical) {
          setValue(canonical, event.nativeEvent);
        }
        if (inputValue !== canonicalText) {
          setInputValue(canonicalText);
        }
      } else if (value !== maxPrecision) {
        // Default behaviour: preserve max precision until it differs from canonical
        setValue(canonical, event.nativeEvent);
      } else {
        const shouldPreserveFullPrecision = parsedValue === value && inputValue === maxPrecisionText;
        if (!shouldPreserveFullPrecision && inputValue !== canonicalText) {
          setInputValue(canonicalText);
        }
      }
    },
    onChange(event) {
      // Workaround for https://github.com/facebook/react/issues/9023
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      allowInputSyncRef.current = false;
      const targetValue = event.target.value;
      if (targetValue.trim() === '') {
        setInputValue(targetValue);
        setValue(null, event.nativeEvent);
        return;
      }
      if (event.isTrusted) {
        setInputValue(targetValue);
        return;
      }
      const parsedValue = (0, _parse.parseNumber)(targetValue, locale, formatOptionsRef.current);
      if (parsedValue !== null) {
        setInputValue(targetValue);
        setValue(parsedValue, event.nativeEvent);
      }
    },
    onKeyDown(event) {
      if (event.defaultPrevented || readOnly || disabled) {
        return;
      }
      const nativeEvent = event.nativeEvent;
      allowInputSyncRef.current = true;
      const allowedNonNumericKeys = getAllowedNonNumericKeys();
      let isAllowedNonNumericKey = allowedNonNumericKeys.has(event.key);
      const {
        decimal,
        currency,
        percentSign
      } = (0, _parse.getNumberLocaleDetails)([], formatOptionsRef.current);
      const selectionStart = event.currentTarget.selectionStart;
      const selectionEnd = event.currentTarget.selectionEnd;
      const isAllSelected = selectionStart === 0 && selectionEnd === inputValue.length;

      // Allow the minus key only if there isn't already a plus or minus sign, or if all the text
      // is selected, or if only the minus sign is highlighted.
      if (event.key === '-' && allowedNonNumericKeys.has('-')) {
        const isMinusHighlighted = selectionStart === 0 && selectionEnd === 1 && inputValue[0] === '-';
        isAllowedNonNumericKey = !inputValue.includes('-') || isAllSelected || isMinusHighlighted;
      }

      // Only allow one of each symbol.
      [decimal, currency, percentSign].forEach(symbol => {
        if (event.key === symbol) {
          const symbolIndex = inputValue.indexOf(symbol);
          const isSymbolHighlighted = selectionStart === symbolIndex && selectionEnd === symbolIndex + 1;
          isAllowedNonNumericKey = !inputValue.includes(symbol) || isAllSelected || isSymbolHighlighted;
        }
      });
      const isLatinNumeral = /^[0-9]$/.test(event.key);
      const isArabicNumeral = _parse.ARABIC_RE.test(event.key);
      const isHanNumeral = _parse.HAN_RE.test(event.key);
      const isNavigateKey = NAVIGATE_KEYS.has(event.key);
      if (
      // Allow composition events (e.g., pinyin)
      // event.nativeEvent.isComposing does not work in Safari:
      // https://bugs.webkit.org/show_bug.cgi?id=165004
      event.which === 229 || event.altKey || event.ctrlKey || event.metaKey || isAllowedNonNumericKey || isLatinNumeral || isArabicNumeral || isHanNumeral || isNavigateKey) {
        return;
      }

      // We need to commit the number at this point if the input hasn't been blurred.
      const parsedValue = (0, _parse.parseNumber)(inputValue, locale, formatOptionsRef.current);
      const amount = getStepAmount(event) ?? _constants2.DEFAULT_STEP;

      // Prevent insertion of text or caret from moving.
      (0, _utils.stopEvent)(event);
      if (event.key === 'ArrowUp') {
        incrementValue(amount, 1, parsedValue, nativeEvent);
      } else if (event.key === 'ArrowDown') {
        incrementValue(amount, -1, parsedValue, nativeEvent);
      } else if (event.key === 'Home' && min != null) {
        setValue(min, nativeEvent);
      } else if (event.key === 'End' && max != null) {
        setValue(max, nativeEvent);
      }
    },
    onPaste(event) {
      if (event.defaultPrevented || readOnly || disabled) {
        return;
      }

      // Prevent `onChange` from being called.
      event.preventDefault();
      const clipboardData = event.clipboardData || window.Clipboard;
      const pastedData = clipboardData.getData('text/plain');
      const parsedValue = (0, _parse.parseNumber)(pastedData, locale, formatOptionsRef.current);
      if (parsedValue !== null) {
        allowInputSyncRef.current = false;
        setValue(parsedValue, event.nativeEvent);
        setInputValue(pastedData);
      }
    }
  };
  const element = (0, _useRenderElement.useRenderElement)('input', componentProps, {
    ref: [forwardedRef, inputRef, inputValidationRef],
    state,
    props: [inputProps, getInputValidationProps(), getValidationProps(), elementProps],
    customStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") NumberFieldInput.displayName = "NumberFieldInput";