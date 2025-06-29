
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
    { ...initialVisibility, ...cachedData.columnVisibility }
  );
  const [columnPinning, setColumnPinning] = useState<Record<string, 'left' | 'right' | false>>(
    cachedData.columnPinning || {}
  );

  // Initialize column order and sizes
  useEffect(() => {
    const columnIds = columns.map(col => col.id as string);
    
    if (columnOrder.length === 0 || !columnIds.every(id => columnOrder.includes(id))) {
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
  }, [columns, cachedData, containerWidth]);

  // Handle sorting changes
  const handleSortingChange = useCallback((updater: any) => {
    const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
    setSorting(newSorting);
    forceSave({ sorting: newSorting });
  }, [sorting, forceSave]);

  // Handle column order changes
  const handleColumnOrderChange = useCallback((updater: any) => {
    const newOrder = typeof updater === 'function' ? updater(columnOrder) : updater;
    setColumnOrder(newOrder);
    forceSave({ columnOrder: newOrder });
  }, [columnOrder, forceSave]);

  // Handle column visibility changes
  const handleColumnVisibilityChange = useCallback((updater: any) => {
    const newVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater;
    setColumnVisibility(newVisibility);
    forceSave({ columnVisibility: newVisibility });
  }, [columnVisibility, forceSave]);

  // Handle column pinning changes - FIXED for TanStack format
  const handleColumnPinningChange = useCallback((updater: any) => {
    if (typeof updater === 'function') {
      // Convert current pinning to TanStack format for the updater
      const currentTanStackPinning = {
        left: Object.entries(columnPinning).filter(([_, value]) => value === 'left').map(([key]) => key),
        right: Object.entries(columnPinning).filter(([_, value]) => value === 'right').map(([key]) => key)
      };
      
      // Get new pinning from updater
      const newTanStackPinning = updater(currentTanStackPinning);
      
      // Convert back to our format
      const newColumnPinning: Record<string, 'left' | 'right' | false> = {};
      
      // Reset all columns to false first
      columns.forEach(col => {
        newColumnPinning[col.id as string] = false;
      });
      
      // Apply new pinning states
      newTanStackPinning.left?.forEach((key: string) => {
        newColumnPinning[key] = 'left';
      });
      newTanStackPinning.right?.forEach((key: string) => {
        newColumnPinning[key] = 'right';
      });
      
      setColumnPinning(newColumnPinning);
      forceSave({ columnPinning: newColumnPinning });
    }
  }, [columnPinning, forceSave, columns]);

  // Handle column resize
  const handleColumnResize = useCallback((columnId: string, size: number) => {
    setColumnSizes(prev => {
      const newSizes = { ...prev, [columnId]: size };
      saveToCache({ columnSizes: newSizes });
      return newSizes;
    });
  }, [saveToCache]);

  // Handle column pinning - FIXED
  const handleColumnPin = useCallback((columnId: string, pinning: 'left' | 'right' | false) => {
    setColumnPinning(prev => {
      const newPinning = { ...prev, [columnId]: pinning };
      forceSave({ columnPinning: newPinning });
      return newPinning;
    });
  }, [forceSave]);

  // Generate table pinning state for TanStack Table - FIXED FORMAT
  const tablePinningState = useMemo(() => {
    const result: { left?: string[], right?: string[] } = {};
    const leftPinned = Object.entries(columnPinning).filter(([_, value]) => value === 'left').map(([key]) => key);
    const rightPinned = Object.entries(columnPinning).filter(([_, value]) => value === 'right').map(([key]) => key);
    
    if (leftPinned.length > 0) {
      result.left = leftPinned;
    }
    if (rightPinned.length > 0) {
      result.right = rightPinned;
    }
    
    return result;
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
