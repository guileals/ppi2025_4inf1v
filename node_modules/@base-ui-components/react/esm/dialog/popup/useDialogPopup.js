'use client';

import * as React from 'react';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { COMPOSITE_KEYS } from "../../composite/composite.js";
export function useDialogPopup(parameters) {
  const {
    descriptionElementId,
    mounted,
    ref,
    setPopupElement,
    titleElementId
  } = parameters;
  const popupRef = React.useRef(null);
  const handleRef = useMergedRefs(ref, popupRef, setPopupElement);
  const popupProps = {
    'aria-labelledby': titleElementId ?? undefined,
    'aria-describedby': descriptionElementId ?? undefined,
    role: 'dialog',
    tabIndex: -1,
    ref: handleRef,
    hidden: !mounted,
    onKeyDown(event) {
      if (COMPOSITE_KEYS.has(event.key)) {
        event.stopPropagation();
      }
    }
  };
  return {
    popupProps
  };
}