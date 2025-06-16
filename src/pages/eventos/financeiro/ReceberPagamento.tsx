import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCheck, CreditCard, DollarSign, User } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';

interface PaymentMethod {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const ReceberPagamento = () => {
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState({
    client: 'João Silva',
    amount: '150,00',
    paymentMethod: 'credit-card',
    notes: ''
  });

  const paymentMethods: PaymentMethod[] = [
    { id: 'credit-card', label: 'Cartão de Crédito', icon: <CreditCard className="h-4 w-4 mr-2" /> },
    { id: 'debit-card', label: 'Cartão de Débito', icon: <CreditCard className="h-4 w-4 mr-2" /> },
    { id: 'money', label: 'Dinheiro', icon: <DollarSign className="h-4 w-4 mr-2" /> },
    { id: 'pix', label: 'PIX', icon: <CheckCheck className="h-4 w-4 mr-2" /> }
  ];

  const tourSteps: TourStep[] = [
    {
      target: '#client',
      title: 'Cliente',
      content: 'Confirme o nome do cliente que está efetuando o pagamento.'
    },
    {
      target: '#amount',
      title: 'Valor',
      content: 'Insira o valor exato que está sendo pago.'
    },
    {
      target: '#paymentMethod',
      title: 'Método de Pagamento',
      content: 'Selecione o método de pagamento utilizado pelo cliente.'
    },
    {
      target: '#notes',
      title: 'Observações',
      content: 'Adicione quaisquer observações relevantes sobre o pagamento.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Informações de pagamento:', paymentInfo);
    navigate('/eventos/contas-a-receber');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [id]: value }));
  };

  return (
    <BaseFormPage
      title="Receber Pagamento"
      description="Registre o pagamento de uma conta a receber"
      icon={<CreditCard className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/contas-a-receber"
      backLabel="Contas a Receber"
      onSubmit={handleSubmit}
      submitLabel="Confirmar Pagamento"
      tourSteps={tourSteps}
      tourTitle="Receber Pagamento"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Detalhes do Pagamento</h3>
        </div>

        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Informações do Cliente</CardTitle>
            <CardDescription>Confirme os detalhes do cliente e o valor a ser pago.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4">
              <User className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <div>
                <Label htmlFor="client" className="text-sm font-medium">Cliente</Label>
                <Input
                  type="text"
                  id="client"
                  className="w-full"
                  value={paymentInfo.client}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>

            <div>
              <Label htmlFor="amount" className="text-sm font-medium">Valor a Receber</Label>
              <Input
                type="text"
                id="amount"
                className="w-full"
                value={paymentInfo.amount}
                onChange={handleChange}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Método de Pagamento</CardTitle>
            <CardDescription>Selecione o método de pagamento utilizado pelo cliente.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map(method => (
                <Button
                  key={method.id}
                  variant="outline"
                  className={`justify-start ${paymentInfo.paymentMethod === method.id ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : ''}`}
                  onClick={() => setPaymentInfo(prev => ({ ...prev, paymentMethod: method.id }))}
                >
                  {method.icon}
                  {method.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium">Observações</Label>
          <Input
            type="text"
            id="notes"
            placeholder="Adicione notas sobre o pagamento (opcional)"
            className="h-11"
            value={paymentInfo.notes}
            onChange={handleChange}
          />
        </div>
      </div>
    </BaseFormPage>
  );
};

export default ReceberPagamento;
