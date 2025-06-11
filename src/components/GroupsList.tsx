
import React, { useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderGroupCard = (group: Group) => (
    <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
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
      title="Grupos de Permissões"
      description="Gerencie grupos e suas permissões de acesso"
      searchPlaceholder="Buscar grupos..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      items={filteredGroups}
      renderItem={renderGroupCard}
      emptyMessage="Nenhum grupo encontrado"
      emptyDescription="Não há grupos cadastrados ou que correspondam aos critérios de busca."
      actionButton={
        <Button onClick={() => navigate('/configuracoes/grupos/novo')} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Grupo
        </Button>
      }
    />
  );
};

export default GroupsList;
