
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Minus, Search, Receipt } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface ComandaItem {
  product: Product;
  quantity: number;
}

const NewComanda = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<ComandaItem[]>([]);

  const mockProducts: Product[] = [
    { id: 1, name: 'Cerveja Skol 350ml', price: 4.50, category: 'Bebidas' },
    { id: 2, name: 'Refrigerante Coca 600ml', price: 6.00, category: 'Bebidas' },
    { id: 3, name: 'Água Mineral 500ml', price: 2.50, category: 'Bebidas' },
    { id: 4, name: 'Salgadinho Doritos', price: 8.00, category: 'Lanches' },
    { id: 5, name: 'Sanduíche Natural', price: 12.00, category: 'Lanches' }
  ];

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItem = (product: Product) => {
    const existingItem = items.find(item => item.product.id === product.id);
    if (existingItem) {
      setItems(items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setItems([...items, { product, quantity: 1 }]);
    }
  };

  const removeItem = (productId: number) => {
    const existingItem = items.find(item => item.product.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      setItems(items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      setItems(items.filter(item => item.product.id !== productId));
    }
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleSave = () => {
    if (!client.trim()) {
      toast({
        title: "Cliente obrigatório",
        description: "Informe o nome do cliente ou mesa.",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Adicione produtos",
        description: "A comanda deve ter pelo menos um produto.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Comanda criada!",
      description: `Comanda para ${client} foi criada com sucesso.`,
    });
    navigate('/bar/comandas');
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
                onClick={() => navigate('/bar/comandas')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">Nova Comanda</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações da Comanda */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Informações da Comanda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Cliente / Mesa *</label>
                  <Input
                    placeholder="Ex: João Silva ou Mesa 5"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Mesa (opcional)</label>
                  <Select value={table} onValueChange={setTable}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar mesa" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 20}, (_, i) => i + 1).map(num => (
                        <SelectItem key={num} value={num.toString()}>Mesa {num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Resumo da Comanda */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Comanda</CardTitle>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Nenhum item adicionado
                  </p>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.product.name}</div>
                          <div className="text-xs text-muted-foreground">
                            R$ {item.product.price.toFixed(2)} cada
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addItem(item.product)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>R$ {getTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    <Button onClick={handleSave} className="w-full">
                      Criar Comanda
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Lista de Produtos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Produtos</CardTitle>
                <CardDescription>
                  Clique nos produtos para adicionar à comanda
                </CardDescription>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => addItem(product)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{product.name}</span>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                      <div className="text-lg font-semibold text-primary">
                        R$ {product.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewComanda;
