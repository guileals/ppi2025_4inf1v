import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * An accessible label that is automatically associated with the fieldset.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Fieldset](https://base-ui.com/react/components/fieldset)
 */
export declare const FieldsetLegend: React.ForwardRefExoticComponent<FieldsetLegend.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace FieldsetLegend {
  interface State {
    /**
     * Whether the component should ignore user interaction.
     */
    disabled: boolean;
  }
  interface Props extends BaseUIComponentProps<'div', State> {}
}