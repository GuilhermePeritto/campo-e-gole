import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Minus, ShoppingCart, Trash2, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useUniversalPayment } from '@/hooks/useUniversalPayment';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface SaleItem {
  product: Product;
  quantity: number;
}

const NewSale = () => {
  const navigate = useNavigate();
  const { navigateToPayment } = useUniversalPayment();
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const mockProducts: Product[] = [
    { id: 1, name: 'Cerveja Skol 350ml', price: 4.50, stock: 120, category: 'Bebidas' },
    { id: 2, name: 'Refrigerante Coca 600ml', price: 6.00, stock: 85, category: 'Bebidas' },
    { id: 3, name: 'Água Mineral 500ml', price: 2.50, stock: 150, category: 'Bebidas' },
    { id: 4, name: 'Salgadinho Doritos', price: 8.00, stock: 45, category: 'Lanches' },
    { id: 5, name: 'Sanduíche Natural', price: 12.00, stock: 20, category: 'Lanches' }
  ];

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProduct = (productId?: number) => {
    const id = productId || parseInt(selectedProduct);
    if (!id) return;
    
    const product = mockProducts.find(p => p.id === id);
    if (!product) return;

    const existingItem = saleItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setSaleItems(saleItems.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSaleItems([...saleItems, { product, quantity: 1 }]);
    }
    setSelectedProduct('');
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setSaleItems(saleItems.map(item => 
      item.product.id === productId 
        ? { ...item, quantity }
        : item
    ));
  };

  const removeItem = (productId: number) => {
    setSaleItems(saleItems.filter(item => item.product.id !== productId));
  };

  const getTotal = () => {
    return saleItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleFinalizeSale = () => {
    if (saleItems.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um produto à venda.",
        variant: "destructive"
      });
      return;
    }

    const saleId = Date.now().toString();
    navigateToPayment({
      type: 'bar_sale',
      id: saleId
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Nova Venda"
        icon={<ShoppingCart className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.bar}
        backTo="/bar"
        backLabel="Bar"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Produtos */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Produtos</CardTitle>
                <CardDescription>
                  Busque e adicione produtos à venda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex-1">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          R$ {product.price.toFixed(2)} • {product.category} • Estoque: {product.stock}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addProduct(product.id)}
                        className="shrink-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carrinho */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Carrinho</span>
                  <span className="text-lg font-bold text-primary">
                    R$ {getTotal().toFixed(2)}
                  </span>
                </CardTitle>
                <CardDescription>
                  {saleItems.length} {saleItems.length === 1 ? 'item' : 'itens'} selecionados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {saleItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum produto adicionado</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="max-h-64 overflow-y-auto space-y-3">
                      {saleItems.map((item) => (
                        <div key={item.product.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{item.product.name}</div>
                            <div className="text-sm text-muted-foreground">
                              R$ {item.product.price.toFixed(2)} cada
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(item.product.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>R$ {getTotal().toFixed(2)}</span>
                      </div>
                      <Button onClick={handleFinalizeSale} className="w-full" size="lg">
                        Finalizar Venda
                      </Button>
                    </div>
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

export default NewSale;
