import { useState } from 'react';
import { toast } from 'sonner';
import { api, ApiPagedResponse, ApiResponse } from '../lib/api';
import { Reserva } from '../types/reservas';

export const useReservas = (filtros?: {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  situacao?: string;
  dataInicio?: string;
  dataFim?: string;
  clienteId?: string;
  localId?: string;
  ordenarPor?: string;
  direcao?: 'asc' | 'desc';
}) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  const fetchReservas = async (params = filtros) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<ApiPagedResponse<Reserva>>('/reservas', {
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 10,
        search: params?.search || '',
        situacao: params?.situacao || '',
        dataInicio: params?.dataInicio || '',
        dataFim: params?.dataFim || '',
        clienteId: params?.clienteId || '',
        localId: params?.localId || '',
        ordenarPor: params?.ordenarPor || 'dataInicio',
        direcao: params?.direcao || 'desc'
      });

      if (response.success) {
        setReservas(response.data);
        setPagination({
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          totalPages: response.totalPages
        });
      } else {
        setError(response.message || 'Erro ao carregar reservas');
        toast.error(response.message || 'Erro ao carregar reservas');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar reservas';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Removido useEffect automático de busca

  const createReserva = async (reservaData: Omit<Reserva, 'id' | 'dataCadastro'>) => {
    try {
      const loadingToast = toast.loading('Criando reserva...');
      
      const response = await api.post<ApiResponse<Reserva>>('/reservas', reservaData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Reserva criada com sucesso!');
        // Recarregar a lista
        await fetchReservas();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao criar reserva');
        throw new Error(response.message || 'Erro ao criar reserva');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar reserva';
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateReserva = async (id: string, reservaData: Partial<Reserva>) => {
    try {
      const loadingToast = toast.loading('Atualizando reserva...');
      
      const response = await api.put<ApiResponse<Reserva>>(`/reservas/${id}`, reservaData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Reserva atualizada com sucesso!');
        // Recarregar a lista
        await fetchReservas();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao atualizar reserva');
        throw new Error(response.message || 'Erro ao atualizar reserva');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar reserva';
      toast.error(errorMessage);
      throw error;
    }
  };

  const deleteReserva = async (id: string) => {
    try {
      const loadingToast = toast.loading('Excluindo reserva...');
      
      const response = await api.delete<ApiResponse<void>>(`/reservas/${id}`);
      
      toast.dismiss(loadingToast);

      if (response.success) {
        toast.success('Reserva excluída com sucesso!');
        // Recarregar a lista
        await fetchReservas();
      } else {
        toast.error(response.message || 'Erro ao excluir reserva');
        throw new Error(response.message || 'Erro ao excluir reserva');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir reserva';
      toast.error(errorMessage);
      throw error;
    }
  };

  const getReserva = async (id: string) => {
    try {
      const response = await api.get<ApiResponse<Reserva>>(`/reservas/${id}`);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao carregar reserva');
        throw new Error(response.message || 'Erro ao carregar reserva');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar reserva';
      toast.error(errorMessage);
      throw error;
    }
  };

  const confirmarReserva = async (id: string) => {
    try {
      const loadingToast = toast.loading('Confirmando reserva...');
      
      const response = await api.patch<ApiResponse<Reserva>>(`/reservas/${id}/confirmar`);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Reserva confirmada com sucesso!');
        // Recarregar a lista
        await fetchReservas();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao confirmar reserva');
        throw new Error(response.message || 'Erro ao confirmar reserva');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao confirmar reserva';
      toast.error(errorMessage);
      throw error;
    }
  };

  const cancelarReserva = async (id: string, motivo?: string) => {
    try {
      const loadingToast = toast.loading('Cancelando reserva...');
      
      const response = await api.patch<ApiResponse<Reserva>>(`/reservas/${id}/cancelar`, {
        motivo: motivo || 'Cancelado pelo usuário'
      });
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Reserva cancelada com sucesso!');
        // Recarregar a lista
        await fetchReservas();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao cancelar reserva');
        throw new Error(response.message || 'Erro ao cancelar reserva');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao cancelar reserva';
      toast.error(errorMessage);
      throw error;
    }
  };

  const finalizarReserva = async (id: string) => {
    try {
      const loadingToast = toast.loading('Finalizando reserva...');
      
      const response = await api.patch<ApiResponse<Reserva>>(`/reservas/${id}/finalizar`);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Reserva finalizada com sucesso!');
        // Recarregar a lista
        await fetchReservas();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao finalizar reserva');
        throw new Error(response.message || 'Erro ao finalizar reserva');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao finalizar reserva';
      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    reservas,
    loading,
    error,
    pagination,
    fetchReservas,
    createReserva,
    updateReserva,
    deleteReserva,
    getReserva,
    confirmarReserva,
    cancelarReserva,
    finalizarReserva
  };
}; 