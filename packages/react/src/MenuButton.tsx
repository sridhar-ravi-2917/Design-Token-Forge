import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { DensitySize, SemanticRole } from './types.js';

export interface MenuButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role'> {
  size?: DensitySize;
  variant?: 'filled' | 'outlined' | 'soft' | 'ghost';
  colorRole?: SemanticRole | 'primary';
  rounded?: boolean;
  loading?: boolean;
  /** Show chevron indicator */
  showChevron?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ size, variant, colorRole, rounded, loading, disabled, showChevron = true, icon, children, type = 'button', className, ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={`menu-btn${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-role={colorRole}
      data-rounded={rounded || undefined}
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
      disabled={disabled}
      aria-haspopup="menu"
      aria-busy={loading || undefined}
      {...rest}
    >
      {icon && <span className="menu-btn__icon" aria-hidden="true">{icon}</span>}
      {children && <span className="menu-btn__label">{children}</span>}
      {showChevron && <span className="menu-btn__chevron" aria-hidden="true" />}
      {loading && <span className="menu-btn__loader" aria-hidden="true" />}
    </button>
  )
);
MenuButton.displayName = 'MenuButton';
