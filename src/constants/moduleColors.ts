
export const MODULE_COLORS = {
  dashboard: 'rgb(var(--module-dashboard))', // Indigo
  events: 'rgb(var(--module-events))', // Amber
  bar: 'rgb(var(--module-bar))', // Emerald
  school: 'rgb(var(--module-school))', // Violet
  financial: 'rgb(var(--module-financial))', // Red
  settings: 'rgb(var(--module-settings))', // Gray
  reports: '#06b6d4', // Cyan
} as const;

export type ModuleColorKey = keyof typeof MODULE_COLORS;
