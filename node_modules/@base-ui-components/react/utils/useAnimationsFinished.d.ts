import * as React from 'react';
/**
 * Executes a function once all animations have finished on the provided element.
 * @param elementOrRef - The element to watch for animations.
 * @param waitForNextTick - Whether to wait for the next tick before checking for animations.
 */
export declare function useAnimationsFinished(elementOrRef: React.RefObject<HTMLElement | null> | HTMLElement | null, waitForNextTick?: boolean): (fnToExecute: () => void, signal?: AbortSignal | null) => void;