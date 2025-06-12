
import { ReportField } from '@/types/reports';

// Definir relacionamentos lógicos entre campos
export const fieldRelationships: Record<string, {
  strongRelations: string[]; // Campos diretamente relacionados
  weakRelations: string[];   // Campos que podem ser úteis
  contextualFields: string[]; // Campos que agregam contexto
}> = {
  // Relacionamentos para Eventos
  'eventos_cliente': {
    strongRelations: ['eventos_valor', 'eventos_data', 'eventos_status', 'financeiro_receita', 'financeiro_data_pagamento'],
    weakRelations: ['eventos_quadra', 'eventos_horario', 'usuarios_nome', 'usuarios_email'],
    contextualFields: ['financeiro_categoria', 'financeiro_descricao']
  },
  'eventos_valor': {
    strongRelations: ['eventos_cliente', 'eventos_data', 'financeiro_receita', 'financeiro_despesa'],
    weakRelations: ['eventos_status', 'financeiro_data_vencimento', 'financeiro_data_pagamento'],
    contextualFields: ['eventos_quadra', 'financeiro_categoria']
  },
  'eventos_data': {
    strongRelations: ['eventos_cliente', 'eventos_valor', 'financeiro_data_vencimento', 'financeiro_data_pagamento'],
    weakRelations: ['eventos_status', 'eventos_horario', 'financeiro_receita'],
    contextualFields: ['eventos_quadra', 'eventos_duracao']
  },

  // Relacionamentos para Financeiro
  'financeiro_receita': {
    strongRelations: ['financeiro_categoria', 'financeiro_data_vencimento', 'eventos_valor', 'eventos_cliente'],
    weakRelations: ['financeiro_descricao', 'financeiro_tipo', 'bar_vendas', 'escolinha_mensalidade'],
    contextualFields: ['eventos_data', 'bar_produto', 'escolinha_aluno']
  },
  'financeiro_despesa': {
    strongRelations: ['financeiro_categoria', 'financeiro_data_vencimento', 'financeiro_descricao'],
    weakRelations: ['financeiro_tipo', 'eventos_valor'],
    contextualFields: ['usuarios_nome', 'financeiro_data_pagamento']
  },
  'financeiro_categoria': {
    strongRelations: ['financeiro_receita', 'financeiro_despesa', 'financeiro_descricao'],
    weakRelations: ['eventos_valor', 'bar_categoria', 'escolinha_mensalidade'],
    contextualFields: ['financeiro_tipo', 'financeiro_data_vencimento']
  },

  // Relacionamentos para Escolinha
  'escolinha_aluno': {
    strongRelations: ['escolinha_mensalidade', 'escolinha_turma', 'escolinha_data_matricula', 'financeiro_receita'],
    weakRelations: ['escolinha_professor', 'escolinha_ativo', 'usuarios_nome'],
    contextualFields: ['escolinha_idade', 'financeiro_categoria']
  },
  'escolinha_mensalidade': {
    strongRelations: ['escolinha_aluno', 'escolinha_turma', 'financeiro_receita', 'financeiro_categoria'],
    weakRelations: ['escolinha_data_matricula', 'escolinha_ativo'],
    contextualFields: ['escolinha_professor', 'financeiro_data_vencimento']
  },
  'escolinha_professor': {
    strongRelations: ['escolinha_turma', 'escolinha_aluno', 'usuarios_nome'],
    weakRelations: ['escolinha_mensalidade', 'financeiro_despesa'],
    contextualFields: ['escolinha_data_matricula', 'financeiro_categoria']
  },

  // Relacionamentos para Bar
  'bar_produto': {
    strongRelations: ['bar_preco', 'bar_categoria', 'bar_vendas', 'bar_estoque'],
    weakRelations: ['bar_data_venda', 'bar_cliente', 'financeiro_receita'],
    contextualFields: ['financeiro_categoria', 'financeiro_data_vencimento']
  },
  'bar_vendas': {
    strongRelations: ['bar_produto', 'bar_preco', 'bar_data_venda', 'financeiro_receita'],
    weakRelations: ['bar_cliente', 'bar_categoria'],
    contextualFields: ['bar_estoque', 'financeiro_categoria']
  },
  'bar_preco': {
    strongRelations: ['bar_produto', 'bar_vendas', 'bar_categoria'],
    weakRelations: ['financeiro_receita', 'bar_estoque'],
    contextualFields: ['bar_data_venda', 'financeiro_categoria']
  },

  // Relacionamentos para Usuários
  'usuarios_nome': {
    strongRelations: ['usuarios_email', 'usuarios_grupo', 'usuarios_ativo'],
    weakRelations: ['escolinha_professor', 'eventos_cliente', 'usuarios_data_criacao'],
    contextualFields: ['usuarios_ultimo_acesso', 'financeiro_descricao']
  }
};

