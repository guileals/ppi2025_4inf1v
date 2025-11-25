import * as React from 'react';
import { TransitionStatus } from "../../utils/useTransitionStatus.js";
export type AnimationType = 'css-transition' | 'css-animation' | 'none' | null;
export interface Dimensions {
  height: number | undefined;
  width: number | undefined;
}
export declare function useCollapsibleRoot(parameters: useCollapsibleRoot.Parameters): useCollapsibleRoot.ReturnValue;
export declare namespace useCollapsibleRoot {
  interface Parameters {
    /**
     * Whether the collapsible panel is currently open.
     *
     * To render an uncontrolled collapsible, use the `defaultOpen` prop instead.
     */
    open?: boolean;
    /**
     * Whether the collapsible panel is initially open.
     *
     * To render a controlled collapsible, use the `open` prop instead.
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * Event handler called when the panel is opened or closed.
     */
    onOpenChange: (open: boolean) => void;
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled: boolean;
  }
  interface ReturnValue {
    abortControllerRef: React.RefObject<AbortController | null>;
    animationTypeRef: React.RefObject<AnimationType>;
    /**
     * Whether the component should ignore user interaction.
     */
    disabled: boolean;
    handleTrigger: () => void;
    /**
     * The height of the panel.
     */
    height: number | undefined;
    /**
     * Whether the collapsible panel is currently mounted.
     */
    mounted: boolean;
    /**
     * Whether the collapsible panel is currently open.
     */
    open: boolean;
    panelId: React.HTMLAttributes<Element>['id'];
    panelRef: React.RefObject<HTMLElement | null>;
    runOnceAnimationsFinish: (fnToExecute: () => void, signal?: AbortSignal | null) => void;
    setDimensions: React.Dispatch<React.SetStateAction<Dimensions>>;
    setHiddenUntilFound: React.Dispatch<React.SetStateAction<boolean>>;
    setKeepMounted: React.Dispatch<React.SetStateAction<boolean>>;
    setMounted: (open: boolean) => void;
    setOpen: (open: boolean) => void;
    setPanelIdState: (id: string | undefined) => void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    transitionDimensionRef: React.RefObject<'height' | 'width' | null>;
    transitionStatus: TransitionStatus;
    /**
     * The visible state of the panel used to determine the `[hidden]` attribute
     * only when CSS keyframe animations are used.
     */
    visible: boolean;
    /**
     * The width of the panel.
     */
    width: number | undefined;
  }
}