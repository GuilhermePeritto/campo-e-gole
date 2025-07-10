# Sistema Base CRUD

Sistema completo para páginas CRUD com integração ao backend, seguindo o padrão de API especificado.

**⚠️ IMPORTANTE:** Este sistema faz APENAS requests reais para o backend. Não há dados mockados ou fallbacks.

## 🚀 Como Usar

### 1. Criar o Hook Específico

```typescript
// src/hooks/useMinhaEntidade.ts
import { useBaseCrud } from '@/pages/base/hooks/useBaseCrud';

interface MinhaEntidade {
  id: string;
  nome: string;
  email: string;
  status: 'ativo' | 'inativo';
}

export function useMinhaEntidade() {
  return useBaseCrud<MinhaEntidade>('/api/minha-entidade', {
    transformData: (data: any) => {
      // Transformar dados do backend para o formato esperado
      return data.map((item: any) => ({
        id: item.id,
        nome: item.nome,
        email: item.email,
        status: item.status
      }));
    },
    transformPagination: (pagination: any) => {
      // Transformar paginação do backend
      return {
        currentPage: pagination.currentPage || 1,
        totalPages: pagination.totalPages || 1,
        totalItems: pagination.totalItems || 0,
        pageSize: pagination.pageSize || 10,
        startIndex: pagination.startIndex || 1,
        endIndex: pagination.endIndex || 0,
        hasNextPage: pagination.hasNextPage || false,
        hasPreviousPage: pagination.hasPreviousPage || false,
      };
    }
  });
}
```

### 2. Criar a Página

```typescript
// src/pages/minha-entidade/MinhaEntidade.tsx
import React from 'react';
import { Users, Plus } from 'lucide-react';
import { BaseCrudPage } from '@/pages/base/BaseCrudPage';
import { useMinhaEntidade } from '@/hooks/useMinhaEntidade';
import { BaseCrudColumn, BaseCrudAction } from '@/pages/base/types/BaseCrudTypes';

interface MinhaEntidade {
  id: string;
  nome: string;
  email: string;
  status: 'ativo' | 'inativo';
}

export default function MinhaEntidade() {
  const hook = useMinhaEntidade();

  // Configuração das colunas
  const columns: BaseCrudColumn<MinhaEntidade>[] = [
    {
      key: 'nome',
      label: 'Nome',
      sortable: true,
      filterable: true,
      filterType: 'select',
      canHide: false
    },
    {
      key: 'email',
      label: 'E-mail',
      sortable: true,
      filterable: true,
      filterType: 'select'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      render: (item) => (
        <span className={item.status === 'ativo' ? 'text-green-600' : 'text-red-600'}>
          {item.status === 'ativo' ? 'Ativo' : 'Inativo'}
        </span>
      )
    }
  ];

  // Configuração das ações
  const actions: BaseCrudAction<MinhaEntidade>[] = [
    {
      label: 'Excluir',
      onClick: (item) => {
        if (confirm(`Excluir ${item.nome}?`)) {
          hook.deleteItem(item.id);
        }
      },
      variant: 'destructive'
    }
  ];

  // Configuração dos cards de resumo
  const summaryCards = [
    {
      title: 'Total',
      value: (data: MinhaEntidade[]) => data.length,
      description: 'Registros',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Ativos',
      value: (data: MinhaEntidade[]) => data.filter(item => item.status === 'ativo').length,
      description: 'Registros ativos',
      icon: Users,
      color: 'bg-green-500'
    }
  ];

  return (
    <BaseCrudPage<MinhaEntidade>
      title="Minha Entidade"
      description="Gerencie os registros"
      icon={<Users className="h-6 w-6" />}
      moduleColor="bg-blue-500"
      entityName="Entidade"
      entityNamePlural="Entidades"
      entityRoute="/minha-entidade"
      hook={hook}
      columns={columns}
      actions={actions}
      createButton={{
        label: "Nova Entidade",
        icon: <Plus className="h-4 w-4" />,
        route: "/minha-entidade/novo"
      }}
      summaryCards={summaryCards}
      searchFields={['nome', 'email']}
      searchPlaceholder="Buscar por nome ou email..."
      showExport={true}
      exportFilename="minha-entidade"
      defaultSort="nome"
      defaultPageSize={10}
    />
  );
}
```

