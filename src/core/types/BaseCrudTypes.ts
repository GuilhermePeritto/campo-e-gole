import React from 'react';

// Renomear tipos para português
export interface ColunaListagem<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'select' | 'text';
  canHide?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface AcaoListagem<T> {
  label: string;
  onClick: (item: T) => void;
  variant?: 'default' | 'outline' | 'destructive';
  icon?: React.ReactNode;
  show?: (item: T) => boolean;
}

export interface HookListagem<T> {
  data: T[];
  loading: boolean;
  pagination: any;
  fetchData: (params: any) => void;
  deleteItem: (id: string | number) => Promise<void>;
}

// Tipos para parâmetros da API
export interface BaseApiParams {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string;
  fields?: string;
  [key: string]: any;
}

// Tipos para paginação
export interface BasePagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BaseCrudSummaryCard {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<any>;
  color: string;
  trend?: {
    value: number;
    label: string;
    type: 'positive' | 'negative' | 'neutral';
  };
}

export interface BaseCrudTableProps<T> {
  data: T[];
  columns: ColunaListagem<T>[];
  actions: AcaoListagem<T>[];
  loading: boolean;
  pagination: BasePagination;
  searchTerm: string;
  filters: Record<string, string[]>;
  searchFields?: (keyof T)[];
  searchPlaceholder?: string;
  showExport?: boolean;
  exportFilename?: string;
  createButton?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearch: (term: string) => void;
  onSort: (field: string, direction: 'asc' | 'desc') => void;
  onFilterChange: (field: string, values: string[]) => void;
  onClearFilters: () => void;
  onDelete: (item: T) => void;
}

export interface BaseCrudSummaryProps {
  cards: BaseCrudSummaryCard[];
  loading: boolean;
} 