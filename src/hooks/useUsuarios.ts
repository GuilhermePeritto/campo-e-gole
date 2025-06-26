
import { useState, useCallback } from 'react';
import { Usuario, mockUsuarios } from '@/data/mockUsuarios';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);
  const [loading, setLoading] = useState(false);

  const getUsuarios = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setUsuarios(mockUsuarios);
      setLoading(false);
    }, 500);
  }, []);

  const getUsuarioById = useCallback((id: number) => {
    return usuarios.find(usuario => usuario.id === id);
  }, [usuarios]);

  const createUsuario = useCallback((usuarioData: Omit<Usuario, 'id' | 'dataCadastro' | 'ultimoAcesso'>) => {
    const newUsuario: Usuario = {
      ...usuarioData,
      id: Math.max(...usuarios.map(u => u.id)) + 1,
      dataCadastro: new Date().toISOString().split('T')[0],
      ultimoAcesso: 'Nunca'
    };
    setUsuarios(prev => [...prev, newUsuario]);
    return newUsuario;
  }, [usuarios]);

  const updateUsuario = useCallback((id: number, usuarioData: Partial<Usuario>) => {
    setUsuarios(prev => prev.map(usuario => 
      usuario.id === id ? { ...usuario, ...usuarioData } : usuario
    ));
  }, []);

  const deleteUsuario = useCallback((id: number) => {
    setUsuarios(prev => prev.filter(usuario => usuario.id !== id));
  }, []);

  return {
    usuarios,
    loading,
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
  };
};
