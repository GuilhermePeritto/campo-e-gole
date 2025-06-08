import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useUniversalPayment } from '@/hooks/useUniversalPayment';

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

  const mockProducts: Product[] = [
    { id: 1, name: 'Cerveja Skol 350ml', price: 4.50, stock: 120, category: 'Bebidas' },
    { id: 2, name: 'Refrigerante Coca 600ml', price: 6.00, stock: 85, category: 'Bebidas' },
    { id: 3, name: 'Água Mineral 500ml', price: 2.50, stock: 150, category: 'Bebidas' },
    { id: 4, name: 'Salgadinho Doritos', price: 8.00, stock: 45, category: 'Lanches' },
    { id: 5, name: 'Sanduíche Natural', price: 12.00, stock: 20, category: 'Lanches' }
  ];

  const addProduct = () => {
    if (!selectedProduct) return;
    
    const product = mockProducts.find(p => p.id.toString() === selectedProduct);
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

    // Criar um ID único para a venda
    const saleId = Date.now().toString();
    
    // Navegar para o sistema de pagamento universal
    navigateToPayment({
      type: 'bar_sale',
      id: saleId
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
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
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold">Nova Venda</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seleção de Produtos */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Produtos</CardTitle>
              <CardDescription>
                Selecione produtos para adicionar à venda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} - R$ {product.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addProduct} disabled={!selectedProduct}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Produtos Disponíveis</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {mockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-2 border rounded hover:bg-accent cursor-pointer"
                         onClick={() => setSelectedProduct(product.id.toString())}>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          R$ {product.price.toFixed(2)} • Estoque: {product.stock}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carrinho */}
          <Card>
            <CardHeader>
              <CardTitle>Carrinho de Venda</CardTitle>
              <CardDescription>
                Itens selecionados para a venda
              </CardDescription>
            </CardHeader>
            <CardContent>
              {saleItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum produto adicionado
                </div>
              ) : (
                <div className="space-y-4">
                  {saleItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          R$ {item.product.price.toFixed(2)} cada
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
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
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="w-20 text-right font-medium">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span>R$ {getTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <Button onClick={handleFinalizeSale} className="w-full" size="lg">
                    Finalizar Venda - R$ {getTotal().toFixed(2)}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NewSale;
