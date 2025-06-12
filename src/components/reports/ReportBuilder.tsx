
import { useDrop, useDrag } from 'react-dnd';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, X, GripVertical } from 'lucide-react';
import { ReportField, ReportConfig } from '@/types/reports';

interface ReportBuilderProps {
  selectedFields: ReportField[];
  onFieldRemove: (fieldId: string) => void;
  onFieldAdd: (field: ReportField) => void;
  onFieldsReorder: (fields: ReportField[]) => void;
  reportConfig: ReportConfig;
  onConfigChange: (config: ReportConfig) => void;
}

interface DraggableFieldProps {
  field: ReportField;
  index: number;
  onRemove: (fieldId: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableField = ({ field, index, onRemove, onMove }: DraggableFieldProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'selected-field',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'selected-field',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        onMove(item.index, index);
        item.index = index;
      }
    },
  });

  const getFieldTypeColor = (type: string) => {
    switch (type) {
      case 'string': return 'bg-blue-100 text-blue-800';
      case 'number': return 'bg-green-100 text-green-800';
      case 'date': return 'bg-purple-100 text-purple-800';
      case 'boolean': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEntityColor = (entity: string) => {
    const colors = {
      'eventos': 'bg-red-100 text-red-800',
      'financeiro': 'bg-yellow-100 text-yellow-800',
      'escolinha': 'bg-green-100 text-green-800',
      'bar': 'bg-blue-100 text-blue-800',
      'usuarios': 'bg-purple-100 text-purple-800',
    };
    return colors[entity as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Corrigir o problema do ref usando useCallback
  const combinedRef = (node: HTMLDivElement | null) => {
    drag(node);
    drop(node);
  };

  return (
    <div
      ref={combinedRef}
      className={`flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
        <div className="flex flex-col">
          <span className="font-medium">{field.label}</span>
          <span className="text-sm text-muted-foreground">{field.entity}.{field.name}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge 
          variant="outline" 
          className={`text-xs ${getEntityColor(field.entity)}`}
        >
          {field.entity}
        </Badge>
        <Badge 
          variant="outline" 
          className={`text-xs ${getFieldTypeColor(field.type)}`}
        >
          {field.type}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(field.id)}
          className="h-8 w-8 p-0 hover:bg-red-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const ReportBuilder = ({ 
  selectedFields, 
  onFieldRemove,
  onFieldAdd,
  onFieldsReorder
}: ReportBuilderProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'field',
    drop: (item: ReportField) => {
      onFieldAdd(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveField = (dragIndex: number, hoverIndex: number) => {
    const newFields = [...selectedFields];
    const draggedField = newFields[dragIndex];
    newFields.splice(dragIndex, 1);
    newFields.splice(hoverIndex, 0, draggedField);
    onFieldsReorder(newFields);
  };

  return (
    <div className="space-y-6">
      {/* Campos Selecionados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Campos Selecionados
          </CardTitle>
          <CardDescription>
            {selectedFields.length === 0 
              ? 'Nenhum campo selecionado. Arraste campos da lista ao lado ou clique para selecionar.'
              : `${selectedFields.length} campo(s) selecionado(s). Arraste para reordenar.`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            ref={drop}
            className={`min-h-[200px] max-h-[400px] 3xl:min-h-[250px] 4xl:min-h-[300px] border-2 border-dashed rounded-lg p-4 transition-colors overflow-y-auto ${
              isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            {selectedFields.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Arraste campos aqui ou clique para selecionar da lista</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedFields.map((field, index) => (
                  <DraggableField
                    key={field.id}
                    field={field}
                    index={index}
                    onRemove={onFieldRemove}
                    onMove={moveField}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resumo */}
      {selectedFields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{selectedFields.length}</div>
                <div className="text-sm text-muted-foreground">Campos</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {new Set(selectedFields.map(f => f.entity)).size}
                </div>
                <div className="text-sm text-muted-foreground">Entidades</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedFields.filter(f => f.type === 'number').length}
                </div>
                <div className="text-sm text-muted-foreground">Campos Numéricos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportBuilder;
