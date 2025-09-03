# Guia de Fluxo de Entidades - LudusGestao

## Visão Geral

Este documento explica como as entidades do sistema LudusGestao se relacionam e como devem ser utilizadas para implementar funcionalidades específicas. Cada seção detalha os pré-requisitos, dependências e fluxos necessários.

---

## 🔐 Sistema de Autenticação e Autorização

### Fluxo de Login
1. **POST /api/autenticacao/entrar**
   - **Body:** `{ "email": "string", "senha": "string" }`
   - **Retorna:** Access Token, Refresh Token, dados do usuário
   - **Uso:** Incluir `Authorization: Bearer {accessToken}` em todas as requisições

### Renovação de Token
1. **POST /api/autenticacao/refresh**
   - **Body:** `{ "refreshToken": "string" }`
   - **Retorna:** Novo Access Token e Refresh Token
   - **Quando usar:** Quando o access token expirar (1 hora)

---

## 🏢 Estrutura Organizacional

### Hierarquia das Entidades
```
Tenant (Multi-tenancy)
├── Empresa
│   ├── Filiais
│   │   └── Locais
│   └── Usuários
│       └── Grupos de Permissões
└── Permissões (globais)
```

### 1. Empresa
**O que é:** Entidade principal que representa uma organização cliente.

**Propriedades importantes:**
- `id`: Identificador único
- `nome`: Nome da empresa
- `cnpj`: CNPJ da empresa
- `tenantId`: ID do tenant (isolamento de dados)
- `situacao`: Ativo/Inativo

**Fluxo de criação:**
1. **POST /api/empresas**
   - **Pré-requisito:** Usuário autenticado
   - **Body:** Dados da empresa (nome, cnpj, endereço, etc.)
   - **Retorna:** Empresa criada com ID

**Uso típico:**
- Criar nova empresa cliente
- Gerenciar dados da empresa
- Associar filiais

### 2. Filial
**O que é:** Unidade física ou administrativa de uma empresa.

**Propriedades importantes:**
- `id`: Identificador único
- `empresaId`: ID da empresa à qual pertence
- `codigo`: Código da filial
- `nome`: Nome da filial
- `endereco`: Endereço completo
- `responsavel`: Nome do responsável
- `situacao`: Ativo/Inativo/Manutenção

**Fluxo de criação:**
1. **POST /api/filiais**
   - **Pré-requisito:** Empresa existente
   - **Body:** Dados da filial + `empresaId`
   - **Retorna:** Filial criada

**Uso típico:**
- Criar unidades de negócio
- Organizar locais por região
- Gerenciar responsáveis por unidade

---

## 👥 Sistema de Usuários e Permissões

### 3. Usuário
**O que é:** Pessoa que acessa o sistema.

**Propriedades importantes:**
- `id`: Identificador único
- `empresaId`: ID da empresa à qual pertence
- `grupoPermissaoId`: ID do grupo de permissões
- `nome`: Nome completo
- `email`: Email (usado para login)
- `senha`: Senha criptografada
- `cargo`: Cargo/função
- `situacao`: Ativo/Inativo

**Fluxo de criação:**
1. **POST /api/usuarios**
   - **Pré-requisito:** Empresa existente
   - **Body:** Dados do usuário + `empresaId` + `senha`
   - **Retorna:** Usuário criado

**Verificação de permissões:**
1. **GET /api/usuarios/{id}/permissoes**
   - **Retorna:** Lista de permissões efetivas do usuário
   - **Formato:** `["Modulo.Acao", "Usuarios.Criar", "Clientes.Visualizar"]`

2. **GET /api/usuarios/{id}/filiais**
   - **Retorna:** IDs das filiais às quais o usuário tem acesso

3. **GET /api/usuarios/{id}/modulos**
   - **Retorna:** Módulos do sistema acessíveis ao usuário

### 4. Permissão
**O que é:** Regra que define o que um usuário pode fazer no sistema.

**Propriedades importantes:**
- `id`: Identificador único
- `nome`: Nome da permissão
- `moduloPai`: Módulo principal (ex: "Usuarios")
- `submodulo`: Submódulo (ex: "Criar", "Editar", "Visualizar")
- `acao`: Ação específica
- `descricao`: Descrição da permissão

**Consultas úteis:**
1. **GET /api/permissoes/modulos-pai**
   - **Retorna:** Lista de módulos disponíveis

2. **GET /api/permissoes/submodulos**
   - **Retorna:** Lista de submódulos disponíveis

3. **GET /api/permissoes/modulo-pai/{moduloPai}**
   - **Retorna:** Permissões de um módulo específico

### 5. Grupo de Permissões
**O que é:** Conjunto de permissões que podem ser atribuídas a usuários.

**Propriedades importantes:**
- `id`: Identificador único
- `nome`: Nome do grupo
- `descricao`: Descrição do grupo

