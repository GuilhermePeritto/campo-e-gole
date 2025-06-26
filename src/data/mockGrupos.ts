
export interface Permissao {
  id: number;
  nome: string;
  descricao: string;
  modulo: string;
  acao: string;
}

export interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  cor: string;
  ativo: boolean;
  permissoes: number[];
  usuarios: number;
  dataCriacao: string;
}

export const mockPermissoes: Permissao[] = [
  // Eventos
  { id: 1, nome: 'Visualizar Agenda', descricao: 'Pode visualizar a agenda de eventos', modulo: 'Eventos', acao: 'visualizar' },
  { id: 2, nome: 'Criar Reservas', descricao: 'Pode criar novas reservas', modulo: 'Eventos', acao: 'criar' },
  { id: 3, nome: 'Editar Reservas', descricao: 'Pode editar reservas existentes', modulo: 'Eventos', acao: 'editar' },
  { id: 4, nome: 'Cancelar Reservas', descricao: 'Pode cancelar reservas', modulo: 'Eventos', acao: 'excluir' },
  { id: 5, nome: 'Gerenciar Clientes', descricao: 'Pode gerenciar dados de clientes', modulo: 'Eventos', acao: 'gerenciar' },
  { id: 6, nome: 'Gerenciar Locais', descricao: 'Pode gerenciar locais e quadras', modulo: 'Eventos', acao: 'gerenciar' },
  
  // Bar
  { id: 7, nome: 'Visualizar Produtos', descricao: 'Pode visualizar produtos do bar', modulo: 'Bar', acao: 'visualizar' },
  { id: 8, nome: 'Gerenciar Produtos', descricao: 'Pode criar, editar e excluir produtos', modulo: 'Bar', acao: 'gerenciar' },
  { id: 9, nome: 'Controlar Estoque', descricao: 'Pode gerenciar estoque de produtos', modulo: 'Bar', acao: 'gerenciar' },
  { id: 10, nome: 'Realizar Vendas', descricao: 'Pode realizar vendas no bar', modulo: 'Bar', acao: 'criar' },
  { id: 11, nome: 'Gerenciar Comandas', descricao: 'Pode criar e gerenciar comandas', modulo: 'Bar', acao: 'gerenciar' },
  
  // Escolinha
  { id: 12, nome: 'Visualizar Alunos', descricao: 'Pode visualizar dados dos alunos', modulo: 'Escolinha', acao: 'visualizar' },
  { id: 13, nome: 'Gerenciar Alunos', descricao: 'Pode criar, editar e excluir alunos', modulo: 'Escolinha', acao: 'gerenciar' },
  { id: 14, nome: 'Gerenciar Professores', descricao: 'Pode gerenciar dados de professores', modulo: 'Escolinha', acao: 'gerenciar' },
  { id: 15, nome: 'Gerenciar Turmas', descricao: 'Pode criar e gerenciar turmas', modulo: 'Escolinha', acao: 'gerenciar' },
  { id: 16, nome: 'Fazer Chamada', descricao: 'Pode fazer chamada das turmas', modulo: 'Escolinha', acao: 'criar' },
  { id: 17, nome: 'Gerenciar Mensalidades', descricao: 'Pode gerenciar mensalidades dos alunos', modulo: 'Escolinha', acao: 'gerenciar' },
  
  // Financeiro
  { id: 18, nome: 'Visualizar Financeiro', descricao: 'Pode visualizar dados financeiros', modulo: 'Financeiro', acao: 'visualizar' },
  { id: 19, nome: 'Gerenciar Contas a Receber', descricao: 'Pode gerenciar contas a receber', modulo: 'Financeiro', acao: 'gerenciar' },
  { id: 20, nome: 'Gerenciar Contas a Pagar', descricao: 'Pode gerenciar contas a pagar', modulo: 'Financeiro', acao: 'gerenciar' },
  { id: 21, nome: 'Receber Pagamentos', descricao: 'Pode receber pagamentos', modulo: 'Financeiro', acao: 'criar' },
  { id: 22, nome: 'Relatórios Financeiros', descricao: 'Pode gerar relatórios financeiros', modulo: 'Financeiro', acao: 'visualizar' },
  
  // Configurações
  { id: 23, nome: 'Gerenciar Usuários', descricao: 'Pode criar, editar e excluir usuários', modulo: 'Configurações', acao: 'gerenciar' },
  { id: 24, nome: 'Gerenciar Grupos', descricao: 'Pode gerenciar grupos de permissões', modulo: 'Configurações', acao: 'gerenciar' },
  { id: 25, nome: 'Configurar Sistema', descricao: 'Pode alterar configurações do sistema', modulo: 'Configurações', acao: 'gerenciar' },
  { id: 26, nome: 'Visualizar Auditoria', descricao: 'Pode visualizar logs de auditoria', modulo: 'Configurações', acao: 'visualizar' }
];

export const mockGrupos: Grupo[] = [
  {
    id: 1,
    nome: 'Administrador',
    descricao: 'Acesso total ao sistema',
    cor: 'bg-red-500',
    ativo: true,
    permissoes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    usuarios: 1,
    dataCriacao: '2024-01-01'
  },
  {
    id: 2,
    nome: 'Gerente',
    descricao: 'Acesso a módulos operacionais',
    cor: 'bg-blue-500',
    ativo: true,
    permissoes: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 21, 22],
    usuarios: 1,
    dataCriacao: '2024-01-01'
  },
  {
    id: 3,
    nome: 'Atendente',
    descricao: 'Acesso limitado para atendimento',
    cor: 'bg-green-500',
    ativo: true,
    permissoes: [1, 2, 5, 7, 10, 11, 12, 16],
    usuarios: 1,
    dataCriacao: '2024-01-01'
  },
  {
    id: 4,
    nome: 'Professor',
    descricao: 'Acesso ao módulo da escolinha',
    cor: 'bg-purple-500',
    ativo: true,
    permissoes: [12, 15, 16],
    usuarios: 1,
    dataCriacao: '2024-01-01'
  },
  {
    id: 5,
    nome: 'Financeiro',
    descricao: 'Acesso apenas ao módulo financeiro',
    cor: 'bg-yellow-500',
    ativo: false,
    permissoes: [18, 19, 20, 21, 22],
    usuarios: 0,
    dataCriacao: '2024-01-01'
  }
];
