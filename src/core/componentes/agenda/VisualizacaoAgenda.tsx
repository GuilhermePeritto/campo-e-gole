
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Reservation } from '@/hooks/useCalendar';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, MapPin } from 'lucide-react';
import EventoArrastavel from './EventoArrastavel';
import SkeletonDiaAgenda from './SkeletonDiaAgenda';

interface VisualizacaoAgendaProps {
  eventos: Reservation[];
  currentDate: Date;
  selectedVenue: string;
  isLoading?: boolean;
  onEventClick: (evento: Reservation) => void;
  onDragStart: (evento: Reservation) => void;
  onDragEnd: (newDate?: Date, newTime?: string) => void;
}

const VisualizacaoAgenda = ({
  eventos,
  currentDate,
  selectedVenue,
  isLoading,
  onEventClick,
  onDragStart,
  onDragEnd
}: VisualizacaoAgendaProps) => {
  if (isLoading) {
    return <SkeletonDiaAgenda tipo="agenda" />;
  }

  // Filtrar eventos por local se não for 'all'
  const eventosFiltrados = eventos.filter(evento => {
    if (selectedVenue === 'all') return true;
    return evento.venueId === selectedVenue;
  });

  // Agrupar eventos por data
  const eventosAgrupados = eventosFiltrados.reduce((grupos, evento) => {
    const dataEvento = parseISO(evento.start.split('T')[0]);
    const dataKey = format(dataEvento, 'yyyy-MM-dd');
    
    if (!grupos[dataKey]) {
      grupos[dataKey] = [];
    }
    grupos[dataKey].push(evento);
    return grupos;
  }, {} as Record<string, Reservation[]>);

  // Ordenar grupos por data
  const datasOrdenadas = Object.keys(eventosAgrupados).sort();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  if (datasOrdenadas.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Nenhum evento encontrado</h3>
          <p>Não há eventos para o período selecionado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-6">
      {datasOrdenadas.map(data => {
        const dataObj = parseISO(data);
        const eventosData = eventosAgrupados[data].sort((a, b) => 
          a.startTime.localeCompare(b.startTime)
        );

        return (
          <div key={data} className="space-y-3">
            <div className="flex items-center space-x-2 border-b pb-2">
              <h3 className="text-lg font-semibold">
                {format(dataObj, "dd 'de' MMMM", { locale: ptBR })}
              </h3>
              <span className="text-sm text-muted-foreground">
                {format(dataObj, 'EEEE', { locale: ptBR })}
              </span>
              <Badge variant="outline">
                {eventosData.length} {eventosData.length === 1 ? 'evento' : 'eventos'}
              </Badge>
            </div>

            <div className="space-y-2">
              {eventosData.map(evento => (
                <EventoArrastavel
                  key={evento.id}
                  evento={evento}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                >
                  <Card 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onEventClick(evento)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: evento.color }}
                            />
                            <h4 className="font-medium">{evento.client}</h4>
                            <Badge 
                              className={getStatusColor(evento.status)}
                              variant="secondary"
                            >
                              {getStatusLabel(evento.status)}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{evento.startTime} - {evento.endTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{evento.venue}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </EventoArrastavel>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VisualizacaoAgenda;
