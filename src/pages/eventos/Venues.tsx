
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Clock, Edit, MapPin, Plus, Search, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Venues = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const mockVenues = [
    {
      id: 1,
      name: 'Quadra A - Futebol Society',
      type: 'Futebol Society',
      capacity: 14,
      hourlyRate: 80,
      equipment: ['Traves', 'Redes', 'Bolas'],
      status: 'active',
      description: 'Quadra de grama sintética com iluminação LED'
    },
    {
      id: 2,
      name: 'Quadra B - Basquete',
      type: 'Basquete',
      capacity: 10,
      hourlyRate: 60,
      equipment: ['Cestas', 'Bolas', 'Cronômetro'],
      status: 'active',
      description: 'Quadra coberta com piso oficial'
    },
    {
      id: 3,
      name: 'Campo 1 - Futebol 11',
      type: 'Futebol',
      capacity: 22,
      hourlyRate: 150,
      equipment: ['Traves', 'Redes', 'Bandeiras'],
      status: 'maintenance',
      description: 'Campo oficial com grama natural'
    },
    {
      id: 4,
      name: 'Campo 2 - Futebol 7',
      type: 'Futebol 7',
      capacity: 14,
      hourlyRate: 100,
      equipment: ['Traves', 'Redes'],
      status: 'active',
      description: 'Campo de grama sintética'
    }
  ];

  const filteredVenues = mockVenues.filter(venue =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (venueId: number) => {
    toast({
      title: "Local removido",
      description: "O local foi removido com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/eventos')}
                className="gap-2 text-black hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-green-600" />
                <h1 className="text-2xl font-medium text-black">Gerenciar Locais</h1>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/eventos/locais/novo')}
              className="gap-2 bg-black text-white hover:bg-gray-800"
            >
              <Plus className="h-4 w-4" />
              Novo Local
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Busca e Filtros */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar locais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300"
            />
          </div>
        </div>

        {/* Lista de Locais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <Card key={venue.id} className="hover:shadow-lg transition-shadow border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-black">{venue.name}</CardTitle>
                    <CardDescription className="text-gray-600">{venue.type}</CardDescription>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    venue.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {venue.status === 'active' ? 'Ativo' : 'Manutenção'}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    {venue.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{venue.capacity} pessoas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">R$ {venue.hourlyRate}/hora</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2 text-black">Equipamentos:</div>
                    <div className="flex flex-wrap gap-1">
                      {venue.equipment.map((item, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-1 border-gray-300 text-black hover:bg-gray-50"
                      onClick={() => navigate(`/eventos/locais/${venue.id}/editar`)}
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-gray-300"
                      onClick={() => handleDelete(venue.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">
              Nenhum local encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Tente ajustar sua busca' : 'Comece criando o primeiro local'}
            </p>
            <Button 
              onClick={() => navigate('/eventos/locais/novo')}
              className="gap-2 bg-black text-white hover:bg-gray-800"
            >
              <Plus className="h-4 w-4" />
              Criar Novo Local
            </Button>
          </div>
        )}

        {/* Estatísticas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Locais</p>
                  <p className="text-2xl font-bold">{mockVenues.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Locais Ativos</p>
                  <p className="text-2xl font-bold">{mockVenues.filter(v => v.status === 'active').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Em Manutenção</p>
                  <p className="text-2xl font-bold">{mockVenues.filter(v => v.status === 'maintenance').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Capacidade Total</p>
                  <p className="text-2xl font-bold">{mockVenues.reduce((acc, v) => acc + v.capacity, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Venues;
