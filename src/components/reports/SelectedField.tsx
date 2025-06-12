
import { useDrag, useDrop } from 'react-dnd';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, GripVertical } from 'lucide-react';
import { ReportField } from '@/types/reports';

interface SelectedFieldProps {
  field: ReportField;
  index: number;
  onRemove: (fieldId: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

const SelectedField = ({ field, index, onRemove, onMove }: SelectedFieldProps) => {
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

export default SelectedField;