## 📡 Padrão de API

O sistema envia os seguintes parâmetros para o backend:

### Parâmetros Básicos
```typescript
{
  page: 1,           // Página atual
  limit: 10,         // Itens por página
  sort: "nome",      // Campo de ordenação (prefixo "-" para desc)
}
```

### Filtros
```typescript
{
  filter: {
    search: "termo de busca",     // Busca geral
    status: ["ativo", "inativo"], // Filtros específicos
    categoria: ["A", "B"]         // Múltiplos valores
  }
}
```

### Exemplo Completo
```typescript
// Request para: GET /api/minha-entidade
{
  page: 2,
  limit: 25,
  sort: "-dataCadastro",
  filter: {
    search: "joão",
    status: ["ativo"],
    categoria: ["cliente", "fornecedor"]
  }
}
```

## 🎨 Funcionalidades

### ✅ Implementadas
- **Busca** em múltiplos campos
- **Filtros avançados** por coluna
- **Ordenação** por qualquer coluna
- **Paginação** com controle de tamanho
- **Visibilidade de colunas** configurável
- **Exportação** de dados
- **Ações** (editar, excluir, customizadas)
- **Cards de resumo** dinâmicos
- **Modo tabela e grid**
- **Loading states** e estados vazios
- **Integração completa** com backend
- **SEM dados mockados** - apenas requests reais

### 🔧 Configurações Disponíveis

#### BaseCrudPage Props
```typescript
interface BaseCrudPageProps<T> {
  // Configuração da página
  title: string;
  description?: string;
  icon: React.ReactNode;
  moduleColor: string;
  
  // Configuração da entidade
  entityName: string;
  entityNamePlural: string;
  entityRoute: string;
  
  // Hook com métodos CRUD
  hook: BaseCrudHook<T>;
  
  // Configuração das colunas
  columns: BaseCrudColumn<T>[];
  
  // Configuração das ações
  actions?: BaseCrudAction<T>[];
  
  // Configuração do botão de criar
  createButton?: {
    label: string;
    icon?: React.ReactNode;
    route: string;
  };
  
  // Configuração dos cards de resumo
  summaryCards?: Array<{
    title: string;
    value: (data: T[], pagination: any) => string | number;
    description?: string;
    icon: LucideIcon;
    color: string;
    trend?: {
      value: number;
      label: string;
      type: 'positive' | 'negative' | 'neutral';
    };
  }>;
  
  // Configurações adicionais
  searchFields?: (keyof T)[];
  searchPlaceholder?: string;
  showExport?: boolean;
  exportFilename?: string;
  defaultSort?: string;
  defaultPageSize?: number;
}
```

## 🐛 Debug

O sistema inclui logs detalhados para debug:

```typescript
// Console logs disponíveis:
🔍 API Request: { endpoint, params }
📦 API Response: responseData
📋 BaseCrudPage - Parâmetros para API: params
🔄 Transformando dados do backend: data
📊 Transformando paginação do backend: pagination
❌ Erro ao buscar dados do backend: error
```

## ⚠️ Requisitos do Backend

O sistema espera que o backend:

1. **Responda corretamente** aos requests
2. **Retorne dados** no formato esperado
3. **Forneça paginação** adequada
4. **Trate filtros** na propriedade `filter`
5. **Suporte ordenação** via parâmetro `sort`

**Em caso de erro do backend:**
- Dados ficam vazios (`[]`)
- Paginação resetada para valores padrão
- Loading state desabilitado
- Erro logado no console

## 📝 Exemplo Real

Veja o exemplo completo em:
- `src/hooks/useClientesEscolinhaBase.ts`
- `src/pages/escolinha/ClientesEscolinha.tsx` 