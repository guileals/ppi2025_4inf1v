'use client';

import * as ReactDOM from 'react-dom';
import { useAnimationFrame } from '@base-ui-components/utils/useAnimationFrame';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';

/**
 * Executes a function once all animations have finished on the provided element.
 * @param elementOrRef - The element to watch for animations.
 * @param waitForNextTick - Whether to wait for the next tick before checking for animations.
 */
export function useAnimationsFinished(elementOrRef, waitForNextTick = false) {
  const frame = useAnimationFrame();
  return useEventCallback((fnToExecute,
  /**
   * An optional [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that
   * can be used to abort `fnToExecute` before all the animations have finished.
   * @default null
   */
  signal = null) => {
    frame.cancel();
    if (elementOrRef == null) {
      return;
    }
    let element;
    if ('current' in elementOrRef) {
      if (elementOrRef.current == null) {
        return;
      }
      element = elementOrRef.current;
    } else {
      element = elementOrRef;
    }
    if (typeof element.getAnimations !== 'function' || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      fnToExecute();
    } else {
      frame.request(() => {
        function exec() {
          if (!element) {
            return;
          }
          Promise.allSettled(element.getAnimations().map(anim => anim.finished)).then(() => {
            if (signal != null && signal.aborted) {
              return;
            }
            // Synchronously flush the unmounting of the component so that the browser doesn't
            // paint: https://github.com/mui/base-ui/issues/979
            ReactDOM.flushSync(fnToExecute);
          });
        }

        // `open: true` animations need to wait for the next tick to be detected
        if (waitForNextTick) {
          frame.request(exec);
        } else {
          exec();
        }
      });
    }
  });
}