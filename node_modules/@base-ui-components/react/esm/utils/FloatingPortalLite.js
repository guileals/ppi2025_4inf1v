'use client';

import * as ReactDOM from 'react-dom';
import { useFloatingPortalNode } from "../floating-ui-react/index.js";

/**
 * `FloatingPortal` includes tabbable logic handling for focus management.
 * For components that don't need tabbable logic, use `FloatingPortalLite`.
 * @internal
 */
export function FloatingPortalLite(props) {
  const node = useFloatingPortalNode({
    root: props.root
  });
  return node && /*#__PURE__*/ReactDOM.createPortal(props.children, node);
}