
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useUniversalPayment } from '@/hooks/useUniversalPayment';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReceberPagamento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { navigateToPayment } = useUniversalPayment();

  useEffect(() => {
    // Redirecionar imediatamente para o sistema universal
    if (id) {
      navigateToPayment({
        type: 'event_receivable',
        id: id
      });
    } else {
      navigate('/eventos/recebiveis');
    }
  }, [id, navigateToPayment, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Receber Pagamento"
        icon={<CreditCard className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos/recebiveis"
        backLabel="Contas a Receber"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Redirecionando para o sistema de pagamento...</p>
            <Button
              variant="outline"
              onClick={() => navigate('/eventos/recebiveis')}
              className="mt-4 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Contas a Receber
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReceberPagamento;
