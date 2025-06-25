
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet';
import {
    BarChart3,
    Calendar,
    ClipboardList,
    Clock,
    CreditCard,
    DollarSign,
    FileText,
    GraduationCap,
    MapPin,
    Package,
    PieChart,
    Receipt,
    Search,
    Settings,
    Shield,
    ShoppingCart,
    TrendingUp,
    User,
    UserCheck,
    UserPlus,
    Users2
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuickSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  module: string;
  keywords: string[];
}

const QuickSearch: React.FC<QuickSearchProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const menuItems: MenuItem[] = [
    // Inicio
    { id: 'inicio', title: 'Inicio', path: '/painel', icon: <BarChart3 className="h-4 w-4" />, module: 'Inicio', keywords: ['inicio', 'painel', 'inicio'] },
    
    // Eventos
    { id: 'events', title: 'Eventos', path: '/eventos', icon: <Calendar className="h-4 w-4" />, module: 'Eventos', keywords: ['eventos', 'reservas', 'agenda'] },
    { id: 'calendar', title: 'Calendário', path: '/eventos/agenda', icon: <Calendar className="h-4 w-4" />, module: 'Eventos', keywords: ['calendario', 'agenda', 'eventos'] },
    { id: 'venues', title: 'Locais', path: '/eventos/locais', icon: <MapPin className="h-4 w-4" />, module: 'Eventos', keywords: ['locais', 'quadras', 'espacos'] },
    { id: 'clients', title: 'Clientes', path: '/eventos/clientes', icon: <Users2 className="h-4 w-4" />, module: 'Eventos', keywords: ['clientes', 'usuarios'] },
    { id: 'new-client', title: 'Novo Cliente', path: '/eventos/clientes/novo', icon: <UserPlus className="h-4 w-4" />, module: 'Eventos', keywords: ['cliente', 'novo', 'adicionar'] },
    { id: 'reservations', title: 'Nova Reserva', path: '/eventos/reserva/novo', icon: <Calendar className="h-4 w-4" />, module: 'Eventos', keywords: ['reserva', 'nova', 'agendar'] },
    { id: 'receivables', title: 'Contas a Receber', path: '/eventos/recebiveis', icon: <CreditCard className="h-4 w-4" />, module: 'Eventos', keywords: ['recebiveis', 'contas', 'receber'] },
    { id: 'events-reports', title: 'Relatórios Eventos', path: '/eventos/relatorios', icon: <FileText className="h-4 w-4" />, module: 'Eventos', keywords: ['relatorios', 'eventos'] },

    // Bar
    { id: 'bar', title: 'Bar', path: '/bar', icon: <BarChart3 className="h-4 w-4" />, module: 'Bar', keywords: ['bar', 'vendas', 'estoque'] },
    { id: 'products', title: 'Produtos', path: '/bar/produtos', icon: <Package className="h-4 w-4" />, module: 'Bar', keywords: ['produtos', 'estoque', 'itens'] },
    { id: 'new-product', title: 'Novo Produto', path: '/bar/produtos/novo', icon: <Package className="h-4 w-4" />, module: 'Bar', keywords: ['produto', 'novo', 'adicionar'] },
    { id: 'inventory', title: 'Estoque', path: '/bar/estoque', icon: <Package className="h-4 w-4" />, module: 'Bar', keywords: ['estoque', 'inventario'] },
    { id: 'comandas', title: 'Comandas', path: '/bar/comandas', icon: <ClipboardList className="h-4 w-4" />, module: 'Bar', keywords: ['comandas', 'pedidos'] },
    { id: 'new-comanda', title: 'Nova Comanda', path: '/bar/comandas/novo', icon: <ClipboardList className="h-4 w-4" />, module: 'Bar', keywords: ['comanda', 'nova', 'pedido'] },
    { id: 'new-sale', title: 'Nova Venda', path: '/bar/vendas/novo', icon: <ShoppingCart className="h-4 w-4" />, module: 'Bar', keywords: ['venda', 'nova', 'caixa'] },
    { id: 'unified-sale', title: 'Venda Unificada', path: '/bar/vendas/unificada', icon: <ShoppingCart className="h-4 w-4" />, module: 'Bar', keywords: ['venda', 'unificada'] },
    { id: 'checkout', title: 'Checkout', path: '/bar/checkout', icon: <Receipt className="h-4 w-4" />, module: 'Bar', keywords: ['checkout', 'finalizar'] },
    { id: 'bar-reports', title: 'Relatórios Bar', path: '/bar/relatorios', icon: <TrendingUp className="h-4 w-4" />, module: 'Bar', keywords: ['relatorios', 'bar'] },

    // Escolinha
    { id: 'school', title: 'Escolinha', path: '/escolinha', icon: <Users2 className="h-4 w-4" />, module: 'Escolinha', keywords: ['escolinha', 'escola', 'alunos'] },
    { id: 'classes', title: 'Turmas', path: '/escolinha/turmas', icon: <Users2 className="h-4 w-4" />, module: 'Escolinha', keywords: ['turmas', 'classes'] },
    { id: 'new-class', title: 'Nova Turma', path: '/escolinha/turmas/novo', icon: <Users2 className="h-4 w-4" />, module: 'Escolinha', keywords: ['turma', 'nova', 'classe'] },
    { id: 'students', title: 'Alunos', path: '/escolinha/alunos', icon: <GraduationCap className="h-4 w-4" />, module: 'Escolinha', keywords: ['alunos', 'estudantes'] },
    { id: 'new-student', title: 'Novo Aluno', path: '/escolinha/alunos/novo', icon: <GraduationCap className="h-4 w-4" />, module: 'Escolinha', keywords: ['aluno', 'novo', 'estudante'] },
    { id: 'teachers', title: 'Professores', path: '/escolinha/professores', icon: <UserCheck className="h-4 w-4" />, module: 'Escolinha', keywords: ['professores', 'instrutores'] },
    { id: 'new-teacher', title: 'Novo Professor', path: '/escolinha/professores/novo', icon: <UserCheck className="h-4 w-4" />, module: 'Escolinha', keywords: ['professor', 'novo', 'instrutor'] },
    { id: 'attendance', title: 'Chamada', path: '/escolinha/chamada', icon: <Clock className="h-4 w-4" />, module: 'Escolinha', keywords: ['chamada', 'presenca'] },
    { id: 'public-attendance', title: 'Chamada Pública', path: '/escolinha/chamada-publica', icon: <Clock className="h-4 w-4" />, module: 'Escolinha', keywords: ['chamada', 'publica', 'presenca'] },
    { id: 'payments', title: 'Pagamentos', path: '/escolinha/pagamentos', icon: <Receipt className="h-4 w-4" />, module: 'Escolinha', keywords: ['pagamentos', 'mensalidades'] },
    { id: 'school-receive-payment', title: 'Receber Pagamento', path: '/escolinha/receber-pagamento', icon: <Receipt className="h-4 w-4" />, module: 'Escolinha', keywords: ['receber', 'pagamento', 'escola'] },
    { id: 'school-reports', title: 'Relatórios Escola', path: '/escolinha/relatorios', icon: <FileText className="h-4 w-4" />, module: 'Escolinha', keywords: ['relatorios', 'escola'] },

    // Financeiro
    { id: 'financial', title: 'Financeiro', path: '/financeiro', icon: <DollarSign className="h-4 w-4" />, module: 'Financeiro', keywords: ['financeiro', 'contas', 'dinheiro'] },
    { id: 'revenues', title: 'Receitas', path: '/financeiro/receitas', icon: <TrendingUp className="h-4 w-4" />, module: 'Financeiro', keywords: ['receitas', 'entradas'] },
    { id: 'new-revenue', title: 'Nova Receita', path: '/financeiro/receitas/novo', icon: <TrendingUp className="h-4 w-4" />, module: 'Financeiro', keywords: ['receita', 'nova', 'entrada'] },
    { id: 'expenses', title: 'Despesas', path: '/financeiro/despesas', icon: <Receipt className="h-4 w-4" />, module: 'Financeiro', keywords: ['despesas', 'gastos'] },
    { id: 'new-expense', title: 'Nova Despesa', path: '/financeiro/despesas/novo', icon: <Receipt className="h-4 w-4" />, module: 'Financeiro', keywords: ['despesa', 'nova', 'gasto'] },
    { id: 'accounts-receivable', title: 'Contas a Receber', path: '/financeiro/contas-a-receber', icon: <CreditCard className="h-4 w-4" />, module: 'Financeiro', keywords: ['contas', 'receber', 'receitas'] },
    { id: 'accounts-payable', title: 'Contas a Pagar', path: '/financeiro/contas-a-pagar', icon: <Receipt className="h-4 w-4" />, module: 'Financeiro', keywords: ['contas', 'pagar', 'despesas'] },
    { id: 'cash-flow', title: 'Fluxo de Caixa', path: '/financeiro/fluxo-caixa', icon: <TrendingUp className="h-4 w-4" />, module: 'Financeiro', keywords: ['fluxo', 'caixa', 'movimento'] },
    { id: 'financial-reports', title: 'Relatórios Financeiros', path: '/financeiro/relatorios', icon: <PieChart className="h-4 w-4" />, module: 'Financeiro', keywords: ['relatorios', 'financeiro'] },
    { id: 'custom-report', title: 'Relatório Personalizado', path: '/financeiro/relatorios/personalizado', icon: <PieChart className="h-4 w-4" />, module: 'Financeiro', keywords: ['relatorio', 'personalizado', 'custom'] },
    { id: 'teacher-payment-report', title: 'Relatório Professores', path: '/financeiro/relatorios/professores', icon: <FileText className="h-4 w-4" />, module: 'Financeiro', keywords: ['relatorio', 'professores', 'pagamento'] },
    { id: 'financial-receive-payment', title: 'Receber Pagamento', path: '/financeiro/receber-pagamento', icon: <CreditCard className="h-4 w-4" />, module: 'Financeiro', keywords: ['receber', 'pagamento', 'financeiro'] },

    // Configurações
    { id: 'settings', title: 'Configurações', path: '/configuracoes', icon: <Settings className="h-4 w-4" />, module: 'Configurações', keywords: ['configuracoes', 'ajustes', 'opcoes'] },
    { id: 'new-user', title: 'Novo Usuário', path: '/configuracoes/usuarios/novo', icon: <User className="h-4 w-4" />, module: 'Configurações', keywords: ['usuario', 'novo', 'pessoa'] },
    { id: 'new-group', title: 'Novo Grupo', path: '/configuracoes/grupos/novo', icon: <Shield className="h-4 w-4" />, module: 'Configurações', keywords: ['grupo', 'novo', 'permissao'] },

    // Universal
    { id: 'universal-payment', title: 'Receber Pagamento Universal', path: '/receber-pagamento', icon: <CreditCard className="h-4 w-4" />, module: 'Universal', keywords: ['receber', 'pagamento', 'universal'] }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm]);

  const handleItemClick = (path: string) => {
    navigate(path);
    onClose();
    setSearchTerm('');
  };

  const groupedItems = filteredItems.reduce((groups, item) => {
    const module = item.module;
    if (!groups[module]) {
      groups[module] = [];
    }
    groups[module].push(item);
    return groups;
  }, {} as Record<string, MenuItem[]>);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="top" 
        className="max-h-[80vh] bg-background/95 backdrop-blur-sm border-b border-border/50 rounded-none rounded-b-lg"
      >
        <SheetHeader className="pb-4 pt-2">
          <SheetTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="h-4 w-4 text-primary" />
            </div>
            Busca Rápida
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4">
          <Input
            ref={inputRef}
            placeholder="Digite para buscar módulos, páginas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-base h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50"
          />
          
          <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-2">
            {Object.entries(groupedItems).map(([module, items]) => (
              <div key={module} className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground px-2 uppercase tracking-wide">
                  {module}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {items.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className="h-auto p-4 text-left hover:bg-accent/70 hover:scale-[1.02] transition-all duration-200 border border-transparent hover:border-border/50 rounded-lg"
                      onClick={() => handleItemClick(item.path)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium truncate">{item.title}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <p className="text-lg font-medium">Nenhum resultado encontrado</p>
                <p className="text-sm mt-1">Tente buscar por outro termo</p>
              </div>
            )}
          </div>
          
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
              Pressione 
              <kbd className="px-2 py-1 text-xs bg-muted rounded border border-border/50 font-mono">F2</kbd> 
              para abrir a busca rápida
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuickSearch;
