
import { Column } from '@tanstack/react-table';
import { CSSProperties, useEffect, useRef, useState } from 'react';

export const getPinningStyles = <T,>(column: Column<T>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const pinningOffset = isPinned === 'left' ? column.getStart('left') : isPinned === 'right' ? column.getAfter('right') : 0;
  
  return {
    left: isPinned === 'left' ? `${pinningOffset}px` : undefined,
    right: isPinned === 'right' ? `${pinningOffset}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 10 : 0,
  };
};

export const getNestedValue = (obj: any, path: string | keyof any): any => {
  if (!obj) return undefined;
  
  if (typeof path === 'string' && path.includes('.')) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }
  
  return obj[path];
};

// FIXED: Generate entity name based only on entityName, not column structure
export const generateEntityName = (entityName?: string, columns?: any[]): string => {
  if (entityName) {
    return entityName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  }
  
  // Fallback to a generic name if no entityName provided
  return 'default_table';
};

export const useContainerSize = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerWidth(rect.width);
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return { containerRef, containerWidth };
};

// NEW: Type detection utilities
export const detectDataType = (value: any): string => {
  if (value === null || value === undefined) return 'text';
  
  const stringValue = String(value).toLowerCase();
  
  // Check for boolean
  if (typeof value === 'boolean' || stringValue === 'true' || stringValue === 'false' || 
      stringValue === 'ativo' || stringValue === 'inativo' || stringValue === 'sim' || stringValue === 'não') {
    return 'boolean';
  }
  
  // Check for date
  if (value instanceof Date || /^\d{4}-\d{2}-\d{2}/.test(stringValue) || /^\d{2}\/\d{2}\/\d{4}/.test(stringValue)) {
    return 'date';
  }
  
  // Check for datetime
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(stringValue) || /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/.test(stringValue)) {
    return 'datetime';
  }
  
  // Check for currency/money
  if (typeof value === 'number' || /^R\$/.test(stringValue) || (!isNaN(parseFloat(stringValue)) && isFinite(parseFloat(stringValue)))) {
    if (stringValue.includes('r$') || stringValue.includes('$') || /^\d+(\.\d{2})?$/.test(stringValue)) {
      return 'currency';
    }
    return 'number';
  }
  
  // Check for email
  if (/@/.test(stringValue) && /\.[a-z]{2,}/.test(stringValue)) {
    return 'email';
  }
  
  // Check for phone
  if (/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/.test(stringValue) || /^\d{10,11}$/.test(stringValue.replace(/[^\d]/g, ''))) {
    return 'phone';
  }
  
  // Check for URL
  if (/^https?:\/\//.test(stringValue)) {
    return 'url';
  }
  
  // Check for status/badge values
  if (['ativo', 'inativo', 'pendente', 'aprovado', 'rejeitado', 'concluído', 'cancelado'].includes(stringValue)) {
    return 'status';
  }
  
  return 'text';
};

export const inferColumnType = (data: any[], columnKey: string): string => {
  if (!data.length) return 'text';
  
  // Sample first few non-null values
  const sampleValues = data
    .slice(0, 10)
    .map(item => getNestedValue(item, columnKey))
    .filter(val => val !== null && val !== undefined);
    
  if (!sampleValues.length) return 'text';
  
  // Get type for each sample value
  const types = sampleValues.map(detectDataType);
  
  // Return most common type
  const typeCount = types.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(typeCount).sort(([,a], [,b]) => b - a)[0][0];
};
