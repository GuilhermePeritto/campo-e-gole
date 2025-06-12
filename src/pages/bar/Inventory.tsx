
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle, Minus, Package, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

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

  const mockProducts: Product[] = [
    { id: 1, name: 'Cerveja Skol 350ml', category: 'Bebidas', stock: 8, minStock: 20, price: 4.50, supplier: 'Distribuidora ABC' },
    { id: 2, name: 'Refrigerante Coca 600ml', category: 'Bebidas', stock: 12, minStock: 25, price: 6.00, supplier: 'Coca-Cola' },
    { id: 3, name: 'Água Mineral 500ml', category: 'Bebidas', stock: 5, minStock: 30, price: 2.50, supplier: 'Águas do Brasil' },
    { id: 4, name: 'Salgadinho Doritos', category: 'Lanches', stock: 45, minStock: 20, price: 8.00, supplier: 'Elma Chips' },
    { id: 5, name: 'Sanduíche Natural', category: 'Lanches', stock: 20, minStock: 10, price: 12.00, supplier: 'Padaria Local' },
    { id: 6, name: 'Cerveja Heineken 350ml', category: 'Bebidas', stock: 35, minStock: 15, price: 6.50, supplier: 'Distribuidora ABC' }
  ];

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
    <div className="h-screen flex flex-col bg-background">
      <ModuleHeader
        title="Controle de Estoque"
        icon={<Package className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.bar}
        backTo="/bar"
        backLabel="Bar"
      />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 min-h-0">
        {/* Alertas de Estoque Baixo - Fixed height */}
        {lowStockProducts.length > 0 && (
          <Card className="flex-shrink-0 mb-6 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
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

        {/* BaseList - Flexible height to fill remaining space */}
        <div className="flex-1 min-h-0">
          <BaseList
            data={mockProducts}
            columns={columns}
            actions={actions}
            title="Produtos em Estoque"
            description={`${mockProducts.length} produtos encontrados`}
            searchPlaceholder="Buscar produtos por nome..."
            searchFields={['name']}
            getItemId={(product) => product.id}
            pageSize={5}
            renderCard={renderProductCard}
          />
        </div>
      </main>
    </div>
  );
};

export default Inventory;
