import SearchableSelect from '@/components/SearchableSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { useUniversalPayment } from '@/hooks/useUniversalPayment';
import { ArrowLeft, Package, Plus, Receipt, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface CartItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  stock: number;
}

const UnifiedSale = () => {
  const navigate = useNavigate();
  const { navigateToPayment } = useUniversalPayment();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const mockProducts: Product[] = [
    { id: 1, name: 'Cerveja Skol 350ml', price: 4.50, category: 'Bebidas', stock: 45 },
    { id: 2, name: 'Refrigerante Coca 600ml', price: 6.00, category: 'Bebidas', stock: 23 },
    { id: 3, name: 'Água Mineral 500ml', price: 2.50, category: 'Bebidas', stock: 67 },
    { id: 4, name: 'Salgadinho Doritos', price: 8.00, category: 'Lanches', stock: 12 },
    { id: 5, name: 'Sanduíche Natural', price: 12.00, category: 'Lanches', stock: 8 }
  ];

  // Converter produtos para o formato do SearchableSelect
  const productItems = mockProducts.map(product => ({
    value: product.id.toString(),
    label: `${product.name} - R$ ${product.price.toFixed(2)} (${product.stock} disponível)`,
    data: product
  }));

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = discount ? parseFloat(discount) : 0;
  const total = subtotal - discountAmount;

  const handleProductSelect = (item: any) => {
    const product = item.data as Product;
    addProductToCart(product);
  };

  const addProductToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.productName === product.name);
    
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        productName: product.name,
        quantity: 1,
        unitPrice: product.price,
        total: product.price,
        stock: product.stock - 1
      };
      
      setCartItems(prev => [...prev, newItem]);
    }
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    // Verificar se a nova quantidade não excede o estoque disponível
    const maxQuantity = item.stock + item.quantity; // estoque atual + quantidade já no carrinho
    if (newQuantity > maxQuantity) {
      toast({
        title: "Estoque insuficiente",
        description: `Apenas ${maxQuantity} unidades disponíveis.`,
        variant: "destructive"
      });
      return;
    }

    setCartItems(prev =>
      prev.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              quantity: newQuantity, 
              total: newQuantity * item.unitPrice,
              stock: item.stock + item.quantity - newQuantity // ajustar estoque
            }
          : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleFinalizeSale = () => {
    if (!paymentMethod) {
      toast({
        title: "Forma de pagamento obrigatória",
        description: "Selecione a forma de pagamento para finalizar a venda.",
        variant: "destructive"
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione pelo menos um produto para finalizar a venda.",
        variant: "destructive"
      });
      return;
    }

    // Simular criação da venda
    const saleId = Math.random().toString(36).substr(2, 9);
    
    toast({
      title: "Venda finalizada!",
      description: `Venda registrada com sucesso. Total: R$ ${total.toFixed(2)}`,
    });

    // Redirecionar para a página de recebimento universal
    navigateToPayment({
      type: 'bar_sale',
      id: saleId
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
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
                Bar
              </Button>
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-semibold">Venda Unificada</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seção de Produtos e Carrinho */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Produtos</CardTitle>
                <CardDescription>
                  Use o campo abaixo para buscar e adicionar produtos à venda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Buscar Produto</label>
                  <SearchableSelect
                    items={productItems}
                    placeholder="Digite para buscar produtos..."
                    emptyText="Nenhum produto encontrado."
                    onSelect={handleProductSelect}
                    className="w-full"
                  />
                </div>

                <div className="text-xs text-muted-foreground">
                  💡 Dica: Digite o nome do produto para encontrá-lo rapidamente
                </div>
              </CardContent>
            </Card>

            {/* Carrinho de Compras */}
            <Card>
              <CardHeader>
                <CardTitle>Carrinho de Compras</CardTitle>
                <CardDescription>
                  {cartItems.length} itens no carrinho
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Preço Unit.</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="font-medium">{item.productName}</div>
                        </TableCell>
                        <TableCell>R$ {item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <ArrowLeft className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold">R$ {item.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {cartItems.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum item no carrinho
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resumo e Pagamento */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Venda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-orange-600">
                      <span>Desconto:</span>
                      <span>- R$ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Finalizar Venda</CardTitle>
                <CardDescription>
                  Defina os dados para fechamento da venda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Forma de Pagamento *</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                      <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Desconto (R$)</Label>
                  <Input
                    id="discount"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>

                <Button onClick={handleFinalizeSale} className="w-full" size="lg">
                  <Receipt className="h-4 w-4 mr-2" />
                  Finalizar Venda - R$ {total.toFixed(2)}
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" onClick={() => navigate('/bar')}>
                <Package className="h-4 w-4 mr-2" />
                Voltar para Bar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnifiedSale;
