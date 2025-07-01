
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
      "fundo-gradiente-para-b from-background to-muted/20 borda-r borda-divisor/50 transition-all duration-300 flex flex-col sombra-sm",
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

      {/* Conteúdo da Barra Lateral - SEM scroll geral */}
      {expandida && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-4 espaco-y-6">
            {/* Calendário */}
            <CalendarioSidebar
              dataSelecionada={dataSelecionada}
              onMudancaData={onMudancaData}
            />

            <Separator className="fundo-divisor/50" />

            {/* Lista de Locais - com scroll próprio */}
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
