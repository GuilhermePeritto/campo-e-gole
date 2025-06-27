
import React from 'react';

// Extensão das interfaces existentes para suportar funcionalidades avançadas
export interface BaseListColumnExtended<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  // Novas propriedades para funcionalidades avançadas
  resizable?: boolean;
  pinnable?: boolean;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
}

export interface BaseListTableSettings {
  columnOrder?: string[];
  columnSizes?: Record<string, number>;
  pinnedColumns?: {
    left?: string[];
    right?: string[];
  };
  sortingState?: {
    id: string;
    desc: boolean;
  }[];
}

export interface BaseListAdvancedProps<T> {
  // Propriedades existentes
  data: T[];
  columns: BaseListColumnExtended<T>[];
  actions?: any[];
  getItemId: (item: T) => string | number;
  
  // Novas propriedades para funcionalidades avançadas
  enableColumnReordering?: boolean;
  enableColumnResizing?: boolean;
  enableColumnPinning?: boolean;
  enableSorting?: boolean;
  tableSettings?: BaseListTableSettings;
  onTableSettingsChange?: (settings: BaseListTableSettings) => void;
  persistSettings?: boolean;
  settingsKey?: string;
}

// Hook para persistir configurações da tabela
export const useTableSettings = (key: string, defaultSettings?: BaseListTableSettings) => {
  const [settings, setSettings] = React.useState<BaseListTableSettings>(() => {
    if (typeof window === 'undefined') return defaultSettings || {};
    
    try {
      const saved = localStorage.getItem(`table-settings-${key}`);
      return saved ? JSON.parse(saved) : defaultSettings || {};
    } catch {
      return defaultSettings || {};
    }
  });

  const updateSettings = React.useCallback((newSettings: BaseListTableSettings) => {
    setSettings(newSettings);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`table-settings-${key}`, JSON.stringify(newSettings));
      } catch (error) {
        console.warn('Failed to save table settings:', error);
      }
    }
  }, [key]);

  return [settings, updateSettings] as const;
};

export default BaseListColumnExtended;
