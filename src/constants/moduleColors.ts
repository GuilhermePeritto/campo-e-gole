
export const MODULE_COLORS = {
  inicio: 'hsl(var(--background))', // Usando a cor do background
  events: 'rgb(var(--module-events))', // Amber
  bar: 'rgb(var(--module-bar))', // Emerald
  school: 'rgb(var(--module-school))', // Violet
  financial: 'rgb(var(--module-financial))', // Red
  settings: 'rgb(var(--module-settings))', // Gray
  reports: '#06b6d4', // Cyan
} as const;

export type ModuleColorKey = keyof typeof MODULE_COLORS;
