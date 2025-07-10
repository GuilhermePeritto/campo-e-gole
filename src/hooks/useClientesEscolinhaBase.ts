import { useBaseCrud } from '@/pages/base/hooks/useBaseCrud';

// Interface para o cliente
interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: 'ativo' | 'inativo';
  dataCadastro: string;
}

export function useClientesEscolinhaBase() {
  // Usar o hook base com endpoint real - SEM dados mockados
  const baseHook = useBaseCrud<Cliente>('/clientes', {
    // Transformar dados do backend se necessário
    transformData: (data: any) => {
      console.log('🔄 Transformando dados do backend:', data);
      
      // Transformar dados do backend para o formato esperado
      return data.map((item: any) => ({
        id: item.id,
        nome: item.nome || item.name,
        email: item.email,
        telefone: item.telefone || item.phone,
        status: item.status === 'active' ? 'ativo' : 'inativo',
        dataCadastro: item.dataCadastro || item.createdAt
      }));
    },
    // Transformar paginação do backend
    transformPagination: (pagination: any) => {
      console.log('📊 Transformando paginação do backend:', pagination);
      
      return {
        currentPage: pagination.currentPage || pagination.page || 1,
        totalPages: pagination.totalPages || pagination.pages || 1,
        totalItems: pagination.totalItems || pagination.total || 0,
        pageSize: pagination.pageSize || pagination.limit || 10,
        startIndex: pagination.startIndex || 1,
        endIndex: pagination.endIndex || 0,
        hasNextPage: pagination.hasNextPage || false,
        hasPreviousPage: pagination.hasPreviousPage || false,
      };
    }
  });

  return baseHook;
} 