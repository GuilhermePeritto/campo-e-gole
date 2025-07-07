
import CabecalhoAgenda from './layout/CabecalhoAgenda';

interface HeaderAgendaProps {
  currentDate: Date;
  viewType: 'month' | 'week' | 'day' | 'agenda';
  onNavigateDate: (direction: 'prev' | 'next') => void;
  onTodayClick: () => void;
  onNewEventClick: () => void;
  onViewTypeChange: (view: 'month' | 'week' | 'day' | 'agenda') => void;
}

const HeaderAgenda = (props: HeaderAgendaProps) => {
  return (
    <CabecalhoAgenda
      dataAtual={props.currentDate}
      tipoVisualizacao={props.viewType}
      onNavegarData={props.onNavigateDate}
      onCliqueHoje={props.onTodayClick}
      onNovoEvento={props.onNewEventClick}
      onMudancaTipoVisualizacao={props.onViewTypeChange}
    />
  );
};

export default HeaderAgenda;
