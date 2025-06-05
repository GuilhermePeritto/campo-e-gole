
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckCircle, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReceberPagamento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [receivableData, setReceivableData] = useState({
    client: '',
    amount: 0,
    description: '',
    dueDate: ''
  });
  const [paymentData, setPaymentData] = useState({
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: '',
    amountReceived: '',
    discount: '0',
    notes: ''
  });

  useEffect(() => {
    // Simular carregamento dos dados da conta
    const mockData = {
      client: 'João Silva',
      amount: 150,
      description: 'Reserva Quadra A - 08/06',
      dueDate: '2024-06-10'
    };
    setReceivableData(mockData);
    setPaymentData(prev => ({ ...prev, amountReceived: mockData.amount.toString() }));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pagamento recebido:', { receivableData, paymentData });
    // Aqui seria feita a atualização no backend
    navigate('/eventos/contas-a-receber');
  };

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const finalAmount = parseFloat(paymentData.amountReceived || '0') - parseFloat(paymentData.discount || '0');

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/eventos/contas-a-receber')}
              className="gap-2 text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Contas a Receber
            </Button>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Cliente:</span>
                <p className="font-medium text-black">{receivableData.client}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Valor Original:</span>
                <p className="font-medium text-black">R$ {receivableData.amount.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Vencimento:</span>
                <p className="font-medium text-black">{receivableData.dueDate}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Descrição:</span>
                <p className="font-medium text-black">{receivableData.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Dados do Pagamento</CardTitle>
            <CardDescription>
              Informe os dados do pagamento recebido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="paymentDate" className="text-black">Data do Pagamento</Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    value={paymentData.paymentDate}
                    onChange={(e) => handlePaymentChange('paymentDate', e.target.value)}
                    className="border-black"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod" className="text-black">Forma de Pagamento</Label>
                  <Select value={paymentData.paymentMethod} onValueChange={(value) => handlePaymentChange('paymentMethod', value)}>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Selecione a forma de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                      <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                      <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amountReceived" className="text-black">Valor Recebido (R$)</Label>
                  <Input
                    id="amountReceived"
                    type="number"
                    step="0.01"
                    value={paymentData.amountReceived}
                    onChange={(e) => handlePaymentChange('amountReceived', e.target.value)}
                    className="border-black"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount" className="text-black">Desconto (R$)</Label>
                  <Input
                    id="discount"
                    type="number"
                    step="0.01"
                    value={paymentData.discount}
                    onChange={(e) => handlePaymentChange('discount', e.target.value)}
                    className="border-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-black">Observações</Label>
                <Textarea
                  id="notes"
                  value={paymentData.notes}
                  onChange={(e) => handlePaymentChange('notes', e.target.value)}
                  className="border-black"
                  placeholder="Observações sobre o pagamento..."
                />
              </div>

              {/* Summary */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-black">Valor Final:</span>
                    <span className="text-2xl font-bold text-green-600">R$ {finalAmount.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-green-600 text-white hover:bg-green-700 gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Confirmar Recebimento
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/eventos/contas-a-receber')}
                  className="border-black text-black hover:bg-gray-100"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReceberPagamento;
