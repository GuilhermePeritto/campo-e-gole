
import { ReportField } from '@/types/reports';

// Definir relacionamentos reais entre entidades baseado no modelo de dados
export interface EntityRelation {
  entity: string;
  relatedFields: string[];
  relationshipType: 'direct' | 'indirect';
  description: string;
}

// Relacionamentos diretos entre entidades
export const entityRelationships: Record<string, EntityRelation[]> = {
  eventos: [
    {
      entity: 'financeiro',
      relatedFields: ['financeiro_receita', 'financeiro_categoria', 'financeiro_data_vencimento', 'financeiro_data_pagamento'],
      relationshipType: 'direct',
      description: 'Eventos geram receitas financeiras'
    },
    {
      entity: 'usuarios',
      relatedFields: ['usuarios_nome', 'usuarios_email'],
      relationshipType: 'indirect',
      description: 'Eventos são gerenciados por usuários'
    }
  ],
  financeiro: [
    {
      entity: 'eventos',
      relatedFields: ['eventos_cliente', 'eventos_valor', 'eventos_data'],
      relationshipType: 'direct',
      description: 'Receitas podem vir de eventos'
    },
    {
      entity: 'escolinha',
      relatedFields: ['escolinha_aluno', 'escolinha_mensalidade', 'escolinha_data_matricula'],
      relationshipType: 'direct',
      description: 'Receitas podem vir da escolinha'
    },
    {
      entity: 'bar',
      relatedFields: ['bar_produto', 'bar_vendas', 'bar_data_venda'],
      relationshipType: 'direct',
      description: 'Receitas podem vir do bar'
    }
  ],
  escolinha: [
    {
      entity: 'financeiro',
      relatedFields: ['financeiro_receita', 'financeiro_categoria', 'financeiro_data_vencimento'],
      relationshipType: 'direct',
      description: 'Mensalidades geram receitas'
    },
    {
      entity: 'usuarios',
      relatedFields: ['usuarios_nome', 'usuarios_email'],
      relationshipType: 'indirect',
      description: 'Professores são usuários do sistema'
    }
  ],
  bar: [
    {
      entity: 'financeiro',
      relatedFields: ['financeiro_receita', 'financeiro_categoria', 'financeiro_data_vencimento'],
      relationshipType: 'direct',
      description: 'Vendas geram receitas'
    },
    {
      entity: 'usuarios',
      relatedFields: ['usuarios_nome'],
      relationshipType: 'indirect',
      description: 'Vendas são feitas por usuários'
    }
  ],
  usuarios: [
    {
      entity: 'eventos',
      relatedFields: ['eventos_cliente', 'eventos_status'],
      relationshipType: 'indirect',
      description: 'Usuários gerenciam eventos'
    },
    {
      entity: 'escolinha',
      relatedFields: ['escolinha_professor', 'escolinha_turma'],
      relationshipType: 'indirect',
      description: 'Usuários podem ser professores'
    }
  ]
};

// Função para obter campos relacionados inteligentemente
export const getSmartRelatedFields = (selectedFields: ReportField[], allFields: ReportField[]): ReportField[] => {
  if (selectedFields.length === 0) {
    // Campos principais de cada entidade
    const mainFieldIds = [
      'eventos_cliente', 'eventos_valor', 'eventos_data',
      'financeiro_receita', 'financeiro_categoria',
      'escolinha_aluno', 'escolinha_mensalidade',
      'bar_produto', 'bar_vendas',
      'usuarios_nome'
    ];
    return allFields.filter(field => mainFieldIds.includes(field.id));
  }

  const selectedEntities = [...new Set(selectedFields.map(f => f.entity))];
  const relatedFieldIds = new Set<string>();

  // Para cada entidade selecionada, obter campos relacionados
  selectedEntities.forEach(entity => {
    const relations = entityRelationships[entity] || [];
    
    relations.forEach(relation => {
      // Adicionar campos relacionados diretos primeiro
      if (relation.relationshipType === 'direct') {
        relation.relatedFields.forEach(fieldId => relatedFieldIds.add(fieldId));
      }
    });

    // Se temos poucas entidades, adicionar relacionamentos indiretos
    if (selectedEntities.length <= 2) {
      relations.forEach(relation => {
        if (relation.relationshipType === 'indirect') {
          relation.relatedFields.forEach(fieldId => relatedFieldIds.add(fieldId));
        }
      });
    }
  });

  // Remover campos já selecionados
  selectedFields.forEach(field => relatedFieldIds.delete(field.id));

  // Retornar campos relacionados ordenados por relevância
  const relatedFields = allFields.filter(field => relatedFieldIds.has(field.id));
  
  return relatedFields.sort((a, b) => {
    // Priorizar campos da mesma entidade
    const aSameEntity = selectedEntities.includes(a.entity);
    const bSameEntity = selectedEntities.includes(b.entity);
    
    if (aSameEntity && !bSameEntity) return -1;
    if (!aSameEntity && bSameEntity) return 1;
    
    // Depois priorizar campos numéricos para análises
    if (a.type === 'number' && b.type !== 'number') return -1;
    if (a.type !== 'number' && b.type === 'number') return 1;
    
    return 0;
  });
};

// Função para detectar tipo de relatório e sugerir campos
export const detectReportType = (selectedFields: ReportField[]): {
  type: string;
  suggestedFields: string[];
  description: string;
} => {
  if (selectedFields.length === 0) {
    return {
      type: 'Relatório Personalizado',
      suggestedFields: [],
      description: 'Selecione campos para começar'
    };
  }

  const entities = [...new Set(selectedFields.map(f => f.entity))];
  const fieldNames = selectedFields.map(f => f.name);

  // Relatório Financeiro
  if (fieldNames.some(name => ['receita', 'despesa', 'valor'].includes(name))) {
    return {
      type: 'Relatório Financeiro',
      suggestedFields: ['financeiro_categoria', 'financeiro_data_vencimento', 'eventos_cliente'],
      description: 'Análise de receitas e despesas'
    };
  }

  // Relatório de Eventos
  if (entities.includes('eventos')) {
    return {
      type: 'Relatório de Eventos',
      suggestedFields: ['eventos_status', 'eventos_quadra', 'financeiro_receita'],
      description: 'Análise de reservas e eventos'
    };
  }

  // Relatório da Escolinha
  if (entities.includes('escolinha')) {
    return {
      type: 'Relatório da Escolinha',
      suggestedFields: ['escolinha_ativo', 'financeiro_receita', 'escolinha_professor'],
      description: 'Análise de alunos e mensalidades'
    };
  }

  // Relatório do Bar
  if (entities.includes('bar')) {
    return {
      type: 'Relatório do Bar',
      suggestedFields: ['bar_estoque', 'financeiro_receita', 'bar_categoria'],
      description: 'Análise de vendas e produtos'
    };
  }

  return {
    type: 'Relatório Multi-Entidade',
    suggestedFields: [],
    description: 'Relatório cruzando múltiplas entidades'
  };
};
