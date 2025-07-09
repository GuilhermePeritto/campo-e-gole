
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { api, ApiPagedResponse, ApiResponse } from '../lib/api';
import { Local } from '../types/reservas';

export const useLocais = (filtros?: {
  Fields?: string;
  Page?: number;
  Start?: number;
  Limit?: number;
  Sort?: string;
  Filter?: string;
}) => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  const fetchLocais = useCallback(async (params?: {
    Fields?: string;
    Page?: number;
    Start?: number;
    Limit?: number;
    Sort?: string;
    Filter?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const finalParams = params || filtros;
      const response = await api.get<ApiPagedResponse<Local>>('/locais', {
        Fields: finalParams?.Fields || '',
        Page: finalParams?.Page || 1,
        Start: finalParams?.Start || 0,
        Limit: finalParams?.Limit || 10,
        Sort: finalParams?.Sort || 'nome',
        Filter: finalParams?.Filter || ''
      });

      if (response.success) {
        setLocais(response.data);
        setPagination({
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          totalPages: response.totalPages
        });
      } else {
        setError(response.message || 'Erro ao carregar locais');
        toast.error(response.message || 'Erro ao carregar locais');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar locais';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Remover o useEffect automático de busca

  const createLocal = async (localData: Omit<Local, 'id' | 'dataCadastro'>) => {
    try {
      const loadingToast = toast.loading('Criando local...');
      
      const response = await api.post<ApiResponse<Local>>('/locais', localData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Local criado com sucesso!');
        // Recarregar a lista
        await fetchLocais();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao criar local');
        throw new Error(response.message || 'Erro ao criar local');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar local';
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateLocal = async (id: string, localData: Partial<Local>) => {
    try {
      const loadingToast = toast.loading('Atualizando local...');
      
      const response = await api.put<ApiResponse<Local>>(`/locais/${id}`, localData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Local atualizado com sucesso!');
        // Recarregar a lista
        await fetchLocais();
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao atualizar local');
        throw new Error(response.message || 'Erro ao atualizar local');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar local';
      toast.error(errorMessage);
      throw error;
    }
  };

  const deleteLocal = async (id: string) => {
    try {
      const loadingToast = toast.loading('Excluindo local...');
      
      const response = await api.delete<ApiResponse<void>>(`/locais/${id}`);
      
      toast.dismiss(loadingToast);

      if (response.success) {
        toast.success('Local excluído com sucesso!');
        // Recarregar a lista
        await fetchLocais();
      } else {
        toast.error(response.message || 'Erro ao excluir local');
        throw new Error(response.message || 'Erro ao excluir local');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir local';
      toast.error(errorMessage);
      throw error;
    }
  };

  const getLocal = async (id: string) => {
    try {
      const response = await api.get<ApiResponse<Local>>(`/locais/${id}`);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao carregar local');
        throw new Error(response.message || 'Erro ao carregar local');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar local';
      toast.error(errorMessage);
      throw error;
    }
  };

  const buscarPorId = (id: string) => locais.find(l => l.id === id);

  // Método para listar todos os locais (compatibilidade)
  const listar = async () => {
    await fetchLocais({ Limit: 1000 }); // Buscar todos os locais
    return locais;
  };

  return {
    locais,
    loading,
    error,
    pagination,
    fetchLocais,
    createLocal,
    updateLocal,
    deleteLocal,
    getLocal,
    buscarPorId,
    listar
  };
};