**Fluxo de gerenciamento:**
1. **Criar grupo:** POST /api/grupos-permissoes
2. **Adicionar usuário:** POST /api/grupos-permissoes/{id}/usuarios
   - **Body:** `{ "usuarioId": "guid" }`
3. **Remover usuário:** DELETE /api/grupos-permissoes/{id}/usuarios/{usuarioId}
4. **Listar usuários:** GET /api/grupos-permissoes/{id}/usuarios

**Uso típico:**
- Criar perfis de acesso (Admin, Gerente, Operador)
- Atribuir permissões em lote
- Gerenciar hierarquia de acesso

---

## 🎯 Gestão de Clientes

### 6. Cliente
**O que é:** Pessoa ou empresa que utiliza os serviços.

**Propriedades importantes:**
- `id`: Identificador único
- `nome`: Nome completo ou razão social
- `documento`: CPF ou CNPJ
- `email`: Email de contato
- `telefone`: Telefone
- `endereco`: Endereço completo
- `observacoes`: Observações adicionais
- `situacao`: Ativo/Inativo/Bloqueado

**Fluxo de criação:**
1. **POST /api/clientes**
   - **Pré-requisito:** Usuário autenticado
   - **Body:** Dados do cliente
   - **Retorna:** Cliente criado

**Resumo estatístico:**
1. **GET /api/clientes/resumo**
   - **Retorna:** Estatísticas de clientes
   - **Dados:** Total, ativos, inativos, novos no mês, pessoa jurídica

---

## 📍 Gestão de Locais

### 7. Local
**O que é:** Espaço físico disponível para reservas (quadras, salas, etc.).

**Propriedades importantes:**
- `id`: Identificador único
- `filialId`: ID da filial à qual pertence
- `nome`: Nome do local
- `tipo`: Tipo do local (ex: "Tênis", "Futebol", "Sala")
- `valorHora`: Valor por hora
- `capacidade`: Capacidade máxima
- `comodidades`: Lista de comodidades
- `horaAbertura`: Horário de abertura
- `horaFechamento`: Horário de fechamento
- `situacao`: Ativo/Inativo/Manutenção

**Fluxo de criação:**
1. **POST /api/locais**
   - **Pré-requisito:** Filial existente
   - **Body:** Dados do local + `filialId`
   - **Retorna:** Local criado

**Resumo estatístico:**
1. **GET /api/locais/resumo**
   - **Retorna:** Estatísticas de locais
   - **Dados:** Total, ativos, inativos, em manutenção, valor médio

---

## 📅 Gestão de Reservas

### 8. Reserva
**O que é:** Agendamento de um local por um cliente.

**Propriedades importantes:**
- `id`: Identificador único
- `clienteId`: ID do cliente
- `localId`: ID do local
- `usuarioId`: ID do usuário que fez a reserva (opcional)
- `data`: Data da reserva
- `horaInicio`: Horário de início
- `horaFim`: Horário de fim
- `valor`: Valor da reserva
- `esporte`: Esporte/atividade
- `observacoes`: Observações
- `situacao`: Pendente/Confirmada/Cancelada/Finalizada/Expirada

**Fluxo de criação:**
1. **POST /api/reservas**
   - **Pré-requisito:** Cliente e local existentes
   - **Body:** Dados da reserva + `clienteId` + `localId`
   - **Retorna:** Reserva criada

**Estados da reserva:**
- **Pendente:** Reserva criada, aguardando confirmação
- **Confirmada:** Reserva confirmada
- **Cancelada:** Reserva cancelada
- **Finalizada:** Evento realizado
- **Expirada:** Data passou sem confirmação

---

## 💰 Gestão Financeira

### 9. Recebível
**O que é:** Título a receber relacionado a uma reserva ou serviço.

**Propriedades importantes:**
- `id`: Identificador único
- `clienteId`: ID do cliente
- `reservaId`: ID da reserva (opcional)
- `descricao`: Descrição do recebível
- `valor`: Valor a receber
- `dataVencimento`: Data de vencimento
- `situacao`: Aberto/Vencido/Pago/Cancelado/Estornado

**Fluxo de criação:**
1. **POST /api/recebiveis**
   - **Pré-requisito:** Cliente existente
   - **Body:** Dados do recebível + `clienteId`
   - **Retorna:** Recebível criado

**Resumo estatístico:**
1. **GET /api/recebiveis/resumo**
   - **Retorna:** Estatísticas financeiras
   - **Dados:** Total, valores pendentes, pagos, vencidos, contadores

**Estados do recebível:**
- **Aberto:** Título ainda não pago
- **Vencido:** Passou da data de vencimento
- **Pago:** Pago
- **Cancelado:** Cancelado manualmente
- **Estornado:** Estornado manualmente

---

## 🧭 Operações Gerenciais

### 10. Gerencialmento
**O que é:** Operações administrativas de alto nível.

**Operações disponíveis:**

