import * as React from 'react';
import { HTMLProps } from "../../utils/types.js";
export interface UseCompositeItemParameters<Metadata> {
  metadata?: Metadata;
}
export declare function useCompositeItem<Metadata>(params?: UseCompositeItemParameters<Metadata>): {
  compositeProps: HTMLProps;
  compositeRef: React.RefCallback<HTMLElement | null>;
  index: number;
};