import * as React from 'react';
import { BaseUIComponentProps } from "../../utils/types.js";
/**
 * Displays a user's profile picture, initials, or fallback icon.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
 */
export declare const AvatarRoot: React.ForwardRefExoticComponent<AvatarRoot.Props & React.RefAttributes<HTMLSpanElement>>;
export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';
export declare namespace AvatarRoot {
  interface Props extends BaseUIComponentProps<'span', State> {}
  interface State {
    imageLoadingStatus: ImageLoadingStatus;
  }
}