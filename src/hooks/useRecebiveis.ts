
import { mockRecebiveis } from '@/data/mockRecebiveis';
import { Recebivel } from '@/types/eventos';
import { useEffect, useMemo, useState } from 'react';

export const useRecebiveis = () => {
  const [loading, setLoading] = useState(true);

  // Debug: verificar dados mockados
  console.log('useRecebiveis - mockRecebiveis:', mockRecebiveis);
  console.log('useRecebiveis - mockRecebiveis length:', mockRecebiveis.length);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mapear dados mockados para o tipo Recebivel
  const recebiveis: Recebivel[] = useMemo(() => {
    return mockRecebiveis.map(recebivel => ({
      id: recebivel.id,
      clienteId: recebivel.clientId,
      cliente: recebivel.client,
      descricao: recebivel.description,
      valor: recebivel.amount,
      dataVencimento: recebivel.dueDate,
      status: recebivel.status === 'pending' ? 'pendente' : 
              recebivel.status === 'paid' ? 'pago' : 'vencido',
      eventoId: recebivel.reservationId ? String(recebivel.reservationId) : undefined,
      criadoEm: recebivel.createdAt
    }));
  }, []);

  // Debug: verificar recebíveis processados
  console.log('useRecebiveis - recebiveis processados:', recebiveis);
  console.log('useRecebiveis - recebiveis length:', recebiveis.length);

  const createRecebivel = (recebivelData: Omit<Recebivel, 'id' | 'criadoEm'>) => {
    const newRecebivel: Recebivel = {
      ...recebivelData,
      id: Date.now().toString(),
      criadoEm: new Date().toISOString().split('T')[0]
    };
    return newRecebivel;
  };

  const updateRecebivel = (id: string, recebivelData: Partial<Recebivel>) => {
    // Em uma implementação real, isso atualizaria o estado
    console.log('Atualizando recebível:', id, recebivelData);
  };

  const deleteRecebivel = (id: string) => {
    // Em uma implementação real, isso removeria do estado
    console.log('Deletando recebível:', id);
  };

  const buscarPorId = (id: string) => recebiveis.find(r => r.id === id);
  const listar = () => recebiveis;
  const filtrar = (filtros: Partial<Pick<Recebivel, 'status' | 'clienteId'>>) => {
    return recebiveis.filter(r => {
      if (filtros.status && r.status !== filtros.status) return false;
      if (filtros.clienteId && r.clienteId !== filtros.clienteId) return false;
      return true;
    });
  };

  return {
    recebiveis,
    loading,
    createRecebivel,
    updateRecebivel,
    deleteRecebivel,
    buscarPorId,
    listar,
    filtrar
  };
};
