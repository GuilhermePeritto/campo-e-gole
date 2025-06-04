
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Search, Filter, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Receivables = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const receivables = [
    { 
      id: 1, 
      client: 'João Silva', 
      amount: 150, 
      dueDate: '2024-06-10', 
      status: 'pendente',
      description: 'Reserva Quadra A - 08/06',
      createdAt: '2024-06-01'
    },
    { 
      id: 2, 
      client: 'Time Unidos', 
      amount: 300, 
      dueDate: '2024-06-08', 
      status: 'vencido',
      description: 'Reserva Campo 1 - 05/06',
      createdAt: '2024-05-28'
    },
    { 
      id: 3, 
      client: 'Maria Santos', 
      amount: 200, 
      dueDate: '2024-06-15', 
      status: 'pendente',
      description: 'Reserva Quadra B - 12/06',
      createdAt: '2024-06-03'
    },
    { 
      id: 4, 
      client: 'Carlos Oliveira', 
      amount: 120, 
      dueDate: '2024-06-20', 
      status: 'pendente',
      description: 'Reserva Campo 2 - 18/06',
      createdAt: '2024-06-05'
    },
    { 
      id: 5, 
      client: 'Ana Costa', 
      amount: 180, 
      dueDate: '2024-06-05', 
      status: 'vencido',
      description: 'Reserva Quadra A - 02/06',
      createdAt: '2024-05-25'
    }
  ];

  const filteredReceivables = receivables.filter(receivable =>
    receivable.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receivable.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-200 text-yellow-800';
      case 'vencido':
        return 'bg-red-200 text-red-800';
      case 'pago':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const totalPendente = receivables
    .filter(r => r.status === 'pendente')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalVencido = receivables
    .filter(r => r.status === 'vencido')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/events')}
              className="gap-2 text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Eventos
            </Button>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-black">Contas a Receber</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-black">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendente</p>
                  <p className="text-2xl font-bold text-black">R$ {totalPendente.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Vencido</p>
                  <p className="text-2xl font-bold text-black">R$ {totalVencido.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-black">R$ {(totalPendente + totalVencido).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por cliente ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-black"
            />
          </div>
          <Button
            onClick={() => navigate('/events/receivables/new')}
            className="bg-black text-white hover:bg-gray-800 gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Conta
          </Button>
        </div>

        {/* Receivables Table */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Lista de Contas a Receber</CardTitle>
            <CardDescription>
              Gerencie todas as contas pendentes e vencidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Cliente</TableHead>
                  <TableHead className="text-black">Descrição</TableHead>
                  <TableHead className="text-black">Valor</TableHead>
                  <TableHead className="text-black">Vencimento</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                  <TableHead className="text-black">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceivables.map((receivable) => (
                  <TableRow key={receivable.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-black">{receivable.client}</TableCell>
                    <TableCell className="text-gray-600">{receivable.description}</TableCell>
                    <TableCell className="font-medium text-black">R$ {receivable.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-600">{receivable.dueDate}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(receivable.status)}`}>
                        {receivable.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-black text-black hover:bg-black hover:text-white"
                          onClick={() => navigate(`/events/receivables/${receivable.id}/edit`)}
                        >
                          Editar
                        </Button>
                        {receivable.status !== 'pago' && (
                          <Button
                            size="sm"
                            className="bg-green-600 text-white hover:bg-green-700"
                          >
                            Receber
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Receivables;
