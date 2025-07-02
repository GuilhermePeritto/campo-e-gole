
import BarraLateralAgenda from './layout/BarraLateralAgenda';
import type { MockLocal } from '@/data/mockLocais';
import type { DateValue } from "react-aria-components";

interface SidebarAgendaProps {
  isExpanded: boolean;
  selectedDate: DateValue | null;
  selectedLocais: string[];
  searchQuery: string;
  locais: MockLocal[];
  allLocais: MockLocal[];
  eventCountByVenue?: Record<string, number>;
  onToggle: () => void;
  onDateChange: (date: DateValue | null) => void;
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
  onSearchChange: (query: string) => void;
}

const SidebarAgenda = (props: SidebarAgendaProps) => {
  return (
    <BarraLateralAgenda
      expandida={props.isExpanded}
      dataSelecionada={props.selectedDate}
      locaisSelecionados={props.selectedLocais}
      consulta={props.searchQuery}
      locais={props.locais}
      todosLocais={props.allLocais}
      eventCountByVenue={props.eventCountByVenue}
      onAlternar={props.onToggle}
      onMudancaData={props.onDateChange}
      onAlternarLocal={props.onLocalToggle}
      isLocalSelecionado={props.isLocalSelected}
      onMudancaConsulta={props.onSearchChange}
    />
  );
};

export default SidebarAgenda;
