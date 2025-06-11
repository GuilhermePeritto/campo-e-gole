
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import BaseList from '@/components/BaseList';
import { MoreVertical, Edit, Trash, User, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'ativo' | 'inativo';
  group: string;
  groupColor: string;
  avatar?: string;
  lastLogin: string;
}

const UsersList = () => {
  const navigate = useNavigate();

  // Mock data
  const users: User[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@exemplo.com',
      status: 'ativo',
      group: 'Administradores',
      groupColor: 'bg-red-500',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastLogin: '2025-01-15 09:30'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      status: 'ativo',
      group: 'Gerentes',
      groupColor: 'bg-blue-500',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastLogin: '2025-01-15 08:45'
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      email: 'carlos@exemplo.com',
      status: 'inativo',
      group: 'Funcionários Bar',
      groupColor: 'bg-green-500',
      lastLogin: '2025-01-10 16:20'
    }
  ];

  const columns = [
    {
      key: 'name',
      label: 'Nome',
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </div>
      )
    },
    {
      key: 'email',
      label: 'E-mail',
      render: (user: User) => <span className="text-muted-foreground">{user.email}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (user: User) => (
        <Badge variant={user.status === 'ativo' ? 'default' : 'secondary'}>
          {user.status}
        </Badge>
      )
    },
    {
      key: 'group',
      label: 'Grupo',
      render: (user: User) => (
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${user.groupColor}`} />
          <span>{user.group}</span>
        </div>
      )
    },
    {
      key: 'lastLogin',
      label: 'Último Acesso',
      render: (user: User) => <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
    }
  ];

  const actions = [
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (user: User) => navigate(`/configuracoes/usuarios/${user.id}/editar`)
    },
    {
      label: 'Excluir',
      icon: <Trash className="h-4 w-4" />,
      onClick: (user: User) => console.log('Excluir usuário:', user.id),
      variant: 'destructive' as const
    }
  ];

  const renderUserCard = (user: User, actions: any[]) => (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">{user.name}</h3>
            <Badge variant={user.status === 'ativo' ? 'default' : 'secondary'}>
              {user.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-3 h-3 rounded-full ${user.groupColor}`} />
            <span className="text-xs text-muted-foreground">{user.group}</span>
            <span className="text-xs text-muted-foreground">• Último acesso: {user.lastLogin}</span>
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate(`/configuracoes/usuarios/${user.id}/editar`)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <BaseList
      data={users}
      columns={columns}
      actions={actions}
      title="Usuários do Sistema"
      description="Gerencie usuários e suas permissões"
      searchPlaceholder="Buscar usuários..."
      searchFields={['name', 'email', 'group']}
      getItemId={(user) => user.id}
      renderCard={renderUserCard}
      createButton={{
        label: 'Novo Usuário',
        icon: <Plus className="h-4 w-4" />,
        onClick: () => navigate('/configuracoes/usuarios/novo')
      }}
    />
  );
};

export default UsersList;
