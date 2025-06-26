
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
  dataCadastro: string;
  avatar?: string;
}

export const mockUsuarios: Usuario[] = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@arenasports.com',
    telefone: '(11) 98765-4321',
    cargo: 'Administrador',
    filialId: 1,
    grupoId: 1,
    ativo: true,
    ultimoAcesso: '2024-01-15 14:30:25',
    dataCadastro: '2024-01-01',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria@arenasports.com',
    telefone: '(11) 98765-4322',
    cargo: 'Atendente',
    filialId: 1,
    grupoId: 3,
    ativo: true,
    ultimoAcesso: '2024-01-15 13:20:10',
    dataCadastro: '2024-01-05'
  },
  {
    id: 3,
    nome: 'Pedro Costa',
    email: 'pedro@arenasports.com',
    telefone: '(11) 98765-4323',
    cargo: 'Professor',
    filialId: 2,
    grupoId: 4,
    ativo: false,
    ultimoAcesso: '2024-01-10 16:45:00',
    dataCadastro: '2024-01-10'
  }
];
