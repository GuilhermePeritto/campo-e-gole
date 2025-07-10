import ModuleHeader from '@/components/ModuleHeader';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BaseCrudSummary } from './BaseCrudSummary';
import { BaseCrudTable } from './BaseCrudTable';
import { BaseCrudAction, BaseCrudColumn, BaseCrudHook } from './types/BaseCrudTypes';

export interface BaseCrudPageProps<T> {
  // Configuração da página
  title: string;
  description?: string;
  icon: React.ReactNode;
  moduleColor: string;
  
  // Configuração da entidade
  entityName: string;
  entityNamePlural: string;
  entityRoute: string;
  
  // Hook com métodos CRUD
  hook: BaseCrudHook<T>;
  
  // Configuração das colunas
  columns: BaseCrudColumn<T>[];
  
  // Configuração das ações
  actions?: BaseCrudAction<T>[];
  
  // Configuração do botão de criar
  createButton?: {
    label: string;
    icon?: React.ReactNode;
    route: string;
  };
  
  // Configuração dos cards de resumo
  summaryCards?: Array<{
    title: string;
    value: (data: T[], pagination: any) => string | number;
    description?: string;
    icon: import('lucide-react').LucideIcon;
    color: string;
    trend?: {
      value: number;
      label: string;
      type: 'positive' | 'negative' | 'neutral';
    };
  }>;
  
  // Configurações adicionais
  searchFields?: (keyof T)[];
  searchPlaceholder?: string;
  showExport?: boolean;
  exportFilename?: string;
  defaultSort?: string;
  defaultPageSize?: number;
}

export function BaseCrudPage<T extends Record<string, any>>({
  title,
  description,
  icon,
  moduleColor,
  entityName,
  entityNamePlural,
  entityRoute,
  hook,
  columns,
  actions = [],
  createButton,
  summaryCards = [],
  searchFields = [],
  searchPlaceholder,
  showExport = false,
  exportFilename,
  defaultSort = 'id',
  defaultPageSize = 10
}: BaseCrudPageProps<T>) {
  const navigate = useNavigate();
  
  // Estados locais
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(defaultSort);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  
  // Ref para armazenar parâmetros anteriores e evitar chamadas desnecessárias
  const previousParamsRef = useRef<string>('');
  
  // Parâmetros para a API
  const apiParams = useMemo(() => {
    const params: any = {
      page: currentPage,
      limit: pageSize,
      sort: sortDirection === 'desc' ? `-${sortField}` : sortField
    };
    
    // Adicionar filtro de busca na propriedade filter
    if (searchTerm.trim()) {
      params.filter = searchTerm.trim();
    }
    
    // Adicionar filtros avançados na propriedade filter
    const additionalFilters: any = {};
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        additionalFilters[key] = values;
      }
    });
    
    // Combinar filtros se necessário
    if (Object.keys(additionalFilters).length > 0) {
      if (params.filter) {
        // Se já existe filter, combinar
        const existingFilter = typeof params.filter === 'string' 
          ? { search: params.filter }
          : params.filter;
        params.filter = { ...existingFilter, ...additionalFilters };
      } else {
        params.filter = additionalFilters;
      }
    }
    
    console.log('📋 BaseCrudPage - Parâmetros para API:', params);
    
    return params;
  }, [currentPage, pageSize, searchTerm, sortField, sortDirection, filters]);
  
  // Usar o hook fornecido
  const { data, loading, pagination, fetchData, deleteItem } = hook;
  
  // Carregar dados quando os parâmetros mudarem
  useEffect(() => {
    const paramsString = JSON.stringify(apiParams);
    
    // Só fazer a chamada se os parâmetros realmente mudaram
    if (paramsString !== previousParamsRef.current) {
      console.log('🔄 Parâmetros mudaram, fazendo nova chamada à API');
      previousParamsRef.current = paramsString;
      fetchData(apiParams);
    } else {
      console.log('⏭️ Parâmetros não mudaram, pulando chamada à API');
    }
  }, [apiParams, fetchData]);
  
  // Handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  
  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset para primeira página
  }, []);
  
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset para primeira página
  }, []);
  
  const handleSort = useCallback((field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
    setCurrentPage(1); // Reset para primeira página
  }, []);
  
  const handleFilterChange = useCallback((field: string, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [field]: values
    }));
    setCurrentPage(1); // Reset para primeira página
  }, []);
  
  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setFilters({});
    setCurrentPage(1);
  }, []);
  
  const handleCreate = useCallback(() => {
    if (createButton) {
      sessionStorage.setItem('returnUrl', window.location.pathname);
      navigate(createButton.route);
    }
  }, [createButton, navigate]);
  
  const handleEdit = useCallback((item: T) => {
    navigate(`${entityRoute}/${item.id}`);
  }, [navigate, entityRoute]);
  
  const handleDelete = useCallback(async (item: T) => {
    try {
      await deleteItem(item.id);
      toast.success(`${entityName} excluído com sucesso!`);
    } catch (error) {
      toast.error(`Erro ao excluir ${entityName}`);
    }
  }, [deleteItem, entityName]);
  
  // Preparar ações padrão
  const defaultActions = useMemo(() => {
    const defaultActionsList = [
      {
        label: 'Editar',
        onClick: handleEdit,
        variant: 'outline' as const
      }
    ];
    
    // Adicionar ações customizadas
    const customActions = actions.map(action => ({
      ...action,
      onClick: action.onClick,
      show: action.show || (() => true)
    }));
    
    return [...defaultActionsList, ...customActions];
  }, [actions, handleEdit]);
  
  // Preparar dados dos cards de resumo
  const summaryData = useMemo(() => {
    return summaryCards.map(card => ({
      title: card.title,
      value: card.value(data, pagination),
      description: card.description,
      icon: card.icon,
      color: card.color,
      trend: card.trend
    }));
  }, [summaryCards, data, pagination]);
  
  return (
    <div className="h-screen bg-background flex flex-col">
      <ModuleHeader
        title={title}
        icon={icon}
        moduleColor={moduleColor}
      />
      
      <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 xl:px-12 py-6 overflow-hidden">
        <div className="flex flex-col h-full space-y-6">
          {/* Cards de resumo */}
          {summaryCards.length > 0 && (
            <div className="flex-shrink-0">
              <BaseCrudSummary 
                cards={summaryData} 
                loading={loading} 
              />
            </div>
          )}
          
          {/* Tabela */}
          <div className="flex-1 min-h-0">
            <BaseCrudTable<T>
              data={data}
              columns={columns}
              actions={defaultActions}
              loading={loading}
              pagination={pagination}
              searchTerm={searchTerm}
              filters={filters}
              searchFields={searchFields}
              searchPlaceholder={searchPlaceholder || `Buscar ${entityNamePlural.toLowerCase()}...`}
              showExport={showExport}
              exportFilename={exportFilename || entityNamePlural.toLowerCase()}
              createButton={createButton ? {
                label: createButton.label,
                icon: createButton.icon,
                onClick: handleCreate
              } : undefined}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onSearch={handleSearch}
              onSort={handleSort}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
} 