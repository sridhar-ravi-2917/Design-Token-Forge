import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { DensitySize, SemanticRole, ButtonVariant } from './types.js';

export type IconButtonVariant = 'filled' | 'outlined' | 'soft' | 'ghost';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role'> {
  size?: DensitySize;
  variant?: IconButtonVariant;
  colorRole?: SemanticRole | 'primary';
  rounded?: boolean;
  loading?: boolean;
  /** The icon element */
  icon: ReactNode;
  /** Accessible label — required since no text label */
  'aria-label': string;
  type?: 'button' | 'submit' | 'reset';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size, variant, colorRole, rounded, loading, disabled, icon, type = 'button', className, ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={`icon-btn${className ? ` ${className}` : ''}`}
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
      <span className="icon-btn__icon" aria-hidden="true">{icon}</span>
      {loading && <span className="icon-btn__loader" aria-hidden="true" />}
    </button>
  )
);
IconButton.displayName = 'IconButton';
