import * as React from 'react';
import { type TextDirection } from "./DirectionContext.js";
/**
 * Enables RTL behavior for Base UI components.
 *
 * Documentation: [Base UI Direction Provider](https://base-ui.com/react/utils/direction-provider)
 */
export declare const DirectionProvider: React.FC<DirectionProvider.Props>;
export declare namespace DirectionProvider {
  interface Props {
    children?: React.ReactNode;
    /**
     * The reading direction of the text
     * @default 'ltr'
     */
    direction?: TextDirection;
  }
}