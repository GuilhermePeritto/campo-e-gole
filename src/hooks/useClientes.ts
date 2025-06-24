
import { useState, useCallback } from 'react';
import { mockClientes, MockCliente } from '@/data/mockClientes';

export const useClientes = () => {
  const [clientes, setClientes] = useState<MockCliente[]>(mockClientes);
  const [loading, setLoading] = useState(false);

  const getClienteById = useCallback((id: string) => {
    return clientes.find(c => c.id === id);
  }, [clientes]);

  const getClienteByName = useCallback((name: string) => {
    return clientes.find(c => c.name === name || c.label === name);
  }, [clientes]);

  const getActiveClientes = useCallback(() => {
    return clientes.filter(c => c.status === 'active');
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

  // Para campos de busca
  const getClientesForSearch = useCallback(() => {
    return clientes.map(cliente => ({
      id: cliente.id,
      label: cliente.label,
      subtitle: cliente.subtitle
    }));
  }, [clientes]);

  return {
    clientes,
    loading,
    getClienteById,
    getClienteByName,
    getActiveClientes,
    createCliente,
    updateCliente,
    deleteCliente,
    getClientesForSearch
  };
};
