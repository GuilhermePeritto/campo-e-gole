
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { MockLocal } from '@/data/mockLocais';
import { cn } from '@/lib/utils';
import { ChevronLeft, FilterIcon, CalendarDays } from 'lucide-react';
import type { DateValue } from "react-aria-components";
import { memo } from 'react';
import CalendarioSidebar from '../calendario/CalendarioSidebar';
import ListaLocaisAgenda from '../locais/ListaLocaisAgenda';

interface BarraLateralAgendaProps {
  expandida: boolean;
  dataSelecionada: DateValue | null;
  locaisSelecionados: string[];
  consulta: string;
  locais: MockLocal[];
  todosLocais: MockLocal[];
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
  onAlternar,
  onMudancaData,
  onAlternarLocal,
  isLocalSelecionado,
  onMudancaConsulta
}: BarraLateralAgendaProps) => {
  return (
    <div className={cn(
      "bg-gradient-to-b from-background to-muted/20 border-r border-border/50 transition-all duration-300 flex flex-col shadow-sm",
      expandida ? "w-80" : "w-16"
    )}>
      {/* Cabeçalho da Barra Lateral */}
      <div className="p-4 border-b border-border/50 flex-shrink-0">
        <div className="flex items-center justify-between">
          {expandida && (
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
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

      {/* Conteúdo da Barra Lateral - SEM scroll geral */}
      {expandida && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="p-4 space-y-6 flex-shrink-0">
            {/* Calendário */}
            <CalendarioSidebar
              dataSelecionada={dataSelecionada}
              onMudancaData={onMudancaData}
            />

            <Separator className="bg-border/50" />
          </div>

          {/* Lista de Locais - com scroll próprio */}
          <div className="flex-1 px-4 pb-4 overflow-hidden">
            <ListaLocaisAgenda
              locais={locais}
              todosLocais={todosLocais}
              locaisSelecionados={locaisSelecionados}
              consulta={consulta}
              onAlternarLocal={onAlternarLocal}
              isLocalSelecionado={isLocalSelecionado}
              onMudancaConsulta={onMudancaConsulta}
            />
          </div>
        </div>
      )}
    </div>
  );
});

BarraLateralAgenda.displayName = 'BarraLateralAgenda';

export default BarraLateralAgenda;
