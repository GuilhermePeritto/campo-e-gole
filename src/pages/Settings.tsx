
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Building2, Palette, Shield, Users, GraduationCap, Calendar, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const navigate = useNavigate();
  const { company } = useAuth();
  const [settings, setSettings] = useState({
    companyName: company?.name || '',
    currency: company?.settings.currency || 'BRL',
    timezone: company?.settings.timezone || 'America/Sao_Paulo',
    businessStart: company?.settings.businessHours.start || '06:00',
    businessEnd: company?.settings.businessHours.end || '23:00',
    eventsModule: company?.modules.includes('events') || false,
    barModule: company?.modules.includes('bar') || false,
    schoolModule: company?.modules.includes('school') || false,
    autoConfirmReservations: true,
    allowRecurringReservations: true,
    requireClientApproval: false,
    stockAlerts: true,
    lowStockThreshold: 10,
    printReceipts: true,
    enableComandas: true,
    autoGeneratePayments: true,
    paymentReminderDays: 3,
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
              onClick={() => navigate('/dashboard')}
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
          <TabsList className="grid w-full grid-cols-6">
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
              <Calendar className="h-4 w-4" />
              Eventos
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
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Input
                      id="currency"
                      value={settings.currency}
                      onChange={(e) => setSettings({...settings, currency: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Input
                      id="timezone"
                      value={settings.timezone}
                      onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Aparência */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Aparência</CardTitle>
                <CardDescription>
                  Personalize a aparência do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Configurações de tema em desenvolvimento...</p>
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
                    <div className="font-medium">Módulo da Escolinha de Futebol</div>
                    <div className="text-sm text-gray-500">
                      Gestão de alunos, turmas, mensalidades e relatórios
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
                      Reservas são confirmadas automaticamente ao serem criadas
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
                      Clientes podem criar reservas que se repetem semanalmente
                    </div>
                  </div>
                  <Switch
                    checked={settings.allowRecurringReservations}
                    onCheckedChange={(checked) => setSettings({...settings, allowRecurringReservations: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações da Escolinha */}
          <TabsContent value="school" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Escolinha</CardTitle>
                <CardDescription>
                  Configure como o módulo da escolinha funciona
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Gerar Mensalidades Automaticamente</div>
                    <div className="text-sm text-gray-500">
                      Mensalidades são geradas automaticamente todo mês
                    </div>
                  </div>
                  <Switch
                    checked={settings.autoGeneratePayments}
                    onCheckedChange={(checked) => setSettings({...settings, autoGeneratePayments: checked})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentReminder">Dias de Antecedência para Lembrete</Label>
                  <Input
                    id="paymentReminder"
                    type="number"
                    value={settings.paymentReminderDays}
                    onChange={(e) => setSettings({...settings, paymentReminderDays: parseInt(e.target.value)})}
                    className="w-32"
                  />
                  <p className="text-sm text-gray-500">
                    Quantos dias antes do vencimento enviar lembrete
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Relatórios de Progresso dos Alunos</div>
                    <div className="text-sm text-gray-500">
                      Habilitar sistema de avaliação e progresso dos alunos
                    </div>
                  </div>
                  <Switch
                    checked={settings.enableProgressReports}
                    onCheckedChange={(checked) => setSettings({...settings, enableProgressReports: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Usuários */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Usuários</CardTitle>
                <CardDescription>
                  Gerencie usuários e permissões do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Configurações de usuários em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
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
