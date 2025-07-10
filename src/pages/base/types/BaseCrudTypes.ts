import React from 'react';

// Tipos para colunas da tabela
export interface BaseCrudColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'multiselect';
  render?: (item: T) => React.ReactNode;
  canHide?: boolean;
}

// Tipos para ações
export interface BaseCrudAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  show?: (item: T) => boolean;
}

// Tipo para o hook base
export interface BaseCrudHook<T> {
  data: T[];
  loading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    startIndex: number;
    endIndex: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  fetchData: (params: any) => Promise<void>;
  deleteItem: (id: string | number) => Promise<void>;
  createItem?: (data: Partial<T>) => Promise<T>;
  updateItem?: (id: string | number, data: Partial<T>) => Promise<T>;
  getItem?: (id: string | number) => Promise<T>;
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
  columns: BaseCrudColumn<T>[];
  actions: BaseCrudAction<T>[];
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