
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Receipt } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SaleItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [receivedAmount, setReceivedAmount] = useState('');
  const [discount, setDiscount] = useState('');

  // Dados mockados de uma comanda/venda
  const saleItems: SaleItem[] = [
    { id: 1, name: 'Cerveja Skol 350ml', price: 4.50, quantity: 2 },
    { id: 2, name: 'Sanduíche Natural', price: 12.00, quantity: 1 },
    { id: 3, name: 'Refrigerante Coca 600ml', price: 6.00, quantity: 1 }
  ];

  const subtotal = saleItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = discount ? parseFloat(discount) : 0;
  const total = subtotal - discountAmount;
  const change = receivedAmount ? parseFloat(receivedAmount) - total : 0;

  const handleFinalizeSale = () => {
    if (!paymentMethod) {
      toast({
        title: "Forma de pagamento obrigatória",
        description: "Selecione a forma de pagamento.",
        variant: "destructive"
      });
      return;
    }

    if (paymentMethod === 'dinheiro' && (!receivedAmount || parseFloat(receivedAmount) < total)) {
      toast({
        title: "Valor recebido insuficiente",
        description: "O valor recebido deve ser maior ou igual ao total.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Venda finalizada!",
      description: `Pagamento de R$ ${total.toFixed(2)} processado com sucesso.`,
    });
    navigate('/bar');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/bar')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">Finalizar Venda</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumo da Venda */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo da Venda</CardTitle>
              <CardDescription>
                Itens a serem pagos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {saleItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.quantity}x R$ {item.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="font-medium">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto:</span>
                      <span>- R$ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle>Pagamento</CardTitle>
              <CardDescription>
                Selecione a forma de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Forma de Pagamento *</label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar forma de pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                    <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Desconto (R$)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              {paymentMethod === 'dinheiro' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Valor Recebido *</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={receivedAmount}
                    onChange={(e) => setReceivedAmount(e.target.value)}
                  />
                  {change > 0 && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <div className="font-medium text-green-800">
                        Troco: R$ {change.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4">
                <Button onClick={handleFinalizeSale} className="w-full" size="lg">
                  <Receipt className="h-4 w-4 mr-2" />
                  Finalizar Venda - R$ {total.toFixed(2)}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => navigate('/bar/comandas')}>
                  Comandas
                </Button>
                <Button variant="outline" onClick={() => navigate('/bar/vendas/novo')}>
                  Nova Venda
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
