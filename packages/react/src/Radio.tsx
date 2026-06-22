import { forwardRef, type InputHTMLAttributes } from 'react';
import type { DensitySize } from './types.js';

export type RadioVariant = 'filled' | 'outlined';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: DensitySize;
  variant?: RadioVariant;
  /** Accessible label text */
  label?: string;
}

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(
  ({ size, variant, disabled, label, className, id, onChange, checked, ...rest }, ref) => (
    <label
      ref={ref}
      className={`radio${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant || undefined}
      data-disabled={disabled || undefined}
    >
      <input
        type="radio"
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <span className="radio__circle" aria-hidden="true">
        <span className="radio__dot" />
      </span>
      {label && <span className="radio__label">{label}</span>}
    </label>
  )
);
Radio.displayName = 'Radio';
