import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Clock, GripVertical, MapPin } from 'lucide-react';
import { memo, ReactNode } from 'react';
import type { EventoAgenda } from '../hooks/useCalendar';

interface EventoArrastavelProps {
  evento: EventoAgenda;
  children?: ReactNode;
  isDragging?: boolean;
  className?: string;
}

const EventoArrastavel = memo(({ 
  evento, 
  children, 
  isDragging = false,
  className 
}: EventoArrastavelProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isBeingDragged
  } = useDraggable({
    id: `event-${evento.id}`,
    data: evento
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pendente': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelado': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmado': return 'Confirmado';
      case 'pendente': return 'Pendente';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  if (children) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "cursor-move transition-all duration-200",
          isDragging && "opacity-50 scale-95 rotate-2",
          className
        )}
        {...listeners}
        {...attributes}
      >
        {children}
      </div>
    );
  }

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative hover:shadow-md hover:shadow-primary/10 transition-all duration-200 group border-border/50",
        (isDragging || isBeingDragged) && "opacity-50 scale-95",
        className
      )}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: evento.cor }}
                />
              </div>
              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {evento.cliente}
              </h4>
              <Badge 
                className={getStatusColor(evento.status)}
                variant="secondary"
              >
                {getStatusLabel(evento.status)}
              </Badge>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span className="font-medium">
                  {evento.horaInicio} - {evento.horaFim}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{evento.local}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Drag handle only visible on hover */}
        <div 
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
          {...listeners}
          {...attributes}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
});

EventoArrastavel.displayName = 'EventoArrastavel';

export default EventoArrastavel;