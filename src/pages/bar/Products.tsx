
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  cost: number;
  description: string;
  active: boolean;
}

const Products = () => {
  const navigate = useNavigate();

  const mockProducts: Product[] = [
    { id: 1, name: 'Cerveja Skol 350ml', category: 'Bebidas', price: 4.50, cost: 2.50, description: 'Cerveja Pilsen', active: true },
    { id: 2, name: 'Refrigerante Coca 600ml', category: 'Bebidas', price: 6.00, cost: 3.00, description: 'Refrigerante de Cola', active: true },
    { id: 3, name: 'Água Mineral 500ml', category: 'Bebidas', price: 2.50, cost: 1.00, description: 'Água sem gás', active: true },
    { id: 4, name: 'Salgadinho Doritos', category: 'Lanches', price: 8.00, cost: 4.00, description: 'Salgadinho de milho', active: true },
    { id: 5, name: 'Sanduíche Natural', category: 'Lanches', price: 12.00, cost: 6.00, description: 'Sanduíche de frango', active: false },
    { id: 6, name: 'Cerveja Heineken 350ml', category: 'Bebidas', price: 6.50, cost: 3.50, description: 'Cerveja Premium', active: true }
  ];

  const getStatusColor = (active: boolean) => {
    return active ? 'default' : 'secondary';
  };

  const columns: BaseListColumn<Product>[] = [
    {
      key: 'name',
      label: 'Produto',
      render: (product) => (
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-muted-foreground">{product.description}</div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Categoria',
      render: (product) => (
        <Badge variant="outline">{product.category}</Badge>
      )
    },
    {
      key: 'price',
      label: 'Preço',
      render: (product) => (
        <span className="font-medium text-green-600">R$ {product.price.toFixed(2)}</span>
      )
    },
    {
      key: 'cost',
      label: 'Custo',
      render: (product) => `R$ ${product.cost.toFixed(2)}`
    },
    {
      key: 'margin',
      label: 'Margem',
      render: (product) => {
        const margin = ((product.price - product.cost) / product.price * 100);
        return `${margin.toFixed(1)}%`;
      }
    },
    {
      key: 'active',
      label: 'Status',
      render: (product) => (
        <Badge variant={getStatusColor(product.active)}>
          {product.active ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Product>[] = [
    {
      label: 'Ver detalhes',
      icon: <Eye className="h-4 w-4" />,
      onClick: (product) => console.log('Ver produto', product)
    },
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (product) => navigate(`/bar/produtos/${product.id}/editar`)
    }
  ];

  const renderProductCard = (product: Product, actions: BaseListAction<Product>[]) => {
    const margin = ((product.price - product.cost) / product.price * 100);
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </div>
            <Badge variant={getStatusColor(product.active)}>
              {product.active ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{product.category}</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-3 border-t">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">R$ {product.price.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">Preço</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">R$ {product.cost.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">Custo</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{margin.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Margem</div>
              </div>
            </div>

            <div className="flex gap-2 pt-3">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1"
                  onClick={() => action.onClick(product)}
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

  const activeProducts = mockProducts.filter(p => p.active).length;
  const totalValue = mockProducts.reduce((sum, product) => sum + product.price, 0);
  const averageMargin = mockProducts.reduce((sum, product) => {
    const margin = ((product.price - product.cost) / product.price * 100);
    return sum + margin;
  }, 0) / mockProducts.length;

  return (
    <div className="h-screen flex flex-col bg-background">
      <ModuleHeader
        title="Produtos"
        icon={<Package className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.bar}
        backTo="/bar"
        backLabel="Bar"
      />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 min-h-0">
        {/* Summary Cards - Fixed height */}
        <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Produtos</p>
                  <p className="text-2xl font-bold text-blue-600">{mockProducts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Produtos Ativos</p>
                  <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Margem Média</p>
                  <p className="text-2xl font-bold text-purple-600">{averageMargin.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Package className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                  <p className="text-2xl font-bold text-orange-600">R$ {totalValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BaseList - Flexible height to fill remaining space */}
        <div className="flex-1 min-h-0">
          <BaseList
            data={mockProducts}
            columns={columns}
            actions={actions}
            title="Lista de Produtos"
            description="Gerencie todos os produtos do bar"
            searchPlaceholder="Buscar produtos por nome ou categoria..."
            searchFields={['name', 'category', 'description']}
            getItemId={(product) => product.id}
            pageSize={10}
            renderCard={renderProductCard}
            createButton={{
              label: 'Novo Produto',
              icon: <Plus className="h-4 w-4" />,
              onClick: () => navigate('/bar/produtos/novo')
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Products;
