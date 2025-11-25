'use client';

import * as React from 'react';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { getTarget } from "../../floating-ui-react/utils.js";
import { useFieldRootContext } from "../root/FieldRootContext.js";
import { fieldValidityMapping } from "../utils/constants.js";
import { useBaseUiId } from "../../utils/useBaseUiId.js";
import { useRenderElement } from "../../utils/useRenderElement.js";

/**
 * An accessible label that is automatically associated with the field control.
 * Renders a `<label>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */
export const FieldLabel = /*#__PURE__*/React.forwardRef(function FieldLabel(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    labelId,
    setLabelId,
    state,
    controlId
  } = useFieldRootContext(false);
  const id = useBaseUiId(idProp);
  const htmlFor = controlId ?? undefined;
  useIsoLayoutEffect(() => {
    if (controlId != null || idProp) {
      setLabelId(id);
    }
    return () => {
      setLabelId(undefined);
    };
  }, [controlId, id, idProp, setLabelId]);
  const element = useRenderElement('label', componentProps, {
    ref: forwardedRef,
    state,
    props: [{
      id: labelId,
      htmlFor,
      onMouseDown(event) {
        const target = getTarget(event.nativeEvent);
        if (target?.closest('button,input,select,textarea')) {
          return;
        }

        // Prevent text selection when double clicking label.
        if (!event.defaultPrevented && event.detail > 1) {
          event.preventDefault();
        }
      }
    }, elementProps],
    customStyleHookMapping: fieldValidityMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") FieldLabel.displayName = "FieldLabel";