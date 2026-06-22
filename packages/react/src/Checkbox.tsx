import { forwardRef, type InputHTMLAttributes } from 'react';
import type { DensitySize } from './types.js';

export type CheckboxVariant = 'filled' | 'outlined';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: DensitySize;
  variant?: CheckboxVariant;
  /** Accessible label text */
  label?: string;
  /** Indeterminate state (partial selection) */
  indeterminate?: boolean;
  checked?: boolean;
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ size, variant, disabled, indeterminate, checked, label, className, id, onChange, ...rest }, ref) => (
    <label
      ref={ref}
      className={`checkbox${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant || undefined}
      data-disabled={disabled || undefined}
      data-indeterminate={indeterminate || undefined}
    >
      <input
        type="checkbox"
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        aria-checked={indeterminate ? 'mixed' : checked}
        {...rest}
      />
      <span className="checkbox__box" aria-hidden="true">
        <span className="checkbox__mark" />
      </span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  )
);
Checkbox.displayName = 'Checkbox';
