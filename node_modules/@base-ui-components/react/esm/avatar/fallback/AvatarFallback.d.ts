import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
import type { AvatarRoot } from "../root/AvatarRoot.js";
/**
 * Rendered when the image fails to load or when no image is provided.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
 */
export declare const AvatarFallback: React.ForwardRefExoticComponent<AvatarFallback.Props & React.RefAttributes<HTMLSpanElement>>;
export declare namespace AvatarFallback {
  interface Props extends BaseUIComponentProps<'span', AvatarRoot.State> {
    /**
     * How long to wait before showing the fallback. Specified in milliseconds.
     */
    delay?: number;
  }
}