
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConfiguracoesUsuarios = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Gestão de Usuários"
        icon={<Users className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Usuários do Sistema</h1>
            <p className="text-muted-foreground">
              Gerencie usuários, permissões e acessos
            </p>
          </div>
          <Button onClick={() => navigate('/configuracoes/usuarios/novo')} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Usuário
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
            <CardDescription>
              Página em desenvolvimento - funcionalidade será implementada em breve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">
              A gestão completa de usuários será implementada em breve.
              <br />
              Por enquanto, utilize as páginas de criação e edição existentes.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ConfiguracoesUsuarios;
