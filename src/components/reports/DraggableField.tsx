
import { useDrag } from 'react-dnd';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Lightbulb } from 'lucide-react';
import { ReportField } from '@/types/reports';
import { useRef } from 'react';

interface DraggableFieldProps {
  field: ReportField;
  isSelected: boolean;
  onSelect: () => void;
  isRecommended?: boolean;
}

const DraggableField = ({ field, isSelected, onSelect, isRecommended }: DraggableFieldProps) => {
  const dragRef = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    item: field,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(dragRef);

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
      ref={dragRef}
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

export default DraggableField;
