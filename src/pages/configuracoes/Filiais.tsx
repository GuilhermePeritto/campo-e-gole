
import ModuleHeader from '@/components/ModuleHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { MapPin } from 'lucide-react';

const ConfiguracoesFiliais = () => {
  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Gestão de Filiais"
        icon={<MapPin className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestão de Filiais</CardTitle>
            <CardDescription>
              Página em desenvolvimento - funcionalidade será implementada em breve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">
              A gestão completa de filiais será implementada em breve.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ConfiguracoesFiliais;
