# Campo e Gole - Sistema de Gestão de Eventos

## 🚀 Funcionalidades Implementadas

### 📅 Agenda com Busca Inteligente e Cache Otimizado

O sistema agora implementa uma busca inteligente de eventos que se adapta automaticamente à visualização selecionada **E aos locais filtrados**, com **cache inteligente** para evitar consultas desnecessárias:

#### 🔄 **Busca Inteligente por Período e Local**

- **Visualização Mensal**: Busca eventos do mês inteiro + locais selecionados
- **Visualização Semanal**: Busca eventos da semana selecionada + locais selecionados  
- **Visualização Diária**: Busca eventos do dia específico + locais selecionados
- **Visualização Lista**: Busca eventos do mês + locais selecionados

#### 🧠 **Cache Inteligente**

O sistema agora é **inteligente** e evita consultas desnecessárias:

- ✅ **Mesmo mês**: Se você está na visualização mensal e navega entre dias do mesmo mês, **não faz nova consulta**
- ✅ **Mesma semana**: Se você está na visualização semanal e navega entre dias da mesma semana, **não faz nova consulta**
- ✅ **Mesmo dia**: Se você está na visualização diária e clica no mesmo dia, **não faz nova consulta**
- ✅ **Cache de 30 segundos**: Dados ficam em cache por 30 segundos para consultas repetidas
- ✅ **Cache limitado**: Mantém apenas as últimas 10 consultas para otimizar memória
- ✅ **Botão sincronizar**: Força atualização dos dados quando necessário

#### 🎯 **Visualização Mensal Melhorada**

- ✅ **Eventos ocultos**: Eventos de outros meses não são exibidos na visualização mensal
- ✅ **Foco no mês atual**: Apenas eventos do mês selecionado são mostrados
- ✅ **Interface limpa**: Células de outros meses ficam vazias e desabilitadas

#### ⚡ **Performance Otimizada**

- Consultas específicas para cada período E local
- Carregamento apenas dos dados necessários
- Skeletons personalizados durante o carregamento
- Cache inteligente de dados
- **Nova consulta apenas quando necessário:**
  - Visualização muda (mes/semana/dia)
  - Data muda para período diferente
  - Locais selecionados mudam

#### 🎯 **Filtros Dinâmicos Inteligentes**

- ✅ Filtro por local selecionado (múltiplos locais)
- ✅ Filtro por período baseado na visualização
- ✅ Suporte a múltiplos locais selecionados
- ✅ Filtros combinados (local + período)
- ✅ **Busca automática quando filtros mudam**
- ✅ **Cache inteligente para evitar consultas desnecessárias**

### 🏗️ **Arquitetura da Solução**

#### Hooks Principais

```typescript
// Hook principal da agenda
useAgenda() // Gerencia estado, filtros e cache inteligente

// Hook de eventos com filtros e cache
useEventos(filtros) // Busca eventos por período E local com cache

// Hook para API real (exemplo)
useEventosReal(filtros) // Integração com backend
```

#### Fluxo de Dados Inteligente

1. **Mudança de Visualização/Data/Local** → `useAgenda` verifica se precisa nova consulta
2. **Cache Hit** → Usa dados existentes (instantâneo)
3. **Cache Miss** → `useEventos` faz nova consulta
4. **Dados Carregados** → Componentes recebem eventos filtrados
5. **Skeletons** → Mostrados apenas durante carregamento real

### 🔧 **Implementação Técnica**

#### Cache Inteligente

```typescript
// Verificação inteligente de necessidade de consulta
const precisaNovaConsulta = (novoFiltros) => {
  // Se mudou visualização → sempre nova consulta
  if (tipoVisualizacao !== ultimoTipo) return true;
  
  // Se mudaram locais → nova consulta
  if (locaisAtuais !== locaisAnteriores) return true;
  
  // Verificar se está no mesmo período
  switch (tipoVisualizacao) {
    case 'mes':
      return !isSameMonth(dataInicio, ultimaDataInicio);
    case 'semana':
      return !isSameWeek(dataInicio, ultimaDataInicio);
    case 'dia':
      return !isSameDay(dataInicio, ultimaDataInicio);
  }
};
```

