import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { DensitySize } from './types.js';

export type DatePickerVariant = 'outlined' | 'filled';

export interface DatePickerProps extends HTMLAttributes<HTMLDivElement> {
  size?: DensitySize;
  variant?: DatePickerVariant;
  /** Inline (always visible) vs popup */
  mode?: 'popup' | 'inline';
  /** Range selection mode */
  range?: boolean;
  disabled?: boolean;
  /** Selected date ISO string */
  value?: string;
  /** Placeholder for input trigger */
  placeholder?: string;
  label?: string;
  children?: ReactNode;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ size, variant, mode, range, disabled, value, placeholder, label, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={`datepicker${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-mode={mode}
      data-range={range || undefined}
      data-disabled={disabled || undefined}
      {...rest}
    >
      {label && <span className="datepicker__label">{label}</span>}
      {children}
    </div>
  )
);
DatePicker.displayName = 'DatePicker';
