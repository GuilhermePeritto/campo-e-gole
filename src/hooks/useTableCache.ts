
import { useCallback, useEffect, useRef, useState } from 'react';
import { SortingState, VisibilityState } from '@tanstack/react-table';

interface TableCache {
  columnSizes: Record<string, number>;
  columnOrder: string[];
  columnVisibility: VisibilityState;
  sorting: SortingState;
  columnPinning: Record<string, 'left' | 'right' | false>;
  advancedFilters: Record<string, string[]>;
}

const CACHE_PREFIX = 'baselist_table_';
const CACHE_VERSION = '1.0';

const getCacheKey = (entityName: string) => `${CACHE_PREFIX}${entityName}_v${CACHE_VERSION}`;

const loadTableCache = (entityName: string): Partial<TableCache> => {
  try {
    const cached = localStorage.getItem(getCacheKey(entityName));
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

const saveTableCache = (entityName: string, cache: Partial<TableCache>) => {
  try {
    const existing = loadTableCache(entityName);
    const updated = { ...existing, ...cache };
    localStorage.setItem(getCacheKey(entityName), JSON.stringify(updated));
  } catch (error) {
    console.warn('Failed to save table cache:', error);
  }
};

export const useTableCache = (entityName: string) => {
  const [cachedData, setCachedData] = useState<Partial<TableCache>>(() => 
    loadTableCache(entityName)
  );
  
  const lastSavedRef = useRef<string>('');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cachedDataRef = useRef<Partial<TableCache>>(cachedData);

  useEffect(() => {
    cachedDataRef.current = cachedData;
  }, [cachedData]);

  const saveToCache = useCallback((data: Partial<TableCache>, immediate = false) => {
    const dataString = JSON.stringify(data);
    
    if (dataString === lastSavedRef.current) return;
    
    const doSave = () => {
      const fullData = { ...cachedDataRef.current, ...data };
      saveTableCache(entityName, fullData);
      setCachedData(fullData);
      lastSavedRef.current = dataString;
    };

    if (immediate) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
      doSave();
    } else {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        doSave();
        saveTimeoutRef.current = null;
      }, 500);
    }
  }, [entityName]);

  const forceSave = useCallback((data: Partial<TableCache>) => {
    saveToCache(data, true);
  }, [saveToCache]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    cachedData,
    saveToCache,
    forceSave,
  };
};
