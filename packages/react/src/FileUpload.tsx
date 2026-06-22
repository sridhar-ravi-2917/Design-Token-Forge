import { forwardRef, useRef, type HTMLAttributes, type ReactNode } from 'react';
import type { DensitySize } from './types.js';

export type FileUploadVariant = 'outlined' | 'filled' | 'soft';
export type FileUploadMode = 'dropzone' | 'button';

export interface FileUploadProps extends HTMLAttributes<HTMLDivElement> {
  size?: DensitySize;
  variant?: FileUploadVariant;
  mode?: FileUploadMode;
  disabled?: boolean;
  error?: boolean;
  /** Accept attribute forwarded to native input */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Called when files are selected */
  onFiles?: (files: FileList) => void;
  /** Icon element in dropzone */
  icon?: ReactNode;
  /** Title text in dropzone */
  title?: string;
  /** Description text in dropzone */
  description?: string;
  /** Label for the browse/upload button */
  buttonLabel?: string;
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  ({ size, variant, mode = 'dropzone', disabled, error, accept, multiple, onFiles, icon, title, description, buttonLabel = 'Browse files', className, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <div
        ref={ref}
        className={`file-upload${className ? ` ${className}` : ''}`}
        data-size={size}
        data-variant={variant}
        data-mode={mode}
        data-disabled={disabled || undefined}
        data-error={error || undefined}
        {...rest}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          hidden
          aria-hidden="true"
          onChange={e => e.target.files && onFiles?.(e.target.files)}
        />
        {mode === 'dropzone' ? (
          <div className="file-upload__dropzone">
            {icon && <span className="file-upload__icon" aria-hidden="true">{icon}</span>}
            {title && <p className="file-upload__title">{title}</p>}
            {description && <p className="file-upload__description">{description}</p>}
            <div className="file-upload__btn-row">
              <button
                type="button"
                className="file-upload__browse-btn"
                disabled={disabled}
                onClick={() => inputRef.current?.click()}
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="file-upload__btn-only"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            {icon && <span className="file-upload__icon" aria-hidden="true">{icon}</span>}
            {buttonLabel}
          </button>
        )}
      </div>
    );
  }
);
FileUpload.displayName = 'FileUpload';
