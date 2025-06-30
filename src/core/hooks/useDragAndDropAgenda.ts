
import { useState, useCallback } from 'react';
import { useReservas } from '@/hooks/useReservas';
import type { Reservation } from '@/hooks/useCalendar';

export const useDragAndDropAgenda = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState<Reservation | null>(null);
  const { updateReserva } = useReservas();

  const handleDragStart = useCallback((event: Reservation) => {
    setIsDragging(true);
    setDraggedEvent(event);
  }, []);

  const handleDragEnd = useCallback((newDate?: Date, newTime?: string) => {
    if (draggedEvent && newDate) {
      const year = newDate.getFullYear();
      const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
      const day = newDate.getDate().toString().padStart(2, '0');
      const newDateStr = `${year}-${month}-${day}`;

      updateReserva(draggedEvent.id, {
        date: newDateStr,
        startTime: newTime || draggedEvent.startTime
      });
    }
    
    setIsDragging(false);
    setDraggedEvent(null);
  }, [draggedEvent, updateReserva]);

  const handleDragCancel = useCallback(() => {
    setIsDragging(false);
    setDraggedEvent(null);
  }, []);

  return {
    isDragging,
    draggedEvent,
    handleDragStart,
    handleDragEnd,
    handleDragCancel
  };
};
