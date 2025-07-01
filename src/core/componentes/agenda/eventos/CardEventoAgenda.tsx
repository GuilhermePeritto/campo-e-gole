
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Reservation } from '@/hooks/useCalendar';
import { Clock, MapPin } from 'lucide-react';
import { memo } from 'react';
import EventoArrastavel from '../EventoArrastavel';

interface CardEventoAgendaProps {
  evento: Reservation;
  onEventClick: (evento: Reservation) => void;
  onDragStart: (evento: Reservation) => void;
  onDragEnd: (newDate?: Date, newTime?: string) => void;
}

const CardEventoAgenda = memo(({ 
  evento, 
  onEventClick, 
  onDragStart, 
  onDragEnd 
}: CardEventoAgendaProps) => {
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

  return (
    <EventoArrastavel
      evento={evento}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Card 
        className="hover:shadow-md hover:shadow-primary/10 transition-all duration-200 cursor-pointer group border-border/50"
        onClick={() => onEventClick(evento)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: evento.color }}
                />
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {evento.client}
                </h4>
                <Badge 
                  className={getStatusColor(evento.status)}
                  variant="secondary"
                >
                  {getStatusLabel(evento.status)}
                </Badge>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">
                    {evento.startTime} - {evento.endTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{evento.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </EventoArrastavel>
  );
});

CardEventoAgenda.displayName = 'CardEventoAgenda';

export default CardEventoAgenda;
