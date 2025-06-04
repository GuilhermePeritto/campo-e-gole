
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface ReceivableFormData {
  client: string;
  description: string;
  amount: number;
  dueDate: string;
  status: string;
}

const EditReceivable = () => {
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

  const form = useForm<ReceivableFormData>({
    defaultValues: {
      client: receivableData.client,
      description: receivableData.description,
      amount: receivableData.amount,
      dueDate: receivableData.dueDate,
      status: receivableData.status
    }
  });

  const onSubmit = async (data: ReceivableFormData) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Conta a receber editada:', data);
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
              <CreditCard className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-black">Editar Conta a Receber</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Editar Conta a Receber</CardTitle>
            <CardDescription>
              Atualize as informações da conta a receber
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
                        <FormLabel className="text-black">Cliente</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nome do cliente"
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
                    name="amount"
                    rules={{ 
                      required: 'Valor é obrigatório',
                      min: { value: 0.01, message: 'Valor deve ser maior que zero' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Valor (R$)</FormLabel>
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
                  name="description"
                  rules={{ required: 'Descrição é obrigatória' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Descrição</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Descrição da conta (ex: Reserva Quadra A - 10/06)"
                          className="border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="dueDate"
                    rules={{ required: 'Data de vencimento é obrigatória' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Data de Vencimento</FormLabel>
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
                    name="status"
                    rules={{ required: 'Status é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-black">
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pendente">Pendente</SelectItem>
                            <SelectItem value="pago">Pago</SelectItem>
                            <SelectItem value="vencido">Vencido</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                  >
                    {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
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

export default EditReceivable;
