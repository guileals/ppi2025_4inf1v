import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * A link that opens the preview card.
 * Renders an `<a>` element.
 *
 * Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
 */
export declare const PreviewCardTrigger: React.ForwardRefExoticComponent<PreviewCardTrigger.Props & React.RefAttributes<HTMLAnchorElement>>;
export declare namespace PreviewCardTrigger {
  interface State {
    /**
     * Whether the preview card is currently open.
     */
    open: boolean;
  }
  interface Props extends BaseUIComponentProps<'a', State> {}
}