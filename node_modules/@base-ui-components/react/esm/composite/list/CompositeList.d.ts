import * as React from 'react';
export type CompositeMetadata<CustomMetadata> = {
  index?: number | null;
} & CustomMetadata;
/**
 * Provides context for a list of items in a composite component.
 * @internal
 */
export declare function CompositeList<Metadata>(props: CompositeList.Props<Metadata>): React.JSX.Element;
export declare namespace CompositeList {
  interface Props<Metadata> {
    children: React.ReactNode;
    /**
     * A ref to the list of HTML elements, ordered by their index.
     * `useListNavigation`'s `listRef` prop.
     */
    elementsRef: React.RefObject<Array<HTMLElement | null>>;
    /**
     * A ref to the list of element labels, ordered by their index.
     * `useTypeahead`'s `listRef` prop.
     */
    labelsRef?: React.RefObject<Array<string | null>>;
    onMapChange?: (newMap: Map<Element, CompositeMetadata<Metadata> | null>) => void;
  }
}