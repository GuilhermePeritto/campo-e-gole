
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Edit, Minus, Package, Plus, Receipt, Trash2, User, MapPin, Clock } from 'lucide-react';
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

const ComandaForm = () => {
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
    if (stock <= 5) return 'text-red-600';
    if (stock <= 15) return 'text-orange-500';
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header com design moderno */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/bar/comandas')}
                className="gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl shadow-lg">
                  <Receipt className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    {isNewComanda ? 'Nova Comanda' : `Comanda ${comanda.number}`}
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {isNewComanda ? 'Criar novo pedido' : 'Editar pedido existente'}
                  </p>
                </div>
              </div>
            </div>
            {!isNewComanda && (
              <Badge 
                variant="secondary" 
                className="bg-green-100 text-green-800 border-green-200 font-medium px-3 py-1"
              >
                {comanda.status}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Main content com grid responsivo */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageTour steps={tourSteps} title={isNewComanda ? "Criação de Nova Comanda" : "Edição de Comanda"} />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Coluna principal - Informações e Itens */}
          <div className="xl:col-span-2 space-y-8">
            {/* Card de informações do cliente com design moderno */}
            <Card className="comanda-info bg-white dark:bg-slate-800 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-t-2xl p-5">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <User className="h-5 w-5" />
                  Informações do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <User className="h-4 w-4" />
                      Cliente
                    </Label>
                    <Input
                      value={comanda.client}
                      onChange={(e) => setComanda(prev => ({...prev, client: e.target.value}))}
                      placeholder="Nome do cliente"
                      className="border-slate-200 dark:border-slate-600 bg-transparent focus:border-orange-400 focus:ring-orange-400"
                      disabled={!isNewComanda}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <MapPin className="h-4 w-4" />
                      Mesa
                    </Label>
                    <Input
                      value={comanda.table}
                      onChange={(e) => setComanda(prev => ({...prev, table: e.target.value}))}
                      placeholder="Número da mesa"
                      className="border-slate-200 dark:border-slate-600 bg-transparent focus:border-orange-400 focus:ring-orange-400"
                      disabled={!isNewComanda}
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Aberto em: {comanda.openTime}</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {comanda.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Card de adicionar produtos */}
            <Card className="add-items-section bg-white dark:bg-slate-800 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-t-2xl p-5">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Plus className="h-5 w-5" />
                  Adicionar Produtos
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Busque e adicione produtos ao pedido
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <SearchableSelect
                  items={productItems}
                  placeholder="Digite o nome do produto para buscar..."
                  emptyText="Nenhum produto encontrado."
                  onSelect={handleProductSelect}
                  className="w-full"
                />
                <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-500/30">
                  <p className="text-sm text-orange-700 dark:text-orange-300 flex items-center gap-2">
                    💡 <span>Dica: Use a busca para encontrar produtos rapidamente</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tabela de itens com design moderno */}
            <Card className="items-table bg-white dark:bg-slate-800 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-t-2xl p-5">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Package className="h-5 w-5" />
                  Itens do Pedido ({comanda.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {comanda.items.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50 dark:bg-slate-700/50">
                          <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Produto</TableHead>
                          <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Estoque</TableHead>
                          <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Preço Unit.</TableHead>
                          <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Quantidade</TableHead>
                          <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Total</TableHead>
                          <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {comanda.items.map((item) => (
                          <TableRow key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-b-0">
                            <TableCell>
                              <span className="font-medium text-slate-900 dark:text-slate-100">{item.productName}</span>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStockBadgeVariant(item.stock)} className="gap-1">
                                <Package className="h-3 w-3" />
                                <span className={getStockColor(item.stock)}>
                                  {item.stock}
                                </span>
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium text-slate-700 dark:text-slate-300">R$ {item.unitPrice.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={comanda.status !== 'Aberta'}
                                  className="h-8 w-8 rounded-full border-slate-300 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-600 hover:text-red-600"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center font-medium text-slate-800 dark:text-slate-200">{item.quantity}</span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={comanda.status !== 'Aberta' || item.stock === 0}
                                  className="h-8 w-8 rounded-full border-slate-300 dark:border-slate-600 hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-300 dark:hover:border-green-600 hover:text-green-600"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="font-bold text-green-600 dark:text-green-500">R$ {item.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => removeItem(item.id)}
                                disabled={comanda.status !== 'Aberta'}
                                className="h-8 w-8 border-red-300 text-red-600 hover:bg-red-50 dark:border-red-500/50 dark:hover:bg-red-900/30 dark:text-red-500"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Nenhum item adicionado ao pedido</p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm">Use a busca acima para adicionar produtos</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar direita - Resumo e ações */}
          <div className="space-y-8">
            {/* Card de resumo financeiro */}
            <Card className="summary-section bg-white dark:bg-slate-800 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-t-2xl p-5">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Receipt className="h-5 w-5" />
                  Resumo Financeiro
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">Subtotal</span>
                    <span className="font-semibold text-lg text-slate-800 dark:text-slate-100">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-orange-600 dark:text-orange-400">
                      <span>Desconto</span>
                      <span className="font-semibold">- R$ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-slate-900 dark:text-white">Total</span>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-500">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card de ações */}
            {comanda.status === 'Aberta' && (
              <Card className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-2xl p-5">
                  <CardTitle className="text-lg">
                    {isNewComanda ? 'Salvar Comanda' : 'Finalizar Pedido'}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {isNewComanda ? 'Criar nova comanda' : 'Definir pagamento e fechar'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {!isNewComanda && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Forma de Pagamento</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger className="border-slate-200 dark:border-slate-600 bg-transparent focus:border-orange-400 focus:ring-orange-400">
                            <SelectValue placeholder="Selecionar forma de pagamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dinheiro">💵 Dinheiro</SelectItem>
                            <SelectItem value="cartao_debito">💳 Cartão de Débito</SelectItem>
                            <SelectItem value="cartao_credito">💳 Cartão de Crédito</SelectItem>
                            <SelectItem value="pix">📱 PIX</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Desconto (R$)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                          className="border-slate-200 dark:border-slate-600 bg-transparent focus:border-orange-400 focus:ring-orange-400"
                        />
                      </div>
                    </>
                  )}

                  {isNewComanda ? (
                    <Button 
                      onClick={handleSaveComanda} 
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg" 
                      size="lg"
                    >
                      <Receipt className="h-4 w-4 mr-2" />
                      Criar Comanda
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleCloseComanda} 
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg" 
                      size="lg"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Finalizar - R$ {total.toFixed(2)}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Card de navegação */}
            <Card className="bg-transparent shadow-none border-none">
              <CardContent className="p-4 space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/bar/comandas')}
                  className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Ver Todas as Comandas
                </Button>
                {!isNewComanda && (
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/bar/comandas/novo')}
                    className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-500/50 dark:text-orange-400 dark:hover:bg-orange-900/20"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Comanda
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComandaForm;
