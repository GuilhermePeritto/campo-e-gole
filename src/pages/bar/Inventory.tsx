
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle, ArrowLeft, Minus, Package, Plus, Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';

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
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesCategory;
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

  const columns: BaseListColumn<Product>[] = [
    {
      key: 'name',
      label: 'Produto',
      render: (product) => (
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-muted-foreground">
            <Badge variant="outline">{product.category}</Badge>
          </div>
        </div>
      )
    },
    {
      key: 'supplier',
      label: 'Fornecedor',
      render: (product) => product.supplier
    },
    {
      key: 'price',
      label: 'Preço',
      render: (product) => `R$ ${product.price.toFixed(2)}`
    },
    {
      key: 'stock',
      label: 'Estoque',
      render: (product) => (
        <div className="flex items-center gap-2">
          <span className="font-bold">{product.stock}</span>
          <Badge variant={getStockStatus(product).color as any}>
            {getStockStatus(product).label}
          </Badge>
        </div>
      )
    }
  ];

  const actions: BaseListAction<Product>[] = [
    {
      label: 'Remover',
      icon: <Minus className="h-4 w-4" />,
      onClick: (product) => updateStock(product.id, -1)
    },
    {
      label: 'Adicionar',
      icon: <Plus className="h-4 w-4" />,
      onClick: (product) => updateStock(product.id, 1),
      variant: 'default'
    }
  ];

  const renderProductCard = (product: Product, actions: BaseListAction<Product>[]) => {
    const status = getStockStatus(product);
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.supplier}</CardDescription>
            </div>
            <Badge variant={status.color as any}>{status.label}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{product.category}</Badge>
              <span className="text-sm font-medium">R$ {product.price.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold">{product.stock}</div>
                <div className="text-xs text-muted-foreground">Estoque</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">{product.minStock}</div>
                <div className="text-xs text-muted-foreground">Mínimo</div>
              </div>
            </div>

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

            <div className="flex gap-2 pt-3">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "outline"}
                  size="sm"
                  className="flex-1 gap-1"
                  onClick={() => action.onClick(product)}
                  disabled={action.label === 'Remover' && product.stock === 0}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
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

        {/* Filtro de categoria */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
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

        <BaseList
          data={filteredProducts}
          columns={columns}
          actions={actions}
          title="Produtos em Estoque"
          description={`${filteredProducts.length} produtos encontrados`}
          searchPlaceholder="Buscar produtos por nome..."
          searchFields={['name']}
          getItemId={(product) => product.id}
          pageSize={5}
          renderCard={renderProductCard}
        />
      </main>
    </div>
  );
};

export default Inventory;
