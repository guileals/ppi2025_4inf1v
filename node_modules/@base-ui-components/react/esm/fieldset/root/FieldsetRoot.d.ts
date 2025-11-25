import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Groups the fieldset legend and the associated fields.
 * Renders a `<fieldset>` element.
 *
 * Documentation: [Base UI Fieldset](https://base-ui.com/react/components/fieldset)
 */
export declare const FieldsetRoot: React.ForwardRefExoticComponent<FieldsetRoot.Props & React.RefAttributes<HTMLElement>>;
export declare namespace FieldsetRoot {
  type State = {
    /**
     * Whether the component should ignore user interaction.
     */
    disabled: boolean;
  };
  interface Props extends BaseUIComponentProps<'fieldset', State> {}
}