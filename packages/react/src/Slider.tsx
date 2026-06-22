import { forwardRef, useId, type HTMLAttributes } from 'react';
import type { DensitySize } from './types.js';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  size?: DensitySize;
  /** Current value */
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Show value tooltip */
  showTooltip?: boolean;
  /** Show tick marks */
  showMarks?: boolean;
  label?: string;
  onChange?: (value: number) => void;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ size, value, defaultValue, min = 0, max = 100, step = 1, disabled, showTooltip, showMarks, label, className, onChange, id, ...rest }, ref) => {
    const sliderId = useId();
    const inputId = id ?? sliderId;
    return (
      <div
        ref={ref}
        className={`slider${className ? ` ${className}` : ''}`}
        data-size={size}
        data-disabled={disabled || undefined}
        data-tooltip={showTooltip || undefined}
        data-marks={showMarks || undefined}
        {...rest}
      >
        {label && <label className="slider__label" htmlFor={inputId}>{label}</label>}
        <div className="slider__track">
          <input
            id={inputId}
            type="range"
            className="slider__input"
            min={min}
            max={max}
            step={step}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={e => onChange?.(Number(e.target.value))}
          />
          <span className="slider__fill" aria-hidden="true" />
          <span className="slider__thumb" aria-hidden="true" />
        </div>
      </div>
    );
  }
);
Slider.displayName = 'Slider';
