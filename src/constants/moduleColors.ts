
export const MODULE_COLORS = {
  dashboard: '#6366f1', // Indigo
  events: '#f59e0b', // Amber
  bar: '#10b981', // Emerald
  school: '#8b5cf6', // Violet
  financial: '#ef4444', // Red
  settings: '#6b7280', // Gray
  reports: '#06b6d4', // Cyan
} as const;

export type ModuleColorKey = keyof typeof MODULE_COLORS;
