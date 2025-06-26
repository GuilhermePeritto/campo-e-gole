
import BaseList from '@/components/BaseList';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, Edit, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  usuarios: number;
  permissoes: string[];
  ativo: boolean;
  dataCriacao: string;
}

const Grupos = () => {
  const navigate = useNavigate();
  const [grupos] = useState<Grupo[]>([
    {
      id: 1,
      nome: 'Administrador',
      descricao: 'Acesso total ao sistema',
      usuarios: 2,
      permissoes: ['eventos:all', 'bar:all', 'escolinha:all', 'financeiro:all', 'configuracoes:all'],
      ativo: true,
      dataCriacao: '2024-01-01'
    },
    {
      id: 2,
      nome: 'Gerente',
      descricao: 'Acesso de gerenciamento por módulo',
      usuarios: 3,
      permissoes: ['eventos:all', 'bar:read,create,edit', 'financeiro:read,create'],
      ativo: true,
      dataCriacao: '2024-01-01'
    },
    {
      id: 3,
      nome: 'Atendente',
      descricao: 'Acesso básico para atendimento',
      usuarios: 5,
      permissoes: ['eventos:read,create,edit', 'bar:read'],
      ativo: true,
      dataCriacao: '2024-01-01'
    },
    {
      id: 4,
      nome: 'Professor',
      descricao: 'Acesso ao módulo da escolinha',
      usuarios: 8,
      permissoes: ['escolinha:read,create,edit'],
      ativo: true,
      dataCriacao: '2024-01-01'
    },
    {
      id: 5,
      nome: 'Financeiro',
      descricao: 'Acesso ao módulo financeiro',
      usuarios: 2,
      permissoes: ['financeiro:all'],
      ativo: true,
      dataCriacao: '2024-01-01'
    }
  ]);

  const columns = [
    {
      key: 'nome',
      label: 'Nome do Grupo',
      sortable: true,
    },
    {
      key: 'descricao',
      label: 'Descrição',
      sortable: true,
    },
    {
      key: 'usuarios',
      label: 'Usuários',
      render: (grupo: Grupo) => (
        <Badge variant="secondary">
          <Users className="h-3 w-3 mr-1" />
          {grupo.usuarios}
        </Badge>
      ),
    },
    {
      key: 'permissoes',
      label: 'Módulos',
      render: (grupo: Grupo) => (
        <div className="flex flex-wrap gap-1">
          {grupo.permissoes.slice(0, 3).map((permissao, index) => {
            const modulo = permissao.split(':')[0];
            return (
              <Badge key={index} variant="outline" className="text-xs">
                {modulo}
              </Badge>
            );
          })}
          {grupo.permissoes.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{grupo.permissoes.length - 3}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'ativo',
      label: 'Status',
      render: (grupo: Grupo) => (
        <Badge variant={grupo.ativo ? 'default' : 'secondary'}>
          {grupo.ativo ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      key: 'dataCriacao',
      label: 'Criado em',
      sortable: true,
    },
  ];

  const actions = [
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (grupo: Grupo) => navigate(`/configuracoes/grupos/${grupo.id}/editar`),
      variant: 'outline' as const,
    },
    {
      label: 'Excluir',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (grupo: Grupo) => {
        if (grupo.usuarios > 0) {
          alert('Não é possível excluir um grupo que possui usuários associados.');
          return;
        }
        if (confirm('Tem certeza que deseja excluir este grupo?')) {
          console.log('Excluindo grupo:', grupo);
        }
      },
      variant: 'destructive' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <BaseList
          data={grupos}
          columns={columns}
          actions={actions}
          title="Grupos e Perfis"
          description="Gerencie grupos de permissões reutilizáveis"
          searchPlaceholder="Buscar grupos..."
          searchFields={['nome', 'descricao']}
          getItemId={(grupo) => grupo.id}
          createButton={{
            label: 'Novo Grupo',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate('/configuracoes/grupos/novo'),
          }}
          showExport={true}
          exportFilename="grupos"
        />
      </div>
    </div>
  );
};

export default Grupos;
