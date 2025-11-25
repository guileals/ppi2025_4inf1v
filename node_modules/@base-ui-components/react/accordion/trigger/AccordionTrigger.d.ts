import * as React from 'react';
import { BaseUIComponentProps, NativeButtonProps } from "../../utils/types.js";
import type { AccordionItem } from "../item/AccordionItem.js";
/**
 * A button that opens and closes the corresponding panel.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
export declare const AccordionTrigger: React.ForwardRefExoticComponent<AccordionTrigger.Props & React.RefAttributes<Element>>;
export declare namespace AccordionTrigger {
  interface Props extends NativeButtonProps, BaseUIComponentProps<'button', AccordionItem.State> {}
}