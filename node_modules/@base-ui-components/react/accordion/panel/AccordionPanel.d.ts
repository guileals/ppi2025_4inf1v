import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import type { AccordionRoot } from "../root/AccordionRoot.js";
import type { AccordionItem } from "../item/AccordionItem.js";
import type { TransitionStatus } from "../../utils/useTransitionStatus.js";
/**
 * A collapsible panel with the accordion item contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
export declare const AccordionPanel: React.ForwardRefExoticComponent<AccordionPanel.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace AccordionPanel {
  interface State extends AccordionItem.State {
    transitionStatus: TransitionStatus;
  }
  interface Props extends BaseUIComponentProps<'div', AccordionItem.State>, Pick<AccordionRoot.Props, 'hiddenUntilFound' | 'keepMounted'> {}
}