
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

export const generateEntityName = (entityName?: string, columns?: any[]): string => {
  if (entityName) {
    return entityName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  }
  
  if (columns && columns.length > 0) {
    const columnKeys = columns.map(col => String(col.key)).slice(0, 3).join('_');
    return `table_${columnKeys.toLowerCase().replace(/[^a-z0-9_]/g, '_')}`;
  }
  
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
