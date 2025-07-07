import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { DndContext } from '@dnd-kit/core';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useAgenda } from './hooks/useCalendar';
import LayoutAgenda from './layout/LayoutAgenda';

const Agenda = () => {
  const {
    tipoVisualizacao,
    setTipoVisualizacao,
    localSelecionado,
    setLocalSelecionado,
    dataAtual,
    setDataAtual,
    locais,
    eventos,
    navegarData,
    aoClicarData,
    aoClicarEvento,
    aoClicarFiltroDia
  } = useAgenda();

  return (
    <div className="h-screen min-h-screen flex flex-col bg-background text-foreground">
      <ModuleHeader
        title="Agenda"
        icon={<CalendarIcon className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="flex-1 flex flex-col h-full w-full min-w-0">
        <DndContext>
          <LayoutAgenda
            tipoVisualizacao={tipoVisualizacao}
            dataAtual={dataAtual}
            localSelecionado={localSelecionado}
            eventos={eventos}
            onViewTypeChange={setTipoVisualizacao}
            onNavigateDate={navegarData}
            onSetCurrentDate={setDataAtual}
            onEventClick={aoClicarEvento}
          />
        </DndContext>
      </main>
    </div>
  );
};

export default Agenda;
