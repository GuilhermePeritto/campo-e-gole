
import { useBarraLateralAgenda } from './useBarraLateralAgenda';

export const useAgendaSidebar = () => {
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
  } = useBarraLateralAgenda();

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
