
import BranchesList from '@/components/BranchesList';
import CompanySettings from '@/components/CompanySettings';
import GroupsList from '@/components/GroupsList';
import ModuleHeader from '@/components/ModuleHeader';
import SystemSettings from '@/components/SystemSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UsersList from '@/components/UsersList';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Building, Database, Globe, MapPin, Settings as SettingsIcon, Shield, Users } from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Configurações"
        icon={<SettingsIcon className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/painel"
        backLabel="Inicio"
      />

      <main className="container mx-auto p-6">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="groups" className="gap-2">
              <Shield className="h-4 w-4" />
              Grupos
            </TabsTrigger>
            <TabsTrigger value="company" className="gap-2">
              <Building className="h-4 w-4" />
              Empresa
            </TabsTrigger>
            <TabsTrigger value="branches" className="gap-2">
              <MapPin className="h-4 w-4" />
              Filiais
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

          <TabsContent value="company">
            <CompanySettings />
          </TabsContent>

          <TabsContent value="branches">
            <BranchesList />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <SystemSettings />
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
