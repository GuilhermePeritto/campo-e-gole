
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReceivePayment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    receivableId: '',
    amountReceived: '',
    paymentMethod: '',
    paymentDate: '',
    observations: ''
  });

  const mockReceivables = [
    { id: '1', description: 'Reserva Quadra A - João Silva', amount: 120.00 },
    { id: '2', description: 'Mensalidade Junho - Pedro Martins', amount: 150.00 },
    { id: '3', description: 'Evento Corporativo - Empresa ABC', amount: 800.00 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recebimento:', formData);
    navigate('/financial/accounts-receivable');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/financial/accounts-receivable')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold">Receber Pagamento</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Registrar Recebimento</CardTitle>
            <CardDescription>
              Registre o recebimento de um título pendente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="receivableId">Título a Receber *</Label>
                  <Select value={formData.receivableId} onValueChange={(value) => setFormData({...formData, receivableId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o título" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockReceivables.map((receivable) => (
                        <SelectItem key={receivable.id} value={receivable.id}>
                          {receivable.description} - R$ {receivable.amount.toFixed(2).replace('.', ',')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amountReceived">Valor Recebido *</Label>
                  <Input
                    id="amountReceived"
                    type="number"
                    step="0.01"
                    value={formData.amountReceived}
                    onChange={(e) => setFormData({...formData, amountReceived: e.target.value})}
                    placeholder="0,00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Forma de Pagamento *</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a forma" />
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

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="paymentDate">Data do Recebimento *</Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => setFormData({...formData, paymentDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e) => setFormData({...formData, observations: e.target.value})}
                  placeholder="Observações sobre o recebimento..."
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Confirmar Recebimento
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/financial/accounts-receivable')}
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

export default ReceivePayment;
