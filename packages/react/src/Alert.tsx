import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { SemanticRole } from './types.js';

export type AlertVariant = 'soft' | 'filled' | 'outlined';
export type AlertSize = 'small' | 'base' | 'large';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  size?: AlertSize;
  variant?: AlertVariant;
  colorRole?: SemanticRole;
  /** Show left accent bar */
  accent?: boolean;
  /** Icon element */
  icon?: ReactNode;
  /** Bold title line */
  title?: string;
  /** Body message */
  children?: ReactNode;
  /** Called when the close button is clicked */
  onDismiss?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ size, variant, colorRole, accent, icon, title, children, onDismiss, className, ...rest }, ref) => (
    <div
      ref={ref}
      role={colorRole === 'danger' ? 'alert' : 'status'}
      className={`alert${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-role={colorRole}
      data-accent={accent || undefined}
      {...rest}
    >
      {accent && <span className="alert__accent" aria-hidden="true" />}
      {icon && <span className="alert__icon" aria-hidden="true">{icon}</span>}
      <div className="alert__content">
        {title && <p className="alert__title">{title}</p>}
        {children && <div className="alert__body">{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          className="alert__close"
          aria-label="Dismiss"
          onClick={onDismiss}
        />
      )}
    </div>
  )
);
Alert.displayName = 'Alert';
