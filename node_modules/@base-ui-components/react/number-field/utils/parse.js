"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PERCENT_RE = exports.PERCENTAGES = exports.HAN_RE = exports.HAN_NUMERALS = exports.ARABIC_RE = exports.ARABIC_NUMERALS = void 0;
exports.getNumberLocaleDetails = getNumberLocaleDetails;
exports.parseNumber = parseNumber;
var _formatNumber = require("../../utils/formatNumber");
const HAN_NUMERALS = exports.HAN_NUMERALS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const ARABIC_NUMERALS = exports.ARABIC_NUMERALS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const PERCENTAGES = exports.PERCENTAGES = ['%', '٪'];
const ARABIC_RE = exports.ARABIC_RE = new RegExp(`[${ARABIC_NUMERALS.join('')}]`, 'g');
const HAN_RE = exports.HAN_RE = new RegExp(`[${HAN_NUMERALS.join('')}]`, 'g');
const PERCENT_RE = exports.PERCENT_RE = new RegExp(`[${PERCENTAGES.join('')}]`);
function getNumberLocaleDetails(locale, options) {
  const parts = (0, _formatNumber.getFormatter)(locale, options).formatToParts(11111.1);
  const result = {};
  parts.forEach(part => {
    result[part.type] = part.value;
  });

  // The formatting options may result in not returning a decimal.
  (0, _formatNumber.getFormatter)(locale).formatToParts(0.1).forEach(part => {
    if (part.type === 'decimal') {
      result[part.type] = part.value;
    }
  });
  return result;
}
function parseNumber(formattedNumber, locale, options) {
  let computedLocale = locale;
  if (computedLocale === undefined) {
    if (ARABIC_RE.test(formattedNumber)) {
      computedLocale = 'ar';
    } else if (HAN_RE.test(formattedNumber)) {
      computedLocale = 'zh';
    }
  }
  const {
    group,
    decimal,
    currency,
    unit
  } = getNumberLocaleDetails(computedLocale, options);
  let groupRegex = null;
  if (group) {
    // Check if the group separator is a space-like character.
    // If so, we'll replace all such characters with an empty string.
    groupRegex = /\p{Zs}/u.test(group) ? /\p{Zs}/gu : new RegExp(`\\${group}`, 'g');
  }
  const regexesToReplace = [{
    regex: group ? groupRegex : null,
    replacement: ''
  }, {
    regex: decimal ? new RegExp(`\\${decimal}`, 'g') : null,
    replacement: '.'
  }, {
    regex: currency ? new RegExp(`\\${currency}`, 'g') : null,
    replacement: ''
  }, {
    regex: unit ? new RegExp(`\\${unit}`, 'g') : null,
    replacement: ''
  }, {
    regex: ARABIC_RE,
    replacement: match => ARABIC_NUMERALS.indexOf(match).toString()
  }, {
    regex: HAN_RE,
    replacement: match => HAN_NUMERALS.indexOf(match).toString()
  }];
  const unformattedNumber = regexesToReplace.reduce((acc, {
    regex,
    replacement
  }) => {
    if (!regex) {
      return acc;
    }
    return acc.replace(regex, replacement);
  }, formattedNumber);
  let num = parseFloat(unformattedNumber);
  const style = options?.style;
  const isUnitPercent = style === 'unit' && options?.unit === 'percent';
  const isPercent = PERCENT_RE.test(formattedNumber) || style === 'percent';
  if (!isUnitPercent && isPercent) {
    num /= 100;
  }
  if (Number.isNaN(num)) {
    return null;
  }
  return num;
}