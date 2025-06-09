
import { useNavigate } from 'react-router-dom';

export interface UseUniversalPaymentParams {
  type: 'school_payment' | 'event_receivable' | 'bar_comanda' | 'bar_sale' | 'financial_receivable';
  id: string;
}

export const useUniversalPayment = () => {
  const navigate = useNavigate();

  const navigateToPayment = ({ type, id }: UseUniversalPaymentParams) => {
    const params = new URLSearchParams({
      type,
      id
    });
    navigate(`/pagamento-universal?${params.toString()}`);
  };

  return { navigateToPayment };
};
