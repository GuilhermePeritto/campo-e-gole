
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle, ArrowLeft, Minus, Package, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  supplier: string;
}

const Inventory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockProducts: Product[] = [
    { id: 1, name: 'Cerveja Skol 350ml', category: 'Bebidas', stock: 8, minStock: 20, price: 4.50, supplier: 'Distribuidora ABC' },
    { id: 2, name: 'Refrigerante Coca 600ml', category: 'Bebidas', stock: 12, minStock: 25, price: 6.00, supplier: 'Coca-Cola' },
    { id: 3, name: 'Água Mineral 500ml', category: 'Bebidas', stock: 5, minStock: 30, price: 2.50, supplier: 'Águas do Brasil' },
    { id: 4, name: 'Salgadinho Doritos', category: 'Lanches', stock: 45, minStock: 20, price: 8.00, supplier: 'Elma Chips' },
    { id: 5, name: 'Sanduíche Natural', category: 'Lanches', stock: 20, minStock: 10, price: 12.00, supplier: 'Padaria Local' },
    { id: 6, name: 'Cerveja Heineken 350ml', category: 'Bebidas', stock: 35, minStock: 15, price: 6.50, supplier: 'Distribuidora ABC' }
  ];

  const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = mockProducts.filter(product => product.stock <= product.minStock);

  const updateStock = (productId: number, change: number) => {
    toast({
      title: "Estoque atualizado",
      description: `Estoque do produto foi ${change > 0 ? 'aumentado' : 'diminuído'}.`,
    });
  };

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { label: 'Sem estoque', color: 'destructive' };
    if (product.stock <= product.minStock) return { label: 'Estoque baixo', color: 'secondary' };
    return { label: 'Normal', color: 'default' };
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
                <Package className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">Controle de Estoque</h1>
              </div>
            </div>

            <Button onClick={() => navigate('/bar/produtos/novo')} className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Produto
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alertas de Estoque Baixo */}
        {lowStockProducts.length > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                <AlertTriangle className="h-5 w-5" />
                Alertas de Estoque
              </CardTitle>
              <CardDescription className="text-orange-700 dark:text-orange-300">
                {lowStockProducts.length} produtos com estoque baixo ou zerado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="p-3 border rounded bg-background">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Estoque: {product.stock} • Mínimo: {product.minStock}
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{width: `${Math.min((product.stock / product.minStock) * 100, 100)}%`}}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.filter(cat => cat !== 'all').map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Produtos */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos em Estoque</CardTitle>
            <CardDescription>
              {filteredProducts.length} produtos encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProducts.map((product) => {
                const status = getStockStatus(product);
                return (
                  <div key={product.id} className="border rounded-lg p-4 hover:bg-accent">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{product.name}</span>
                          <Badge variant="outline">{product.category}</Badge>
                          <Badge variant={status.color as any}>{status.label}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Fornecedor: {product.supplier} • Preço: R$ {product.price.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Estoque mínimo: {product.minStock} unidades
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{product.stock}</div>
                          <div className="text-xs text-muted-foreground">unidades</div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateStock(product.id, -1)}
                            disabled={product.stock === 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateStock(product.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Barra de progresso do estoque */}
                    <div className="mt-3">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            product.stock <= product.minStock 
                              ? 'bg-orange-500' 
                              : 'bg-primary'
                          }`}
                          style={{width: `${Math.min((product.stock / (product.minStock * 2)) * 100, 100)}%`}}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Inventory;
