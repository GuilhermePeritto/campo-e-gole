
export interface Permissao {
  modulo: string;
  visualizar: boolean;
  criar: boolean;
  editar: boolean;
  excluir: boolean;
}

export interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  ativo: boolean;
  permissoes: Permissao[];
  dataCadastro: string;
}

export const mockGrupos: Grupo[] = [
  {
    id: 1,
    nome: 'Administrador',
    descricao: 'Acesso total ao sistema',
    ativo: true,
    permissoes: [
      { modulo: 'eventos', visualizar: true, criar: true, editar: true, excluir: true },
      { modulo: 'bar', visualizar: true, criar: true, editar: true, excluir: true },
      { modulo: 'escolinha', visualizar: true, criar: true, editar: true, excluir: true },
      { modulo: 'financeiro', visualizar: true, criar: true, editar: true, excluir: true },
      { modulo: 'configuracoes', visualizar: true, criar: true, editar: true, excluir: true }
    ],
    dataCadastro: '2024-01-01'
  },
  {
    id: 2,
    nome: 'Gerente',
    descricao: 'Acesso a módulos operacionais',
    ativo: true,
    permissoes: [
      { modulo: 'eventos', visualizar: true, criar: true, editar: true, excluir: false },
      { modulo: 'bar', visualizar: true, criar: true, editar: true, excluir: false },
      { modulo: 'escolinha', visualizar: true, criar: true, editar: true, excluir: false },
      { modulo: 'financeiro', visualizar: true, criar: false, editar: false, excluir: false },
      { modulo: 'configuracoes', visualizar: false, criar: false, editar: false, excluir: false }
    ],
    dataCadastro: '2024-01-01'
  },
  {
    id: 3,
    nome: 'Atendente',
    descricao: 'Acesso limitado para atendimento',
    ativo: true,
    permissoes: [
      { modulo: 'eventos', visualizar: true, criar: true, editar: true, excluir: false },
      { modulo: 'bar', visualizar: true, criar: true, editar: false, excluir: false },
      { modulo: 'escolinha', visualizar: false, criar: false, editar: false, excluir: false },
      { modulo: 'financeiro', visualizar: false, criar: false, editar: false, excluir: false },
      { modulo: 'configuracoes', visualizar: false, criar: false, editar: false, excluir: false }
    ],
    dataCadastro: '2024-01-01'
  },
  {
    id: 4,
    nome: 'Professor',
    descricao: 'Acesso ao módulo da escolinha',
    ativo: true,
    permissoes: [
      { modulo: 'eventos', visualizar: false, criar: false, editar: false, excluir: false },
      { modulo: 'bar', visualizar: false, criar: false, editar: false, excluir: false },
      { modulo: 'escolinha', visualizar: true, criar: true, editar: true, excluir: false },
      { modulo: 'financeiro', visualizar: false, criar: false, editar: false, excluir: false },
      { modulo: 'configuracoes', visualizar: false, criar: false, editar: false, excluir: false }
    ],
    dataCadastro: '2024-01-01'
  }
];
