'use client';

import * as React from 'react';
import { createCollatorItemFilter, createSingleSelectionCollatorFilter } from "./index.js";
const filterCache = new Map();
function getFilter(options = {}) {
  const mergedOptions = {
    usage: 'search',
    sensitivity: 'base',
    ignorePunctuation: true,
    ...options
  };
  const optionsString = JSON.stringify(mergedOptions);
  const cachedFilter = filterCache.get(optionsString);
  if (cachedFilter) {
    return cachedFilter;
  }
  const collator = new Intl.Collator(options.locale, mergedOptions);
  const filter = {
    contains(item, query) {
      if (!query) {
        return true;
      }
      for (let i = 0; i <= item.length - query.length; i += 1) {
        if (collator.compare(item.slice(i, i + query.length), query) === 0) {
          return true;
        }
      }
      return false;
    },
    startsWith(item, query) {
      if (!query) {
        return true;
      }
      return collator.compare(item.slice(0, query.length), query) === 0;
    },
    endsWith(item, query) {
      if (!query) {
        return true;
      }
      const queryLength = query.length;
      return item.length >= queryLength && collator.compare(item.slice(item.length - queryLength), query) === 0;
    }
  };
  filterCache.set(optionsString, filter);
  return filter;
}

/**
 * Matches items against a query using `Intl.Collator` for robust string matching.
 */
export const useCoreFilter = getFilter;
/**
 * Matches items against a query using `Intl.Collator` for robust string matching.
 */
export function useComboboxFilter(options = {}) {
  const {
    multiple = false,
    value,
    ...collatorOptions
  } = options;
  const coreFilter = getFilter(collatorOptions);
  const contains = React.useCallback((item, query, itemToStringLabel) => {
    if (multiple) {
      return createCollatorItemFilter(coreFilter, itemToStringLabel)(item, query);
    }
    return createSingleSelectionCollatorFilter(coreFilter, itemToStringLabel, value)(item, query);
  }, [coreFilter, value, multiple]);
  return React.useMemo(() => ({
    contains,
    startsWith: coreFilter.startsWith,
    endsWith: coreFilter.endsWith
  }), [contains, coreFilter]);
}