import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import PaginationControls from '@/components/PaginationControls';
import { usePagination } from '@/hooks/usePagination';
import { 
  Settings as SettingsIcon, 
  Building2, 
  Clock, 
  DollarSign, 
  Users, 
  Shield, 
  Package, 
  Calendar,
  Bell,
  Plus,
  Edit,
  Trash2,
  UserCheck,
  User,
  ArrowLeft
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastAccess: string;
  userGroupId?: string;
  useGroupPermissions: boolean;
  permissions: string[];
  avatar?: string;
}

interface UserGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[];
  createdAt: string;
  userCount: number;
}

const Settings = () => {
  const { company, updateCompanySettings } = useAuth();
  const navigate = useNavigate();

  // Mock users data
  const [users] = useState<User[]>([
    {
      id: 1,
      name: 'Administrador',
      email: 'admin@exemplo.com',
      role: 'admin',
      status: 'ativo',
      lastAccess: '2024-01-15 14:30',
      userGroupId: '1',
      useGroupPermissions: true,
      permissions: [],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'João Silva',
      email: 'joao@exemplo.com',
      role: 'manager',
      status: 'ativo',
      lastAccess: '2024-01-15 10:15',
      userGroupId: '2',
      useGroupPermissions: true,
      permissions: [],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      role: 'employee',
      status: 'inativo',
      lastAccess: '2024-01-10 16:45',
      useGroupPermissions: false,
      permissions: ['bar.view', 'bar.cashier', 'general.view_dashboard'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  // Mock user groups data
  const [userGroups] = useState<UserGroup[]>([
    {
      id: '1',
      name: 'Administradores',
      description: 'Acesso total ao sistema',
      color: 'bg-red-500',
      permissions: ['*'],
      createdAt: '2024-01-01',
      userCount: 1
    },
    {
      id: '2',
      name: 'Gerentes',
      description: 'Acesso de gerenciamento',
      color: 'bg-blue-500',
      permissions: ['bar.*', 'events.*', 'school.*', 'reports.view'],
      createdAt: '2024-01-01',
      userCount: 1
    },
    {
      id: '3',
      name: 'Funcionários Bar',
      description: 'Acesso ao módulo bar',
      color: 'bg-green-500',
      permissions: ['bar.view', 'bar.cashier', 'bar.products.view'],
      createdAt: '2024-01-01',
      userCount: 0
    },
    {
      id: '4',
      name: 'Professores',
      description: 'Acesso ao módulo escolinha',
      color: 'bg-purple-500',
      permissions: ['school.view', 'school.attendance', 'school.students.view'],
      createdAt: '2024-01-01',
      userCount: 0
    }
  ]);

  // Pagination for users
  const usersPagination = usePagination(users, {
    pageSize: 10,
    totalItems: users.length
  });

  // Pagination for groups
  const groupsPagination = usePagination(userGroups, {
    pageSize: 5,
    totalItems: userGroups.length
  });

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Carregando configurações...</h1>
          <p className="text-muted-foreground">Por favor, aguarde.</p>
        </div>
      </div>
    );
  }

  const handleSettingChange = (key: string, value: any) => {
    updateCompanySettings({ [key]: value });
    toast({
      title: "Configuração atualizada",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getUserGroupById = (groupId: string) => {
    return userGroups.find(group => group.id === groupId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/painel')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Configurações</h1>
              <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6">
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="company" className="gap-2">
              <Building2 className="h-4 w-4" />
              Empresa
            </TabsTrigger>
            <TabsTrigger value="modules" className="gap-2">
              <Package className="h-4 w-4" />
              Módulos
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="groups" className="gap-2">
              <Shield className="h-4 w-4" />
              Grupos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Informações da Empresa
                </CardTitle>
                <CardDescription>
                  Configurações básicas da sua empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input
                      id="companyName"
                      value={company.name}
                      onChange={(e) => handleSettingChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Select value={company.settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">Real Brasileiro (BRL)</SelectItem>
                        <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select value={company.settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">Nova York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Horário de Funcionamento
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessStart">Horário de Abertura</Label>
                      <Input
                        id="businessStart"
                        type="time"
                        value={company.settings.businessHours.start}
                        onChange={(e) => handleSettingChange('businessHours', {
                          ...company.settings.businessHours,
                          start: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessEnd">Horário de Fechamento</Label>
                      <Input
                        id="businessEnd"
                        type="time"
                        value={company.settings.businessHours.end}
                        onChange={(e) => handleSettingChange('businessHours', {
                          ...company.settings.businessHours,
                          end: e.target.value
                        })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Módulo Eventos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Eventos
                    </span>
                    <Switch
                      checked={company.settings.eventsModule}
                      onCheckedChange={(checked) => handleSettingChange('eventsModule', checked)}
                    />
                  </CardTitle>
                  <CardDescription>
                    Gestão de reservas, locais e eventos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Confirmação Automática</div>
                      <div className="text-xs text-muted-foreground">
                        Confirmar reservas automaticamente
                      </div>
                    </div>
                    <Switch
                      checked={company.settings.autoConfirmReservations}
                      onCheckedChange={(checked) => handleSettingChange('autoConfirmReservations', checked)}
                      disabled={!company.settings.eventsModule}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Reservas Recorrentes</div>
                      <div className="text-xs text-muted-foreground">
                        Permitir reservas que se repetem
                      </div>
                    </div>
                    <Switch
                      checked={company.settings.allowRecurringReservations}
                      onCheckedChange={(checked) => handleSettingChange('allowRecurringReservations', checked)}
                      disabled={!company.settings.eventsModule}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Horário de Pico</div>
                      <div className="text-xs text-muted-foreground">
                        Ativar preços diferenciados no horário de pico
                      </div>
                    </div>
                    <Switch
                      checked={company.settings.enablePeakHours}
                      onCheckedChange={(checked) => handleSettingChange('enablePeakHours', checked)}
                      disabled={!company.settings.eventsModule}
                    />
                  </div>
                  
                  {company.settings.enablePeakHours && company.settings.eventsModule && (
                    <div className="space-y-3 p-3 bg-muted/30 rounded-lg border">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Início</Label>
                          <Input
                            type="time"
                            value={company.settings.peakHourStart}
                            onChange={(e) => handleSettingChange('peakHourStart', e.target.value)}
                            className="h-8"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Fim</Label>
                          <Input
                            type="time"
                            value={company.settings.peakHourEnd}
                            onChange={(e) => handleSettingChange('peakHourEnd', e.target.value)}
                            className="h-8"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Multiplicador de Preço</Label>
                        <Input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={company.settings.peakHourMultiplier}
                          onChange={(e) => handleSettingChange('peakHourMultiplier', parseFloat(e.target.value))}
                          className="h-8"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Módulo Bar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Bar
                    </span>
                    <Switch
                      checked={company.settings.barModule}
                      onCheckedChange={(checked) => handleSettingChange('barModule', checked)}
                    />
                  </CardTitle>
                  <CardDescription>
                    Gestão de produtos, estoque e vendas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Estoque Negativo</div>
                      <div className="text-xs text-muted-foreground">
                        Permitir vendas com estoque negativo
                      </div>
                    </div>
                    <Switch
                      checked={company.settings.allowNegativeStock}
                      onCheckedChange={(checked) => handleSettingChange('allowNegativeStock', checked)}
                      disabled={!company.settings.barModule}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Alertas de Estoque</div>
                      <div className="text-xs text-muted-foreground">
                        Notificar quando estoque estiver baixo
                      </div>
                    </div>
                    <Switch
                      checked={company.settings.stockAlerts}
                      onCheckedChange={(checked) => handleSettingChange('stockAlerts', checked)}
                      disabled={!company.settings.barModule}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Comandas</div>
                      <div className="text-xs text-muted-foreground">
                        Habilitar sistema de comandas
                      </div>
                    </div>
                    <Switch
                      checked={company.settings.enableComandas}
                      onCheckedChange={(checked) => handleSettingChange('enableComandas', checked)}
                      disabled={!company.settings.barModule}
                    />
                  </div>
                  
                  {company.settings.stockAlerts && company.settings.barModule && (
                    <div className="p-3 bg-muted/30 rounded-lg border">
                      <Label className="text-xs">Limite para alerta de estoque baixo</Label>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={company.settings.lowStockThreshold}
                        onChange={(e) => handleSettingChange('lowStockThreshold', parseInt(e.target.value))}
                        className="h-8 mt-1"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Módulo Escolinha */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Escolinha
                    </span>
                    <Switch
                      checked={company.settings.schoolModule}
                      onCheckedChange={(checked) => handleSettingChange('schoolModule', checked)}
                    />
                  </CardTitle>
                  <CardDescription>
                    Gestão de alunos, turmas e mensalidades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Configurações específicas da escolinha estarão disponíveis em breve.
                  </p>
                </CardContent>
              </Card>

              {/* Módulo Financeiro */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Financeiro
                    </span>
                    <Switch
                      checked={company.settings.financialModule}
                      onCheckedChange={(checked) => handleSettingChange('financialModule', checked)}
                    />
                  </CardTitle>
                  <CardDescription>
                    Gestão financeira e relatórios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Configurações específicas do módulo financeiro estarão disponíveis em breve.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Usuários do Sistema
                    </CardTitle>
                    <CardDescription>
                      Gerenciar usuários e suas permissões
                    </CardDescription>
                  </div>
                  <Button onClick={() => navigate('/configuracoes/usuarios/novo')} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Usuário
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usersPagination.paginatedData.map((user) => {
                    const userGroup = getUserGroupById(user.userGroupId || '');
                    
                    return (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                <User className="h-6 w-6" />
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${user.status === 'ativo' ? 'bg-green-500' : 'bg-red-500'}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{user.name}</h4>
                              <Badge className={getStatusColor(user.status)}>
                                {user.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {user.useGroupPermissions && userGroup ? (
                                <Badge variant="secondary" className="gap-1">
                                  <div className={`w-2 h-2 rounded-full ${userGroup.color}`} />
                                  {userGroup.name}
                                </Badge>
                              ) : (
                                <Badge variant="outline">
                                  {user.permissions.length} permissões específicas
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Último acesso: {user.lastAccess}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/configuracoes/usuarios/${user.id}/editar`)}
                            className="gap-2"
                          >
                            <Edit className="h-3 w-3" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <PaginationControls
                  currentPage={usersPagination.currentPage}
                  totalPages={usersPagination.totalPages}
                  totalItems={usersPagination.totalItems}
                  pageSize={usersPagination.pageSize}
                  startIndex={usersPagination.startIndex}
                  endIndex={usersPagination.endIndex}
                  hasNextPage={usersPagination.hasNextPage}
                  hasPreviousPage={usersPagination.hasPreviousPage}
                  onPageChange={usersPagination.goToPage}
                  onPageSizeChange={usersPagination.setPageSize}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Grupos de Usuários
                    </CardTitle>
                    <CardDescription>
                      Grupos predefinidos com conjuntos de permissões específicas
                    </CardDescription>
                  </div>
                  <Button onClick={() => navigate('/configuracoes/grupos/novo')} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Grupo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupsPagination.paginatedData.map((group) => (
                    <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${group.color}`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{group.name}</h4>
                            <Badge variant="outline">{group.userCount} usuários</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{group.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {group.permissions.slice(0, 3).map((permission) => (
                              <Badge key={permission} variant="secondary" className="text-xs">
                                {permission === '*' ? 'Todas' : permission.split('.')[1] || permission}
                              </Badge>
                            ))}
                            {group.permissions.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{group.permissions.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/configuracoes/grupos/${group.id}/editar`)}
                          className="gap-2"
                        >
                          <Edit className="h-3 w-3" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-destructive hover:text-destructive"
                          disabled={group.userCount > 0}
                        >
                          <Trash2 className="h-3 w-3" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <PaginationControls
                  currentPage={groupsPagination.currentPage}
                  totalPages={groupsPagination.totalPages}
                  totalItems={groupsPagination.totalItems}
                  pageSize={groupsPagination.pageSize}
                  startIndex={groupsPagination.startIndex}
                  endIndex={groupsPagination.endIndex}
                  hasNextPage={groupsPagination.hasNextPage}
                  hasPreviousPage={groupsPagination.hasPreviousPage}
                  onPageChange={groupsPagination.goToPage}
                  onPageSizeChange={groupsPagination.setPageSize}
                  pageSizeOptions={[5, 10, 20]}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
