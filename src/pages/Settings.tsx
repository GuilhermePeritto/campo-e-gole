
import ModuleHeader from '@/components/ModuleHeader';
import UsersList from '@/components/UsersList';
import GroupsList from '@/components/GroupsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Settings as SettingsIcon, Users, Shield, Database, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Configurações"
        icon={<SettingsIcon className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.dashboard}
        mustReturn={true}
        backTo="/painel"
        backLabel="Dashboard"
      />

      <main className="container mx-auto p-6">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="groups" className="gap-2">
              <Shield className="h-4 w-4" />
              Grupos
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2">
              <Database className="h-4 w-4" />
              Sistema
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <Globe className="h-4 w-4" />
              Integrações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersList />
          </TabsContent>

          <TabsContent value="groups">
            <GroupsList />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>Configurações gerais da aplicação</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Configurações do sistema em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
                <CardDescription>Configure integrações com serviços externos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Integrações em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
