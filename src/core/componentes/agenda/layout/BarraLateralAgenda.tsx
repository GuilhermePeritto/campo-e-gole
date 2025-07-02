
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { MockLocal } from '@/data/mockLocais';
import { cn } from '@/lib/utils';
import { ChevronLeft, FilterIcon, CalendarDays } from 'lucide-react';
import type { DateValue } from "react-aria-components";
import { memo } from 'react';
import CalendarioSidebar from '../calendario/CalendarioSidebar';
import ListaLocaisAvancada from '../filtros/ListaLocaisAvancada';

interface BarraLateralAgendaProps {
  expandida: boolean;
  dataSelecionada: DateValue | null;
  locaisSelecionados: string[];
  consulta: string;
  locais: MockLocal[];
  todosLocais: MockLocal[];
  eventCountByVenue?: Record<string, number>;
  onAlternar: () => void;
  onMudancaData: (data: DateValue | null) => void;
  onAlternarLocal: (localId: string) => void;
  isLocalSelecionado: (localId: string) => boolean;
  onMudancaConsulta: (consulta: string) => void;
}

const BarraLateralAgenda = memo(({
  expandida,
  dataSelecionada,
  locaisSelecionados,
  consulta,
  locais,
  todosLocais,
  eventCountByVenue = {},
  onAlternar,
  onMudancaData,
  onAlternarLocal,
  isLocalSelecionado,
  onMudancaConsulta
}: BarraLateralAgendaProps) => {
  return (
    <div className={cn(
      "bg-gradient-to-b from-background to-muted/20 border-r border-border/50 transition-all duration-300 flex flex-col shadow-sm h-full",
      expandida ? "w-80" : "w-16"
    )}>
      {/* Cabeçalho da Barra Lateral */}
      <div className="p-4 borda-b borda-divisor/50">
        <div className="flex items-center justify-between">
          {expandida && (
            <div className="flex items-center espaco-x-2">
              <CalendarDays className="h-5 w-5 texto-primario" />
              <h2 className="texto-lg fonte-semibold texto-principal">Filtros</h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onAlternar}
            className={cn(
              "h-9 w-9 hover:bg-accent/60 transition-all duration-200",
              expandida ? "ml-auto" : "mx-auto"
            )}
          >
            {expandida ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <FilterIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Conteúdo da Barra Lateral - Layout otimizado */}
      {expandida && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 flex flex-col p-4 space-y-4 min-h-0">
            {/* Calendário - Tamanho fixo */}
            <div className="flex-shrink-0">
              <CalendarioSidebar
                dataSelecionada={dataSelecionada}
                onMudancaData={onMudancaData}
              />
            </div>

            <Separator className="bg-border/50" />

            {/* Lista de Locais - Ocupa espaço restante */}
            <div className="flex-1 min-h-0">
              <ListaLocaisAvancada
                locais={locais}
                todosLocais={todosLocais}
                locaisSelecionados={locaisSelecionados}
                consulta={consulta}
                eventCountByVenue={eventCountByVenue}
                onAlternarLocal={onAlternarLocal}
                isLocalSelecionado={isLocalSelecionado}
                onMudancaConsulta={onMudancaConsulta}
                className="h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

BarraLateralAgenda.displayName = 'BarraLateralAgenda';

export default BarraLateralAgenda;
