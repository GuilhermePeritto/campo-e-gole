
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface PaymentFormData {
  paymentDate: string;
  paymentMethod: string;
  receivedAmount: number;
  notes: string;
}

const ReceivePayment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - in real app, fetch from API
  const receivableData = {
    id: 1,
    client: 'João Silva',
    description: 'Reserva Quadra A - 08/06',
    amount: 150,
    dueDate: '2024-06-10',
    status: 'pendente'
  };

  const form = useForm<PaymentFormData>({
    defaultValues: {
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      receivedAmount: receivableData.amount,
      notes: ''
    }
  });

  const onSubmit = async (data: PaymentFormData) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Pagamento recebido:', data);
      setIsSubmitting(false);
      navigate('/events/receivables');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/events/receivables')}
              className="gap-2 text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Contas a Receber
            </Button>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-black">Receber Pagamento</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Receivable Info */}
        <Card className="border-black mb-6">
          <CardHeader>
            <CardTitle className="text-black">Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-black">Cliente</h3>
                <p className="text-gray-600">{receivableData.client}</p>
              </div>
              <div>
                <h3 className="font-semibold text-black">Valor</h3>
                <p className="text-gray-600">R$ {receivableData.amount.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-black">Vencimento</h3>
                <p className="text-gray-600">{receivableData.dueDate}</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-semibold text-black">Descrição</h3>
                <p className="text-gray-600">{receivableData.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Registrar Pagamento</CardTitle>
            <CardDescription>
              Confirme o recebimento do pagamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="paymentDate"
                    rules={{ required: 'Data do pagamento é obrigatória' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Data do Pagamento</FormLabel>
                        <FormControl>
                          <Input 
                            type="date"
                            className="border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    rules={{ required: 'Forma de pagamento é obrigatória' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Forma de Pagamento</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-black">
                              <SelectValue placeholder="Selecione a forma de pagamento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dinheiro">Dinheiro</SelectItem>
                            <SelectItem value="pix">PIX</SelectItem>
                            <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                            <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                            <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="receivedAmount"
                    rules={{ 
                      required: 'Valor recebido é obrigatório',
                      min: { value: 0.01, message: 'Valor deve ser maior que zero' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Valor Recebido (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            className="border-black"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Observações (opcional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Observações sobre o pagamento"
                          className="border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-black text-black hover:bg-black hover:text-white"
                    onClick={() => navigate('/events/receivables')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 text-white hover:bg-green-700"
                  >
                    {isSubmitting ? 'Confirmando...' : 'Confirmar Recebimento'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReceivePayment;
