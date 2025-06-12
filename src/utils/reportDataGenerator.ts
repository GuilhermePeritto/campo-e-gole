
import { ReportField } from '@/types/reports';

interface MockDataTemplate {
  [key: string]: any;
}

// Templates de dados relacionados por entidade
const dataTemplates: Record<string, MockDataTemplate[]> = {
  eventos: [
    { id: 1, cliente: 'Maria Silva', valor: 2500, data: '2024-06-15', status: 'Confirmado', espaco: 'Salão Principal', tipo: 'Casamento' },
    { id: 2, cliente: 'João Santos', valor: 1800, data: '2024-06-20', status: 'Pendente', espaco: 'Área Externa', tipo: 'Aniversário' },
    { id: 3, cliente: 'Ana Costa', valor: 3200, data: '2024-06-25', status: 'Pago', espaco: 'Salão VIP', tipo: 'Formatura' },
  ],
  financeiro: [
    { id: 1, receita: 2500, despesa: 800, categoria: 'Eventos', descricao: 'Casamento Maria Silva', data: '2024-06-15', tipo: 'Receita' },
    { id: 2, receita: 1800, despesa: 600, categoria: 'Eventos', descricao: 'Aniversário João Santos', data: '2024-06-20', tipo: 'Receita' },
    { id: 3, receita: 3200, despesa: 1000, categoria: 'Eventos', descricao: 'Formatura Ana Costa', data: '2024-06-25', tipo: 'Receita' },
  ],
  escolinha: [
    { id: 1, aluno: 'Pedro Lima', mensalidade: 150, turma: 'Infantil A', professor: 'Prof. Carlos', data: '2024-06-01', status: 'Pago' },
    { id: 2, aluno: 'Sofia Oliveira', mensalidade: 150, turma: 'Infantil B', professor: 'Prof. Maria', data: '2024-06-01', status: 'Pendente' },
    { id: 3, aluno: 'Lucas Ferreira', mensalidade: 180, turma: 'Juvenil A', professor: 'Prof. João', data: '2024-06-01', status: 'Pago' },
  ],
  bar: [
    { id: 1, produto: 'Refrigerante', preco: 5.50, quantidade: 25, categoria: 'Bebidas', vendas: 138, lucro: 90 },
    { id: 2, produto: 'Cerveja', preco: 8.00, quantidade: 40, categoria: 'Bebidas', vendas: 320, lucro: 160 },
    { id: 3, produto: 'Salgadinho', preco: 3.50, quantidade: 15, categoria: 'Lanches', vendas: 53, lucro: 25 },
  ]
};

// Função para gerar dados relacionados baseado nos campos selecionados
export const generateRelatedData = (selectedFields: ReportField[]): any[] => {
  if (selectedFields.length === 0) return [];

  // Agrupar campos por entidade
  const entitiesByFields = selectedFields.reduce((acc, field) => {
    if (!acc[field.entity]) {
      acc[field.entity] = [];
    }
    acc[field.entity].push(field);
    return acc;
  }, {} as Record<string, ReportField[]>);

  const entities = Object.keys(entitiesByFields);
  
  // Se houver apenas uma entidade, retornar dados dessa entidade
  if (entities.length === 1) {
    const entity = entities[0];
    const templates = dataTemplates[entity] || [];
    
    return templates.map((template, index) => {
      const row: any = { id: index + 1 };
      selectedFields.forEach(field => {
        row[field.name] = template[field.name] || generateFieldValue(field, index);
      });
      return row;
    });
  }

  // Se houver múltiplas entidades, criar dados relacionados
  const mainEntity = entities[0]; // Entidade principal
  const mainTemplates = dataTemplates[mainEntity] || [];
  
  return mainTemplates.map((mainTemplate, index) => {
    const row: any = { id: index + 1 };
    
    selectedFields.forEach(field => {
      if (field.entity === mainEntity) {
        row[field.name] = mainTemplate[field.name] || generateFieldValue(field, index);
      } else {
        // Para outras entidades, criar dados relacionados baseados no índice
        const relatedTemplate = dataTemplates[field.entity]?.[index] || {};
        row[field.name] = relatedTemplate[field.name] || generateFieldValue(field, index);
      }
    });
    
    return row;
  });
};

// Função auxiliar para gerar valores de campo quando não há template
const generateFieldValue = (field: ReportField, index: number): any => {
  switch (field.type) {
    case 'string':
      return `${field.label} ${index + 1}`;
    case 'number':
      // Gerar números mais realistas baseados no nome do campo
      if (field.name.includes('valor') || field.name.includes('preco')) {
        return Math.floor(Math.random() * 5000) + 500;
      }
      if (field.name.includes('quantidade')) {
        return Math.floor(Math.random() * 50) + 1;
      }
      return Math.floor(Math.random() * 1000) + 100;
    case 'date':
      const date = new Date(2024, 5, Math.floor(Math.random() * 28) + 1);
      return date.toLocaleDateString('pt-BR');
    case 'boolean':
      return Math.random() > 0.5;
    default:
      return `Valor ${index + 1}`;
  }
};
