
import PaginationControls from '@/components/PaginationControls';
import SummaryCardSkeleton from '@/components/SummaryCardSkeleton';
import ValueSkeleton from '@/components/ValueSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, CreditCard, Filter, Plus, Receipt, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Comandas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const mockComandas = [
    {
      id: 1,
      number: 'CMD001',
      client: 'João Silva',
      items: 5,
      total: 85.50,
      status: 'Aberta',
      openTime: '2024-06-05 19:30',
      table: 'Mesa 03'
    },
    {
      id: 2,
      number: 'CMD002',
      client: 'Maria Santos',
      items: 3,
      total: 42.00,
      status: 'Fechada',
      openTime: '2024-06-05 20:15',
      table: 'Mesa 07'
    },
    {
      id: 3,
      number: 'CMD003',
      client: 'Pedro Costa',
      items: 8,
      total: 120.75,
      status: 'Aberta',
      openTime: '2024-06-05 18:45',
      table: 'Mesa 12'
    },
    {
      id: 4,
      number: 'CMD004',
      client: 'Ana Oliveira',
      items: 2,
      total: 28.50,
      status: 'Paga',
      openTime: '2024-06-05 21:00',
      table: 'Mesa 01'
    },
    {
      id: 5,
      number: 'CMD005',
      client: 'Carlos Mendes',
      items: 6,
      total: 95.25,
      status: 'Fechada',
      openTime: '2024-06-05 19:00',
      table: 'Mesa 15'
    }
  ];

  const filteredComandas = mockComandas.filter(comanda => {
    const matchesSearch = comanda.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comanda.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comanda.table.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || comanda.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pagination = usePagination(filteredComandas, {
    pageSize: 10,
    totalItems: filteredComandas.length
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberta': return 'bg-green-100 text-green-800';
      case 'Fechada': return 'bg-orange-100 text-orange-800';
      case 'Paga': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalValue = filteredComandas.reduce((sum, comanda) => sum + comanda.total, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
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
                <Receipt className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-semibold">Comandas</h1>
              </div>
            </div>
            <Button onClick={() => navigate('/bar/comandas/nova')} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Comanda
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {isLoading ? (
            <>
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
            </>
          ) : (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Receipt className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Comandas</p>
                      <p className="text-2xl font-bold text-blue-600">{filteredComandas.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                      <p className="text-2xl font-bold text-green-600">
                        {isLoading ? <ValueSkeleton /> : `R$ ${totalValue.toFixed(2).replace('.', ',')}`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Receipt className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Abertas</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {filteredComandas.filter(c => c.status === 'Aberta').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pagas</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {filteredComandas.filter(c => c.status === 'Paga').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar comandas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="Aberta">Aberta</SelectItem>
                  <SelectItem value="Fechada">Fechada</SelectItem>
                  <SelectItem value="Paga">Paga</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Comandas */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Comandas</CardTitle>
            <CardDescription>
              Gerenciar todas as comandas do bar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Mesa</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.paginatedData.map((comanda) => (
                  <TableRow key={comanda.id}>
                    <TableCell className="font-medium">{comanda.number}</TableCell>
                    <TableCell>{comanda.client}</TableCell>
                    <TableCell>{comanda.table}</TableCell>
                    <TableCell>{comanda.items}</TableCell>
                    <TableCell className="font-bold text-green-600">
                      {isLoading ? <ValueSkeleton /> : `R$ ${comanda.total.toFixed(2).replace('.', ',')}`}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(comanda.status)}`}>
                        {comanda.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/bar/comandas/${comanda.id}`)}
                        >
                          Ver
                        </Button>
                        {comanda.status === 'Aberta' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/bar/comandas/${comanda.id}`)}
                          >
                            Fechar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <PaginationControls
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              pageSize={pagination.pageSize}
              startIndex={pagination.startIndex}
              endIndex={pagination.endIndex}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onPageChange={pagination.goToPage}
              onPageSizeChange={pagination.setPageSize}
              pageSizeOptions={[5, 10, 20]}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Comandas;
