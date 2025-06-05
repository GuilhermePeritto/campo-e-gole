
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Minus, Plus, Receipt, Search, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

const UnifiedSale = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const saleType = searchParams.get('type') || 'direct'; // 'direct' ou 'comanda'
  const comandaId = searchParams.get('comandaId');
  
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const mockProducts: Product[] = [
    { id: 1, name: 'Cerveja Skol 350ml', price: 4.50, stock: 120, category: 'Bebidas' },
    { id: 2, name: 'Refrigerante Coca 600ml', price: 6.00, stock: 85, category: 'Bebidas' },
    { id: 3, name: 'Água Mineral 500ml', price: 2.50, stock: 150, category: 'Bebidas' },
    { id: 4, name: 'Salgadinho Doritos', price: 8.00, stock: 45, category: 'Lanches' },
    { id: 5, name: 'Sanduíche Natural', price: 12.00, stock: 20, category: 'Lanches' },
    { id: 6, name: 'Hambúrguer Simples', price: 15.00, stock: 30, category: 'Refeições' },
    { id: 7, name: 'Pizza Individual', price: 18.00, stock: 25, category: 'Refeições' }
  ];

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProduct = (product?: Product) => {
    const productToAdd = product || mockProducts.find(p => p.id.toString() === selectedProduct);
    if (!productToAdd) return;

    const existingItem = saleItems.find(item => item.product.id === productToAdd.id);
    
    if (existingItem) {
      setSaleItems(saleItems.map(item => 
        item.product.id === productToAdd.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSaleItems([...saleItems, { product: productToAdd, quantity: 1 }]);
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
        description: "Adicione pelo menos um produto.",
        variant: "destructive"
      });
      return;
    }

    if (saleType === 'direct' && !paymentMethod) {
      toast({
        title: "Erro",
        description: "Selecione um método de pagamento para venda direta.",
        variant: "destructive"
      });
      return;
    }

    if (saleType === 'comanda' && !clientName.trim()) {
      toast({
        title: "Erro",
        description: "Informe o nome do cliente para a comanda.",
        variant: "destructive"
      });
      return;
    }

    const action = saleType === 'direct' ? 'Venda realizada' : comandaId ? 'Comanda atualizada' : 'Comanda criada';
    
    toast({
      title: `${action} com sucesso!`,
      description: `Total: R$ ${getTotal().toFixed(2)}`,
    });

    if (saleType === 'comanda') {
      navigate('/bar/comandas');
    } else {
      navigate('/bar/conferir', { 
        state: { 
          items: saleItems, 
          total: getTotal(),
          type: 'direct-sale'
        }
      });
    }
  };

  const getTitle = () => {
    if (saleType === 'comanda') {
      return comandaId ? 'Adicionar à Comanda' : 'Nova Comanda';
    }
    return 'Nova Venda';
  };

  const getIcon = () => {
    return saleType === 'comanda' ? <Receipt className="h-6 w-6 text-green-600" /> : <ShoppingCart className="h-6 w-6 text-green-600" />;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/bar')}
              className="gap-2 text-gray-900 dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              {getIcon()}
              <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-300">{getTitle()}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seleção de Produtos */}
          <div className="lg:col-span-2">
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-300">Produtos</CardTitle>
                <CardDescription className="text-gray-900 dark:text-gray-300">
                  Selecione produtos para adicionar
                </CardDescription>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-900 dark:text-gray-300" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="bebidas">Bebidas</TabsTrigger>
                    <TabsTrigger value="lanches">Lanches</TabsTrigger>
                    <TabsTrigger value="refeicoes">Refeições</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredProducts.map((product) => (
                        <div 
                          key={product.id} 
                          className="flex items-center justify-between p-4 border border rounded-lg hover:bg-muted cursor-pointer"
                          onClick={() => addProduct(product)}
                        >
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-gray-300">{product.name}</div>
                            <div className="text-sm text-gray-900 dark:text-gray-300">
                              R$ {product.price.toFixed(2)} • Estoque: {product.stock}
                            </div>
                            <Badge variant="secondary" className="mt-1">
                              {product.category}
                            </Badge>
                          </div>
                          <Button size="sm" variant='outline' className="text-gray-900 dark:text-gray-300">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {['bebidas', 'lanches', 'refeicoes'].map((category) => (
                    <TabsContent key={category} value={category} className="mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredProducts
                          .filter(p => p.category.toLowerCase() === category)
                          .map((product) => (
                            <div 
                              key={product.id} 
                              className="flex items-center justify-between p-4 border border rounded-lg hover:bg-muted cursor-pointer"
                              onClick={() => addProduct(product)}
                            >
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 dark:text-gray-300">{product.name}</div>
                                <div className="text-sm text-gray-900 dark:text-gray-300">
                                  R$ {product.price.toFixed(2)} • Estoque: {product.stock}
                                </div>
                              </div>
                              <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Carrinho/Comanda */}
          <div>
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-300">
                  {saleType === 'comanda' ? 'Itens da Comanda' : 'Carrinho de Venda'}
                </CardTitle>
                <CardDescription className="text-gray-900 dark:text-gray-300">
                  {saleItems.length} {saleItems.length === 1 ? 'item' : 'itens'} selecionados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Informações da Comanda/Venda */}
                {saleType === 'comanda' && (
                  <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="clientName" className="text-gray-900 dark:text-gray-300">Nome do Cliente *</Label>
                      <Input
                        id="clientName"
                        placeholder="Nome do cliente"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tableNumber" className="text-gray-900 dark:text-gray-300">Mesa (opcional)</Label>
                      <Input
                        id="tableNumber"
                        placeholder="Número da mesa"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="border"
                      />
                    </div>
                  </div>
                )}

                {/* Lista de Itens */}
                {saleItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Nenhum produto adicionado
                  </div>
                ) : (
                  <div className="space-y-4">
                    {saleItems.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between p-3 border border rounded">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-gray-300">{item.product.name}</div>
                          <div className="text-sm text-gray-900 dark:text-gray-300">
                            R$ {item.product.price.toFixed(2)} cada
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="border"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="border"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.product.id)}
                            className="border text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="w-20 text-right font-medium text-gray-900 dark:text-gray-300">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}

                    <div className="border-t border pt-4">
                      <div className="flex justify-between text-xl font-semibold text-gray-900 dark:text-gray-300">
                        <span>Total:</span>
                        <span>R$ {getTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Pagamento (apenas para venda direta) */}
                    {saleType === 'direct' && (
                      <div className="space-y-4 pt-4 border-t border">
                        <div className="space-y-2">
                          <Label htmlFor="paymentMethod" className="text-gray-900 dark:text-gray-300">Método de Pagamento</Label>
                          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                            <SelectTrigger className="border">
                              <SelectValue placeholder="Selecione o método" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash">Dinheiro</SelectItem>
                              <SelectItem value="card">Cartão</SelectItem>
                              <SelectItem value="pix">PIX</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <Button 
                      onClick={handleFinalizeSale} 
                      className="w-full bg-black text-white hover:bg-gray-800" 
                      size="lg"
                    >
                      {saleType === 'direct' ? 'Finalizar Venda' : comandaId ? 'Atualizar Comanda' : 'Criar Comanda'}
                    </Button>
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

export default UnifiedSale;
