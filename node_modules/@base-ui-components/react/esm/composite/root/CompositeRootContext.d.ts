import * as React from 'react';
export interface CompositeRootContext {
  highlightedIndex: number;
  onHighlightedIndexChange: (index: number, shouldScrollIntoView?: boolean) => void;
  highlightItemOnHover: boolean;
}
export declare const CompositeRootContext: React.Context<CompositeRootContext | undefined>;
export declare function useCompositeRootContext(optional: true): CompositeRootContext | undefined;
export declare function useCompositeRootContext(optional?: false): CompositeRootContext;