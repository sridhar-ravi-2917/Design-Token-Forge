import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { DensitySize, SemanticRole } from './types.js';

export type BadgeVariant = 'filled' | 'outlined' | 'soft' | 'dot';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size?: DensitySize;
  variant?: BadgeVariant;
  colorRole?: SemanticRole;
  rounded?: boolean;
  /** Icon element */
  icon?: ReactNode;
  children?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ size, variant, colorRole, rounded, icon, children, className, ...rest }, ref) => (
    <span
      ref={ref}
      className={`badge${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-role={colorRole}
      data-rounded={rounded || undefined}
      {...rest}
    >
      {icon && <span className="badge__icon" aria-hidden="true">{icon}</span>}
      {children && <span className="badge__label">{children}</span>}
    </span>
  )
);
Badge.displayName = 'Badge';
