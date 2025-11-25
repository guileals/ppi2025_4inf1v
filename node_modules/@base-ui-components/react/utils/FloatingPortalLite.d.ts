import { FloatingPortalProps } from "../floating-ui-react/index.js";
/**
 * `FloatingPortal` includes tabbable logic handling for focus management.
 * For components that don't need tabbable logic, use `FloatingPortalLite`.
 * @internal
 */
export declare function FloatingPortalLite(props: FloatingPortalLite.Props): import("react").ReactPortal | null;
export declare namespace FloatingPortalLite {
  interface Props {
    children?: React.ReactNode;
    root?: FloatingPortalProps['root'];
  }
}