export const themeColors = {
  // === Brand Colors ===
  primary: '#8B0000', // Custom Tibetan red — not in Tailwind (deep cultural red)
  primaryLight: '#B22222', // Custom firebrick — not in Tailwind (hover variant)
  primaryDark: '#5B0A0A', // Custom dark Tibetan red — not in Tailwind (active/pressed)

  // === Secondary and Accent Colors ===
  secondary: '#D97706', // Tailwind: amber[700] = #D97706 — warm golden brown
  accent: '#1F2937', // Tailwind: gray[800] = #1F2937 — deep charcoal for text/icon accents

  // === Background and Surface Colors ===
  background: '#F9FAFB', // Tailwind: gray[50] = #F9FAFB — base background
  surface: '#FFFFFF', // Tailwind: white = #FFFFFF — cards, panels

  // === Neutral Colors ===
  neutral: '#7C4D3A', // Custom earth brown — not in Tailwind (used for body text, trim)
  muted: '#E5E7EB', // Tailwind: gray[200] = #E5E7EB — muted backgrounds (table rows, etc.)

  // === Semantic Colors ===
  error: '#EF4444', // Tailwind: red[500] = #EF4444 — error state
  success: '#10B981', // Tailwind: green[500] = #10B981 — success state
  warning: '#F59E0B', // Tailwind: amber[500] = #F59E0B — warning/alert
};
export const themeSpacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
};

export const themeBorderRadius = {
  sm: '0.25rem', // 4px
  md: '0.5rem', // 8px
  lg: '1rem', // 16px
  full: '9999px',
};

export const themeFontSize = {
  sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px / 20px
  base: ['1rem', { lineHeight: '1.5rem' }], // 16px / 24px
  lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px / 28px
  xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px / 28px
};

export const themeFontFamily = {
  sans: 'Inter, sans-serif',
  serif: 'Merriweather, serif',
  mono: 'Menlo, monospace',
};
