import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Edit, Minus, Package, Plus, Receipt, Trash2, Search, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PageTour, { TourStep } from '@/components/PageTour';
import SearchableSelect from '@/components/SearchableSelect';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface ComandaItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  stock: number;
}

const ViewComanda = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Declarar os estados para desconto e método de pagamento
  const [discount, setDiscount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Detectar criação de nova comanda em diferentes rotas possíveis
  const isNewComanda =
    id === 'new' ||
    id === 'novo' ||
    location.pathname === '/bar/comandas/novo' ||
    location.pathname === '/bar/comandas/new' ||
    location.pathname === '/bar/venda/novo' ||
    location.pathname === '/bar/vendas/novo' ||
    location.pathname === '/bar/nova-venda';

  const tourSteps: TourStep[] = [
    {
      target: '.comanda-info',
      title: 'Informações da Comanda',
      content: isNewComanda ? 'Para uma nova comanda, você pode editar o cliente e mesa aqui.' : 'Aqui você vê as informações básicas da comanda como cliente, mesa e horário de abertura.'
    },
    {
      target: '.add-items-section',
      title: 'Adicionar Itens',
      content: 'Use este botão para adicionar novos produtos à comanda.'
    },
    {
      target: '.items-table',
      title: 'Itens da Comanda',
      content: 'Aqui você vê todos os itens da comanda, pode ajustar quantidades e remover itens.'
    },
    {
      target: '.summary-section',
      title: 'Resumo e Pagamento',
      content: 'Aqui você vê o total da comanda e pode aplicar desconto e definir forma de pagamento.'
    }
  ];

  // Mock data - normalmente viria de uma API
  const [comanda, setComanda] = useState({
    id: isNewComanda ? null : 1,
    number: isNewComanda ? 'Nova Comanda' : 'CMD001',
    client: isNewComanda ? '' : 'João Silva',
    table: isNewComanda ? '' : 'Mesa 03',
    status: 'Aberta',
    openTime: isNewComanda ? new Date().toLocaleString('pt-BR') : '2024-06-05 19:30',
    items: isNewComanda ? [] : [
      { id: 1, productName: 'Cerveja Skol 350ml', quantity: 2, unitPrice: 4.50, total: 9.00, stock: 43 },
      { id: 2, productName: 'Sanduíche Natural', quantity: 1, unitPrice: 12.00, total: 12.00, stock: 7 },
      { id: 3, productName: 'Refrigerante Coca 600ml', quantity: 1, unitPrice: 6.00, total: 6.00, stock: 22 }
    ] as ComandaItem[]
  });

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

  const subtotal = comanda.items.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = discount ? parseFloat(discount) : 0;
  const total = subtotal - discountAmount;

  const getStockColor = (stock: number) => {
    if (stock <= 5) return 'text-destructive';
    if (stock <= 15) return 'text-orange-600';
    return 'text-green-600';
  };

  const getStockBadgeVariant = (stock: number) => {
    if (stock <= 5) return 'destructive';
    if (stock <= 15) return 'secondary';
    return 'outline';
  };

  const handleProductSelect = (item: any) => {
    const product = item.data as Product;
    addProductToComanda(product);
  };

  const addProductToComanda = (product: Product) => {
    const existingItem = comanda.items.find(item => item.productName === product.name);
    
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const newItem: ComandaItem = {
        id: Date.now(),
        productName: product.name,
        quantity: 1,
        unitPrice: product.price,
        total: product.price,
        stock: product.stock - 1
      };
      
      setComanda(prev => ({
        ...prev,
        items: [...prev.items, newItem]
      }));
    }
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    const item = comanda.items.find(item => item.id === itemId);
    if (!item) return;

    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    // Verificar se a nova quantidade não excede o estoque disponível
    const maxQuantity = item.stock + item.quantity; // estoque atual + quantidade já na comanda
    if (newQuantity > maxQuantity) {
      toast({
        title: "Estoque insuficiente",
        description: `Apenas ${maxQuantity} unidades disponíveis.`,
        variant: "destructive"
      });
      return;
    }

    setComanda(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              quantity: newQuantity, 
              total: newQuantity * item.unitPrice,
              stock: item.stock + item.quantity - newQuantity // ajustar estoque
            }
          : item
      )
    }));
  };

  const removeItem = (itemId: number) => {
    const item = comanda.items.find(item => item.id === itemId);
    if (item) {
      setComanda(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== itemId)
      }));
    }
  };

  const handleSaveComanda = () => {
    if (isNewComanda) {
      if (!comanda.client.trim()) {
        toast({
          title: "Cliente obrigatório",
          description: "Informe o nome do cliente ou mesa.",
          variant: "destructive"
        });
        return;
      }

      if (comanda.items.length === 0) {
        toast({
          title: "Adicione produtos",
          description: "A comanda deve ter pelo menos um produto.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Comanda criada!",
        description: `Comanda para ${comanda.client} foi criada com sucesso.`,
      });
    } else {
      toast({
        title: "Comanda atualizada!",
        description: `Comanda ${comanda.number} foi atualizada com sucesso.`,
      });
    }
    navigate('/bar/comandas');
  };

  const handleCloseComanda = () => {
    if (!paymentMethod) {
      toast({
        title: "Forma de pagamento obrigatória",
        description: "Selecione a forma de pagamento para fechar a comanda.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Comanda fechada!",
      description: `Comanda ${comanda.number} fechada com sucesso. Total: R$ ${total.toFixed(2)}`,
    });
    navigate('/bar/comandas');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberta': return 'bg-green-100 text-green-800';
      case 'Fechada': return 'bg-orange-100 text-orange-800';
      case 'Paga': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                onClick={() => navigate('/bar/comandas')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Comandas
              </Button>
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-semibold">
                  {isNewComanda ? 'Nova Comanda' : `Comanda ${comanda.number}`}
                </h1>
              </div>
            </div>
            {!isNewComanda && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(comanda.status)}`}>
                {comanda.status}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações da Comanda */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="comanda-info relative">
              <PageTour steps={tourSteps} title={isNewComanda ? "Criação de Nova Comanda" : "Visualização de Comanda"} />
              
              <CardHeader>
                <CardTitle>Informações da Comanda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="font-medium text-muted-foreground">Cliente</Label>
                    {isNewComanda ? (
                      <Input
                        value={comanda.client}
                        onChange={(e) => setComanda(prev => ({...prev, client: e.target.value}))}
                        placeholder="Nome do cliente"
                        className="mt-1"
                      />
                    ) : (
                      <div className="font-medium">{comanda.client}</div>
                    )}
                  </div>
                  <div>
                    <Label className="font-medium text-muted-foreground">Mesa</Label>
                    {isNewComanda ? (
                      <Input
                        value={comanda.table}
                        onChange={(e) => setComanda(prev => ({...prev, table: e.target.value}))}
                        placeholder="Mesa"
                        className="mt-1"
                      />
                    ) : (
                      <div className="font-medium">{comanda.table}</div>
                    )}
                  </div>
                  <div>
                    <Label className="font-medium text-muted-foreground">Abertura</Label>
                    <div className="font-medium">{comanda.openTime}</div>
                  </div>
                  <div>
                    <Label className="font-medium text-muted-foreground">Status</Label>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(comanda.status)}`}>
                      {comanda.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seção Adicionar Itens - Melhorada */}
            <div className="add-items-section">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Produtos</CardTitle>
                  <CardDescription>
                    Use o campo abaixo para buscar e adicionar produtos à comanda
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
            </div>

            {/* Itens da Comanda */}
            <Card className="items-table">
              <CardHeader>
                <CardTitle>Itens da Comanda</CardTitle>
                <CardDescription>
                  {comanda.items.length} itens na comanda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead>Preço Unit.</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comanda.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="font-medium">{item.productName}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStockBadgeVariant(item.stock)} className="gap-1">
                            <Package className="h-3 w-3" />
                            <span className={getStockColor(item.stock)}>
                              {item.stock}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>R$ {item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={comanda.status !== 'Aberta'}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={comanda.status !== 'Aberta' || item.stock === 0}
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
                            disabled={comanda.status !== 'Aberta'}
                            className="text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {comanda.items.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum item na comanda
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resumo e Pagamento */}
          <div className="space-y-6 summary-section">
            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
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

            {comanda.status === 'Aberta' && (
              <Card>
                <CardHeader>
                  <CardTitle>{isNewComanda ? 'Salvar Comanda' : 'Fechar Comanda'}</CardTitle>
                  <CardDescription>
                    {isNewComanda ? 'Salve a comanda para continuar' : 'Defina os dados para fechamento'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isNewComanda && (
                    <>
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
                    </>
                  )}

                  {isNewComanda ? (
                    <Button onClick={handleSaveComanda} className="w-full" size="lg">
                      <Receipt className="h-4 w-4 mr-2" />
                      Salvar Comanda
                    </Button>
                  ) : (
                    <Button onClick={handleCloseComanda} className="w-full" size="lg">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Fechar Comanda - R$ {total.toFixed(2)}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" onClick={() => navigate('/bar/comandas')}>
                <Edit className="h-4 w-4 mr-2" />
                Voltar para Comandas
              </Button>
              {!isNewComanda && (
                <Button variant="outline" onClick={() => navigate('/bar/comandas/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Comanda
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewComanda;
