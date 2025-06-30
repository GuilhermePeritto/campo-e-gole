
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Reservation } from '@/hooks/useCalendar';

interface EventoArrastavelProps {
  evento: Reservation;
  children: React.ReactNode;
  onDragStart: (evento: Reservation) => void;
  onDragEnd: (newDate?: Date, newTime?: string) => void;
  className?: string;
}

const EventoArrastavel = ({
  evento,
  children,
  onDragStart,
  onDragEnd,
  className
}: EventoArrastavelProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    onDragStart(evento);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', evento.id.toString());
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        "cursor-move transition-all duration-200",
        isDragging && "opacity-50 scale-95",
        "hover:shadow-md hover:scale-105",
        className
      )}
    >
      {children}
    </div>
  );
};

export default EventoArrastavel;
