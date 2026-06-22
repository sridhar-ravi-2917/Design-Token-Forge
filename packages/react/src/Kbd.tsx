import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { DensitySize } from './types.js';

export type KbdSize = 'small' | 'base';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: KbdSize;
  /** The key text or symbol */
  children: ReactNode;
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ size, children, className, ...rest }, ref) => (
    <kbd
      ref={ref as React.Ref<HTMLElement>}
      className={`kbd${className ? ` ${className}` : ''}`}
      data-size={size}
      {...rest}
    >
      {children}
    </kbd>
  )
);
Kbd.displayName = 'Kbd';
