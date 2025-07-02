import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Reservation } from '@/hooks/useCalendar';
import { Clock, MapPin, GripVertical } from 'lucide-react';
import { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EventoDraggableProps {
  evento: Reservation;
  children?: ReactNode;
  isDragging?: boolean;
  className?: string;
}

const EventoDraggable = memo(({ 
  evento, 
  children, 
  isDragging = false,
  className 
}: EventoDraggableProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({
    id: `event-${evento.id}`,
    data: evento
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
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
        "cursor-move hover:shadow-md hover:shadow-primary/10 transition-all duration-200 group border-border/50",
        isDragging && "opacity-50 scale-95 rotate-2",
        className
      )}
      {...listeners}
      {...attributes}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: evento.color }}
                />
              </div>
              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {evento.client}
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
                  {evento.startTime} - {evento.endTime}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{evento.venue}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

EventoDraggable.displayName = 'EventoDraggable';

export default EventoDraggable;