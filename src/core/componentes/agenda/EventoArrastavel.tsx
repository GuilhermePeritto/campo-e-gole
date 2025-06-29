
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, User, MoreHorizontal } from 'lucide-react';
import { EventoAgenda } from '@/core/hooks/useAgenda';

interface EventoArrastavelProps {
  evento: EventoAgenda;
  onClick?: (evento: EventoAgenda) => void;
  tipoVisualizacao?: 'mes' | 'semana' | 'dia' | 'agenda';
  compacto?: boolean;
}

const EventoArrastavel = ({ 
  evento, 
  onClick, 
  tipoVisualizacao = 'mes',
  compacto = false 
}: EventoArrastavelProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: evento.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const obterCorStatus = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const obterTextoStatus = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  if (compacto || tipoVisualizacao === 'mes') {
    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          borderLeftColor: evento.cor,
          backgroundColor: `${evento.cor}20`
        }}
        {...attributes}
        {...listeners}
        className={`
          text-xs p-1 rounded border-l-2 cursor-move hover:bg-muted/50 transition-colors
          ${isDragging ? 'z-50 shadow-lg' : ''}
        `}
        onClick={() => onClick?.(evento)}
      >
        <div className="truncate font-medium">{evento.cliente}</div>
        <div className="truncate text-muted-foreground">
          {evento.horaInicio} - {evento.local}
        </div>
      </div>
    );
  }

  if (tipoVisualizacao === 'agenda') {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`
          cursor-move hover:shadow-md transition-all duration-200 mb-2
          ${isDragging ? 'z-50 shadow-lg scale-105' : ''}
        `}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: evento.cor }}
                />
                <h3 className="font-semibold text-sm">{evento.titulo}</h3>
                <Badge
                  variant="secondary"
                  className={`text-xs ${obterCorStatus(evento.status)} text-white`}
                >
                  {obterTextoStatus(evento.status)}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {evento.cliente}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {evento.local}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {evento.horaInicio} - {evento.horaFim}
                </div>
              </div>

              {evento.esporte && (
                <Badge variant="outline" className="text-xs">
                  {evento.esporte}
                </Badge>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(evento);
              }}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Visualização semana/dia
  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        borderLeftColor: evento.cor,
        backgroundColor: `${evento.cor}15`
      }}
      {...attributes}
      {...listeners}
      className={`
        p-2 rounded border-l-4 cursor-move hover:bg-muted/50 transition-colors mb-1
        ${isDragging ? 'z-50 shadow-lg' : ''}
      `}
      onClick={() => onClick?.(evento)}
    >
      <div className="font-medium text-sm truncate">{evento.cliente}</div>
      <div className="text-xs text-muted-foreground">
        {evento.horaInicio} - {evento.horaFim}
      </div>
      <div className="text-xs text-muted-foreground truncate">{evento.local}</div>
    </div>
  );
};

export default EventoArrastavel;
