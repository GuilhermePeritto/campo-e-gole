
export const MODULE_COLORS = {
  dashboard: '#6366f1', // Indigo color for dashboard
  events: 'rgb(var(--module-events))', // Amber
  bar: 'rgb(var(--module-bar))', // Emerald
  school: 'rgb(var(--module-school))', // Violet
  financial: 'rgb(var(--module-financial))', // Red
  settings: 'rgb(var(--module-settings))', // Gray
  reports: '#06b6d4', // Cyan
} as const;

export type ModuleColorKey = keyof typeof MODULE_COLORS;
