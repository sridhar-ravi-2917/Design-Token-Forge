import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { DensitySize } from './types.js';

export type CardVariant = 'flat' | 'raised' | 'strong' | 'outlined';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  size?: DensitySize;
  variant?: CardVariant;
  rounded?: boolean;
  /** Make card interactive (hover/focus states) */
  interactive?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ size, variant, rounded, interactive, disabled, children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={`card${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-rounded={rounded || undefined}
      data-interactive={interactive || undefined}
      data-disabled={disabled || undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive && !disabled ? 0 : undefined}
      {...rest}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';
