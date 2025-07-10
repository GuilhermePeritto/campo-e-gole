
import { Cliente } from '../types/reservas';
import { useBaseCrud } from './useBaseCrud';

export const useClientes = () => {
  return useBaseCrud<Cliente>('/clientes');
};
