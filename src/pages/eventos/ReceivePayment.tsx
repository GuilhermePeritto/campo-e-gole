
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUniversalPayment } from '@/hooks/useUniversalPayment';

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
      navigate('/eventos/contas-a-receber');
    }
  }, [id, navigateToPayment, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Redirecionando para o sistema de pagamento...</p>
        <Button
          variant="outline"
          onClick={() => navigate('/eventos/contas-a-receber')}
          className="mt-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Contas a Receber
        </Button>
      </div>
    </div>
  );
};

export default ReceberPagamento;
