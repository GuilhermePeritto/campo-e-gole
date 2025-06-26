
import ModuleHeader from '@/components/ModuleHeader';
import BaseList from '@/components/BaseList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Users, Plus, Settings, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  filial: string;
  grupo: string;
  ativo: boolean;
  ultimoAcesso: string;
}

const Usuarios = () => {
  const navigate = useNavigate();
  
  const [usuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@arenasports.com',
      telefone: '11987654321',
      cargo: 'Administrador',
      filial: 'Filial Centro',
      grupo: 'Administrador',
      ativo: true,
      ultimoAcesso: '2024-01-15 14:30'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria@arenasports.com',
      telefone: '11987654322',
      cargo: 'Atendente',
      filial: 'Filial Centro',
      grupo: 'Atendente',
      ativo: true,
      ultimoAcesso: '2024-01-15 13:20'
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      email: 'pedro@arenasports.com',
      telefone: '11987654323',
      cargo: 'Professor',
      filial: 'Filial Zona Norte',
      grupo: 'Professor',
      ativo: false,
      ultimoAcesso: '2024-01-10 16:45'
    }
  ]);

  const columns = [
    {
      key: 'nome',
      label: 'Usuário',
      sortable: true,
      render: (usuario: Usuario) => (
        <div>
          <div className="font-medium">{usuario.nome}</div>
          <div className="text-sm text-muted-foreground">{usuario.cargo}</div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Contato',
      render: (usuario: Usuario) => (
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
    },
    {
      key: 'grupo',
      label: 'Grupo',
      sortable: true,
      render: (usuario: Usuario) => (
        <Badge variant="outline">{usuario.grupo}</Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (usuario: Usuario) => (
        <Badge variant={usuario.ativo ? 'default' : 'secondary'}>
          {usuario.ativo ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      key: 'ultimoAcesso',
      label: 'Último Acesso',
      sortable: true,
      render: (usuario: Usuario) => (
        <span className="text-sm text-muted-foreground">{usuario.ultimoAcesso}</span>
      ),
    },
  ];

  const actions = [
    {
      label: 'Editar',
      icon: <Settings className="h-4 w-4" />,
      onClick: (usuario: Usuario) => navigate(`/configuracoes/usuarios/${usuario.id}/editar`),
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
        <BaseList
          data={usuarios}
          columns={columns}
          actions={actions}
          title="Usuários do Sistema"
          description="Gerencie usuários e suas permissões"
          searchPlaceholder="Buscar usuário..."
          searchFields={['nome', 'email', 'cargo', 'filial']}
          getItemId={(usuario) => usuario.id}
          createButton={{
            label: 'Novo Usuário',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate('/configuracoes/usuarios/novo'),
          }}
          showExport={true}
          exportFilename="usuarios"
        />
      </main>
    </div>
  );
};

export default Usuarios;
