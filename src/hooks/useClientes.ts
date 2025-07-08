
import { MockCliente, mockClientes } from '@/data/mockClientes';
import { useCallback, useEffect, useState } from 'react';

export const useClientes = () => {
  const [loading, setLoading] = useState(true);

  // Debug: verificar dados mockados
  // console.log('useClientes - mockClientes:', mockClientes);
  // console.log('useClientes - mockClientes length:', mockClientes.length);

  const [clientes, setClientes] = useState<MockCliente[]>(mockClientes);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Debug: verificar clientes no estado
  // console.log('useClientes - clientes no estado:', clientes);
  // console.log('useClientes - clientes length:', clientes.length);

  const getClienteById = useCallback((id: string) => {
    return clientes.find(c => c.id === id);
  }, [clientes]);

  const getClienteByName = useCallback((name: string) => {
    return clientes.find(c => c.name === name || c.label === name);
  }, [clientes]);

  const getActiveClientes = useCallback(() => {
    return clientes.filter(c => c.status === 'active');
  }, [clientes]);

  // Função para carregar cliente por ID (simula chamada para backend)
  const loadClienteById = useCallback(async (id: string): Promise<any> => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    
    // Retornar no formato esperado pelo CampoBusca
    return {
      id: cliente.id,
      label: cliente.name,
      subtitle: cliente.document,
      email: cliente.email,
      phone: cliente.phone,
      address: cliente.address,
      notes: cliente.notes,
      status: cliente.status
    };
  }, [clientes]);

  const createCliente = useCallback((data: Omit<MockCliente, 'id' | 'createdAt'>) => {
    setLoading(true);
    const newCliente: MockCliente = {
      ...data,
      id: (parseInt(clientes[clientes.length - 1]?.id || '0') + 1).toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setClientes(prev => [...prev, newCliente]);
    setLoading(false);
    return newCliente;
  }, [clientes]);

  const updateCliente = useCallback((id: string, data: Partial<MockCliente>) => {
    setLoading(true);
    setClientes(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    setLoading(false);
  }, []);

  const deleteCliente = useCallback((id: string) => {
    setLoading(true);
    setClientes(prev => prev.filter(c => c.id !== id));
    setLoading(false);
  }, []);

  // Para campos de busca - retornar todos os clientes mocados
  const getClientesForSearch = useCallback(() => {
    return clientes.map(cliente => ({
      id: cliente.id,
      label: cliente.name, // Usar nome ao invés de label
      subtitle: cliente.document,
      email: cliente.email
    }));
  }, [clientes]);

  // Função para buscar cliente por clientId das reservas
  const getClienteByClientId = useCallback((clientId: string) => {
    // Primeiro tenta buscar por ID
    const clienteById = clientes.find(c => c.id === clientId);
    if (clienteById) return clienteById;
    
    // Se não encontrar por ID, tenta buscar por nome
    return clientes.find(c => c.name === clientId || c.label === clientId);
  }, [clientes]);

  return {
    clientes,
    loading,
    getClienteById,
    getClienteByName,
    getClienteByClientId,
    getActiveClientes,
    createCliente,
    updateCliente,
    deleteCliente,
    getClientesForSearch,
    loadClienteById
  };
};
