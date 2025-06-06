
import PaginationControls from '@/components/PaginationControls';
import SummaryCardSkeleton from '@/components/SummaryCardSkeleton';
import ValueSkeleton from '@/components/ValueSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, MapPin, Plus, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Locais = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const mockVenues = [
    {
      id: 1,
      name: 'Quadra Principal',
      type: 'Quadra de Futebol',
      capacity: '22 jogadores',
      hourlyRate: 120.00,
      status: 'Disponível'
    },
    {
      id: 2,
      name: 'Campo Society',
      type: 'Campo Society',
      capacity: '14 jogadores',
      hourlyRate: 100.00,
      status: 'Disponível'
    },
    {
      id: 3,
      name: 'Salão de Festas',
      type: 'Salão de Eventos',
      capacity: '150 pessoas',
      hourlyRate: 200.00,
      status: 'Ocupado'
    },
    {
      id: 4,
      name: 'Quadra de Tênis',
      type: 'Quadra de Tênis',
      capacity: '4 jogadores',
      hourlyRate: 80.00,
      status: 'Manutenção'
    },
    {
      id: 5,
      name: 'Piscina',
      type: 'Área Aquática',
      capacity: '50 pessoas',
      hourlyRate: 150.00,
      status: 'Disponível'
    }
  ];

  const filteredVenues = mockVenues.filter(venue =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pagination = usePagination(filteredVenues, {
    pageSize: 10,
    totalItems: filteredVenues.length
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível': return 'bg-green-100 text-green-800';
      case 'Ocupado': return 'bg-red-100 text-red-800';
      case 'Manutenção': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = filteredVenues.reduce((sum, venue) => sum + venue.hourlyRate, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/eventos')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-semibold">Locais</h1>
              </div>
            </div>
            <Button onClick={() => navigate('/eventos/locais/novo')} className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Local
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
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total de Locais</p>
                      <p className="text-2xl font-bold text-blue-600">{filteredVenues.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Disponíveis</p>
                      <p className="text-2xl font-bold text-green-600">
                        {filteredVenues.filter(v => v.status === 'Disponível').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ocupados</p>
                      <p className="text-2xl font-bold text-red-600">
                        {filteredVenues.filter(v => v.status === 'Ocupado').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Receita/Hora</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {isLoading ? <ValueSkeleton /> : `R$ ${totalRevenue.toFixed(2).replace('.', ',')}`}
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar locais..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Locais */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Locais</CardTitle>
            <CardDescription>
              Gerenciar todos os locais disponíveis para reserva
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Capacidade</TableHead>
                  <TableHead>Valor/Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.paginatedData.map((venue) => (
                  <TableRow key={venue.id}>
                    <TableCell className="font-medium">{venue.name}</TableCell>
                    <TableCell>{venue.type}</TableCell>
                    <TableCell>{venue.capacity}</TableCell>
                    <TableCell className="font-bold text-green-600">
                      {isLoading ? <ValueSkeleton /> : `R$ ${venue.hourlyRate.toFixed(2).replace('.', ',')}`}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(venue.status)}`}>
                        {venue.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/eventos/locais/editar/${venue.id}`)}
                        >
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
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

export default Locais;
