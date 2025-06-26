
import BaseList from '@/components/BaseList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Edit, Trash2, Shield } from 'lucide-react';
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
  status: 'ativo' | 'inativo';
  ultimoAcesso: string;
}

const Usuarios = () => {
  const navigate = useNavigate();
  const [usuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@arenasports.com',
      telefone: '(11) 99999-9999',
      cargo: 'Gerente',
      filial: 'Filial Centro',
      grupo: 'Administrador',
      status: 'ativo',
      ultimoAcesso: '2024-01-15 14:30'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria@arenasports.com',
      telefone: '(11) 88888-8888',
      cargo: 'Atendente',
      filial: 'Filial Centro',
      grupo: 'Atendente',
      status: 'ativo',
      ultimoAcesso: '2024-01-15 13:45'
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      email: 'pedro@arenasports.com',
      telefone: '(11) 77777-7777',
      cargo: 'Professor',
      filial: 'Filial Zona Norte',
      grupo: 'Professor',
      status: 'inativo',
      ultimoAcesso: '2024-01-10 16:20'
    }
  ]);

  const columns = [
    {
      key: 'nome',
      label: 'Nome',
      sortable: true,
    },
    {
      key: 'email',
      label: 'E-mail',
      sortable: true,
    },
    {
      key: 'cargo',
      label: 'Cargo',
      sortable: true,
    },
    {
      key: 'filial',
      label: 'Filial',
      sortable: true,
    },
    {
      key: 'grupo',
      label: 'Grupo',
      render: (usuario: Usuario) => (
        <Badge variant="outline">{usuario.grupo}</Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (usuario: Usuario) => (
        <Badge variant={usuario.status === 'ativo' ? 'default' : 'secondary'}>
          {usuario.status === 'ativo' ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      key: 'ultimoAcesso',
      label: 'Último Acesso',
      sortable: true,
    },
  ];

  const actions = [
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (usuario: Usuario) => navigate(`/configuracoes/usuarios/${usuario.id}/editar`),
      variant: 'outline' as const,
    },
    {
      label: 'Permissões',
      icon: <Shield className="h-4 w-4" />,
      onClick: (usuario: Usuario) => navigate(`/configuracoes/usuarios/${usuario.id}/permissoes`),
      variant: 'outline' as const,
    },
    {
      label: 'Excluir',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (usuario: Usuario) => {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
          console.log('Excluindo usuário:', usuario);
        }
      },
      variant: 'destructive' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <BaseList
          data={usuarios}
          columns={columns}
          actions={actions}
          title="Usuários e Permissões"
          description="Gerencie usuários e seus níveis de acesso"
          searchPlaceholder="Buscar usuários..."
          searchFields={['nome', 'email', 'cargo', 'filial']}
          getItemId={(usuario) => usuario.id}
          createButton={{
            label: 'Novo Usuário',
            icon: <UserPlus className="h-4 w-4" />,
            onClick: () => navigate('/configuracoes/usuarios/novo'),
          }}
          showExport={true}
          exportFilename="usuarios"
        />
      </div>
    </div>
  );
};

export default Usuarios;
