
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Save } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReceivePayment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [observations, setObservations] = useState('');

  // Mock data - normalmente viria de uma API
  const payment = {
    id: 1,
    studentName: 'Pedro Silva',
    month: 'Junho/2024',
    amount: 150,
    dueDate: '2024-06-05',
    status: 'pendente'
  };

  const finalAmount = amount ? parseFloat(amount) - (discount ? parseFloat(discount) : 0) : payment.amount;

  const handleReceivePayment = () => {
    if (!paymentMethod) {
      toast({
        title: "Forma de pagamento obrigatória",
        description: "Selecione a forma de pagamento.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pagamento recebido!",
      description: `Mensalidade de ${payment.studentName} recebida com sucesso.`,
    });
    navigate('/escolinha/mensalidades');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/mensalidades')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Mensalidades
            </Button>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold">Receber Mensalidade</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informações da Mensalidade */}
          <Card>
            <CardHeader>
              <CardTitle>Dados da Mensalidade</CardTitle>
              <CardDescription>
                Informações do pagamento a ser recebido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Aluno</Label>
                <div className="p-3 bg-muted rounded text-sm font-medium">
                  {payment.studentName}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Mês de Referência</Label>
                <div className="p-3 bg-muted rounded text-sm">
                  {payment.month}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Valor Original</Label>
                <div className="p-3 bg-muted rounded text-sm font-medium">
                  R$ {payment.amount.toFixed(2)}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Vencimento</Label>
                <div className="p-3 bg-muted rounded text-sm">
                  {payment.dueDate}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Status</Label>
                <span className="inline-block px-2 py-1 rounded text-xs bg-yellow-200 text-yellow-800 mt-1">
                  {payment.status}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle>Dados do Pagamento</CardTitle>
              <CardDescription>
                Preencha os dados para receber o pagamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Forma de Pagamento *</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar forma de pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                    <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="transferencia">Transferência</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Valor Recebido</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="150,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Desconto (R$)</Label>
                <Input
                  id="discount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                  id="observations"
                  placeholder="Observações sobre o pagamento..."
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                />
              </div>

              {/* Resumo do Pagamento */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-medium text-green-800 mb-2">Resumo do Pagamento</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Valor Original:</span>
                    <span>R$ {payment.amount.toFixed(2)}</span>
                  </div>
                  {discount && parseFloat(discount) > 0 && (
                    <div className="flex justify-between text-orange-600">
                      <span>Desconto:</span>
                      <span>- R$ {parseFloat(discount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-green-800 border-t pt-1">
                    <span>Total a Receber:</span>
                    <span>R$ {finalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleReceivePayment} className="w-full" size="lg">
                <Save className="h-4 w-4 mr-2" />
                Confirmar Recebimento - R$ {finalAmount.toFixed(2)}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ReceivePayment;
