import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { usePagination } from '@/hooks/usePagination';
import PaginationControls from '@/components/PaginationControls';
import UserModal from '@/components/UserModal';
import { ArrowLeft, Building2, Clock, DollarSign, Palette, Shield, Users, Plus, Search, Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const navigate = useNavigate();
  const { company, user } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [settings, setSettings] = useState({
    // Empresa
    companyName: company?.name || 'Minha Empresa',
    currency: 'BRL',
    timezone: 'America/Sao_Paulo',
    businessStart: '06:00',
    businessEnd: '23:00',
    
    // Módulos
    eventsModule: true,
    barModule: true,
    schoolModule: true,
    financialModule: true,
    
    // Eventos - Horários Nobre
    enablePeakHours: false,
    peakHourStart: '18:00',
    peakHourEnd: '22:00',
    peakHourMultiplier: 1.5,
    
    // Bar - Estoque
    allowNegativeStock: false,
    stockAlerts: true,
    lowStockThreshold: 10,
    printReceipts: true,
    enableComandas: true,
    
    // Eventos
    autoConfirmReservations: true,
    allowRecurringReservations: true,
    requireClientApproval: false
  });

  const availablePermissions = {
    events: [
      { id: 'events.view', name: 'Visualizar Eventos', description: 'Pode ver a lista de eventos' },
      { id: 'events.create', name: 'Criar Eventos', description: 'Pode criar novos eventos' },
      { id: 'events.edit', name: 'Editar Eventos', description: 'Pode editar eventos existentes' },
      { id: 'events.delete', name: 'Excluir Eventos', description: 'Pode excluir eventos' },
      { id: 'events.manage_venues', name: 'Gerenciar Locais', description: 'Pode gerenciar locais de eventos' },
      { id: 'events.manage_clients', name: 'Gerenciar Clientes', description: 'Pode gerenciar clientes de eventos' },
      { id: 'events.receive_payments', name: 'Receber Pagamentos', description: 'Pode processar pagamentos de eventos' }
    ],
    school: [
      { id: 'school.view', name: 'Visualizar Escolinha', description: 'Pode ver informações da escolinha' },
      { id: 'school.manage_students', name: 'Gerenciar Alunos', description: 'Pode gerenciar alunos' },
      { id: 'school.manage_teachers', name: 'Gerenciar Professores', description: 'Pode gerenciar professores' },
      { id: 'school.manage_classes', name: 'Gerenciar Turmas', description: 'Pode gerenciar turmas' },
      { id: 'school.receive_payments', name: 'Receber Mensalidades', description: 'Pode processar mensalidades' }
    ],
    bar: [
      { id: 'bar.view', name: 'Visualizar Bar', description: 'Pode ver informações do bar' },
      { id: 'bar.manage_products', name: 'Gerenciar Produtos', description: 'Pode gerenciar produtos' },
      { id: 'bar.manage_stock', name: 'Gerenciar Estoque', description: 'Pode gerenciar estoque' },
      { id: 'bar.manage_comandas', name: 'Gerenciar Comandas', description: 'Pode gerenciar comandas' },
      { id: 'bar.cashier', name: 'Operador de Caixa', description: 'Pode operar o caixa' }
    ],
    financial: [
      { id: 'financial.view', name: 'Visualizar Financeiro', description: 'Pode ver informações financeiras' },
      { id: 'financial.manage_receivables', name: 'Gerenciar Recebíveis', description: 'Pode gerenciar contas a receber' },
      { id: 'financial.manage_payables', name: 'Gerenciar Pagáveis', description: 'Pode gerenciar contas a pagar' },
      { id: 'financial.view_reports', name: 'Ver Relatórios', description: 'Pode visualizar relatórios financeiros' }
    ],
    general: [
      { id: 'general.view_dashboard', name: 'Ver Dashboard', description: 'Pode acessar o dashboard principal' },
      { id: 'general.manage_settings', name: 'Gerenciar Configurações', description: 'Pode alterar configurações do sistema' },
      { id: 'general.manage_users', name: 'Gerenciar Usuários', description: 'Pode gerenciar usuários do sistema' }
    ]
  };

  const users = [
    { 
      id: 1, 
      name: 'João Silva', 
      email: 'joao@empresa.com', 
      role: 'admin',
      status: 'ativo',
      lastAccess: '2024-01-15',
      permissions: ['events.view', 'events.create', 'school.view', 'bar.view', 'financial.view', 'general.view_dashboard']
    },
    { 
      id: 2, 
      name: 'Maria Santos', 
      email: 'maria@empresa.com', 
      role: 'manager',
      status: 'ativo',
      lastAccess: '2024-01-14',
      permissions: ['events.view', 'events.create', 'school.view', 'bar.view']
    },
    { 
      id: 3, 
      name: 'Pedro Costa', 
      email: 'pedro@empresa.com', 
      role: 'employee',
      status: 'inativo',
      lastAccess: '2024-01-10',
      permissions: ['bar.view', 'bar.cashier']
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pagination = usePagination(filteredUsers, {
    pageSize: 5,
    totalItems: filteredUsers.length
  });

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'manager':
        return 'Gerente';
      case 'employee':
        return 'Funcionário';
      default:
        return role;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-200 text-green-800';
      case 'inativo':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setUserModalMode('create');
    setUserModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setUserModalMode('edit');
    setUserModalOpen(true);
  };

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-background shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/painel')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <h1 className="text-xl font-semibold">Configurações do Sistema</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="company" className="gap-2">
              <Building2 className="h-4 w-4" />
              Empresa
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              Aparência
            </TabsTrigger>
            <TabsTrigger value="modules" className="gap-2">
              <Shield className="h-4 w-4" />
              Módulos
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Clock className="h-4 w-4" />
              Eventos
            </TabsTrigger>
            <TabsTrigger value="bar" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Bar
            </TabsTrigger>
            <TabsTrigger value="school" className="gap-2">
              <Building2 className="h-4 w-4" />
              Escolinha
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
          </TabsList>

          {/* Configurações da Empresa */}
          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>
                  Configure as informações básicas da sua empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Select value={settings.currency} onValueChange={(value) => setSettings({ ...settings, currency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">Real (R$)</SelectItem>
                        <SelectItem value="USD">Dólar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
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

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-4">Horário de Funcionamento</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessStart">Abertura</Label>
                      <Input
                        id="businessStart"
                        type="time"
                        value={settings.businessStart}
                        onChange={(e) => setSettings({ ...settings, businessStart: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessEnd">Fechamento</Label>
                      <Input
                        id="businessEnd"
                        type="time"
                        value={settings.businessEnd}
                        onChange={(e) => setSettings({ ...settings, businessEnd: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aparência do Sistema</CardTitle>
                <CardDescription>
                  Personalize a aparência da interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme">Tema da Interface</Label>
                    <Select value={theme} onValueChange={(value: 'light' | 'dark') => setTheme(value)}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Tema Claro</SelectItem>
                        <SelectItem value="dark">Tema Escuro</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">
                      Escolha entre o tema claro ou escuro para a interface
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Módulos Disponíveis</CardTitle>
                <CardDescription>
                  Ative ou desative os módulos que sua empresa utiliza
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Módulo de Gestão de Eventos</div>
                    <div className="text-sm text-muted-foreground">
                      Reservas esportivas, agendas e controle de locais
                    </div>
                  </div>
                  <Switch
                    checked={settings.eventsModule}
                    onCheckedChange={(checked) => setSettings({ ...settings, eventsModule: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Módulo de Gestão de Bar</div>
                    <div className="text-sm text-muted-foreground">
                      Controle de estoque, comandas e caixa
                    </div>
                  </div>
                  <Switch
                    checked={settings.barModule}
                    onCheckedChange={(checked) => setSettings({ ...settings, barModule: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Módulo de Gestão Escolar</div>
                    <div className="text-sm text-muted-foreground">
                      Controle de alunos, turmas e notas
                    </div>
                  </div>
                  <Switch
                    checked={settings.schoolModule}
                    onCheckedChange={(checked) => setSettings({ ...settings, schoolModule: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Módulo Financeiro</div>
                    <div className="text-sm text-muted-foreground">
                      Controle de contas a pagar/receber e fluxo de caixa
                    </div>
                  </div>
                  <Switch
                    checked={settings.financialModule}
                    onCheckedChange={(checked) => setSettings({ ...settings, financialModule: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Eventos</CardTitle>
                <CardDescription>
                  Configure como o módulo de eventos funciona
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Confirmar Reservas Automaticamente</div>
                    <div className="text-sm text-muted-foreground">
                      Reservas são confirmadas automaticamente sem aprovação manual
                    </div>
                  </div>
                  <Switch
                    checked={settings.autoConfirmReservations}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoConfirmReservations: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Permitir Reservas Recorrentes</div>
                    <div className="text-sm text-muted-foreground">
                      Clientes podem criar reservas que se repetem automaticamente
                    </div>
                  </div>
                  <Switch
                    checked={settings.allowRecurringReservations}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowRecurringReservations: checked })}
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-lg font-medium mb-4">Horários Nobre</h4>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <div className="font-medium">Ativar Horários Nobre</div>
                      <div className="text-sm text-muted-foreground">
                        Define preços diferenciados para horários de maior demanda
                      </div>
                    </div>
                    <Switch
                      checked={settings.enablePeakHours}
                      onCheckedChange={(checked) => setSettings({ ...settings, enablePeakHours: checked })}
                    />
                  </div>

                  {settings.enablePeakHours && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="peakHourStart">Início do Horário Nobre</Label>
                        <Input
                          id="peakHourStart"
                          type="time"
                          value={settings.peakHourStart}
                          onChange={(e) => setSettings({ ...settings, peakHourStart: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="peakHourEnd">Fim do Horário Nobre</Label>
                        <Input
                          id="peakHourEnd"
                          type="time"
                          value={settings.peakHourEnd}
                          onChange={(e) => setSettings({ ...settings, peakHourEnd: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="peakHourMultiplier">Multiplicador de Preço</Label>
                        <Input
                          id="peakHourMultiplier"
                          type="number"
                          step="0.1"
                          min="1"
                          value={settings.peakHourMultiplier}
                          onChange={(e) => setSettings({ ...settings, peakHourMultiplier: parseFloat(e.target.value) })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Ex: 1.5 = 50% mais caro no horário nobre
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Bar</CardTitle>
                <CardDescription>
                  Configure como o módulo de bar funciona
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Permitir Estoque Negativo</div>
                    <div className="text-sm text-muted-foreground">
                      Permite vender produtos mesmo com estoque zerado
                    </div>
                  </div>
                  <Switch
                    checked={settings.allowNegativeStock}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowNegativeStock: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Alertas de Estoque</div>
                    <div className="text-sm text-muted-foreground">
                      Receba notificações quando produtos estiverem em baixa
                    </div>
                  </div>
                  <Switch
                    checked={settings.stockAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, stockAlerts: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stockThreshold">Limite para Alerta de Estoque Baixo</Label>
                  <Input
                    id="stockThreshold"
                    type="number"
                    value={settings.lowStockThreshold}
                    onChange={(e) => setSettings({ ...settings, lowStockThreshold: parseInt(e.target.value) })}
                    className="w-32"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Sistema de Comandas</div>
                    <div className="text-sm text-muted-foreground">
                      Habilitar sistema de comandas digitais
                    </div>
                  </div>
                  <Switch
                    checked={settings.enableComandas}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableComandas: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários e Permissões</CardTitle>
                <CardDescription>
                  Gerencie usuários e configure permissões específicas para cada módulo
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Actions and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar por nome, email ou função..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    onClick={handleCreateUser}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Novo Usuário
                  </Button>
                </div>

                {/* Users Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Permissões</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Último Acesso</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagination.paginatedData.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>{getRoleLabel(user.role)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.permissions.slice(0, 3).map((permission) => (
                              <span key={permission} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {permission.split('.')[1]}
                              </span>
                            ))}
                            {user.permissions.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{user.permissions.length - 3} mais
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.lastAccess}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                              className="gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              Editar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Paginação */}
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalItems={pagination.totalItems}
                  pageSize={pagination.pageSize}
                  startIndex={pagination.startIndex}
                  endIndex={pagination.endIndex}
                  hasNextPage={pagination.hasNextPage}
                  hasPreviousPage={pagination.hasPreviousPage}
                  onPageChange={pagination.goToPage}
                  onPageSizeChange={pagination.setPageSize}
                  pageSizeOptions={[5, 10, 15]}
                />
              </CardContent>
            </Card>

            {/* Permissions Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Permissões Disponíveis por Módulo</CardTitle>
                <CardDescription>
                  Visualize todas as permissões disponíveis no sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(availablePermissions).map(([module, permissions]) => (
                  <div key={module} className="space-y-3">
                    <h4 className="font-medium capitalize">{module === 'events' ? 'Eventos' : module === 'school' ? 'Escolinha' : module === 'bar' ? 'Bar' : module === 'financial' ? 'Financeiro' : 'Geral'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="border rounded-lg p-3">
                          <div className="font-medium text-sm">{permission.name}</div>
                          <div className="text-xs text-muted-foreground">{permission.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ... keep existing code (other tabs) */}
        </Tabs>

        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline" onClick={() => navigate('/painel')}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Salvar Configurações
          </Button>
        </div>
      </main>

      {/* User Modal */}
      <UserModal
        open={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        user={selectedUser}
        mode={userModalMode}
      />
    </div>
  );
};

export default Settings;
