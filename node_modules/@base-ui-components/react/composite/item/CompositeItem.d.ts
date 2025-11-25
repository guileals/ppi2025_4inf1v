import * as React from 'react';
import type { BaseUIComponentProps } from "../../utils/types.js";
import { CustomStyleHookMapping } from "../../utils/getStyleHookProps.js";
/**
 * @internal
 */
export declare function CompositeItem<Metadata, State extends Record<string, any>>(componentProps: CompositeItem.Props<Metadata, State>): React.ReactElement<Record<string, unknown>, string | React.JSXElementConstructor<any>>;
export declare namespace CompositeItem {
  interface Props<Metadata, State extends Record<string, any>> extends Pick<BaseUIComponentProps<any, State>, 'render' | 'className'> {
    children?: React.ReactNode;
    metadata?: Metadata;
    refs?: React.Ref<HTMLElement | null>[];
    props?: Array<Record<string, any> | (() => Record<string, any>)>;
    state?: State;
    customStyleHookMapping?: CustomStyleHookMapping<State>;
    tag?: keyof React.JSX.IntrinsicElements;
  }
}