import { forwardRef, type HTMLAttributes } from 'react';
import type { DensitySize, SemanticRole } from './types.js';

export type ProgressBarVariant = 'filled' | 'outlined' | 'soft';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  size?: DensitySize;
  variant?: ProgressBarVariant;
  colorRole?: SemanticRole;
  /** Value 0–100 */
  value?: number;
  /** Indeterminate mode */
  indeterminate?: boolean;
  /** Buffer value 0–100 */
  buffer?: number;
  /** Animated striped fill */
  striped?: boolean;
  animated?: boolean;
  disabled?: boolean;
  /** Visible label (e.g. "60%") */
  label?: string;
  /** Screen-reader accessible label for the progressbar */
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ size, variant, colorRole, value, indeterminate, buffer, striped, animated, disabled, label, className, ...rest }, ref) => (
    <div
      ref={ref}
      role="progressbar"
      className={`progress-bar${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-role={colorRole}
      data-indeterminate={indeterminate || undefined}
      data-striped={striped || undefined}
      data-animated={animated || undefined}
      data-disabled={disabled || undefined}
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <div className="progress-bar__track">
        {buffer !== undefined && (
          <div className="progress-bar__buffer" style={{ width: `${buffer}%` }} aria-hidden="true" />
        )}
        <div
          className="progress-bar__fill"
          style={indeterminate ? undefined : { width: `${value ?? 0}%` }}
          aria-hidden="true"
        />
      </div>
      {label && <span className="progress-bar__label" aria-hidden="true">{label}</span>}
    </div>
  )
);
ProgressBar.displayName = 'ProgressBar';
