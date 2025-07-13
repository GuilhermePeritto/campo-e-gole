
import ModuleHeader from '@/components/ModuleHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Mail, Phone, Settings, Shield, User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { useUsuarios } from '@/hooks/useUsuarios';
// import { useFiliais } from '@/hooks/useFiliais';
// import { useGrupos } from '@/hooks/useGrupos';

const Usuarios = () => {
  const navigate = useNavigate();
  // const { usuarios, buscarUsuarios } = useUsuarios();
  // const { filiais, buscarFiliais } = useFiliais();
  // const { grupos, buscarGrupos } = useGrupos();

  // useEffect(() => {
  //   buscarUsuarios();
  //   buscarFiliais();
  //   buscarGrupos();
  // }, [buscarUsuarios, buscarFiliais, buscarGrupos]);

  // const getFilialNome = (filialId: number) => {
  //   const filial = filiais.find(f => f.id === filialId);
  //   return filial?.nome || 'N/A';
  // };

  // const getGrupoInfo = (grupoId: number) => {
  //   const grupo = grupos.find(g => g.id === grupoId);
  //   return {
  //     nome: grupo?.nome || 'N/A',
  //     cor: grupo?.cor || 'bg-gray-500'
  //   };
  // };

  const columns = [
    {
      key: 'nome',
      label: 'Usuário',
      sortable: true,
      render: (usuario: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={usuario.foto} />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{usuario.nome}</div>
            <div className="text-sm text-muted-foreground">{usuario.cargo}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Contato',
      render: (usuario: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span>{usuario.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span>{usuario.telefone}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'filial',
      label: 'Filial',
      sortable: true,
      render: (usuario: any) => {/* getFilialNome(usuario.filialId) */},
    },
    {
      key: 'grupo',
      label: 'Grupo',
      sortable: true,
      render: (usuario: any) => {
        // const grupoInfo = getGrupoInfo(usuario.grupoId);
        return (
          <div className="flex items-center gap-2">
            {/* <div className={`w-3 h-3 rounded-full ${grupoInfo.cor}`} />
            <span>{grupoInfo.nome}</span> */}
          </div>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (usuario: any) => (
        <Badge variant={usuario.ativo ? 'default' : 'secondary'}>
          {usuario.ativo ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      key: 'ultimoAcesso',
      label: 'Último Acesso',
      sortable: true,
      render: (usuario: any) => (
        <span className="text-sm text-muted-foreground">
          {usuario.ultimoAcesso || 'Nunca'}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: 'Editar',
      icon: <Settings className="h-4 w-4" />,
      onClick: (usuario: any) => navigate(`/configuracoes/usuarios/${usuario.id}/editar`),
      variant: 'outline' as const,
    },
    {
      label: 'Permissões',
      icon: <Shield className="h-4 w-4" />,
      onClick: (usuario: any) => navigate(`/configuracoes/usuarios/${usuario.id}/permissoes`),
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Usuários e Permissões"
        icon={<Users className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6">
        {/* <BaseList
          data={usuarios}
          columns={columns}
          actions={actions}
          title="Usuários do Sistema"
          description="Gerencie usuários e suas permissões"
          searchPlaceholder="Buscar usuário..."
          searchFields={['nome', 'email', 'cargo']}
          getItemId={(usuario) => usuario.id}
          createButton={{
            label: 'Novo Usuário',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate('/configuracoes/usuarios/novo'),
          }}
          showExport={true}
          exportFilename="usuarios"
        /> */}
      </main>
    </div>
  );
};

export default Usuarios;
