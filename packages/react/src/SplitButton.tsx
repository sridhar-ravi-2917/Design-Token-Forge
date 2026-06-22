import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { DensitySize, SemanticRole } from './types.js';

export interface SplitButtonProps extends HTMLAttributes<HTMLDivElement> {
  size?: DensitySize;
  variant?: 'filled' | 'outlined' | 'soft' | 'ghost';
  colorRole?: SemanticRole | 'primary';
  rounded?: boolean;
  loading?: boolean;
  disabled?: boolean;
  /** Main action label */
  children?: ReactNode;
  /** Icon in main zone */
  icon?: ReactNode;
  /** Click handler for the main action zone */
  onActionClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Click handler for the dropdown trigger zone */
  onMenuClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** aria-label for the dropdown trigger */
  menuLabel?: string;
}

export const SplitButton = forwardRef<HTMLDivElement, SplitButtonProps>(
  ({ size, variant, colorRole, rounded, loading, disabled, children, icon, onActionClick, onMenuClick, menuLabel = 'More options', className, ...rest }, ref) => (
    <div
      ref={ref}
      className={`split-btn${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-role={colorRole}
      data-rounded={rounded || undefined}
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      <button
        className="split-btn__action"
        disabled={disabled}
        aria-busy={loading || undefined}
        onClick={onActionClick}
        type="button"
      >
        {icon && <span className="split-btn__icon" aria-hidden="true">{icon}</span>}
        {children && <span className="split-btn__label">{children}</span>}
      </button>
      <button
        className="split-btn__trigger"
        disabled={disabled}
        aria-label={menuLabel}
        aria-haspopup="menu"
        onClick={onMenuClick}
        type="button"
      >
        <span className="split-btn__caret" aria-hidden="true" />
      </button>
    </div>
  )
);
SplitButton.displayName = 'SplitButton';
