import * as React from 'react';
/**
 * @internal
 */
export declare const InternalBackdrop: React.ForwardRefExoticComponent<InternalBackdrop.Props & React.RefAttributes<HTMLDivElement>>;
export declare namespace InternalBackdrop {
  interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The element to cut out of the backdrop.
     * This is useful for allowing certain elements to be interactive while the backdrop is present.
     */
    cutout?: Element | null;
  }
}