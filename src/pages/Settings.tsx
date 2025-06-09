
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
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import UserModal from '@/components/UserModal';
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
  User
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
}

const Settings = () => {
  const { company, updateCompanySettings, userGroups } = useAuth();
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

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
      permissions: []
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
      permissions: []
    },
    {
      id: 3,
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      role: 'employee',
      status: 'inativo',
      lastAccess: '2024-01-10 16:45',
      useGroupPermissions: false,
      permissions: ['bar.view', 'bar.cashier', 'general.view_dashboard']
    }
  ]);

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

  const handleCreateUser = () => {
    setSelectedUser(null);
    setModalMode('create');
    setUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalMode('edit');
    setUserModalOpen(true);
  };

  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'admin':
        return { label: 'Administrador', color: 'bg-red-500', icon: Shield };
      case 'manager':
        return { label: 'Gerente', color: 'bg-blue-500', icon: UserCheck };
      case 'employee':
        return { label: 'Funcionário', color: 'bg-green-500', icon: User };
      default:
        return { label: role, color: 'bg-gray-500', icon: User };
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <SettingsIcon className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Configurações</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notificações
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
            {/* User Groups Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Grupos de Usuários
                </CardTitle>
                <CardDescription>
                  Grupos predefinidos com conjuntos de permissões específicas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {userGroups.map((group) => (
                    <div key={group.id} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-4 h-4 rounded-full ${group.color}`} />
                        <div>
                          <h4 className="font-medium text-sm">{group.name}</h4>
                          <p className="text-xs text-muted-foreground">{group.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium">Permissões ({group.permissions.length}):</p>
                        <div className="flex flex-wrap gap-1">
                          {group.permissions.slice(0, 3).map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission.split('.')[1]}
                            </Badge>
                          ))}
                          {group.permissions.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{group.permissions.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Users Management Section */}
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
                  <Button onClick={handleCreateUser} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Usuário
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => {
                    const roleInfo = getRoleInfo(user.role);
                    const RoleIcon = roleInfo.icon;
                    const userGroup = userGroups.find(group => group.id === user.userGroupId);
                    
                    return (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${roleInfo.color} text-white`}>
                            <RoleIcon className="h-4 w-4" />
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
                              <Badge variant="outline">{roleInfo.label}</Badge>
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
                            onClick={() => handleEditUser(user)}
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Configurações de Notificações
                </CardTitle>
                <CardDescription>
                  Configure quando e como receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configurações de notificações estarão disponíveis em breve.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <UserModal
        open={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        user={selectedUser}
        mode={modalMode}
      />
    </div>
  );
};

export default Settings;
