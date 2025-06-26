
import ModuleHeader from '@/components/ModuleHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { History } from 'lucide-react';

const ConfiguracoesAuditoria = () => {
  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Auditoria e Logs"
        icon={<History className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Auditoria e Logs do Sistema</CardTitle>
            <CardDescription>
              Página em desenvolvimento - funcionalidade será implementada em breve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">
              O sistema de auditoria será implementado em breve.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ConfiguracoesAuditoria;
