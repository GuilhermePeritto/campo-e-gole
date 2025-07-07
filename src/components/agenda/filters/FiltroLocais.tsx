
// Este componente foi refatorado e movido para src/core/componentes/agenda/locais/ListaLocaisAgenda.tsx
// Mantendo apenas para compatibilidade temporária

import ListaLocaisAgenda from './locais/ListaLocaisAgenda';
import type { MockLocal } from '@/data/mockLocais';

interface FiltroLocaisProps {
  locais: MockLocal[];
  allLocais: MockLocal[];
  selectedLocais: string[];
  searchQuery: string;
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
  onSearchChange: (query: string) => void;
}

const FiltroLocais = (props: FiltroLocaisProps) => {
  return (
    <ListaLocaisAgenda
      locais={props.locais}
      todosLocais={props.allLocais}
      locaisSelecionados={props.selectedLocais}
      consulta={props.searchQuery}
      onAlternarLocal={props.onLocalToggle}
      isLocalSelecionado={props.isLocalSelected}
      onMudancaConsulta={props.onSearchChange}
    />
  );
};

export default FiltroLocais;
