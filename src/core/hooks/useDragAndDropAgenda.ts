
import { useState, useCallback } from 'react';
import { useReservas } from '@/hooks/useReservas';
import { toast } from '@/hooks/use-toast';

interface DragEvent {
  id: number;
  newDate: string;
  newStartTime: string;
  newEndTime: string;
}

export const useDragAndDropAgenda = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState<number | null>(null);
  const { updateReserva } = useReservas();

  const handleDragStart = useCallback((eventId: number) => {
    setIsDragging(true);
    setDraggedEvent(eventId);
  }, []);

  const handleDragEnd = useCallback((event: DragEvent) => {
    try {
      updateReserva(event.id, {
        date: event.newDate,
        startTime: event.newStartTime,
        endTime: event.newEndTime
      });

      toast({
        title: "Evento reagendado",
        description: "O evento foi movido com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao reagendar",
        description: "Não foi possível mover o evento.",
        variant: "destructive"
      });
    } finally {
      setIsDragging(false);
      setDraggedEvent(null);
    }
  }, [updateReserva]);

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
