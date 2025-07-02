
import { useBarraLateralAgenda } from './useBarraLateralAgenda';

export const useAgendaSidebar = (viewType: 'month' | 'week' | 'day' | 'agenda', currentDate: Date) => {
  const {
    expandida: isExpanded,
    dataSelecionada: selectedDate,
    locaisSelecionados: selectedLocais,
    consulta: searchQuery,
    locais,
    todosLocais: allLocais,
    alternarBarra: toggleSidebar,
    manipularMudancaData: handleDateChange,
    manipularAlternarLocal: handleLocalToggle,
    isLocalSelecionado: isLocalSelected,
    manipularMudancaConsulta: handleSearchChange,
    sincronizarDataComAgenda: syncDateWithAgenda,
    obterDataSelecionadaComoDate: getSelectedDateAsDate
  } = useBarraLateralAgenda({ viewType, currentDate });

  return {
    isExpanded,
    selectedDate,
    selectedLocais,
    searchQuery,
    locais,
    allLocais,
    toggleSidebar,
    handleDateChange,
    handleLocalToggle,
    isLocalSelected,
    handleSearchChange,
    syncDateWithAgenda,
    getSelectedDateAsDate
  };
};
