import * as React from 'react';
import { NoSsrProps } from "./NoSsr.types.js";
/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 *
 * This component can be useful in a variety of situations:
 *
 * * Escape hatch for broken dependencies not supporting SSR.
 * * Improve the time-to-first paint on the client by only rendering above the fold.
 * * Reduce the rendering time on the server.
 * * Under too heavy server load, you can turn on service degradation.
 *
 * Documentation: [Base UI Unstable No Ssr](https://base-ui.com/react/components/unstable-no-ssr)
 */
export declare function NoSsr(props: NoSsrProps): React.JSX.Element;