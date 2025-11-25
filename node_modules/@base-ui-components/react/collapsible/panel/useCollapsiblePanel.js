"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCollapsiblePanel = useCollapsiblePanel;
var React = _interopRequireWildcard(require("react"));
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useMergedRefs = require("@base-ui-components/utils/useMergedRefs");
var _useOnMount = require("@base-ui-components/utils/useOnMount");
var _useAnimationFrame = require("@base-ui-components/utils/useAnimationFrame");
var _warn = require("@base-ui-components/utils/warn");
var _CollapsiblePanelDataAttributes = require("./CollapsiblePanelDataAttributes");
var _AccordionRootDataAttributes = require("../../accordion/root/AccordionRootDataAttributes");
function useCollapsiblePanel(parameters) {
  const {
    abortControllerRef,
    animationTypeRef,
    externalRef,
    height,
    hiddenUntilFound,
    keepMounted,
    id: idParam,
    mounted,
    onOpenChange,
    open,
    panelRef,
    runOnceAnimationsFinish,
    setDimensions,
    setMounted,
    setOpen,
    setVisible,
    transitionDimensionRef,
    visible,
    width
  } = parameters;
  const isBeforeMatchRef = React.useRef(false);
  const latestAnimationNameRef = React.useRef(null);
  const shouldCancelInitialOpenAnimationRef = React.useRef(open);
  const shouldCancelInitialOpenTransitionRef = React.useRef(open);

  /**
   * When opening, the `hidden` attribute is removed immediately.
   * When closing, the `hidden` attribute is set after any exit animations runs.
   */
  const hidden = React.useMemo(() => {
    if (animationTypeRef.current === 'css-animation') {
      return !visible;
    }
    return !open && !mounted;
  }, [open, mounted, visible, animationTypeRef]);

  /**
   * When `keepMounted` is `true` this runs once as soon as it exists in the DOM
   * regardless of initial open state.
   *
   * When `keepMounted` is `false` this runs on every mount, typically every
   * time it opens. If the panel is in the middle of a close transition that is
   * interrupted and re-opens, this won't run as the panel was not unmounted.
   */
  const handlePanelRef = (0, _useEventCallback.useEventCallback)(element => {
    if (!element) {
      return undefined;
    }
    if (animationTypeRef.current == null || transitionDimensionRef.current == null) {
      const panelStyles = getComputedStyle(element);
      const hasAnimation = panelStyles.animationName !== 'none' && panelStyles.animationName !== '';
      const hasTransition = panelStyles.transitionDuration !== '0s' && panelStyles.transitionDuration !== '';

      /**
       * animationTypeRef is safe to read in render because it's only ever set
       * once here during the first render and never again.
       * https://react.dev/learn/referencing-values-with-refs#best-practices-for-refs
       */
      if (hasAnimation && hasTransition) {
        if (process.env.NODE_ENV !== 'production') {
          (0, _warn.warn)('CSS transitions and CSS animations both detected on Collapsible or Accordion panel.', 'Only one of either animation type should be used.');
        }
      } else if (panelStyles.animationName === 'none' && panelStyles.transitionDuration !== '0s') {
        animationTypeRef.current = 'css-transition';
      } else if (panelStyles.animationName !== 'none' && panelStyles.transitionDuration === '0s') {
        animationTypeRef.current = 'css-animation';
      } else {
        animationTypeRef.current = 'none';
      }

      /**
       * We need to know in advance which side is being collapsed when using CSS
       * transitions in order to set the value of width/height to `0px` momentarily.
       * Setting both to `0px` will break layout.
       */
      if (element.getAttribute(_AccordionRootDataAttributes.AccordionRootDataAttributes.orientation) === 'horizontal' || panelStyles.transitionProperty.indexOf('width') > -1) {
        transitionDimensionRef.current = 'width';
      } else {
        transitionDimensionRef.current = 'height';
      }
    }
    if (animationTypeRef.current !== 'css-transition') {
      return undefined;
    }

    /**
     * Explicitly set `display` to ensure the panel is actually rendered before
     * measuring anything. `!important` is to needed to override a conflicting
     * Tailwind v4 default that sets `display: none !important` on `[hidden]`:
     * https://github.com/tailwindlabs/tailwindcss/blob/cd154a4f471e7a63cc27cad15dada650de89d52b/packages/tailwindcss/preflight.css#L320-L326
     */
    element.style.setProperty('display', 'block', 'important');
    if (height === undefined || width === undefined) {
      setDimensions({
        height: element.scrollHeight,
        width: element.scrollWidth
      });
      element.style.removeProperty('display');
      if (shouldCancelInitialOpenTransitionRef.current) {
        element.style.setProperty('transition-duration', '0s');
      }
    }
    let frame = -1;
    let nextFrame = -1;
    frame = _useAnimationFrame.AnimationFrame.request(() => {
      shouldCancelInitialOpenTransitionRef.current = false;
      nextFrame = _useAnimationFrame.AnimationFrame.request(() => {
        /**
         * This is slightly faster than another RAF and is the earliest
         * opportunity to remove the temporary `transition-duration: 0s` that
         * was applied to cancel opening transitions of initially open panels.
         * https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
         */
        setTimeout(() => {
          element.style.removeProperty('transition-duration');
        });
      });
    });
    return () => {
      _useAnimationFrame.AnimationFrame.cancel(frame);
      _useAnimationFrame.AnimationFrame.cancel(nextFrame);
    };
  });
  const mergedPanelRef = (0, _useMergedRefs.useMergedRefs)(externalRef, panelRef, handlePanelRef);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (animationTypeRef.current !== 'css-transition') {
      return undefined;
    }
    const panel = panelRef.current;
    if (!panel) {
      return undefined;
    }
    let resizeFrame = -1;
    if (abortControllerRef.current != null) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (open) {
      /* opening */
      panel.style.setProperty('display', 'block', 'important');

      /**
       * When `keepMounted={false}` and the panel is initially closed, the very
       * first time it opens (not any subsequent opens) `data-starting-style` is
       * off or missing by a frame so we need to set it manually. Otherwise any
       * CSS properties expected to transition using [data-starting-style] may
       * be mis-timed and appear to be complete skipped.
       */
      if (!shouldCancelInitialOpenTransitionRef.current && !keepMounted) {
        panel.setAttribute(_CollapsiblePanelDataAttributes.CollapsiblePanelDataAttributes.startingStyle, '');
      }
      setDimensions({
        height: panel.scrollHeight,
        width: panel.scrollWidth
      });
      resizeFrame = _useAnimationFrame.AnimationFrame.request(() => {
        panel.style.removeProperty('display');
      });
    } else {
      /* closing */
      setDimensions({
        height: panel.scrollHeight,
        width: panel.scrollWidth
      });
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      let frame2 = -1;
      const frame1 = _useAnimationFrame.AnimationFrame.request(() => {
        // Wait until the `[data-ending-style]` attribute is added.
        frame2 = _useAnimationFrame.AnimationFrame.request(() => {
          runOnceAnimationsFinish(() => {
            setDimensions({
              height: 0,
              width: 0
            });
            panel.style.removeProperty('content-visibility');
            panel.style.removeProperty('display');
            setMounted(false);
            abortControllerRef.current = null;
          }, signal);
        });
      });
      return () => {
        _useAnimationFrame.AnimationFrame.cancel(frame1);
        _useAnimationFrame.AnimationFrame.cancel(frame2);
      };
    }
    return () => {
      _useAnimationFrame.AnimationFrame.cancel(resizeFrame);
    };
  }, [abortControllerRef, animationTypeRef, hiddenUntilFound, keepMounted, mounted, open, panelRef, runOnceAnimationsFinish, setDimensions, setMounted, transitionDimensionRef]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (animationTypeRef.current !== 'css-animation') {
      return;
    }
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    latestAnimationNameRef.current = panel.style.animationName || latestAnimationNameRef.current;
    panel.style.setProperty('animation-name', 'none');
    setDimensions({
      height: panel.scrollHeight,
      width: panel.scrollWidth
    });
    if (!shouldCancelInitialOpenAnimationRef.current && !isBeforeMatchRef.current) {
      panel.style.removeProperty('animation-name');
    }
    if (open) {
      if (abortControllerRef.current != null) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setMounted(true);
      setVisible(true);
    } else {
      abortControllerRef.current = new AbortController();
      runOnceAnimationsFinish(() => {
        setMounted(false);
        setVisible(false);
        abortControllerRef.current = null;
      }, abortControllerRef.current.signal);
    }
  }, [abortControllerRef, animationTypeRef, open, panelRef, runOnceAnimationsFinish, setDimensions, setMounted, setVisible, visible]);
  (0, _useOnMount.useOnMount)(() => {
    const frame = _useAnimationFrame.AnimationFrame.request(() => {
      shouldCancelInitialOpenAnimationRef.current = false;
    });
    return () => _useAnimationFrame.AnimationFrame.cancel(frame);
  });
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!hiddenUntilFound) {
      return undefined;
    }
    const panel = panelRef.current;
    if (!panel) {
      return undefined;
    }
    let frame = -1;
    let nextFrame = -1;
    if (open && isBeforeMatchRef.current) {
      panel.style.transitionDuration = '0s';
      setDimensions({
        height: panel.scrollHeight,
        width: panel.scrollWidth
      });
      frame = _useAnimationFrame.AnimationFrame.request(() => {
        isBeforeMatchRef.current = false;
        nextFrame = _useAnimationFrame.AnimationFrame.request(() => {
          setTimeout(() => {
            panel.style.removeProperty('transition-duration');
          });
        });
      });
    }
    return () => {
      _useAnimationFrame.AnimationFrame.cancel(frame);
      _useAnimationFrame.AnimationFrame.cancel(nextFrame);
    };
  }, [hiddenUntilFound, open, panelRef, setDimensions]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    const panel = panelRef.current;
    if (panel && hiddenUntilFound && hidden) {
      /**
       * React only supports a boolean for the `hidden` attribute and forces
       * legit string values to booleans so we have to force it back in the DOM
       * when necessary: https://github.com/facebook/react/issues/24740
       */
      panel.setAttribute('hidden', 'until-found');
      /**
       * Set data-starting-style here to persist the closed styles, this is to
       * prevent transitions from starting when the `hidden` attribute changes
       * to `'until-found'` as they could have different `display` properties:
       * https://github.com/tailwindlabs/tailwindcss/pull/14625
       */
      if (animationTypeRef.current === 'css-transition') {
        panel.setAttribute(_CollapsiblePanelDataAttributes.CollapsiblePanelDataAttributes.startingStyle, '');
      }
    }
  }, [hiddenUntilFound, hidden, animationTypeRef, panelRef]);
  React.useEffect(function registerBeforeMatchListener() {
    const panel = panelRef.current;
    if (!panel) {
      return undefined;
    }
    function handleBeforeMatch() {
      isBeforeMatchRef.current = true;
      setOpen(true);
      onOpenChange(true);
    }
    panel.addEventListener('beforematch', handleBeforeMatch);
    return () => {
      panel.removeEventListener('beforematch', handleBeforeMatch);
    };
  }, [onOpenChange, panelRef, setOpen]);
  return React.useMemo(() => ({
    props: {
      hidden,
      id: idParam,
      ref: mergedPanelRef
    }
  }), [hidden, idParam, mergedPanelRef]);
}