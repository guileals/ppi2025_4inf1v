import * as React from 'react';
import { type CompositeMetadata } from "../list/CompositeList.js";
import type { BaseUIComponentProps } from "../../utils/types.js";
import type { Dimensions, ModifierKey } from "../composite.js";
import { CustomStyleHookMapping } from "../../utils/getStyleHookProps.js";
/**
 * @internal
 */
export declare function CompositeRoot<Metadata extends {}, State extends Record<string, any>>(componentProps: CompositeRoot.Props<Metadata, State>): React.JSX.Element;
export declare namespace CompositeRoot {
  interface Props<Metadata, State extends Record<string, any>> extends Pick<BaseUIComponentProps<'div', State>, 'render' | 'className' | 'children'> {
    props?: Array<Record<string, any> | (() => Record<string, any>)>;
    state?: State;
    customStyleHookMapping?: CustomStyleHookMapping<State>;
    refs?: React.Ref<HTMLElement | null>[];
    tag?: keyof React.JSX.IntrinsicElements;
    orientation?: 'horizontal' | 'vertical' | 'both';
    cols?: number;
    loop?: boolean;
    highlightedIndex?: number;
    onHighlightedIndexChange?: (index: number) => void;
    itemSizes?: Dimensions[];
    dense?: boolean;
    enableHomeAndEndKeys?: boolean;
    onMapChange?: (newMap: Map<Node, CompositeMetadata<Metadata> | null>) => void;
    stopEventPropagation?: boolean;
    rootRef?: React.RefObject<HTMLElement | null>;
    disabledIndices?: number[];
    modifierKeys?: ModifierKey[];
    highlightItemOnHover?: boolean;
  }
}