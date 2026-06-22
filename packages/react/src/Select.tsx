import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import type { DensitySize } from './types.js';

export type SelectVariant = 'outlined' | 'filled';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: DensitySize;
  variant?: SelectVariant;
  error?: boolean;
  label?: string;
  helperText?: string;
  children?: ReactNode;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ size, variant, error, disabled, label, helperText, className, id, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={`select${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-error={error || undefined}
      data-disabled={disabled || undefined}
    >
      {label && <label className="select__label" htmlFor={id}>{label}</label>}
      <div className="select__field">
        <select
          id={id}
          className="select__control"
          disabled={disabled}
          aria-invalid={error || undefined}
          {...rest}
        >
          {children}
        </select>
        <span className="select__chevron" aria-hidden="true" />
      </div>
      {helperText && <span className="select__helper">{helperText}</span>}
    </div>
  )
);
Select.displayName = 'Select';
