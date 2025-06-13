
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PageTour, { TourStep } from '@/components/PageTour';

interface EventFormData {
  title: string;
  client: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  amount: number;
  description: string;
  status: string;
}

const NewEvent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tourSteps: TourStep[] = [
    {
      target: '[name="title"]',
      title: 'Título do Evento',
      content: 'Digite um nome descritivo para o evento (ex: Aniversário João Silva).'
    },
    {
      target: '[name="client"]',
      title: 'Cliente',
      content: 'Digite o nome do cliente responsável pelo evento.'
    },
    {
      target: '[name="venue"]',
      title: 'Local',
      content: 'Selecione ou digite o local onde o evento será realizado.'
    },
    {
      target: '[name="date"]',
      title: 'Data do Evento',
      content: 'Selecione a data em que o evento será realizado.'
    },
    {
      target: '[name="startTime"]',
      title: 'Horário de Início',
      content: 'Defina o horário de início do evento.'
    },
    {
      target: '[name="endTime"]',
      title: 'Horário de Término',
      content: 'Defina o horário de término do evento.'
    },
    {
      target: '[name="amount"]',
      title: 'Valor',
      content: 'Insira o valor total do evento em reais.'
    },
    {
      target: '[name="description"]',
      title: 'Descrição',
      content: 'Adicione detalhes importantes sobre o evento.'
    }
  ];

  const form = useForm<EventFormData>({
    defaultValues: {
      title: '',
      client: '',
      venue: '',
      date: '',
      startTime: '',
      endTime: '',
      amount: 0,
      description: '',
      status: 'confirmado'
    }
  });

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Novo evento:', data);
      setIsSubmitting(false);
      navigate('/eventos/calendario');
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
              onClick={() => navigate('/eventos/calendario')}
              className="gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Calendário
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Novo Evento</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border relative">
          <PageTour steps={tourSteps} title="Criação de Novo Evento" />
          
          <CardHeader>
            <CardTitle className="text-gray-600 dark:text-gray-300">Criar Novo Evento</CardTitle>
            <CardDescription>
              Preencha as informações do evento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    rules={{ required: 'Título do evento é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Título do Evento</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Aniversário João Silva"
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
                    name="venue"
                    rules={{ required: 'Local é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Local</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="border">
                              <SelectValue placeholder="Selecionar local" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="salao-principal">Salão Principal</SelectItem>
                              <SelectItem value="quadra-a">Quadra A</SelectItem>
                              <SelectItem value="quadra-b">Quadra B</SelectItem>
                              <SelectItem value="area-externa">Área Externa</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    rules={{ required: 'Data é obrigatória' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Data</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="startTime"
                    rules={{ required: 'Horário de início é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Horário de Início</FormLabel>
                        <FormControl>
                          <Input 
                            type="time"
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
                    name="endTime"
                    rules={{ required: 'Horário de término é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Horário de Término</FormLabel>
                        <FormControl>
                          <Input 
                            type="time"
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

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Status</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confirmado">Confirmado</SelectItem>
                              <SelectItem value="pendente">Pendente</SelectItem>
                              <SelectItem value="cancelado">Cancelado</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 dark:text-gray-300">Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Detalhes adicionais sobre o evento..."
                          className="border"
                          rows={4}
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
                    onClick={() => navigate('/eventos/calendario')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-black text-gray-600 dark:text-gray-300 hover:bg-gray-800"
                  >
                    {isSubmitting ? 'Salvando...' : 'Salvar Evento'}
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

export default NewEvent;
