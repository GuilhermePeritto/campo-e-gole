
import { useState, useCallback } from 'react';
import { Usuario, mockUsuarios } from '@/data/mockUsuarios';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);
  const [loading, setLoading] = useState(false);

  const buscarUsuarios = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUsuarios(mockUsuarios);
    setLoading(false);
  }, []);

  const buscarUsuarioPorId = useCallback(async (id: number): Promise<Usuario | undefined> => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const usuario = mockUsuarios.find(u => u.id === id);
    setLoading(false);
    return usuario;
  }, []);

  const criarUsuario = useCallback(async (novoUsuario: Omit<Usuario, 'id' | 'dataCadastro'>) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const id = Math.max(...mockUsuarios.map(u => u.id)) + 1;
    const usuarioComId = { 
      ...novoUsuario, 
      id,
      dataCadastro: new Date().toISOString().split('T')[0]
    };
    
    setUsuarios(prev => [...prev, usuarioComId]);
    setLoading(false);
    return usuarioComId;
  }, []);

  const atualizarUsuario = useCallback(async (id: number, dadosAtualizados: Partial<Usuario>) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUsuarios(prev => prev.map(usuario => 
      usuario.id === id ? { ...usuario, ...dadosAtualizados } : usuario
    ));
    setLoading(false);
  }, []);

  const excluirUsuario = useCallback(async (id: number) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUsuarios(prev => prev.filter(usuario => usuario.id !== id));
    setLoading(false);
  }, []);

  const atualizarPermissoesUsuario = useCallback(async (id: number, permissoes: number[]) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUsuarios(prev => prev.map(usuario => 
      usuario.id === id ? { ...usuario, permissoesCustomizadas: permissoes } : usuario
    ));
    setLoading(false);
  }, []);

  return {
    usuarios,
    loading,
    buscarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario,
    atualizarPermissoesUsuario
  };
};
