import type { Reservation } from '@/hooks/useCalendar';
import { DragEndEvent, DragOverEvent, DragStartEvent, useDndMonitor } from '@dnd-kit/core';
import { format, parseISO } from 'date-fns';
import { useCallback, useState } from 'react';

interface DropZoneData {
  date: string;
  time?: string;
  type: 'day' | 'timeSlot';
}

interface DraggedEvent {
  id: string;
  data: Reservation;
  originalPosition: {
    date: string;
    time: string;
  };
}

export const useArrastarSoltarAgenda = () => {
  const [draggedEvent, setDraggedEvent] = useState<DraggedEvent | null>(null);
  const [activeDropZone, setActiveDropZone] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const eventData = event.active.data.current as Reservation;
    if (!eventData) return;

    setDraggedEvent({
      id: event.active.id as string,
      data: eventData,
      originalPosition: {
        date: eventData.start.split('T')[0],
        time: eventData.startTime
      }
    });
    setIsDragging(true);
    console.log('Drag started:', eventData);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const dropZoneId = event.over?.id as string;
    setActiveDropZone(dropZoneId || null);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setIsDragging(false);
    setActiveDropZone(null);

    if (!draggedEvent || !event.over) {
      setDraggedEvent(null);
      return;
    }

    const dropZoneData = event.over.data.current as DropZoneData;
    if (!dropZoneData) {
      setDraggedEvent(null);
      return;
    }

    const { date, time, type } = dropZoneData;
    const originalEvent = draggedEvent.data;

    // Verificar se houve mudança real
    const isSameDate = date === draggedEvent.originalPosition.date;
    const isSameTime = time === draggedEvent.originalPosition.time;

    if (isSameDate && (type === 'day' || isSameTime)) {
      setDraggedEvent(null);
      return;
    }

    // Calcular nova data/hora
    let newDateTime: string;
    if (type === 'timeSlot' && time) {
      newDateTime = `${date}T${time}:00`;
    } else {
      // Manter horário original se dropado em um dia
      newDateTime = `${date}T${originalEvent.startTime}:00`;
    }

    // Calcular duração do evento
    const originalStart = parseISO(originalEvent.start);
    const originalEnd = parseISO(originalEvent.end);
    const duration = originalEnd.getTime() - originalStart.getTime();

    const newStart = parseISO(newDateTime);
    const newEnd = new Date(newStart.getTime() + duration);

    // Dados do evento atualizado
    const updatedEvent: Reservation = {
      ...originalEvent,
      start: newDateTime,
      end: format(newEnd, "yyyy-MM-dd'T'HH:mm:ss"),
      startTime: format(newStart, 'HH:mm'),
      endTime: format(newEnd, 'HH:mm'),
      day: newStart
    };

    // Log para debug - em produção seria feita a chamada à API
    console.log('Evento movido com sucesso:', {
      originalEvent,
      updatedEvent,
      changes: {
        from: {
          date: draggedEvent.originalPosition.date,
          time: draggedEvent.originalPosition.time
        },
        to: {
          date,
          time: time || originalEvent.startTime
        }
      }
    });

    // TODO: Implementar callback para atualizar o estado dos eventos
    // Em produção, fazer chamada à API para atualizar o evento
    // onEventUpdate?.(updatedEvent);

    setDraggedEvent(null);
  }, [draggedEvent]);

  // Monitor de eventos DnD
  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
  });

  // Verificar se uma drop zone está ativa
  const isDropZoneActive = useCallback((dropZoneId: string) => {
    return activeDropZone === dropZoneId;
  }, [activeDropZone]);

  // Verificar se um evento específico está sendo arrastado
  const isEventBeingDragged = useCallback((eventId: string) => {
    return draggedEvent?.id === eventId;
  }, [draggedEvent]);

  // Obter dados do evento sendo arrastado
  const getDraggedEventData = useCallback(() => {
    return draggedEvent;
  }, [draggedEvent]);

  return {
    isDragging,
    draggedEvent,
    activeDropZone,
    isDropZoneActive,
    isEventBeingDragged,
    getDraggedEventData,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  };
};
