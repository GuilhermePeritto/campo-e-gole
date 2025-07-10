# Sistema de Listagem Refatorado

## Visão Geral

O sistema de listagem foi completamente refatorado para centralizar a lógica em um contexto React, reduzindo a complexidade e melhorando a performance.

## Estrutura

```
src/core/components/listagem/
├── Listagem.tsx              # Componente principal
├── ListagemContext.tsx       # Contexto centralizado com toda lógica
├── ListagemTabela.tsx        # Visualização em tabela
├── ListagemGrade.tsx         # Visualização em grade (cards)
├── ListagemFiltros.tsx       # Barra de busca e filtros
├── ListagemResumo.tsx        # Cards de resumo/estatísticas
├── ListagemCelula.tsx        # Renderização inteligente de células
├── ListagemCabecalho.tsx     # Cabeçalho com ordenação e drag-and-drop
├── ListagemEstadoVazio.tsx   # Estado quando não há dados
├── ListagemSkeleton.tsx      # Loading skeleton
└── index.ts                  # Exportações
```

## Uso Básico

```tsx
import { Listagem } from '@/core/components/listagem';
import type { ColunaListagem, AcaoListagem } from '@/core/components/listagem';

// Definir interface dos dados
interface MeuItem {
  id: string;
  nome: string;
  email: string;
  status: 'ativo' | 'inativo';
}

// Configurar colunas
const colunas: ColunaListagem<MeuItem>[] = [
  {
    chave: 'nome',
    titulo: 'Nome',
    ordenavel: true,
    filtravel: true,
    tipoFiltro: 'select'
  },
  {
    chave: 'email',
    titulo: 'E-mail',
    renderizar: (item) => (
      <a href={`mailto:${item.email}`}>{item.email}</a>
    )
  }
];

// Configurar ações
const acoes: AcaoListagem<MeuItem>[] = [
  {
    titulo: 'Excluir',
    onClick: (item) => handleDelete(item.id),
    variante: 'destructive',
    mostrar: (item) => item.status === 'ativo'
  }
];

// Usar componente
<Listagem<MeuItem>
  titulo="Meus Itens"
  descricao="Gerencie seus itens"
  icone={<Icon />}
  corModulo="blue"
  nomeEntidade="Item"
  nomeEntidadePlural="Itens"
  rotaEntidade="/itens"
  hook={useMyHook()}
  colunas={colunas}
  acoes={acoes}
  botaoCriar={{
    titulo: "Novo Item",
    rota: "/itens/novo"
  }}
  cardsResumo={[
    {
      titulo: 'Total',
      valor: (data) => data.length,
      icone: TotalIcon,
      cor: 'bg-blue-500'
    }
  ]}
  mostrarExportar={true}
  ordenacaoPadrao="nome"
  tamanhoPaginaPadrao={20}
/>
```

## Recursos

### 1. Contexto Centralizado
- Toda lógica de estado em um único contexto
- Melhor performance com memoização
- Facilita manutenção e testes

### 2. Células Inteligentes
- Detecção automática de tipo de dados
- Renderização otimizada para:
  - Datas
  - Moedas
  - E-mails
  - Telefones
  - Status
  - Booleanos
  - Cores

### 3. Visualizações
- **Tabela**: Com drag-and-drop de colunas, ordenação e redimensionamento
- **Grade**: Cards responsivos para mobile

### 4. Filtros Avançados
- Busca em tempo real com debounce
- Filtros por coluna
- Filtros ativos visíveis
- Limpar filtros facilmente

### 5. Performance
- Lazy loading
- Memoização de cálculos pesados
- Debounce em buscas
- Skeleton loading

## Hook Necessário

O componente espera um hook com a seguinte interface:

```typescript
interface HookListagem<T> {
  data: T[];
  loading: boolean;
  pagination: any;
  fetchData: (params: any) => Promise<void>;
  deleteItem: (id: string | number) => Promise<void>;
}
```

## Personalização

### Renderização Customizada

```tsx
{
  chave: 'status',
  titulo: 'Status',
  renderizar: (item) => (
    <Badge variant={item.status === 'ativo' ? 'success' : 'error'}>
      {item.status}
    </Badge>
  )
}
```

### Cards de Resumo

```tsx
cardsResumo={[
  {
    titulo: 'Receita Total',
    valor: (data) => {
      const total = data.reduce((acc, item) => acc + item.valor, 0);
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(total);
    },
    icone: DollarSign,
    cor: 'bg-green-500',
    tendencia: {
      valor: 15,
      label: 'vs mês anterior',
      tipo: 'positivo'
    }
  }
]}
```

## Migração

Para migrar do sistema antigo:

1. Trocar `PaginaListagem` por `Listagem`
2. Renomear propriedades para português:
   - `key` → `chave`
   - `label` → `titulo`
   - `sortable` → `ordenavel`
   - `filterable` → `filtravel`
   - `render` → `renderizar`
3. Ajustar nomes de propriedades do componente principal

## Benefícios da Refatoração

1. **Menos arquivos**: De 13 para 10 componentes
2. **Lógica centralizada**: Tudo no contexto
3. **Nomes padronizados**: Tudo em português
4. **Performance**: Memoização e lazy loading
5. **Manutenibilidade**: Código mais limpo e organizado 