import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PageTour, { TourStep } from '@/components/PageTour';

interface ReceivableFormData {
  client: string;
  description: string;
  amount: number;
  dueDate: string;
}

const NewReceivable = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tourSteps: TourStep[] = [
    {
      target: '[name="client"]',
      title: 'Cliente',
      content: 'Digite o nome do cliente que será responsável por esta conta a receber.'
    },
    {
      target: '[name="amount"]',
      title: 'Valor',
      content: 'Insira o valor total da conta a receber em reais.'
    },
    {
      target: '[name="description"]',
      title: 'Descrição',
      content: 'Descreva detalhadamente o motivo desta conta a receber (ex: Reserva Quadra A).'
    },
    {
      target: '[name="dueDate"]',
      title: 'Data de Vencimento',
      content: 'Selecione a data limite para pagamento desta conta.'
    }
  ];

  const form = useForm<ReceivableFormData>({
    defaultValues: {
      client: '',
      description: '',
      amount: 0,
      dueDate: ''
    }
  });

  const onSubmit = async (data: ReceivableFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Nova conta a receber:', data);
      setIsSubmitting(false);
      navigate('/eventos/contas-a-receber');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-gray-600 dark:text-gray-300">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/eventos/contas-a-receber')}
              className="gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Contas a Receber
            </Button>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Novo Recebível</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border relative">
          <PageTour steps={tourSteps} title="Criação de Novo Recebível" />
          
          <CardHeader>
            <CardTitle className="text-gray-600 dark:text-gray-300">Criar Novo Recebível</CardTitle>
            <CardDescription>
              Adicione um novo recebível manualmente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="client"
                    rules={{ required: 'Nome do cliente é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Cliente</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nome do cliente"
                            className="border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    rules={{ 
                      required: 'Valor é obrigatório',
                      min: { value: 0.01, message: 'Valor deve ser maior que zero' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Valor (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            className="border"
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
                  name="description"
                  rules={{ required: 'Descrição é obrigatória' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 dark:text-gray-300">Descrição</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Descrição da conta (ex: Reserva Quadra A - 10/06)"
                          className="border"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  rules={{ required: 'Data de vencimento é obrigatória' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 dark:text-gray-300">Data de Vencimento</FormLabel>
                      <FormControl>
                        <Input 
                          type="date"
                          className="border"
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
                    className="flex-1 border text-gray-600 dark:text-gray-300 hover:bg-black hover:text-gray-600 dark:text-gray-300"
                    onClick={() => navigate('/eventos/contas-a-receber')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-black text-gray-600 dark:text-gray-300 hover:bg-gray-800"
                  >
                    {isSubmitting ? 'Salvando...' : 'Salvar Recebível'}
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

export default NewReceivable;
