
import { useBarraLateralAgenda } from '@/core/hooks/useBarraLateralAgenda';
import { useDragAndDropAgenda } from '@/core/hooks/useDragAndDropAgenda';
import type { Reservation } from '@/hooks/useCalendar';
import { useNavigate } from 'react-router-dom';
import { useEffect, memo } from 'react';
import HeaderAgenda from './HeaderAgenda';
import SidebarAgenda from './SidebarAgenda';
import VisualizacaoAgenda from './VisualizacaoAgenda';

interface AgendaLayoutProps {
  viewType: 'month' | 'week' | 'day' | 'agenda';
  currentDate: Date;
  selectedVenue: string;
  mockReservations: Reservation[];
  onViewTypeChange: (view: 'month' | 'week' | 'day' | 'agenda') => void;
  onNavigateDate: (direction: 'prev' | 'next') => void;
  onSetCurrentDate: (date: Date) => void;
  onEventClick: (evento: Reservation) => void;
  children?: React.ReactNode;
}

const AgendaLayout = memo(({
  viewType,
  currentDate,
  selectedVenue,
  mockReservations,
  onViewTypeChange,
  onNavigateDate,
  onSetCurrentDate,
  onEventClick,
  children
}: AgendaLayoutProps) => {
  const navigate = useNavigate();
  const {
    expandida,
    dataSelecionada,
    locaisSelecionados,
    consulta,
    locais,
    todosLocais,
    alternarBarra,
    manipularMudancaData,
    manipularAlternarLocal,
    isLocalSelecionado,
    manipularMudancaConsulta,
    sincronizarDataComAgenda,
    obterDataSelecionadaComoDate
  } = useBarraLateralAgenda();

  const {
    handleDragStart,
    handleDragEnd
  } = useDragAndDropAgenda();

  // Sincronizar data da sidebar com a agenda
  useEffect(() => {
    sincronizarDataComAgenda(currentDate);
  }, [currentDate, sincronizarDataComAgenda]);

  // Quando a data é alterada no calendário da sidebar, atualizar a agenda
  useEffect(() => {
    const novaData = obterDataSelecionadaComoDate();
    if (novaData.getTime() !== currentDate.getTime()) {
      onSetCurrentDate(novaData);
    }
  }, [dataSelecionada, obterDataSelecionadaComoDate, currentDate, onSetCurrentDate]);

  const manipularCliqueHoje = () => {
    onSetCurrentDate(new Date());
  };

  const manipularNovoEvento = () => {
    const ano = currentDate.getFullYear();
    const mes = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const dia = currentDate.getDate().toString().padStart(2, '0');
    const dataStr = `${ano}-${mes}-${dia}`;
    navigate(`/eventos/reserva?date=${dataStr}`);
  };

  return (
    <div className="h-screen flex fundo-fundo overflow-hidden">
      {/* Barra Lateral */}
      <SidebarAgenda
        isExpanded={expandida}
        selectedDate={dataSelecionada}
        selectedLocais={locaisSelecionados}
        searchQuery={consulta}
        locais={locais}
        allLocais={todosLocais}
        onToggle={alternarBarra}
        onDateChange={manipularMudancaData}
        onLocalToggle={manipularAlternarLocal}
        isLocalSelected={isLocalSelecionado}
        onSearchChange={manipularMudancaConsulta}
      />
      
      {/* Área Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Cabeçalho */}
        <HeaderAgenda
          currentDate={currentDate}
          viewType={viewType}
          onNavigateDate={onNavigateDate}
          onTodayClick={manipularCliqueHoje}
          onNewEventClick={manipularNovoEvento}
          onViewTypeChange={onViewTypeChange}
        />

        {/* Conteúdo Principal */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto">
            {viewType === 'agenda' ? (
              <VisualizacaoAgenda
                eventos={mockReservations}
                currentDate={currentDate}
                selectedVenue={selectedVenue}
                selectedLocais={locaisSelecionados}
                onEventClick={onEventClick}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ) : (
              <div className="h-full">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

AgendaLayout.displayName = 'AgendaLayout';

export default AgendaLayout;
