import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import type { DensitySize } from './types.js';

export type InputVariant = 'outlined' | 'filled' | 'underline';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: DensitySize;
  variant?: InputVariant;
  /** Show error state */
  error?: boolean;
  /** Leading icon */
  leadingIcon?: ReactNode;
  /** Trailing icon or element */
  trailingIcon?: ReactNode;
  /** Label text (floating or static) */
  label?: string;
  /** Helper / error message below input */
  helperText?: string;
  type?: string;
}

export const Input = forwardRef<HTMLDivElement, InputProps>(
  ({ size, variant, error, disabled, leadingIcon, trailingIcon, label, helperText, className, id, ...rest }, ref) => (
    <div
      ref={ref}
      className={`input${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-error={error || undefined}
      data-disabled={disabled || undefined}
    >
      {label && <label className="input__label" htmlFor={id}>{label}</label>}
      <div className="input__field">
        {leadingIcon && <span className="input__leading-icon" aria-hidden="true">{leadingIcon}</span>}
        <input
          id={id}
          className="input__control"
          disabled={disabled}
          aria-invalid={error || undefined}
          {...rest}
        />
        {trailingIcon && <span className="input__trailing-icon" aria-hidden="true">{trailingIcon}</span>}
      </div>
      {helperText && <span className="input__helper">{helperText}</span>}
    </div>
  )
);
Input.displayName = 'Input';
