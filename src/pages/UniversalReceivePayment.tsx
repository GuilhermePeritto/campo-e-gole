
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { PaymentConfig, PaymentData, PaymentFormData } from '@/types/payment';
import { ArrowLeft, CheckCircle, CreditCard, DollarSign, Receipt } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const UniversalReceivePayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [config, setConfig] = useState<PaymentConfig | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState<PaymentFormData>({
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: '',
    amountReceived: '',
    discount: '0',
    notes: '',
    installments: '1',
    interestRate: '0'
  });

  useEffect(() => {
    loadPaymentData();
  }, [searchParams]);

  const loadPaymentData = async () => {
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      toast({
        title: "Parâmetros inválidos",
        description: "Tipo ou ID do pagamento não encontrado.",
        variant: "destructive"
      });
      navigate('/painel');
      return;
    }

    try {
      const { config: paymentConfig, data } = await getPaymentConfig(type, id);
      setConfig(paymentConfig);
      setPaymentData(data);
      setFormData(prev => ({ ...prev, amountReceived: data.amount.toString() }));
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados do pagamento.",
        variant: "destructive"
      });
      navigate('/painel');
    } finally {
      setIsLoading(false);
    }
  };

  const getPaymentConfig = async (type: string, id: string): Promise<{ config: PaymentConfig, data: PaymentData }> => {
    // Mock data - aqui você implementaria a lógica para cada tipo
    const configs: Record<string, () => { config: PaymentConfig, data: PaymentData }> = {
      school_payment: () => ({
        config: {
          type: 'school_payment',
          title: 'Receber Mensalidade',
          backUrl: '/escolinha/mensalidades',
          backLabel: 'Mensalidades',
          showDiscount: true,
          onSubmit: async (formData, paymentData) => {
            console.log('Processando mensalidade:', formData, paymentData);
            toast({
              title: "Mensalidade recebida!",
              description: `Pagamento de ${paymentData.clientName} processado com sucesso.`,
            });
          }
        },
        data: {
          id,
          title: 'Mensalidade Junho/2024',
          description: 'Mensalidade da escolinha',
          amount: 150,
          dueDate: '2024-06-05',
          clientName: 'Pedro Silva',
          referenceMonth: 'Junho/2024'
        }
      }),
      event_receivable: () => ({
        config: {
          type: 'event_receivable',
          title: 'Receber Conta',
          backUrl: '/eventos/contas-a-receber',
          backLabel: 'Contas a Receber',
          showDiscount: true,
          showInstallments: true,
          onSubmit: async (formData, paymentData) => {
            console.log('Processando conta a receber:', formData, paymentData);
            toast({
              title: "Conta recebida!",
              description: `Pagamento de ${paymentData.clientName} processado com sucesso.`,
            });
          }
        },
        data: {
          id,
          title: 'Reserva Quadra A',
          description: 'Reserva para evento corporativo',
          amount: 800,
          dueDate: '2024-06-10',
          clientName: 'João Silva'
        }
      }),
      bar_comanda: () => ({
        config: {
          type: 'bar_comanda',
          title: 'Fechar Comanda',
          backUrl: '/bar/comandas',
          backLabel: 'Comandas',
          showDiscount: true,
          customFields: [
            {
              key: 'table',
              label: 'Mesa',
              type: 'text',
              required: true
            }
          ],
          onSubmit: async (formData, paymentData) => {
            console.log('Fechando comanda:', formData, paymentData);
            toast({
              title: "Comanda fechada!",
              description: `Comanda ${paymentData.id} fechada com sucesso.`,
            });
          }
        },
        data: {
          id,
          title: `Comanda #${id}`,
          description: 'Consumo no bar',
          amount: 45.50,
          clientName: 'Mesa 5'
        }
      })
    };

    if (!configs[type]) {
      throw new Error('Tipo de pagamento não encontrado');
    }

    return configs[type]();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!config || !paymentData) return;

    if (!formData.paymentMethod) {
      toast({
        title: "Forma de pagamento obrigatória",
        description: "Selecione a forma de pagamento.",
        variant: "destructive"
      });
      return;
    }

    try {
      await config.onSubmit(formData, paymentData);
      navigate(config.backUrl);
    } catch (error) {
      toast({
        title: "Erro ao processar pagamento",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!config || !paymentData) return null;

  const finalAmount = parseFloat(formData.amountReceived || '0') - parseFloat(formData.discount || '0');

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(config.backUrl)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {config.backLabel}
            </Button>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold">{config.title}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informações do Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-blue-600" />
                Dados do Recebimento
              </CardTitle>
              <CardDescription>
                Informações detalhadas do que está sendo recebido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">{paymentData.title}</h3>
                  <p className="text-blue-700 text-sm">{paymentData.description}</p>
                </div>

                {paymentData.clientName && (
                  <div>
                    <Label className="text-sm font-medium">Cliente/Responsável</Label>
                    <div className="p-3 bg-muted rounded text-sm font-medium">
                      {paymentData.clientName}
                    </div>
                  </div>
                )}

                {paymentData.referenceMonth && (
                  <div>
                    <Label className="text-sm font-medium">Mês de Referência</Label>
                    <div className="p-3 bg-muted rounded text-sm">
                      {paymentData.referenceMonth}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium">Valor Original</Label>
                  <div className="p-3 bg-muted rounded text-lg font-bold text-green-600">
                    R$ {paymentData.amount.toFixed(2)}
                  </div>
                </div>

                {paymentData.dueDate && (
                  <div>
                    <Label className="text-sm font-medium">Vencimento</Label>
                    <div className="p-3 bg-muted rounded text-sm">
                      {new Date(paymentData.dueDate).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Processamento do Pagamento
              </CardTitle>
              <CardDescription>
                Preencha os dados para processar o recebimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentDate">Data do Pagamento *</Label>
                    <Input
                      id="paymentDate"
                      type="date"
                      value={formData.paymentDate}
                      onChange={(e) => handleInputChange('paymentDate', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Forma de Pagamento *</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar forma de pagamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dinheiro">💵 Dinheiro</SelectItem>
                        <SelectItem value="pix">📱 PIX</SelectItem>
                        <SelectItem value="cartao_debito">💳 Cartão de Débito</SelectItem>
                        <SelectItem value="cartao_credito">💳 Cartão de Crédito</SelectItem>
                        <SelectItem value="transferencia">🏦 Transferência</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amountReceived">Valor Recebido (R$) *</Label>
                    <Input
                      id="amountReceived"
                      type="number"
                      step="0.01"
                      value={formData.amountReceived}
                      onChange={(e) => handleInputChange('amountReceived', e.target.value)}
                      required
                    />
                  </div>

                  {config.showDiscount && (
                    <div className="space-y-2">
                      <Label htmlFor="discount">Desconto (R$)</Label>
                      <Input
                        id="discount"
                        type="number"
                        step="0.01"
                        value={formData.discount}
                        onChange={(e) => handleInputChange('discount', e.target.value)}
                        placeholder="0,00"
                      />
                    </div>
                  )}

                  {config.showInstallments && (
                    <div className="space-y-2">
                      <Label htmlFor="installments">Parcelas</Label>
                      <Select value={formData.installments} onValueChange={(value) => handleInputChange('installments', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,10,12].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}x {num > 1 ? `(R$ ${(finalAmount / num).toFixed(2)})` : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {config.showInterestRate && (
                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Taxa de Juros (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        value={formData.interestRate}
                        onChange={(e) => handleInputChange('interestRate', e.target.value)}
                        placeholder="0,00"
                      />
                    </div>
                  )}
                </div>

                {/* Campos customizados */}
                {config.customFields && config.customFields.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Informações Adicionais</h4>
                    {config.customFields.map((field) => (
                      <div key={field.key} className="space-y-2">
                        <Label htmlFor={field.key}>
                          {field.label} {field.required && '*'}
                        </Label>
                        {field.type === 'select' ? (
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder={`Selecionar ${field.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            id={field.key}
                            type={field.type}
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Observações sobre o pagamento..."
                    rows={3}
                  />
                </div>

                {/* Resumo do Pagamento */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Resumo do Pagamento
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Valor Original:</span>
                      <span>R$ {paymentData.amount.toFixed(2)}</span>
                    </div>
                    {parseFloat(formData.discount || '0') > 0 && (
                      <div className="flex justify-between text-orange-600">
                        <span>Desconto:</span>
                        <span>- R$ {parseFloat(formData.discount).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-green-800 border-t border-green-300 pt-2 text-lg">
                      <span>Total a Receber:</span>
                      <span>R$ {finalAmount.toFixed(2)}</span>
                    </div>
                    {config.showInstallments && parseInt(formData.installments || '1') > 1 && (
                      <div className="flex justify-between text-blue-600">
                        <span>Valor por Parcela:</span>
                        <span>R$ {(finalAmount / parseInt(formData.installments || '1')).toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar Recebimento - R$ {finalAmount.toFixed(2)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UniversalReceivePayment;
