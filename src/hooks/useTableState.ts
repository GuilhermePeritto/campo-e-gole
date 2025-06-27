
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ColumnDef, SortingState, VisibilityState } from '@tanstack/react-table';
import { useTableCache } from './useTableCache';

interface UseTableStateProps {
  entityName: string;
  columns: ColumnDef<any>[];
  containerWidth: number;
  initialVisibility: VisibilityState;
}

const calculateAutoColumnSizes = (
  columns: ColumnDef<any>[],
  containerWidth: number,
  minColumnSize: number = 150,
  maxColumnSize: number = 400
): Record<string, number> => {
  const availableWidth = containerWidth - 32;
  const totalColumns = columns.length;
  
  if (totalColumns === 0) return {};
  
  const baseSize = Math.max(minColumnSize, availableWidth / totalColumns);
  const finalSize = Math.min(maxColumnSize, baseSize);
  
  return columns.reduce((acc, col) => {
    acc[col.id as string] = finalSize;
    return acc;
  }, {} as Record<string, number>);
};

export const useTableState = ({ 
  entityName, 
  columns, 
  containerWidth, 
  initialVisibility 
}: UseTableStateProps) => {
  const { cachedData, saveToCache, forceSave } = useTableCache(entityName);
  
  const [sorting, setSorting] = useState<SortingState>(cachedData.sorting || []);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [columnSizes, setColumnSizes] = useState<Record<string, number>>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    cachedData.columnVisibility || initialVisibility
  );
  const [columnPinning, setColumnPinning] = useState<Record<string, 'left' | 'right' | false>>(
    cachedData.columnPinning || {}
  );

  // Initialize column order and sizes
  useEffect(() => {
    const columnIds = columns.map(col => col.id as string);
    
    if (columnOrder.length === 0) {
      const cachedOrder = cachedData.columnOrder?.filter(id => columnIds.includes(id)) || [];
      const newColumns = columnIds.filter(id => !cachedOrder.includes(id));
      const finalOrder = [...cachedOrder, ...newColumns];
      setColumnOrder(finalOrder);
    }

    const cachedSizes = cachedData.columnSizes || {};
    const autoSizes = calculateAutoColumnSizes(columns, containerWidth);
    
    const finalSizes = columnIds.reduce((acc, id) => {
      acc[id] = cachedSizes[id] || autoSizes[id] || 200;
      return acc;
    }, {} as Record<string, number>);
    
    setColumnSizes(finalSizes);
  }, [columns, cachedData, containerWidth, columnOrder.length]);

  // Handle sorting changes
  const handleSortingChange = useCallback((updater: any) => {
    setSorting(updater);
    const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
    forceSave({ sorting: newSorting });
  }, [sorting, forceSave]);

  // Handle column order changes
  const handleColumnOrderChange = useCallback((updater: any) => {
    setColumnOrder(updater);
    const newOrder = typeof updater === 'function' ? updater(columnOrder) : updater;
    forceSave({ columnOrder: newOrder });
  }, [columnOrder, forceSave]);

  // Handle column visibility changes
  const handleColumnVisibilityChange = useCallback((updater: any) => {
    setColumnVisibility(updater);
    const newVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater;
    forceSave({ columnVisibility: newVisibility });
  }, [columnVisibility, forceSave]);

  // Handle column pinning changes
  const handleColumnPinningChange = useCallback((updater: any) => {
    if (typeof updater === 'function') {
      const currentPinning = Object.entries(columnPinning).reduce((acc, [key, value]) => {
        if (value && value !== false) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, 'left' | 'right'>);
      
      const newPinning = updater(currentPinning);
      
      const updatedColumnPinning = { ...columnPinning };
      Object.keys(updatedColumnPinning).forEach(key => {
        updatedColumnPinning[key] = false;
      });
      
      Object.entries(newPinning).forEach(([key, value]) => {
        updatedColumnPinning[key] = value;
      });
      
      setColumnPinning(updatedColumnPinning);
      forceSave({ columnPinning: updatedColumnPinning });
    }
  }, [columnPinning, forceSave]);

  // Handle column resize
  const handleColumnResize = useCallback((columnId: string, size: number) => {
    setColumnSizes(prev => {
      const newSizes = { ...prev, [columnId]: size };
      saveToCache({ columnSizes: newSizes });
      return newSizes;
    });
  }, [saveToCache]);

  // Handle column pinning
  const handleColumnPin = useCallback((columnId: string, pinning: 'left' | 'right' | false) => {
    setColumnPinning(prev => {
      const newPinning = { ...prev, [columnId]: pinning };
      forceSave({ columnPinning: newPinning });
      return newPinning;
    });
  }, [forceSave]);

  // Generate table pinning state for TanStack Table
  const tablePinningState = useMemo(() => {
    return Object.entries(columnPinning).reduce((acc, [key, value]) => {
      if (value && value !== false) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, 'left' | 'right'>);
  }, [columnPinning]);

  return {
    sorting,
    columnOrder,
    columnSizes,
    columnVisibility,
    columnPinning,
    tablePinningState,
    handleSortingChange,
    handleColumnOrderChange,
    handleColumnVisibilityChange,
    handleColumnPinningChange,
    handleColumnResize,
    handleColumnPin,
  };
};
