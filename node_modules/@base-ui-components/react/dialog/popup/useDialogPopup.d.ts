import * as React from 'react';
import { type InteractionType } from '@base-ui-components/utils/useEnhancedClickHandler';
import type { DialogRoot } from "../root/DialogRoot.js";
import { HTMLProps } from "../../utils/types.js";
export declare function useDialogPopup(parameters: useDialogPopup.Parameters): useDialogPopup.ReturnValue;
export declare namespace useDialogPopup {
  interface Parameters {
    /**
     * The ref to the dialog element.
     */
    ref: React.Ref<HTMLElement>;
    openMethod: InteractionType | null;
    /**
     * Event handler called when the dialog is opened or closed.
     */
    setOpen: (open: boolean, eventDetails: DialogRoot.ChangeEventDetails) => void;
    /**
     * The id of the title element associated with the dialog.
     */
    titleElementId: string | undefined;
    /**
     * The id of the description element associated with the dialog.
     */
    descriptionElementId: string | undefined;
    /**
     * Determines the element to focus when the dialog is opened.
     * By default, the first focusable element is focused.
     */
    initialFocus?: React.RefObject<HTMLElement | null> | ((interactionType: InteractionType) => React.RefObject<HTMLElement | null>);
    /**
     * Determines if the dialog should be mounted.
     */
    mounted: boolean;
    /**
     * Callback to register the popup element.
     */
    setPopupElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  }
  interface ReturnValue {
    popupProps: HTMLProps;
  }
}