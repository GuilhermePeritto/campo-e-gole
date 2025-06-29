
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import EventoArrastavel from './EventoArrastavel';
import SkeletonDia from './SkeletonDia';
import { EventoAgenda } from '@/core/hooks/useAgenda';
import { useDragAndDrop } from '@/core/hooks/useDragAndDrop';
import { getMonthDays, isToday } from '@/utils/calendarUtils';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface VisualizacaoMesProps {
  dataAtual: Date;
  eventos: EventoAgenda[];
  onCliqueEvento: (evento: EventoAgenda) => void;
  onCliqueDia: (data: Date) => void;
  onNavegarData: (direcao: 'anterior' | 'proximo') => void;
  loadingPorDia: Record<string, boolean>;
}

const VisualizacaoMes = ({
  dataAtual,
  eventos,
  onCliqueEvento,
  onCliqueDia,
  onNavegarData,
  loadingPorDia
}: VisualizacaoMesProps) => {
  const [eventoArrastando, setEventoArrastando] = useState<EventoAgenda | null>(null);
  const { moverEvento, validarMovimento } = useDragAndDrop();
  const diasMes = getMonthDays(dataAtual);

  const obterEventosDia = (dia: Date) => {
    const dataStr = dia.toISOString().split('T')[0];
    return eventos.filter(evento => 
      evento.dia.toISOString().split('T')[0] === dataStr
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const evento = eventos.find(e => e.id === event.active.id);
    setEventoArrastando(evento || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && eventoArrastando) {
      const novaData = new Date(over.id as string);
      const validacao = validarMovimento(eventoArrastando, novaData);
      
      if (validacao.valido) {
        moverEvento(eventoArrastando.id, novaData);
      } else {
        console.warn('Movimento inválido:', validacao.erro);
      }
    }
    
    setEventoArrastando(null);
  };

  const obterClasseDia = (dia: Date) => {
    const ehHoje = isToday(dia);
    const ehOutroMes = dia.getMonth() !== dataAtual.getMonth();
    
    return `
      relative min-h-[120px] p-2 border border-border hover:bg-muted/20 cursor-pointer transition-colors
      ${ehHoje ? 'bg-primary/10 border-primary/30' : ''}
      ${ehOutroMes ? 'text-muted-foreground bg-muted/30' : ''}
    `;
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="space-y-4">
        {/* Cabeçalho do Mês */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavegarData('anterior')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {dataAtual.toLocaleDateString('pt-BR', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavegarData('proximo')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Grade do Calendário */}
        <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
          {/* Cabeçalhos dos Dias da Semana */}
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
            <div key={dia} className="bg-muted p-3 text-center font-medium text-sm">
              {dia}
            </div>
          ))}

          {/* Dias do Mês */}
          {diasMes.map((dia, index) => {
            const dataStr = dia.toISOString().split('T')[0];
            const eventosDia = obterEventosDia(dia);
            const isLoading = loadingPorDia[dataStr];
            const ehHoje = isToday(dia);

            return (
              <div
                key={index}
                className={obterClasseDia(dia)}
                onClick={() => onCliqueDia(dia)}
                data-day={dataStr}
              >
                {/* Número do Dia */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${ehHoje ? 'text-primary' : ''}`}>
                    {dia.getDate()}
                  </span>
                  {eventosDia.length > 0 && (
                    <Badge variant="secondary" className="text-xs h-5">
                      {eventosDia.length}
                    </Badge>
                  )}
                </div>

                {/* Eventos do Dia */}
                <div className="space-y-1">
                  {isLoading ? (
                    <SkeletonDia 
                      quantidadeEventos={2} 
                      tipoVisualizacao="mes" 
                    />
                  ) : (
                    <>
                      {eventosDia.slice(0, 2).map((evento) => (
                        <EventoArrastavel
                          key={evento.id}
                          evento={evento}
                          onClick={onCliqueEvento}
                          tipoVisualizacao="mes"
                          compacto
                        />
                      ))}
                      
                      {eventosDia.length > 2 && (
                        <div className="text-xs text-muted-foreground text-center">
                          +{eventosDia.length - 2} mais
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Botão de Adicionar Evento */}
                {!isLoading && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCliqueDia(dia);
                    }}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlay de Arraste */}
      <DragOverlay>
        {eventoArrastando && (
          <EventoArrastavel
            evento={eventoArrastando}
            tipoVisualizacao="mes"
            compacto
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default VisualizacaoMes;
