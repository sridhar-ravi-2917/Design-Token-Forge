import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes, type ReactNode } from 'react';
import type { DensitySize } from './types.js';

export type AvatarShape = 'circle' | 'rounded' | 'square';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: DensitySize;
  shape?: AvatarShape;
  /** Image src */
  src?: string;
  /** Image alt text */
  alt?: string;
  /** Fallback initials (up to 2 chars) */
  initials?: string;
  /** Fallback icon element */
  icon?: ReactNode;
  /** Status indicator */
  status?: 'online' | 'away' | 'busy' | 'offline';
  /** Notification badge count */
  badgeCount?: number;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size, shape, src, alt = '', initials, icon, status, badgeCount, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={`avatar${className ? ` ${className}` : ''}`}
      data-size={size}
      data-shape={shape}
      data-status={status}
      {...rest}
    >
      {src ? (
        <img className="avatar__img" src={src} alt={alt} />
      ) : initials ? (
        <span className="avatar__initials" aria-hidden="true">{initials}</span>
      ) : icon ? (
        <span className="avatar__icon" aria-hidden="true">{icon}</span>
      ) : null}
      {status && <span className="avatar__status" aria-label={status} />}
      {badgeCount !== undefined && (
        <span className="avatar__badge" aria-label={`${badgeCount} notifications`}>
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      )}
    </div>
  )
);
Avatar.displayName = 'Avatar';
