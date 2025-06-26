
import ModuleHeader from '@/components/ModuleHeader';
import BaseList from '@/components/BaseList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Shield, Plus, Settings } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  usuarios: number;
  ativo: boolean;
  permissoes: string[];
}

const Grupos = () => {
  const navigate = useNavigate();
  
  const [grupos] = useState<Grupo[]>([
    {
      id: 1,
      nome: 'Administrador',
      descricao: 'Acesso total ao sistema',
      usuarios: 2,
      ativo: true,
      permissoes: ['Eventos', 'Bar', 'Escolinha', 'Financeiro', 'Configurações']
    },
    {
      id: 2,
      nome: 'Gerente',
      descricao: 'Acesso a módulos operacionais',
      usuarios: 3,
      ativo: true,
      permissoes: ['Eventos', 'Bar', 'Escolinha', 'Financeiro']
    },
    {
      id: 3,
      nome: 'Atendente',
      descricao: 'Acesso limitado para atendimento',
      usuarios: 5,
      ativo: true,
      permissoes: ['Eventos', 'Bar']
    },
    {
      id: 4,
      nome: 'Professor',
      descricao: 'Acesso ao módulo da escolinha',
      usuarios: 8,
      ativo: true,
      permissoes: ['Escolinha']
    },
    {
      id: 5,
      nome: 'Financeiro',
      descricao: 'Acesso apenas ao módulo financeiro',
      usuarios: 1,
      ativo: false,
      permissoes: ['Financeiro']
    }
  ]);

  const columns = [
    {
      key: 'nome',
      label: 'Grupo',
      sortable: true,
      render: (grupo: Grupo) => (
        <div>
          <div className="font-medium">{grupo.nome}</div>
          <div className="text-sm text-muted-foreground">{grupo.descricao}</div>
        </div>
      ),
    },
    {
      key: 'usuarios',
      label: 'Usuários',
      sortable: true,
      render: (grupo: Grupo) => (
        <span className="font-medium">{grupo.usuarios}</span>
      ),
    },
    {
      key: 'permissoes',
      label: 'Módulos com Acesso',
      render: (grupo: Grupo) => (
        <div className="flex gap-1 flex-wrap">
          {grupo.permissoes.map((permissao) => (
            <Badge key={permissao} variant="outline" className="text-xs">
              {permissao}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (grupo: Grupo) => (
        <Badge variant={grupo.ativo ? 'default' : 'secondary'}>
          {grupo.ativo ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
  ];

  const actions = [
    {
      label: 'Editar',
      icon: <Settings className="h-4 w-4" />,
      onClick: (grupo: Grupo) => navigate(`/configuracoes/grupos/${grupo.id}/editar`),
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Grupos e Perfis"
        icon={<Shield className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6">
        <BaseList
          data={grupos}
          columns={columns}
          actions={actions}
          title="Grupos de Permissões"
          description="Gerencie grupos e perfis de acesso"
          searchPlaceholder="Buscar grupo..."
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
      </main>
    </div>
  );
};

export default Grupos;
