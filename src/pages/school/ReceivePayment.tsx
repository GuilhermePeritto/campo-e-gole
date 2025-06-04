
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CreditCard, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

const ReceivePayment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    studentName: '',
    month: '',
    amount: '',
    paymentMethod: '',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    // Simular carregamento dos dados da mensalidade
    const mockData = {
      studentName: 'Pedro Silva',
      month: 'Junho/2024',
      amount: '150.00',
      paymentMethod: '',
      paymentDate: new Date().toISOString().split('T')[0],
      notes: ''
    };
    setFormData(mockData);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pagamento recebido:', formData);
    toast({
      title: "Pagamento registrado",
      description: "A mensalidade foi marcada como paga com sucesso.",
    });
    navigate('/escolinha/mensalidades');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/mensalidades')}
              className="gap-2 text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Mensalidades
            </Button>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-black">Receber Mensalidade</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Registrar Pagamento</CardTitle>
            <CardDescription>
              Confirme o recebimento da mensalidade do aluno
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studentName" className="text-black">Aluno</Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    className="border-black bg-gray-100"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="month" className="text-black">Mês/Ano</Label>
                  <Input
                    id="month"
                    value={formData.month}
                    className="border-black bg-gray-100"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-black">Valor (R$)</Label>
                  <Input
                    id="amount"
                    value={formData.amount}
                    className="border-black bg-gray-100"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentDate" className="text-black">Data do Pagamento</Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => handleChange('paymentDate', e.target.value)}
                    className="border-black"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="paymentMethod" className="text-black">Forma de Pagamento</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => handleChange('paymentMethod', value)}>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Selecione a forma de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                      <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-black">Observações</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="border-black"
                  placeholder="Observações sobre o pagamento..."
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-green-600 text-white hover:bg-green-700 gap-2"
                >
                  <Save className="h-4 w-4" />
                  Confirmar Pagamento
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/escolinha/mensalidades')}
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

export default ReceivePayment;
