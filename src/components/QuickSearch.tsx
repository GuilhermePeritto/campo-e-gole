
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MenuItem {
  title: string;
  path: string;
  module: string;
  keywords: string[];
}

const menuItems: MenuItem[] = [
  // Dashboard
  { title: 'Dashboard', path: '/dashboard', module: 'Dashboard', keywords: ['painel', 'inicio', 'home'] },
  
  // Eventos
  { title: 'Eventos', path: '/eventos', module: 'Eventos', keywords: ['eventos', 'reservas'] },
  { title: 'Calendário', path: '/eventos/calendario', module: 'Eventos', keywords: ['calendario', 'agenda', 'data'] },
  { title: 'Clientes', path: '/eventos/clientes', module: 'Eventos', keywords: ['clientes', 'pessoas', 'contatos'] },
  { title: 'Novo Cliente', path: '/eventos/clientes/novo', module: 'Eventos', keywords: ['novo cliente', 'cadastrar cliente'] },
  { title: 'Espaços', path: '/eventos/espacos', module: 'Eventos', keywords: ['espacos', 'locais', 'salas'] },
  { title: 'Novo Espaço', path: '/eventos/espacos/novo', module: 'Eventos', keywords: ['novo espaco', 'cadastrar local'] },
  { title: 'Nova Reserva', path: '/eventos/nova', module: 'Eventos', keywords: ['nova reserva', 'novo evento'] },
  { title: 'Contas a Receber', path: '/eventos/contas-a-receber', module: 'Eventos', keywords: ['contas receber', 'financeiro eventos'] },
  { title: 'Relatórios Eventos', path: '/eventos/relatorios', module: 'Eventos', keywords: ['relatorios eventos'] },
  
  // Financeiro
  { title: 'Financeiro', path: '/financeiro', module: 'Financeiro', keywords: ['financeiro', 'dinheiro', 'contas'] },
  { title: 'Receitas', path: '/financeiro/receitas', module: 'Financeiro', keywords: ['receitas', 'entradas', 'ganhos'] },
  { title: 'Nova Receita', path: '/financeiro/receitas/novo', module: 'Financeiro', keywords: ['nova receita', 'cadastrar receita'] },
  { title: 'Despesas', path: '/financeiro/despesas', module: 'Financeiro', keywords: ['despesas', 'gastos', 'saidas'] },
  { title: 'Nova Despesa', path: '/financeiro/despesas/novo', module: 'Financeiro', keywords: ['nova despesa', 'cadastrar despesa'] },
  { title: 'Contas a Receber', path: '/financeiro/contas-a-receber', module: 'Financeiro', keywords: ['contas receber', 'recebimentos'] },
  { title: 'Contas a Pagar', path: '/financeiro/contas-a-pagar', module: 'Financeiro', keywords: ['contas pagar', 'pagamentos'] },
  { title: 'Fluxo de Caixa', path: '/financeiro/fluxo-caixa', module: 'Financeiro', keywords: ['fluxo caixa', 'movimento'] },
  { title: 'Relatórios Financeiro', path: '/financeiro/relatorios', module: 'Financeiro', keywords: ['relatorios financeiro'] },
  { title: 'Relatório Personalizado', path: '/financeiro/relatorios/personalizado', module: 'Financeiro', keywords: ['relatorio personalizado', 'custom report'] },
  
  // Escolinha
  { title: 'Escolinha', path: '/escolinha', module: 'Escolinha', keywords: ['escolinha', 'escola', 'ensino'] },
  { title: 'Turmas', path: '/escolinha/turmas', module: 'Escolinha', keywords: ['turmas', 'classes', 'grupos'] },
  { title: 'Nova Turma', path: '/escolinha/turmas/nova', module: 'Escolinha', keywords: ['nova turma', 'cadastrar turma'] },
  { title: 'Alunos', path: '/escolinha/alunos', module: 'Escolinha', keywords: ['alunos', 'estudantes', 'criancas'] },
  { title: 'Novo Aluno', path: '/escolinha/alunos/novo', module: 'Escolinha', keywords: ['novo aluno', 'cadastrar aluno'] },
  { title: 'Professores', path: '/escolinha/professores', module: 'Escolinha', keywords: ['professores', 'instrutores', 'educadores'] },
  { title: 'Novo Professor', path: '/escolinha/professores/novo', module: 'Escolinha', keywords: ['novo professor', 'cadastrar professor'] },
  { title: 'Chamada', path: '/escolinha/chamada', module: 'Escolinha', keywords: ['chamada', 'presenca', 'frequencia'] },
  { title: 'Mensalidades', path: '/escolinha/mensalidades', module: 'Escolinha', keywords: ['mensalidades', 'pagamentos', 'financeiro escolar'] },
  { title: 'Relatórios Escolinha', path: '/escolinha/relatorios', module: 'Escolinha', keywords: ['relatorios escolinha'] },
  
  // Bar
  { title: 'Bar', path: '/bar', module: 'Bar', keywords: ['bar', 'vendas', 'produtos'] },
  { title: 'Produtos', path: '/bar/produtos', module: 'Bar', keywords: ['produtos', 'itens', 'cardapio'] },
  { title: 'Novo Produto', path: '/bar/produtos/novo', module: 'Bar', keywords: ['novo produto', 'cadastrar produto'] },
  { title: 'Estoque', path: '/bar/estoque', module: 'Bar', keywords: ['estoque', 'inventario', 'quantidade'] },
  { title: 'Comandas', path: '/bar/comandas', module: 'Bar', keywords: ['comandas', 'pedidos', 'ordens'] },
  { title: 'Nova Comanda', path: '/bar/comandas/nova', module: 'Bar', keywords: ['nova comanda', 'novo pedido'] },
  { title: 'Nova Venda', path: '/bar/nova-venda', module: 'Bar', keywords: ['nova venda', 'vender'] },
  { title: 'Checkout', path: '/bar/checkout', module: 'Bar', keywords: ['checkout', 'finalizar venda', 'caixa'] },
  { title: 'Relatórios Bar', path: '/bar/relatorios', module: 'Bar', keywords: ['relatorios bar'] },
  
  // Configurações
  { title: 'Configurações', path: '/configuracoes', module: 'Configurações', keywords: ['configuracoes', 'settings', 'opcoes'] },
  { title: 'Novo Usuário', path: '/configuracoes/usuarios/novo', module: 'Configurações', keywords: ['novo usuario', 'cadastrar usuario'] },
  { title: 'Novo Grupo', path: '/configuracoes/grupos/novo', module: 'Configurações', keywords: ['novo grupo', 'cadastrar grupo'] },
];

const QuickSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrar itens baseado na pesquisa
  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(menuItems);
      return;
    }

    const filtered = menuItems.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.module.toLowerCase().includes(searchLower) ||
        item.keywords.some(keyword => keyword.includes(searchLower))
      );
    });

    setFilteredItems(filtered);
  }, [searchTerm]);

  // Atalho F2
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F2') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focar no input quando abrir
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleItemClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchTerm('');
    }
  };

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.module]) {
      acc[item.module] = [];
    }
    acc[item.module].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Buscar</span>
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            F2
          </kbd>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh] bg-background">
        <DrawerHeader>
          <DrawerTitle>Navegação Rápida</DrawerTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="Digite para buscar páginas, módulos ou funcionalidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {Object.entries(groupedItems).map(([module, items]) => (
            <div key={module} className="mb-6">
              <h3 className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                {module}
              </h3>
              <div className="space-y-1">
                {items.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleItemClick(item.path)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    )}
                  >
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.path}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum resultado encontrado para "{searchTerm}"</p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default QuickSearch;
