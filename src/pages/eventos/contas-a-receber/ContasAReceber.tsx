
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Plus, Search, Filter, Eye, Edit, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListaBase from '@/core/componentes/ListaBase';
import { MODULE_COLORS } from '@/constants/moduleColors';

const ContasAReceber = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dados mock
  const receivables = [
    {
      id: '1',
      client: 'João Silva',
      description: 'Reserva Quadra A - 15/06',
      amount: 150.00,
      dueDate: '2024-06-20',
      status: 'pending'
    },
    {
      id: '2',
      client: 'Maria Santos',
      description: 'Evento Aniversário - Salão Principal',
      amount: 500.00,
      dueDate: '2024-06-18',
      status: 'overdue'
    },
    {
      id: '3',
      client: 'Pedro Costa',
      description: 'Reserva Quadra B - 10/06',
      amount: 120.00,
      dueDate: '2024-06-15',
      status: 'paid'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pendente</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Vencido</Badge>;
      case 'paid':
        return <Badge variant="default" className="bg-green-600">Pago</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const filteredReceivables = receivables.filter(receivable => {
    const matchesSearch = receivable.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receivable.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || receivable.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const headerActions = (
    <>
      <Button asChild>
        <Link to="/eventos/contas-a-receber/novo">
          <Plus className="h-4 w-4 mr-2" />
          Nova Conta a Receber
        </Link>
      </Button>
    </>
  );

  return (
    <ListaBase
      title="Contas a Receber"
      description="Gerencie os valores a receber de clientes"
      icon={<CreditCard className="h-6 w-6" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos"
      backLabel="Eventos"
      headerActions={headerActions}
    >
      <div className="space-y-4">
        {/* Filtros */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por cliente ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="overdue">Vencido</SelectItem>
              <SelectItem value="paid">Pago</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabela */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-32">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceivables.map((receivable) => (
                <TableRow key={receivable.id}>
                  <TableCell className="font-medium">{receivable.client}</TableCell>
                  <TableCell>{receivable.description}</TableCell>
                  <TableCell>R$ {receivable.amount.toFixed(2).replace('.', ',')}</TableCell>
                  <TableCell>{new Date(receivable.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{getStatusBadge(receivable.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/eventos/contas-a-receber/${receivable.id}/editar`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      {receivable.status !== 'paid' && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/eventos/contas-a-receber/${receivable.id}/receber`}>
                            <DollarSign className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredReceivables.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma conta a receber encontrada</p>
          </div>
        )}
      </div>
    </ListaBase>
  );
};

export default ContasAReceber;
