import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Search, Database, Lightbulb } from 'lucide-react';
import { ReportField, EntityFieldGroup } from '@/types/reports';
import { getRelatedFields, detectReportContext } from '@/utils/fieldRelationships';

interface FieldSelectorProps {
  onFieldSelect: (field: ReportField) => void;
  selectedFields: ReportField[];
}

const DraggableField = ({ field, isSelected, onSelect, isRecommended }: { 
  field: ReportField; 
  isSelected: boolean; 
  onSelect: () => void;
  isRecommended?: boolean;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    item: field,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getFieldTypeColor = (type: string) => {
    switch (type) {
      case 'string': return 'bg-blue-100 text-blue-800';
      case 'number': return 'bg-green-100 text-green-800';
      case 'date': return 'bg-purple-100 text-purple-800';
      case 'boolean': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      ref={(node) => drag(node)}
      className={`flex items-center justify-between p-2 rounded-md border hover:bg-muted cursor-pointer transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${isRecommended ? 'border-yellow-300 bg-yellow-50' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={isSelected}
          onChange={onSelect}
        />
        <div>
          <div className="font-medium text-sm flex items-center gap-1">
            {field.label}
            {isRecommended && <Lightbulb className="h-3 w-3 text-yellow-600" />}
          </div>
          <div className="text-xs text-muted-foreground">{field.name}</div>
        </div>
      </div>
      <Badge 
        variant="outline" 
        className={`text-xs ${getFieldTypeColor(field.type)}`}
      >
        {field.type}
      </Badge>
    </div>
  );
};

const FieldSelector = ({ onFieldSelect, selectedFields }: FieldSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEntities, setExpandedEntities] = useState<Set<string>>(new Set(['eventos', 'financeiro']));

  // Definir todas as entidades e campos do sistema
  const allFields: ReportField[] = [
    // Eventos
    { id: 'eventos_cliente', name: 'cliente', label: 'Cliente', type: 'string', entity: 'eventos' },
    { id: 'eventos_valor', name: 'valor', label: 'Valor', type: 'number', entity: 'eventos' },
    { id: 'eventos_data', name: 'data', label: 'Data', type: 'date', entity: 'eventos' },
    { id: 'eventos_status', name: 'status', label: 'Status', type: 'string', entity: 'eventos' },
    { id: 'eventos_quadra', name: 'quadra', label: 'Quadra', type: 'string', entity: 'eventos' },
    { id: 'eventos_horario', name: 'horario', label: 'Horário', type: 'string', entity: 'eventos' },
    { id: 'eventos_duracao', name: 'duracao', label: 'Duração', type: 'number', entity: 'eventos' },

    // Financeiro
    { id: 'financeiro_receita', name: 'receita', label: 'Receita', type: 'number', entity: 'financeiro' },
    { id: 'financeiro_despesa', name: 'despesa', label: 'Despesa', type: 'number', entity: 'financeiro' },
    { id: 'financeiro_categoria', name: 'categoria', label: 'Categoria', type: 'string', entity: 'financeiro' },
    { id: 'financeiro_data_vencimento', name: 'data_vencimento', label: 'Data Vencimento', type: 'date', entity: 'financeiro' },
    { id: 'financeiro_data_pagamento', name: 'data_pagamento', label: 'Data Pagamento', type: 'date', entity: 'financeiro' },
    { id: 'financeiro_descricao', name: 'descricao', label: 'Descrição', type: 'string', entity: 'financeiro' },
    { id: 'financeiro_tipo', name: 'tipo', label: 'Tipo', type: 'string', entity: 'financeiro' },

    // Escolinha
    { id: 'escolinha_aluno', name: 'aluno', label: 'Aluno', type: 'string', entity: 'escolinha' },
    { id: 'escolinha_professor', name: 'professor', label: 'Professor', type: 'string', entity: 'escolinha' },
    { id: 'escolinha_turma', name: 'turma', label: 'Turma', type: 'string', entity: 'escolinha' },
    { id: 'escolinha_mensalidade', name: 'mensalidade', label: 'Mensalidade', type: 'number', entity: 'escolinha' },
    { id: 'escolinha_data_matricula', name: 'data_matricula', label: 'Data Matrícula', type: 'date', entity: 'escolinha' },
    { id: 'escolinha_ativo', name: 'ativo', label: 'Ativo', type: 'boolean', entity: 'escolinha' },
    { id: 'escolinha_idade', name: 'idade', label: 'Idade', type: 'number', entity: 'escolinha' },

    // Bar
    { id: 'bar_produto', name: 'produto', label: 'Produto', type: 'string', entity: 'bar' },
    { id: 'bar_preco', name: 'preco', label: 'Preço', type: 'number', entity: 'bar' },
    { id: 'bar_categoria', name: 'categoria', label: 'Categoria', type: 'string', entity: 'bar' },
    { id: 'bar_estoque', name: 'estoque', label: 'Estoque', type: 'number', entity: 'bar' },
    { id: 'bar_vendas', name: 'vendas', label: 'Vendas', type: 'number', entity: 'bar' },
    { id: 'bar_data_venda', name: 'data_venda', label: 'Data Venda', type: 'date', entity: 'bar' },
    { id: 'bar_cliente', name: 'cliente', label: 'Cliente', type: 'string', entity: 'bar' },

    // Usuários
    { id: 'usuarios_nome', name: 'nome', label: 'Nome', type: 'string', entity: 'usuarios' },
    { id: 'usuarios_email', name: 'email', label: 'Email', type: 'string', entity: 'usuarios' },
    { id: 'usuarios_grupo', name: 'grupo', label: 'Grupo', type: 'string', entity: 'usuarios' },
    { id: 'usuarios_ativo', name: 'ativo', label: 'Ativo', type: 'boolean', entity: 'usuarios' },
    { id: 'usuarios_data_criacao', name: 'data_criacao', label: 'Data Criação', type: 'date', entity: 'usuarios' },
    { id: 'usuarios_ultimo_acesso', name: 'ultimo_acesso', label: 'Último Acesso', type: 'date', entity: 'usuarios' },
  ];

  // Obter campos relacionados usando o sistema inteligente
  const relatedFields = getRelatedFields(selectedFields, allFields);
  const reportContext = detectReportContext(selectedFields);

  // Filtrar campos baseado na busca e relacionamentos
  const getFilteredFields = () => {
    let fieldsToShow = selectedFields.length > 0 ? relatedFields : allFields;
    
    if (searchTerm) {
      fieldsToShow = allFields.filter(field => 
        field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.entity.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return fieldsToShow;
  };

  const filteredFields = getFilteredFields();

  // Agrupar campos por entidade
  const entityGroups: EntityFieldGroup[] = [
    { entity: 'eventos', label: 'Eventos e Reservas', fields: [] },
    { entity: 'financeiro', label: 'Financeiro', fields: [] },
    { entity: 'escolinha', label: 'Escolinha', fields: [] },
    { entity: 'bar', label: 'Bar e Produtos', fields: [] },
    { entity: 'usuarios', label: 'Usuários e Sistema', fields: [] }
  ].map(group => ({
    ...group,
    fields: filteredFields.filter(field => field.entity === group.entity)
  })).filter(group => group.fields.length > 0);

  const toggleEntity = (entity: string) => {
    const newExpanded = new Set(expandedEntities);
    if (newExpanded.has(entity)) {
      newExpanded.delete(entity);
    } else {
      newExpanded.add(entity);
    }
    setExpandedEntities(newExpanded);
  };

  const isFieldSelected = (field: ReportField) => {
    return selectedFields.some(f => f.id === field.id);
  };

  const isFieldRecommended = (field: ReportField) => {
    return reportContext.suggestedFields.includes(field.id);
  };

  return (
    <Card className="h-[600px] 3xl:h-[700px] 4xl:h-[800px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Campos Disponíveis
        </CardTitle>
        <CardDescription>
          {selectedFields.length > 0 
            ? `Exibindo campos relacionados para: ${reportContext.reportType}`
            : 'Selecione campos para formar seu relatório'
          }
        </CardDescription>
        
        {reportContext.suggestedFields.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              Campos recomendados destacados em amarelo
            </span>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar campos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto">
        <div className="space-y-3">
          {entityGroups.map((group) => (
            <Collapsible
              key={group.entity}
              open={expandedEntities.has(group.entity)}
              onOpenChange={() => toggleEntity(group.entity)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted">
                <div className="flex items-center gap-2">
                  {expandedEntities.has(group.entity) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span className="font-medium">{group.label}</span>
                  <Badge variant="secondary">{group.fields.length}</Badge>
                  {group.fields.some(f => isFieldRecommended(f)) && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      <Lightbulb className="h-3 w-3 mr-1" />
                      Recomendado
                    </Badge>
                  )}
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2 ml-6 space-y-2">
                {group.fields.map((field) => (
                  <DraggableField
                    key={field.id}
                    field={field}
                    isSelected={isFieldSelected(field)}
                    onSelect={() => onFieldSelect(field)}
                    isRecommended={isFieldRecommended(field)}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {filteredFields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum campo encontrado</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FieldSelector;
