/**
 * Typography Presets — Design Token Forge
 * ----------------------------------------
 * Five starter kits a designer can pick at project setup.
 * Each preset is a self-contained typography configuration:
 *   - three font roles (headline / body / code)
 *   - a fixed size ladder
 *   - shared weight / line-height / letter-spacing ladders
 *
 * The generator consumes these to emit primitive CSS overrides
 * for a project. The onboard UI consumes the same data to render
 * the five preset cards. Mirrors how `paletteKeys` works for colour.
 *
 * Field reference for each preset:
 *   id            – stable key written to project config
 *   name          – designer-facing label
 *   tagline       – short description shown under the name
 *   fonts.{role}  – { stack, source, label }
 *                   stack:  full CSS font-family string with fallbacks
 *                   source: 'system' | 'google' | 'custom'
 *                   label:  designer-facing name (shown in tag chip)
 *   sizes         – ordered array of px integers (becomes --font-size-{N})
 *   weights       – map of name → numeric weight (becomes --font-weight-{name})
 *   lineHeights   – map of name → unitless multiplier
 *   letterSpacings – map of name → em string (sync converts to % for Figma)
 */

export const TYPOGRAPHY_PRESETS = {
  'neutral-system': {
    id: 'neutral-system',
    name: 'Neutral System',
    tagline: 'Native UI fonts on every OS',
    fonts: {
      headline: {
        stack: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        source: 'system',
        label: 'System UI'
      },
      body: {
        stack: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        source: 'system',
        label: 'System UI'
      },
      code: {
        stack: '"SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", Menlo, Consolas, monospace',
        source: 'system',
        label: 'SF Mono'
      }
    }
  },

  'modern-geometric': {
    id: 'modern-geometric',
    name: 'Modern Geometric',
    tagline: 'Crisp, neutral, product-friendly',
    fonts: {
      headline: {
        stack: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        source: 'google',
        label: 'Inter'
      },
      body: {
        stack: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        source: 'google',
        label: 'Inter'
      },
      code: {
        stack: '"JetBrains Mono", "SF Mono", Menlo, monospace',
        source: 'google',
        label: 'JetBrains Mono'
      }
    }
  },

  'editorial-serif': {
    id: 'editorial-serif',
    name: 'Editorial Serif',
    tagline: 'Display serif over a sans body',
    fonts: {
      headline: {
        stack: 'Fraunces, Georgia, "Times New Roman", serif',
        source: 'google',
        label: 'Fraunces'
      },
      body: {
        stack: 'Inter, system-ui, -apple-system, sans-serif',
        source: 'google',
        label: 'Inter'
      },
      code: {
        stack: '"IBM Plex Mono", "SF Mono", Menlo, monospace',
        source: 'google',
        label: 'IBM Plex Mono'
      }
    }
  },

  'friendly-humanist': {
    id: 'friendly-humanist',
    name: 'Friendly Humanist',
    tagline: 'Approachable, soft, easy on the eye',
    fonts: {
      headline: {
        stack: 'Nunito, "Trebuchet MS", "Lucida Sans", sans-serif',
        source: 'google',
        label: 'Nunito'
      },
      body: {
        stack: 'Nunito, "Trebuchet MS", "Lucida Sans", sans-serif',
        source: 'google',
        label: 'Nunito'
      },
      code: {
        stack: '"Source Code Pro", "SF Mono", Menlo, monospace',
        source: 'google',
        label: 'Source Code'
      }
    }
  },

  'code-first-mono': {
    id: 'code-first-mono',
    name: 'Code-first Mono',
    tagline: 'Dev tools / terminal feel',
    fonts: {
      headline: {
        stack: '"SF Mono", "JetBrains Mono", Menlo, Consolas, monospace',
        source: 'system',
        label: 'SF Mono'
      },
      body: {
        stack: '"SF Mono", "JetBrains Mono", Menlo, Consolas, monospace',
        source: 'system',
        label: 'SF Mono'
      },
      code: {
        stack: '"SF Mono", "JetBrains Mono", Menlo, Consolas, monospace',
        source: 'system',
        label: 'SF Mono'
      }
    }
  }
};

/**
 * Shared ladder for every preset. Pulled from the current primitives.css
 * so existing component tokens keep resolving without change.
 *
 * Designer can override individual sizes later in the Phase 2 editor.
 */
export const TYPOGRAPHY_LADDER = {
  sizes: [10, 11, 12, 13, 14, 16, 18, 20, 24, 26, 28, 32, 40],
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 900
  },
  lineHeights: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  },
  // Stored in em — converted to % by the sync server at the Figma boundary.
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
};

export const DEFAULT_TYPOGRAPHY_PRESET = 'neutral-system';

/**
 * Build a flat config object suitable for writing into a project's config.json.
 * This is what onboard saves when the designer picks a preset card.
 *
 * Shape:
 *   { preset, fonts, ladder }
 *
 * The generator reads this and emits CSS overrides for primitives.css.
 */
export function buildTypographyConfig(presetId) {
  const preset = TYPOGRAPHY_PRESETS[presetId] || TYPOGRAPHY_PRESETS[DEFAULT_TYPOGRAPHY_PRESET];
  return {
    preset: preset.id,
    fonts: preset.fonts,
    ladder: TYPOGRAPHY_LADDER
  };
}
