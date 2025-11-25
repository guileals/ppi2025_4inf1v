import * as React from 'react';
import { useFloatingRootContext, type FloatingRootContext } from "../../floating-ui-react/index.js";
import type { SelectStore } from "../store.js";
import type { useFieldControlValidation } from "../../field/control/useFieldControlValidation.js";
import type { HTMLProps } from "../../utils/types.js";
import type { SelectRoot } from "./SelectRoot.js";
import { BaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
export interface SelectRootContext {
  store: SelectStore;
  name: string | undefined;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  multiple: boolean;
  setValue: (nextValue: any, eventDetails: BaseUIEventDetails<'none'>) => void;
  setOpen: (open: boolean, eventDetails: SelectRoot.ChangeEventDetails) => void;
  listRef: React.MutableRefObject<Array<HTMLElement | null>>;
  popupRef: React.MutableRefObject<HTMLDivElement | null>;
  handleScrollArrowVisibility: () => void;
  getItemProps: (props?: HTMLProps & {
    active?: boolean;
    selected?: boolean;
  }) => Record<string, unknown>;
  events: ReturnType<typeof useFloatingRootContext>['events'];
  valueRef: React.MutableRefObject<HTMLSpanElement | null>;
  valuesRef: React.MutableRefObject<Array<any>>;
  labelsRef: React.MutableRefObject<Array<string | null>>;
  typingRef: React.MutableRefObject<boolean>;
  selectionRef: React.MutableRefObject<{
    allowUnselectedMouseUp: boolean;
    allowSelectedMouseUp: boolean;
  }>;
  selectedItemTextRef: React.MutableRefObject<HTMLSpanElement | null>;
  fieldControlValidation: ReturnType<typeof useFieldControlValidation>;
  /**
   * Called by each <Select.Item> when it knows its stable list index.
   * Allows the root to map option values to their DOM positions.
   */
  registerItemIndex: (index: number) => void;
  onOpenChangeComplete?: (open: boolean) => void;
  keyboardActiveRef: React.MutableRefObject<boolean>;
  alignItemWithTriggerActiveRef: React.RefObject<boolean>;
  initialValueRef: React.MutableRefObject<any>;
}
export declare const SelectRootContext: React.Context<SelectRootContext | null>;
export declare const SelectFloatingContext: React.Context<FloatingRootContext<import("../../floating-ui-react/index.js").ReferenceType> | null>;
export declare function useSelectRootContext(): SelectRootContext;
export declare function useSelectFloatingContext(): FloatingRootContext<import("../../floating-ui-react/index.js").ReferenceType>;