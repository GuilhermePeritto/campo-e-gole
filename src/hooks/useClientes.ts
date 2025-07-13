
import { Cliente } from '../types/reservas';
import { useBaseCrud } from './useBaseCrud';

export const useClientes = () => {
  const baseHook = useBaseCrud<Cliente>('/clientes', {
    transformData: (data) => data,
    transformPagination: (pagination) => pagination
  });



  return {
    ...baseHook,
    // Aliases para compatibilidade
    clientes: baseHook.data,
    fetchClientes: baseHook.fetchData,
    deleteCliente: baseHook.deleteItem,
  };
};
