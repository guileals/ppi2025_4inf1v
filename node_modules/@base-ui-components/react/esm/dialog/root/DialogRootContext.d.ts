import * as React from 'react';
export interface DialogRootContext {
  /**
   * Determines whether the dialog should close on outside clicks.
   */
  dismissible: boolean;
}
export declare const DialogRootContext: React.Context<DialogRootContext | undefined>;
export declare function useOptionalDialogRootContext(): {
  nested?: boolean | undefined;
  onOpenChangeComplete?: (open: boolean) => void;
  descriptionElementId?: string | undefined;
  modal?: boolean | "trap-focus" | undefined;
  nestedOpenDialogCount?: number | undefined;
  onNestedDialogClose?: () => void;
  onNestedDialogOpen?: (ownChildrenCount: number) => void;
  setOpen?: ((open: boolean, eventDetails: import("./DialogRoot.js").DialogRoot.ChangeEventDetails) => void) | undefined;
  open?: boolean | undefined;
  openMethod?: import("@base-ui-components/utils/useEnhancedClickHandler").InteractionType | null | undefined;
  setDescriptionElementId?: ((elementId: string | undefined) => void) | undefined;
  setTitleElementId?: ((elementId: string | undefined) => void) | undefined;
  titleElementId?: string | undefined;
  mounted?: boolean | undefined;
  transitionStatus?: import("../../utils/useTransitionStatus.js").TransitionStatus;
  triggerProps?: import("../../utils/types.js").HTMLProps | undefined;
  getPopupProps?: ((externalProps?: import("../../utils/types.js").HTMLProps) => import("../../utils/types.js").HTMLProps) | undefined;
  setTriggerElement?: React.Dispatch<React.SetStateAction<Element | null>> | undefined;
  setPopupElement?: React.Dispatch<React.SetStateAction<HTMLElement | null>> | undefined;
  popupRef?: React.RefObject<HTMLElement | null> | undefined;
  backdropRef?: React.RefObject<HTMLDivElement | null> | undefined;
  internalBackdropRef?: React.RefObject<HTMLDivElement | null> | undefined;
  floatingRootContext?: import("../../floating-ui-react/index.js").FloatingRootContext<import("../../floating-ui-react/index.js").ReferenceType> | undefined;
  dismissible?: boolean | undefined;
} | undefined;
export declare function useDialogRootContext(): {
  nested: boolean;
  onOpenChangeComplete?: (open: boolean) => void;
  descriptionElementId: string | undefined;
  modal: boolean | "trap-focus";
  nestedOpenDialogCount: number;
  onNestedDialogClose?: () => void;
  onNestedDialogOpen?: (ownChildrenCount: number) => void;
  setOpen: (open: boolean, eventDetails: import("./DialogRoot.js").DialogRoot.ChangeEventDetails) => void;
  open: boolean;
  openMethod: import("@base-ui-components/utils/useEnhancedClickHandler").InteractionType | null;
  setDescriptionElementId: (elementId: string | undefined) => void;
  setTitleElementId: (elementId: string | undefined) => void;
  titleElementId: string | undefined;
  mounted: boolean;
  transitionStatus: import("../../utils/useTransitionStatus.js").TransitionStatus;
  triggerProps: import("../../utils/types.js").HTMLProps;
  getPopupProps: (externalProps?: import("../../utils/types.js").HTMLProps) => import("../../utils/types.js").HTMLProps;
  setTriggerElement: React.Dispatch<React.SetStateAction<Element | null>>;
  setPopupElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  popupRef: React.RefObject<HTMLElement | null>;
  backdropRef: React.RefObject<HTMLDivElement | null>;
  internalBackdropRef: React.RefObject<HTMLDivElement | null>;
  floatingRootContext: import("../../floating-ui-react/index.js").FloatingRootContext;
  dismissible?: boolean | undefined;
};