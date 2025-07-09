
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { api, ApiPagedResponse, ApiResponse } from '../lib/api';
import { Recebivel } from '../types/reservas';

export const useRecebiveis = (filtros?: {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  situacao?: string;
  dataInicio?: string;
  dataFim?: string;
  ordenarPor?: string;
  direcao?: 'asc' | 'desc';
}) => {
  const [recebiveis, setRecebiveis] = useState<Recebivel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  const fetchRecebiveis = async (params = filtros) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<ApiPagedResponse<Recebivel>>('/recebiveis', {
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 10,
        search: params?.search || '',
        situacao: params?.situacao || '',
        dataInicio: params?.dataInicio || '',
        dataFim: params?.dataFim || '',
        ordenarPor: params?.ordenarPor || 'dataVencimento',
        direcao: params?.direcao || 'asc'
      });

      if (response.success) {
        setRecebiveis(response.data);
        setPagination({
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          totalPages: response.totalPages
        });
      } else {
        setError(response.message || 'Erro ao carregar recebíveis');
        toast.error(response.message || 'Erro ao carregar recebíveis');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar recebíveis';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecebiveis(filtros);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtros)]);

  const createRecebivel = async (recebivelData: Omit<Recebivel, 'id' | 'dataCadastro'>) => {
    try {
      const loadingToast = toast.loading('Criando recebível...');
      
      const response = await api.post<ApiResponse<Recebivel>>('/recebiveis', recebivelData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Recebível criado com sucesso!');
        // Recarregar a lista
        await fetchRecebiveis();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao criar recebível');
        throw new Error(response.message || 'Erro ao criar recebível');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar recebível';
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateRecebivel = async (id: string, recebivelData: Partial<Recebivel>) => {
    try {
      const loadingToast = toast.loading('Atualizando recebível...');
      
      const response = await api.put<ApiResponse<Recebivel>>(`/recebiveis/${id}`, recebivelData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Recebível atualizado com sucesso!');
        // Recarregar a lista
        await fetchRecebiveis();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao atualizar recebível');
        throw new Error(response.message || 'Erro ao atualizar recebível');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar recebível';
      toast.error(errorMessage);
      throw error;
    }
  };

  const deleteRecebivel = async (id: string) => {
    try {
      const loadingToast = toast.loading('Excluindo recebível...');
      
      const response = await api.delete<ApiResponse<void>>(`/recebiveis/${id}`);
      
      toast.dismiss(loadingToast);

      if (response.success) {
        toast.success('Recebível excluído com sucesso!');
        // Recarregar a lista
        await fetchRecebiveis();
      } else {
        toast.error(response.message || 'Erro ao excluir recebível');
        throw new Error(response.message || 'Erro ao excluir recebível');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir recebível';
      toast.error(errorMessage);
      throw error;
    }
  };

  const getRecebivel = async (id: string) => {
    try {
      const response = await api.get<ApiResponse<Recebivel>>(`/recebiveis/${id}`);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao carregar recebível');
        throw new Error(response.message || 'Erro ao carregar recebível');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar recebível';
      toast.error(errorMessage);
      throw error;
    }
  };

  const receberPagamento = async (id: string, dadosPagamento: {
    valorRecebido: number;
    dataRecebimento: string;
    formaPagamento: string;
    observacoes?: string;
  }) => {
    try {
      const loadingToast = toast.loading('Registrando pagamento...');
      
      const response = await api.post<ApiResponse<Recebivel>>(`/recebiveis/${id}/receber`, dadosPagamento);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Pagamento registrado com sucesso!');
        // Recarregar a lista
        await fetchRecebiveis();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao registrar pagamento');
        throw new Error(response.message || 'Erro ao registrar pagamento');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao registrar pagamento';
      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    recebiveis,
    loading,
    error,
    pagination,
    fetchRecebiveis,
    createRecebivel,
    updateRecebivel,
    deleteRecebivel,
    getRecebivel,
    receberPagamento
  };
};
