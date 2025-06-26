
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  filialId: number;
  grupoId: number;
  ativo: boolean;
  ultimoAcesso: string;
  foto?: string;
  permissoesCustomizadas?: number[];
  dataCadastro: string;
  senha?: string;
}

export const mockUsuarios: Usuario[] = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@arenasports.com',
    telefone: '11987654321',
    cargo: 'Administrador',
    filialId: 1,
    grupoId: 1,
    ativo: true,
    ultimoAcesso: '2024-01-15 14:30',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    dataCadastro: '2024-01-01'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria@arenasports.com',
    telefone: '11987654322',
    cargo: 'Gerente',
    filialId: 1,
    grupoId: 2,
    ativo: true,
    ultimoAcesso: '2024-01-15 13:20',
    foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    dataCadastro: '2024-01-05'
  },
  {
    id: 3,
    nome: 'Pedro Costa',
    email: 'pedro@arenasports.com',
    telefone: '11987654323',
    cargo: 'Professor',
    filialId: 2,
    grupoId: 4,
    ativo: false,
    ultimoAcesso: '2024-01-10 16:45',
    dataCadastro: '2024-01-10'
  },
  {
    id: 4,
    nome: 'Ana Oliveira',
    email: 'ana@arenasports.com',
    telefone: '11987654324',
    cargo: 'Atendente',
    filialId: 1,
    grupoId: 3,
    ativo: true,
    ultimoAcesso: '2024-01-15 12:10',
    dataCadastro: '2024-01-08'
  }
];
