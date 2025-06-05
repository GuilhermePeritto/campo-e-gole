import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye, Plus, Receipt, Search, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Comanda {
  id: number;
  number: string;
  client: string;
  table?: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'open' | 'closed';
  createdAt: string;
}

const Comandas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComanda, setSelectedComanda] = useState<Comanda | null>(null);

  const mockComandas: Comanda[] = [
    {
      id: 1,
      number: '001',
      client: 'Mesa 5',
      table: '5',
      items: [
        { id: 1, name: 'Cerveja Skol 350ml', price: 4.50, quantity: 2 },
        { id: 2, name: 'Sanduíche Natural', price: 12.00, quantity: 1 }
      ],
      total: 21.00,
      status: 'open',
      createdAt: '14:30'
    },
    {
      id: 2,
      number: '002',
      client: 'João Silva',
      items: [
        { id: 1, name: 'Refrigerante Coca 600ml', price: 6.00, quantity: 1 },
        { id: 2, name: 'Salgadinho Doritos', price: 8.00, quantity: 1 }
      ],
      total: 14.00,
      status: 'open',
      createdAt: '15:15'
    },
    {
      id: 3,
      number: '003',
      client: 'Mesa 8',
      table: '8',
      items: [
        { id: 1, name: 'Cerveja Skol 350ml', price: 4.50, quantity: 4 },
        { id: 2, name: 'Água Mineral 500ml', price: 2.50, quantity: 2 }
      ],
      total: 23.00,
      status: 'open',
      createdAt: '16:00'
    }
  ];

  const filteredComandas = mockComandas.filter(comanda =>
    comanda.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comanda.number.includes(searchTerm)
  );

  const closeComanda = (comandaId: number) => {
    // Redirecionar para o checkout ao invés de fechar diretamente
    navigate('/bar/conferir');
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
                <Receipt className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">Comandas</h1>
              </div>
            </div>

            <Button onClick={() => navigate('/bar/comandas/novo')} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Comanda
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Comandas */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Comandas Abertas</CardTitle>
                <CardDescription>
                  {filteredComandas.length} comandas em andamento
                </CardDescription>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cliente ou número..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredComandas.map((comanda) => (
                    <div key={comanda.id} className="border rounded-lg p-4 hover:bg-accent">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">#{comanda.number}</Badge>
                          <span className="font-medium">{comanda.client}</span>
                          {comanda.table && (
                            <Badge variant="secondary">Mesa {comanda.table}</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={comanda.status === 'open' ? 'default' : 'secondary'}>
                            {comanda.status === 'open' ? 'Aberta' : 'Fechada'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{comanda.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {comanda.items.length} itens
                          </div>
                          <div className="font-semibold text-lg">
                            R$ {comanda.total.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedComanda(comanda)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {comanda.status === 'open' && (
                            <Button
                              size="sm"
                              onClick={() => closeComanda(comanda.id)}
                            >
                              Fechar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detalhes da Comanda */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Comanda</CardTitle>
                {selectedComanda && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedComanda(null)}
                    className="w-fit"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {selectedComanda ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">#{selectedComanda.number}</Badge>
                        <Badge variant={selectedComanda.status === 'open' ? 'default' : 'secondary'}>
                          {selectedComanda.status === 'open' ? 'Aberta' : 'Fechada'}
                        </Badge>
                      </div>
                      <div className="font-medium">{selectedComanda.client}</div>
                      <div className="text-sm text-muted-foreground">
                        Aberta às {selectedComanda.createdAt}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Itens</h4>
                      <div className="space-y-2">
                        {selectedComanda.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center p-2 bg-muted rounded">
                            <div>
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
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>R$ {selectedComanda.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {selectedComanda.status === 'open' && (
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => navigate(`/bar/comandas/${selectedComanda.id}/add`)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Item
                        </Button>
                        <Button
                          className="w-full"
                          onClick={() => closeComanda(selectedComanda.id)}
                        >
                          Fechar Comanda
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Selecione uma comanda para ver os detalhes
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Comandas;
