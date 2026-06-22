import { forwardRef, type TextareaHTMLAttributes, type ReactNode } from 'react';
import type { DensitySize } from './types.js';

export type TextareaVariant = 'outlined' | 'filled';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: DensitySize;
  variant?: TextareaVariant;
  error?: boolean;
  label?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLDivElement, TextareaProps>(
  ({ size, variant, error, disabled, label, helperText, className, id, ...rest }, ref) => (
    <div
      ref={ref}
      className={`textarea${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-error={error || undefined}
      data-disabled={disabled || undefined}
    >
      {label && <label className="textarea__label" htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        className="textarea__control"
        disabled={disabled}
        aria-invalid={error || undefined}
        {...rest}
      />
      {helperText && <span className="textarea__helper">{helperText}</span>}
    </div>
  )
);
Textarea.displayName = 'Textarea';
