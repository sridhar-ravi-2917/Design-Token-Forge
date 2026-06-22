import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { SemanticRole } from './types.js';

export type ToastVariant = 'soft' | 'filled' | 'outlined';
export type ToastSize = 'small' | 'base' | 'large';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  size?: ToastSize;
  variant?: ToastVariant;
  colorRole?: SemanticRole;
  /** Show left accent bar */
  accent?: boolean;
  /** Persists until dismissed (no auto-dismiss) */
  persistent?: boolean;
  /** Icon element */
  icon?: ReactNode;
  /** Bold title line */
  title?: string;
  children?: ReactNode;
  /** Action button label */
  actionLabel?: string;
  /** Called when action is clicked */
  onAction?: () => void;
  /** Called when close is clicked */
  onDismiss?: () => void;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ size, variant, colorRole, accent, persistent, icon, title, children, actionLabel, onAction, onDismiss, className, ...rest }, ref) => (
    <div
      ref={ref}
      role={colorRole === 'danger' ? 'alert' : 'status'}
      className={`toast${className ? ` ${className}` : ''}`}
      data-size={size}
      data-variant={variant}
      data-role={colorRole}
      data-accent={accent || undefined}
      data-persistent={persistent || undefined}
      {...rest}
    >
      {accent && <span className="toast__accent" aria-hidden="true" />}
      {icon && <span className="toast__icon" aria-hidden="true">{icon}</span>}
      <div className="toast__content">
        {title && <p className="toast__title">{title}</p>}
        {children && <div className="toast__body">{children}</div>}
      </div>
      {actionLabel && onAction && (
        <button type="button" className="toast__action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
      {onDismiss && (
        <button type="button" className="toast__close" aria-label="Dismiss" onClick={onDismiss} />
      )}
    </div>
  )
);
Toast.displayName = 'Toast';