// Função para obter campos relacionados baseado na seleção atual
export const getRelatedFields = (selectedFields: ReportField[], allFields: ReportField[]): ReportField[] => {
  if (selectedFields.length === 0) {
    // Se nenhum campo selecionado, mostrar campos principais de cada entidade
    const mainFields = [
      'eventos_cliente', 'eventos_valor', 'eventos_data',
      'financeiro_receita', 'financeiro_categoria', 'financeiro_data_vencimento',
      'escolinha_aluno', 'escolinha_mensalidade', 'escolinha_turma',
      'bar_produto', 'bar_vendas', 'bar_preco',
      'usuarios_nome', 'usuarios_email'
    ];
    return allFields.filter(field => mainFields.includes(field.id));
  }

  const selectedFieldIds = selectedFields.map(f => f.id);
  const relatedFieldIds = new Set<string>();

  // Para cada campo selecionado, adicionar seus relacionamentos
  selectedFields.forEach(field => {
    const relations = fieldRelationships[field.id];
    if (relations) {
      // Adicionar relacionamentos fortes (prioridade alta)
      relations.strongRelations.forEach(id => relatedFieldIds.add(id));
      
      // Adicionar relacionamentos fracos se ainda não temos muitos campos
      if (selectedFields.length <= 3) {
        relations.weakRelations.forEach(id => relatedFieldIds.add(id));
      }
      
      // Adicionar campos contextuais se temos poucos campos
      if (selectedFields.length <= 2) {
        relations.contextualFields.forEach(id => relatedFieldIds.add(id));
      }
    }
  });

  // Filtrar campos já selecionados
  selectedFieldIds.forEach(id => relatedFieldIds.delete(id));

  // Retornar campos relacionados ordenados por relevância
  const relatedFields = allFields.filter(field => relatedFieldIds.has(field.id));
  
  // Ordenar por tipo de relacionamento (campos fortes primeiro)
  return relatedFields.sort((a, b) => {
    const aStrong = selectedFields.some(sf => 
      fieldRelationships[sf.id]?.strongRelations.includes(a.id)
    );
    const bStrong = selectedFields.some(sf => 
      fieldRelationships[sf.id]?.strongRelations.includes(b.id)
    );
    
    if (aStrong && !bStrong) return -1;
    if (!aStrong && bStrong) return 1;
    return 0;
  });
};

// Função para detectar contexto do relatório baseado nos campos selecionados
export const detectReportContext = (selectedFields: ReportField[]): {
  primaryEntity: string;
  reportType: string;
  suggestedFields: string[];
} => {
  if (selectedFields.length === 0) {
    return {
      primaryEntity: '',
      reportType: 'Relatório Personalizado',
      suggestedFields: []
    };
  }

  const entityCounts = selectedFields.reduce((acc, field) => {
    acc[field.entity] = (acc[field.entity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const primaryEntity = Object.keys(entityCounts).reduce((a, b) => 
    entityCounts[a] > entityCounts[b] ? a : b
  );

  // Detectar tipo de relatório baseado nos campos
  let reportType = 'Relatório Personalizado';
  let suggestedFields: string[] = [];

  const fieldIds = selectedFields.map(f => f.id);
  
  if (fieldIds.some(id => id.includes('receita')) && fieldIds.some(id => id.includes('despesa'))) {
    reportType = 'Relatório Financeiro Completo';
    suggestedFields = ['financeiro_categoria', 'financeiro_data_vencimento', 'financeiro_tipo'];
  } else if (fieldIds.some(id => id.includes('eventos'))) {
    reportType = 'Relatório de Eventos';
    suggestedFields = ['eventos_status', 'eventos_quadra', 'financeiro_receita'];
  } else if (fieldIds.some(id => id.includes('escolinha'))) {
    reportType = 'Relatório da Escolinha';
    suggestedFields = ['escolinha_ativo', 'escolinha_idade', 'financeiro_receita'];
  } else if (fieldIds.some(id => id.includes('bar'))) {
    reportType = 'Relatório do Bar';
    suggestedFields = ['bar_estoque', 'bar_data_venda', 'financeiro_receita'];
  }

  return {
    primaryEntity,
    reportType,
    suggestedFields: suggestedFields.filter(id => !fieldIds.includes(id))
  };
};
