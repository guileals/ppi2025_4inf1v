import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import { useCollapsibleRoot } from "../../collapsible/root/useCollapsibleRoot.js";
import type { AccordionRoot } from "../root/AccordionRoot.js";
/**
 * Groups an accordion header with the corresponding panel.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
export declare const AccordionItem: React.ForwardRefExoticComponent<AccordionItem.Props & React.RefAttributes<HTMLDivElement>>;
export type AccordionItemValue = any | null;
export declare namespace AccordionItem {
  interface State extends AccordionRoot.State {
    index: number;
    open: boolean;
  }
  interface Props extends BaseUIComponentProps<'div', State>, Partial<Pick<useCollapsibleRoot.Parameters, 'disabled' | 'onOpenChange'>> {
    value?: AccordionItemValue;
  }
}