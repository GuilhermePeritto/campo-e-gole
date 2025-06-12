
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Search, Database } from 'lucide-react';
import { ReportField, EntityFieldGroup } from '@/types/reports';

interface FieldSelectorProps {
  onFieldSelect: (field: ReportField) => void;
  selectedFields: ReportField[];
}

const FieldSelector = ({ onFieldSelect, selectedFields }: FieldSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEntities, setExpandedEntities] = useState<Set<string>>(new Set(['eventos', 'financeiro']));

  // Definir todas as entidades e campos do sistema
  const entityGroups: EntityFieldGroup[] = [
    {
      entity: 'eventos',
      label: 'Eventos e Reservas',
      fields: [
        { id: 'eventos_cliente', name: 'cliente', label: 'Cliente', type: 'string', entity: 'eventos' },
        { id: 'eventos_valor', name: 'valor', label: 'Valor', type: 'number', entity: 'eventos' },
        { id: 'eventos_data', name: 'data', label: 'Data', type: 'date', entity: 'eventos' },
        { id: 'eventos_status', name: 'status', label: 'Status', type: 'string', entity: 'eventos' },
        { id: 'eventos_quadra', name: 'quadra', label: 'Quadra', type: 'string', entity: 'eventos' },
        { id: 'eventos_horario', name: 'horario', label: 'Horário', type: 'string', entity: 'eventos' },
        { id: 'eventos_duracao', name: 'duracao', label: 'Duração', type: 'number', entity: 'eventos' },
      ]
    },
    {
      entity: 'financeiro',
      label: 'Financeiro',
      fields: [
        { id: 'financeiro_receita', name: 'receita', label: 'Receita', type: 'number', entity: 'financeiro' },
        { id: 'financeiro_despesa', name: 'despesa', label: 'Despesa', type: 'number', entity: 'financeiro' },
        { id: 'financeiro_categoria', name: 'categoria', label: 'Categoria', type: 'string', entity: 'financeiro' },
        { id: 'financeiro_data_vencimento', name: 'data_vencimento', label: 'Data Vencimento', type: 'date', entity: 'financeiro' },
        { id: 'financeiro_data_pagamento', name: 'data_pagamento', label: 'Data Pagamento', type: 'date', entity: 'financeiro' },
        { id: 'financeiro_descricao', name: 'descricao', label: 'Descrição', type: 'string', entity: 'financeiro' },
        { id: 'financeiro_tipo', name: 'tipo', label: 'Tipo', type: 'string', entity: 'financeiro' },
      ]
    },
    {
      entity: 'escolinha',
      label: 'Escolinha',
      fields: [
        { id: 'escolinha_aluno', name: 'aluno', label: 'Aluno', type: 'string', entity: 'escolinha' },
        { id: 'escolinha_professor', name: 'professor', label: 'Professor', type: 'string', entity: 'escolinha' },
        { id: 'escolinha_turma', name: 'turma', label: 'Turma', type: 'string', entity: 'escolinha' },
        { id: 'escolinha_mensalidade', name: 'mensalidade', label: 'Mensalidade', type: 'number', entity: 'escolinha' },
        { id: 'escolinha_data_matricula', name: 'data_matricula', label: 'Data Matrícula', type: 'date', entity: 'escolinha' },
        { id: 'escolinha_ativo', name: 'ativo', label: 'Ativo', type: 'boolean', entity: 'escolinha' },
        { id: 'escolinha_idade', name: 'idade', label: 'Idade', type: 'number', entity: 'escolinha' },
      ]
    },
    {
      entity: 'bar',
      label: 'Bar e Produtos',
      fields: [
        { id: 'bar_produto', name: 'produto', label: 'Produto', type: 'string', entity: 'bar' },
        { id: 'bar_preco', name: 'preco', label: 'Preço', type: 'number', entity: 'bar' },
        { id: 'bar_categoria', name: 'categoria', label: 'Categoria', type: 'string', entity: 'bar' },
        { id: 'bar_estoque', name: 'estoque', label: 'Estoque', type: 'number', entity: 'bar' },
        { id: 'bar_vendas', name: 'vendas', label: 'Vendas', type: 'number', entity: 'bar' },
        { id: 'bar_data_venda', name: 'data_venda', label: 'Data Venda', type: 'date', entity: 'bar' },
        { id: 'bar_cliente', name: 'cliente', label: 'Cliente', type: 'string', entity: 'bar' },
      ]
    },
    {
      entity: 'usuarios',
      label: 'Usuários e Sistema',
      fields: [
        { id: 'usuarios_nome', name: 'nome', label: 'Nome', type: 'string', entity: 'usuarios' },
        { id: 'usuarios_email', name: 'email', label: 'Email', type: 'string', entity: 'usuarios' },
        { id: 'usuarios_grupo', name: 'grupo', label: 'Grupo', type: 'string', entity: 'usuarios' },
        { id: 'usuarios_ativo', name: 'ativo', label: 'Ativo', type: 'boolean', entity: 'usuarios' },
        { id: 'usuarios_data_criacao', name: 'data_criacao', label: 'Data Criação', type: 'date', entity: 'usuarios' },
        { id: 'usuarios_ultimo_acesso', name: 'ultimo_acesso', label: 'Último Acesso', type: 'date', entity: 'usuarios' },
      ]
    }
  ];

  const filteredGroups = entityGroups.map(group => ({
    ...group,
    fields: group.fields.filter(field => 
      field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
    <Card className="h-[600px] 3xl:h-[700px] 4xl:h-[800px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Campos Disponíveis
        </CardTitle>
        <CardDescription>
          Selecione os campos para incluir no relatório
        </CardDescription>
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
          {filteredGroups.map((group) => (
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
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2 ml-6 space-y-2">
                {group.fields.map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-2 rounded-md border hover:bg-muted cursor-pointer"
                    onClick={() => onFieldSelect(field)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={isFieldSelected(field)}
                        onChange={() => onFieldSelect(field)}
                      />
                      <div>
                        <div className="font-medium text-sm">{field.label}</div>
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
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FieldSelector;
