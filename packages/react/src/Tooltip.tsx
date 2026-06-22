import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { DensitySize } from './types.js';

export type TooltipVariant = 'default' | 'light' | 'danger' | 'warning' | 'info' | 'success';
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';
export type TooltipSize = 'small' | 'base' | 'large';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  size?: TooltipSize;
  variant?: TooltipVariant;
  placement?: TooltipPlacement;
  /** Tooltip unique id — set same value on trigger's aria-describedby */
  id: string;
  /** Optional title (rich tooltip) */
  title?: string;
  children?: ReactNode;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ size, variant, placement, id, title, children, className, ...rest }, ref) => (
    <div
      ref={ref}
      role="tooltip"
      id={id}
      className={`tooltip${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-placement={placement}
      {...rest}
    >
      {title && <p className="tooltip__title">{title}</p>}
      {children && <p className="tooltip__body">{children}</p>}
      <span className="tooltip__arrow" aria-hidden="true" />
    </div>
  )
);
Tooltip.displayName = 'Tooltip';
