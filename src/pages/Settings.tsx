import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Building2, Clock, DollarSign, Palette, Shield, Users, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const navigate = useNavigate();
  const { company, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    companyName: company?.name || '',
    currency: company?.settings.currency || 'BRL',
    timezone: company?.settings.timezone || 'America/Sao_Paulo',
    businessStart: company?.settings.businessHours.start || '06:00',
    businessEnd: company?.settings.businessHours.end || '23:00',
    eventsModule: company?.modules.includes('events') || false,
    barModule: company?.modules.includes('bar') || false,
    schoolModule: company?.modules.includes('school') || true,
    autoConfirmReservations: true,
    allowRecurringReservations: true,
    requireClientApproval: false,
    stockAlerts: true,
    lowStockThreshold: 10,
    printReceipts: true,
    enableComandas: true,
    // School settings
    monthlyFee: 150,
    autoGenerateMonthlyFees: true,
    sendPaymentReminders: true,
    reminderDaysBefore: 5,
    allowMultipleClasses: true,
    requireMedicalCertificate: false,
    enableAttendanceControl: true,
    maxStudentsPerClass: 20,
    enableProgressReports: true
  });

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
              <GraduationCap className="h-4 w-4" />
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
                      onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Select value={settings.currency} onValueChange={(value) => setSettings({...settings, currency: value})}>
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
                    <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
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
                        onChange={(e) => setSettings({...settings, businessStart: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessEnd">Fechamento</Label>
                      <Input
                        id="businessEnd"
                        type="time"
                        value={settings.businessEnd}
                        onChange={(e) => setSettings({...settings, businessEnd: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Aparência */}
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
                    <p className="text-sm text-gray-500 mt-1">
                      Escolha entre o tema claro ou escuro para a interface
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Módulos */}
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
                    <div className="text-sm text-gray-500">
                      Reservas esportivas, agendas e controle de locais
                    </div>
                  </div>
                  <Switch
                    checked={settings.eventsModule}
                    onCheckedChange={(checked) => setSettings({...settings, eventsModule: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Módulo de Gestão de Bar</div>
                    <div className="text-sm text-gray-500">
                      Controle de estoque, comandas e caixa
                    </div>
                  </div>
                  <Switch
                    checked={settings.barModule}
                    onCheckedChange={(checked) => setSettings({...settings, barModule: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Módulo de Escolinha de Futebol</div>
                    <div className="text-sm text-gray-500">
                      Gestão de alunos, turmas, mensalidades e relatórios pedagógicos
                    </div>
                  </div>
                  <Switch
                    checked={settings.schoolModule}
                    onCheckedChange={(checked) => setSettings({...settings, schoolModule: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Eventos */}
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
                    <div className="text-sm text-gray-500">
                      Reservas são confirmadas automaticamente sem aprovação manual
                    </div>
                  </div>
                  <Switch
                    checked={settings.autoConfirmReservations}
                    onCheckedChange={(checked) => setSettings({...settings, autoConfirmReservations: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Permitir Reservas Recorrentes</div>
                    <div className="text-sm text-gray-500">
                      Clientes podem criar reservas que se repetem automaticamente
                    </div>
                  </div>
                  <Switch
                    checked={settings.allowRecurringReservations}
                    onCheckedChange={(checked) => setSettings({...settings, allowRecurringReservations: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Exigir Aprovação do Cliente</div>
                    <div className="text-sm text-gray-500">
                      Cliente deve confirmar reserva por email/SMS
                    </div>
                  </div>
                  <Switch
                    checked={settings.requireClientApproval}
                    onCheckedChange={(checked) => setSettings({...settings, requireClientApproval: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações do Bar */}
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
                    <div className="font-medium">Alertas de Estoque</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações quando produtos estiverem em baixa
                    </div>
                  </div>
                  <Switch
                    checked={settings.stockAlerts}
                    onCheckedChange={(checked) => setSettings({...settings, stockAlerts: checked})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stockThreshold">Limite para Alerta de Estoque Baixo</Label>
                  <Input
                    id="stockThreshold"
                    type="number"
                    value={settings.lowStockThreshold}
                    onChange={(e) => setSettings({...settings, lowStockThreshold: parseInt(e.target.value)})}
                    className="w-32"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Imprimir Comprovantes</div>
                    <div className="text-sm text-gray-500">
                      Imprimir automaticamente comprovantes de venda
                    </div>
                  </div>
                  <Switch
                    checked={settings.printReceipts}
                    onCheckedChange={(checked) => setSettings({...settings, printReceipts: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Sistema de Comandas</div>
                    <div className="text-sm text-gray-500">
                      Habilitar sistema de comandas digitais
                    </div>
                  </div>
                  <Switch
                    checked={settings.enableComandas}
                    onCheckedChange={(checked) => setSettings({...settings, enableComandas: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nova Tab - Configurações da Escolinha */}
          <TabsContent value="school" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Escolinha</CardTitle>
                <CardDescription>
                  Configure como o módulo de escolinha funciona
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyFee">Valor da Mensalidade Padrão (R$)</Label>
                    <Input
                      id="monthlyFee"
                      type="number"
                      step="0.01"
                      value={settings.monthlyFee}
                      onChange={(e) => setSettings({...settings, monthlyFee: parseFloat(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxStudentsPerClass">Máximo de Alunos por Turma</Label>
                    <Input
                      id="maxStudentsPerClass"
                      type="number"
                      value={settings.maxStudentsPerClass}
                      onChange={(e) => setSettings({...settings, maxStudentsPerClass: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reminderDaysBefore">Lembrete de Pagamento (dias antes)</Label>
                    <Input
                      id="reminderDaysBefore"
                      type="number"
                      value={settings.reminderDaysBefore}
                      onChange={(e) => setSettings({...settings, reminderDaysBefore: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Gerar Mensalidades Automaticamente</div>
                      <div className="text-sm text-gray-500">
                        Cria automaticamente as mensalidades do mês para todos os alunos
                      </div>
                    </div>
                    <Switch
                      checked={settings.autoGenerateMonthlyFees}
                      onCheckedChange={(checked) => setSettings({...settings, autoGenerateMonthlyFees: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Enviar Lembretes de Pagamento</div>
                      <div className="text-sm text-gray-500">
                        Envia notificações automáticas sobre vencimento de mensalidades
                      </div>
                    </div>
                    <Switch
                      checked={settings.sendPaymentReminders}
                      onCheckedChange={(checked) => setSettings({...settings, sendPaymentReminders: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Permitir Múltiplas Turmas</div>
                      <div className="text-sm text-gray-500">
                        Aluno pode participar de mais de uma turma simultaneamente
                      </div>
                    </div>
                    <Switch
                      checked={settings.allowMultipleClasses}
                      onCheckedChange={(checked) => setSettings({...settings, allowMultipleClasses: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Exigir Atestado Médico</div>
                      <div className="text-sm text-gray-500">
                        Obrigatório apresentar atestado médico para matrícula
                      </div>
                    </div>
                    <Switch
                      checked={settings.requireMedicalCertificate}
                      onCheckedChange={(checked) => setSettings({...settings, requireMedicalCertificate: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Controle de Presença</div>
                      <div className="text-sm text-gray-500">
                        Habilitar sistema de controle de frequência dos alunos
                      </div>
                    </div>
                    <Switch
                      checked={settings.enableAttendanceControl}
                      onCheckedChange={(checked) => setSettings({...settings, enableAttendanceControl: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Relatórios de Progresso</div>
                      <div className="text-sm text-gray-500">
                        Gerar relatórios pedagógicos sobre evolução dos alunos
                      </div>
                    </div>
                    <Switch
                      checked={settings.enableProgressReports}
                      onCheckedChange={(checked) => setSettings({...settings, enableProgressReports: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Usuários */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>
                  Gerencie usuários e suas permissões no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block mt-1">
                        {user?.role === 'admin' ? 'Administrador' : user?.role}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                  
                  <Button className="w-full">
                    Adicionar Novo Usuário
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
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
    </div>
  );
};

export default Settings;
