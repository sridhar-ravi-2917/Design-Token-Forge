import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { DensitySize, SemanticRole, ButtonVariant } from './types.js';

export type { DensitySize as ButtonSize, ButtonVariant };

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role'> {
  /** Density size (default: base) */
  size?: DensitySize;
  /** Structural variant (default: filled) */
  variant?: ButtonVariant;
  /** Semantic color role (default: primary) */
  colorRole?: SemanticRole | 'primary';
  /** Pill/rounded shape */
  rounded?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon slot (renders .btn__icon) */
  icon?: ReactNode;
  /** Native button type */
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, variant, colorRole, rounded, loading, disabled, icon, children, type = 'button', className, ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={`btn${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-role={colorRole}
      data-rounded={rounded || undefined}
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
      disabled={disabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {icon && <span className="btn__icon" aria-hidden="true">{icon}</span>}
      {children && <span className="btn__label">{children}</span>}
      {loading && <span className="btn__loader" aria-hidden="true" />}
    </button>
  )
);
Button.displayName = 'Button';
