
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { api, ApiPagedResponse, ApiResponse } from '../lib/api';
import { Cliente } from '../types/reservas';

export const useClientes = (filtros?: {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  situacao?: string;
  ordenarPor?: string;
  direcao?: 'asc' | 'desc';
}) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  const fetchClientes = async (params = filtros) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<ApiPagedResponse<Cliente>>('/clientes', {
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 10,
        search: params?.search || '',
        situacao: params?.situacao || '',
        ordenarPor: params?.ordenarPor || 'nome',
        direcao: params?.direcao || 'asc'
      });

      if (response.success) {
        setClientes(response.data);
        setPagination({
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          totalPages: response.totalPages
        });
      } else {
        setError(response.message || 'Erro ao carregar clientes');
        toast.error(response.message || 'Erro ao carregar clientes');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar clientes';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes(filtros);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtros)]);

  const createCliente = async (clienteData: Omit<Cliente, 'id' | 'dataCadastro'>) => {
    try {
      const loadingToast = toast.loading('Criando cliente...');
      
      const response = await api.post<ApiResponse<Cliente>>('/clientes', clienteData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Cliente criado com sucesso!');
        // Recarregar a lista
        await fetchClientes();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao criar cliente');
        throw new Error(response.message || 'Erro ao criar cliente');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar cliente';
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateCliente = async (id: string, clienteData: Partial<Cliente>) => {
    try {
      const loadingToast = toast.loading('Atualizando cliente...');
      
      const response = await api.put<ApiResponse<Cliente>>(`/clientes/${id}`, clienteData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Cliente atualizado com sucesso!');
        // Recarregar a lista
        await fetchClientes();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao atualizar cliente');
        throw new Error(response.message || 'Erro ao atualizar cliente');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar cliente';
      toast.error(errorMessage);
      throw error;
    }
  };

  const deleteCliente = async (id: string) => {
    try {
      const loadingToast = toast.loading('Excluindo cliente...');
      
      const response = await api.delete<ApiResponse<void>>(`/clientes/${id}`);
      
      toast.dismiss(loadingToast);

      if (response.success) {
        toast.success('Cliente excluído com sucesso!');
        // Recarregar a lista
        await fetchClientes();
      } else {
        toast.error(response.message || 'Erro ao excluir cliente');
        throw new Error(response.message || 'Erro ao excluir cliente');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir cliente';
      toast.error(errorMessage);
      throw error;
    }
  };

  const getCliente = async (id: string) => {
    try {
      const response = await api.get<ApiResponse<Cliente>>(`/clientes/${id}`);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao carregar cliente');
        throw new Error(response.message || 'Erro ao carregar cliente');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar cliente';
      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    clientes,
    loading,
    error,
    pagination,
    fetchClientes,
    createCliente,
    updateCliente,
    deleteCliente,
    getCliente
  };
};