#### Criar Novo Cliente (Estrutura Completa)
1. **POST /api/gerencialmento/novo-cliente**
   - **Pré-requisito:** Política "TenantMaster"
   - **Body:** Dados básicos da empresa
   - **Ação:** Cria empresa + filial principal + usuário admin
   - **Retorna:** Estrutura completa criada

#### Alterar Senha
1. **POST /api/gerencialmento/alterar-senha**
   - **Pré-requisito:** Política "TenantMaster"
   - **Body:** `{ "email": "string", "novaSenha": "string" }`
   - **Ação:** Altera senha de usuário pelo email

---

## 🛠️ Utilitários

### 11. Utilitários
**Operações auxiliares do sistema:**

#### Busca de CEP
1. **GET /api/utilitarios/cep/{cep}**
   - **Parâmetro:** CEP (formato: 12345-678 ou 12345678)
   - **Retorna:** Endereço completo
   - **Fonte:** API ViaCEP

#### Seed de Dados
1. **POST /api/utilitarios/seed**
   - **Ação:** Insere dados base do sistema
   - **Uso:** Configuração inicial

---

## 📋 Fluxos Completos de Uso

### Fluxo 1: Configuração Inicial de um Cliente
1. **Criar estrutura base:**
   ```
   POST /api/gerencialmento/novo-cliente
   → Cria empresa + filial + usuário admin
   ```

2. **Login do admin:**
   ```
   POST /api/autenticacao/entrar
   → Obtém tokens de acesso
   ```

3. **Criar locais:**
   ```
   POST /api/locais
   → Adiciona espaços disponíveis
   ```

4. **Criar grupos de permissões:**
   ```
   POST /api/grupos-permissoes
   → Define perfis de acesso
   ```

5. **Criar usuários operacionais:**
   ```
   POST /api/usuarios
   → Adiciona equipe
   ```

### Fluxo 2: Operação Diária
1. **Login do usuário:**
   ```
   POST /api/autenticacao/entrar
   → Obtém acesso ao sistema
   ```

2. **Verificar permissões:**
   ```
   GET /api/usuarios/{id}/permissoes
   → Lista o que pode fazer
   ```

3. **Criar cliente:**
   ```
   POST /api/clientes
   → Cadastra novo cliente
   ```

4. **Fazer reserva:**
   ```
   POST /api/reservas
   → Agenda local para cliente
   ```

5. **Gerar recebível:**
   ```
   POST /api/recebiveis
   → Cria título a receber
   ```

### Fluxo 3: Gestão de Permissões
1. **Criar permissões específicas:**
   ```
   GET /api/permissoes/modulo-pai/Usuarios
   → Lista permissões do módulo
   ```

2. **Criar grupo:**
   ```
   POST /api/grupos-permissoes
   → Define conjunto de permissões
   ```

3. **Atribuir usuário ao grupo:**
   ```
   POST /api/grupos-permissoes/{id}/usuarios
   → Adiciona usuário ao grupo
   ```

4. **Verificar permissões efetivas:**
   ```
   GET /api/usuarios/{id}/permissoes
   → Confirma permissões do usuário
   ```

---

## 🔍 Consultas e Relatórios

### Relatórios de Clientes
- **Resumo geral:** GET /api/clientes/resumo
- **Listagem paginada:** GET /api/clientes?page=1&limit=10
- **Busca específica:** GET /api/clientes?search=nome

### Relatórios de Locais
- **Resumo geral:** GET /api/locais/resumo
- **Por filial:** GET /api/locais?filialId=guid
- **Por situação:** GET /api/locais?situacao=Ativo

### Relatórios Financeiros
- **Resumo recebíveis:** GET /api/recebiveis/resumo
- **Por situação:** GET /api/recebiveis?situacao=Pago
- **Por período:** GET /api/recebiveis?dataInicio=2024-01-01&dataFim=2024-12-31

### Relatórios de Reservas
- **Por cliente:** GET /api/reservas?clienteId=guid
- **Por local:** GET /api/reservas?localId=guid
- **Por período:** GET /api/reservas?data=2024-01-15

---

## ⚠️ Considerações Importantes

### Multi-tenancy
- Cada empresa pertence a um tenant específico
- Dados são isolados por tenant
- Usuários só acessam dados do seu tenant

### Permissões
- Permissões são verificadas em todas as operações
- Usuários só veem dados das filiais às quais têm acesso
- Grupos de permissões facilitam o gerenciamento

### Estados das Entidades
- Todas as entidades têm estados (Ativo/Inativo)
- Reservas e recebíveis têm estados específicos
- Estados determinam a disponibilidade/visibilidade

### Validações
- CNPJ/CPF devem ser válidos
- Emails devem ter formato válido
- Datas de vencimento não podem ser passadas
- Capacidade de locais deve ser respeitada

---

## 📞 Suporte

Para dúvidas sobre o fluxo de entidades ou implementação específica, consulte a documentação da API ou entre em contato com a equipe de desenvolvimento.
