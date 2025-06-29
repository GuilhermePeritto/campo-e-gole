
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock } from 'lucide-react';
import EventoArrastavel from './EventoArrastavel';
import SkeletonDia from './SkeletonDia';
import { EventoAgenda } from '@/core/hooks/useAgenda';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface VisualizacaoAgendaProps {
  eventos: EventoAgenda[];
  onCliqueEvento: (evento: EventoAgenda) => void;
  loadingPorDia: Record<string, boolean>;
}

const VisualizacaoAgenda = ({ 
  eventos, 
  onCliqueEvento, 
  loadingPorDia 
}: VisualizacaoAgendaProps) => {
  // Agrupar eventos por data
  const eventosAgrupados = eventos.reduce((grupos, evento) => {
    const dataStr = evento.dia.toISOString().split('T')[0];
    if (!grupos[dataStr]) {
      grupos[dataStr] = [];
    }
    grupos[dataStr].push(evento);
    return grupos;
  }, {} as Record<string, EventoAgenda[]>);

  // Ordenar datas
  const datasOrdenadas = Object.keys(eventosAgrupados).sort();

  const formatarDataGrupo = (dataStr: string) => {
    const data = new Date(dataStr + 'T00:00:00');
    
    if (isToday(data)) {
      return 'Hoje';
    } else if (isTomorrow(data)) {
      return 'Amanhã';
    } else if (isYesterday(data)) {
      return 'Ontem';
    }
    
    return format(data, "EEEE, d 'de' MMMM", { locale: ptBR });
  };

  const obterQuantidadeEventos = (dataStr: string) => {
    return eventosAgrupados[dataStr]?.length || 0;
  };

  if (datasOrdenadas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          Nenhum evento encontrado
        </h3>
        <p className="text-sm text-muted-foreground">
          Não há eventos para o período e filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4">
        {datasOrdenadas.map((dataStr) => {
          const eventosData = eventosAgrupados[dataStr];
          const isLoading = loadingPorDia[dataStr];
          const quantidadeEventos = obterQuantidadeEventos(dataStr);

          return (
            <div key={dataStr} className="space-y-3">
              {/* Cabeçalho do Grupo de Data */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {formatarDataGrupo(dataStr)}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {quantidadeEventos} evento{quantidadeEventos !== 1 ? 's' : ''}
                      </Badge>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Lista de Eventos */}
              <div className="space-y-2 ml-4">
                {isLoading ? (
                  // Skeleton loading para esta data
                  <div className="space-y-2">
                    {Array.from({ length: 3 }, (_, index) => (
                      <SkeletonDia
                        key={index}
                        tipoVisualizacao="agenda"
                        quantidadeEventos={1}
                      />
                    ))}
                  </div>
                ) : (
                  // Eventos carregados
                  eventosData
                    .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
                    .map((evento) => (
                      <EventoArrastavel
                        key={evento.id}
                        evento={evento}
                        onClick={onCliqueEvento}
                        tipoVisualizacao="agenda"
                      />
                    ))
                )}
              </div>

              {/* Separador entre grupos */}
              {dataStr !== datasOrdenadas[datasOrdenadas.length - 1] && (
                <Separator className="my-6" />
              )}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default VisualizacaoAgenda;
