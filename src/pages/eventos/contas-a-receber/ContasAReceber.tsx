
import { CreditCard } from 'lucide-react';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

const ContasAReceber = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ModuleHeader
        title="Contas a Receber"
        icon={<CreditCard className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Contas a Receber
        </h2>
        <p className="text-muted-foreground">
          Gerencie as contas a receber do módulo de eventos.
        </p>
      </main>
    </div>
  );
};

export default ContasAReceber;