#### Filtros Automáticos

```typescript
const filtrosEventos = useMemo(() => {
  switch (tipoVisualizacao) {
    case 'mes':
      return {
        dataInicio: startOfMonth(dataAtual),
        dataFim: endOfMonth(dataAtual),
        localIds: locaisSelecionados.includes('all') ? undefined : locaisSelecionados
      };
    // ... outros casos
  }
}, [tipoVisualizacao, dataAtual, locaisSelecionados]);
```

#### Skeletons Personalizados

- **Mensal**: Células compactas com eventos
- **Semanal**: Células altas com eventos posicionados
- **Diária**: Timeline com horários e eventos

### 🌐 **Integração com Backend**

#### Endpoints Sugeridos

```typescript
// Buscar eventos por período e locais
GET /api/eventos?dataInicio=2024-01-01&dataFim=2024-01-31&localIds=123&localIds=456

// Buscar eventos por visualização
POST /api/eventos/visualizacao
{
  "tipoVisualizacao": "mes",
  "dataAtual": "2024-01-15",
  "localIds": ["123", "456"]
}
```

#### Exemplo de Uso com API Real

```typescript
// Substituir useEventos por useEventosReal
import { useEventosReal } from '@/hooks/useEventosReal';

const { eventos, loading, error } = useEventosReal(filtros);
```

### 📊 **Benefícios**

1. **Performance**: Carregamento apenas dos dados necessários
2. **UX**: Skeletons informativos durante carregamento
3. **Escalabilidade**: Consultas otimizadas para grandes volumes
4. **Flexibilidade**: Fácil adaptação para diferentes backends
5. **Manutenibilidade**: Código organizado e reutilizável
6. **Responsividade**: Busca automática em todas as mudanças de filtro
7. **Inteligência**: Cache evita consultas desnecessárias
8. **Velocidade**: Navegação instantânea dentro do mesmo período

### 🚀 **Como Testar**

1. Navegue para a agenda (`/eventos/agenda`)
2. Troque entre visualizações (Mensal, Semanal, Diária)
3. **Navegue entre dias do mesmo mês/semana** (observe que não há loading)
4. **Navegue para mês/semana diferente** (observe loading)
5. Selecione/desselecione locais na sidebar
6. Observe os logs no console para ver o cache funcionando
7. Verifique que apenas os eventos do período E local são carregados

### 🔍 **Logs de Debug**

O sistema mostra logs no console para você acompanhar o funcionamento:

- `📦 Cache hit:` - Dados encontrados em cache
- `💾 Cache salvo:` - Novos dados salvos em cache
- `🔍 Nova consulta:` - Consulta real sendo feita
- `🔄 Nova consulta: tipo de visualização mudou` - Motivo da consulta
- `📦 Cache: mesmo mês, usando dados existentes` - Cache sendo usado

### 🔮 **Próximos Passos**

- [ ] Integração com backend real
- [ ] Cache persistente entre sessões
- [ ] Otimização de consultas com debounce
- [ ] Suporte a filtros avançados
- [ ] Sincronização em tempo real

---

## 📁 Estrutura de Arquivos

```
src/
├── hooks/
│   ├── useAgenda.ts          # Hook principal da agenda com cache inteligente
│   ├── useEventos.ts         # Hook de eventos com cache
│   └── useEventosReal.ts     # Hook para API real
├── components/agenda/views/
│   ├── VisaoMensal.tsx       # Visualização mensal com skeletons
│   ├── VisaoSemanal.tsx      # Visualização semanal com skeletons
│   └── VisaoDiaria.tsx       # Visualização diária com skeletons
└── lib/
    └── api.ts               # Funções de API
```

---

**Desenvolvido com ❤️ para otimizar a gestão de eventos esportivos**
