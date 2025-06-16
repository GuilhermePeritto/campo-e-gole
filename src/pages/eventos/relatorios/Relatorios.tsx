import { BarChart3 } from 'lucide-react';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

const Relatorios = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ModuleHeader
        title="Relatórios"
        icon={<BarChart3 className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Página de Relatórios
        </h2>
        <p className="text-muted-foreground">
          Em construção: Aqui você poderá gerar e visualizar relatórios detalhados sobre eventos.
        </p>
      </main>
    </div>
  );
};

export default Relatorios;
