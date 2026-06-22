import { forwardRef, type InputHTMLAttributes } from 'react';
import type { DensitySize } from './types.js';

export type ToggleVariant = 'filled' | 'outlined';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: DensitySize;
  variant?: ToggleVariant;
  /** Accessible label text */
  label?: string;
  /** Whether the toggle is checked */
  checked?: boolean;
  defaultChecked?: boolean;
}

export const Toggle = forwardRef<HTMLLabelElement, ToggleProps>(
  ({ size, variant, disabled, checked, defaultChecked, label, className, id, onChange, ...rest }, ref) => (
    <label
      ref={ref}
      className={`switch${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant || undefined}
      data-disabled={disabled || undefined}
    >
      <input
        type="checkbox"
        role="switch"
        id={id}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        aria-checked={checked}
        {...rest}
      />
      <span className="switch__track" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
      {label && <span className="switch__label">{label}</span>}
    </label>
  )
);
Toggle.displayName = 'Toggle';
