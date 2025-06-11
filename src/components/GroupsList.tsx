
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import BaseList from '@/components/BaseList';
import { MoreVertical, Edit, Trash, Users, Shield, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Group {
  id: string;
  name: string;
  description: string;
  color: string;
  userCount: number;
  permissions: string[];
  createdAt: string;
}

const GroupsList = () => {
  const navigate = useNavigate();

  // Mock data
  const groups: Group[] = [
    {
      id: '1',
      name: 'Administradores',
      description: 'Acesso total ao sistema',
      color: 'bg-red-500',
      userCount: 2,
      permissions: ['*'],
      createdAt: '2025-01-01'
    },
    {
      id: '2',
      name: 'Gerentes',
      description: 'Acesso de gerenciamento com restrições administrativas',
      color: 'bg-blue-500',
      userCount: 5,
      permissions: ['bar.*', 'events.*', 'school.*', 'reports.view'],
      createdAt: '2025-01-02'
    },
    {
      id: '3',
      name: 'Funcionários Bar',
      description: 'Acesso ao módulo bar e operações de caixa',
      color: 'bg-green-500',
      userCount: 8,
      permissions: ['bar.view', 'bar.cashier', 'bar.manage_comandas'],
      createdAt: '2025-01-03'
    },
    {
      id: '4',
      name: 'Professores',
      description: 'Acesso ao módulo escolinha e gestão de alunos',
      color: 'bg-purple-500',
      userCount: 12,
      permissions: ['school.view', 'school.attendance', 'school.manage_students'],
      createdAt: '2025-01-04'
    }
  ];

  const columns = [
    {
      key: 'name',
      label: 'Nome',
      render: (group: Group) => (
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${group.color} flex items-center justify-center`}>
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="font-medium">{group.name}</span>
        </div>
      )
    },
    {
      key: 'description',
      label: 'Descrição',
      render: (group: Group) => <span className="text-muted-foreground">{group.description}</span>
    },
    {
      key: 'userCount',
      label: 'Usuários',
      render: (group: Group) => (
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{group.userCount}</span>
        </div>
      )
    },
    {
      key: 'permissions',
      label: 'Permissões',
      render: (group: Group) => (
        <div className="flex flex-wrap gap-1">
          {group.permissions.slice(0, 2).map((permission) => (
            <Badge key={permission} variant="secondary" className="text-xs">
              {permission === '*' ? 'Todas' : permission.split('.')[0]}
            </Badge>
          ))}
          {group.permissions.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{group.permissions.length - 2}
            </Badge>
          )}
        </div>
      )
    }
  ];

  const actions = [
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (group: Group) => navigate(`/configuracoes/grupos/${group.id}/editar`)
    },
    {
      label: 'Excluir',
      icon: <Trash className="h-4 w-4" />,
      onClick: (group: Group) => console.log('Excluir grupo:', group.id),
      variant: 'destructive' as const
    }
  ];

  const renderGroupCard = (group: Group, actions: any[]) => (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg ${group.color} flex items-center justify-center`}>
          <Shield className="h-6 w-6 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">{group.name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              <span className="text-xs">{group.userCount} usuários</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{group.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {group.permissions.slice(0, 3).map((permission) => (
              <Badge key={permission} variant="secondary" className="text-xs">
                {permission === '*' ? 'Todas as permissões' : permission.split('.')[0]}
              </Badge>
            ))}
            {group.permissions.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{group.permissions.length - 3} mais
              </Badge>
            )}
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
          <DropdownMenuItem onClick={() => navigate(`/configuracoes/grupos/${group.id}/editar`)}>
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
      data={groups}
      columns={columns}
      actions={actions}
      title="Grupos de Permissões"
      description="Gerencie grupos e suas permissões de acesso"
      searchPlaceholder="Buscar grupos..."
      searchFields={['name', 'description']}
      getItemId={(group) => group.id}
      renderCard={renderGroupCard}
      createButton={{
        label: 'Novo Grupo',
        icon: <Plus className="h-4 w-4" />,
        onClick: () => navigate('/configuracoes/grupos/novo')
      }}
    />
  );
};

export default GroupsList;
