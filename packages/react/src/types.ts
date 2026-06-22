/**
 * Shared types for Design Token Forge React wrappers.
 * These map directly to the CSS data-attribute API.
 */

/** Full 10-step density ladder */
export type DensitySize =
  | 'micro' | 'tiny' | 'small' | 'base' | 'medium'
  | 'large' | 'big' | 'huge' | 'mega' | 'ultra';

/** 3-step compact density (display feedback components) */
export type CompactSize = 'small' | 'base' | 'large';

/** Semantic color role */
export type SemanticRole =
  | 'brand' | 'danger' | 'success' | 'warning' | 'info' | 'neutral';

/** Structural surface variant */
export type SurfaceVariant = 'filled' | 'outlined' | 'soft' | 'ghost';

/** Button-family structural variants */
export type ButtonVariant = 'filled' | 'outlined' | 'soft' | 'ghost';
