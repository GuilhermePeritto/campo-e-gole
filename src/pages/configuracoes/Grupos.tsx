
import ModuleHeader from '@/components/ModuleHeader';
import BaseList from '@/components/BaseList';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useGrupos } from '@/hooks/useGrupos';
import { Shield, Plus, Settings } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Grupos = () => {
  const navigate = useNavigate();
  const { grupos, loading, getGrupos } = useGrupos();

  useEffect(() => {
    getGrupos();
  }, [getGrupos]);

  const columns = [
    {
      key: 'nome',
      label: 'Grupo',
      sortable: true,
      render: (grupo: any) => (
        <div>
          <div className="font-medium">{grupo.nome}</div>
          <div className="text-sm text-muted-foreground">{grupo.descricao}</div>
        </div>
      ),
    },
    {
      key: 'permissoes',
      label: 'Módulos com Acesso',
      render: (grupo: any) => (
        <div className="flex gap-1 flex-wrap">
          {grupo.permissoes.map((permissao: any) => {
            const hasAnyPermission = permissao.visualizar || permissao.criar || permissao.editar || permissao.excluir;
            if (hasAnyPermission) {
              return (
                <Badge key={permissao.modulo} variant="outline" className="text-xs">
                  {permissao.modulo}
                </Badge>
              );
            }
            return null;
          })}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (grupo: any) => (
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
      onClick: (grupo: any) => navigate(`/configuracoes/grupos/${grupo.id}`),
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
