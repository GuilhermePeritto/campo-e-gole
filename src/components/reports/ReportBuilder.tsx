
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReportConfig, ReportField } from '@/types/reports';
import { FileText } from 'lucide-react';
import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import SelectedField from './SelectedField';

interface ReportBuilderProps {
  selectedFields: ReportField[];
  onFieldRemove: (fieldId: string) => void;
  onFieldAdd: (field: ReportField) => void;
  onFieldsReorder: (fields: ReportField[]) => void;
  reportConfig: ReportConfig;
  onConfigChange: (config: ReportConfig) => void;
}

const ReportBuilder = ({
  selectedFields,
  onFieldRemove,
  onFieldAdd,
  onFieldsReorder,
  reportConfig,
  onConfigChange
}: ReportBuilderProps) => {
  const dropRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'field',
    drop: (item: ReportField) => {
      onFieldAdd(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(dropRef);

  const moveField = (dragIndex: number, hoverIndex: number) => {
    const newFields = [...selectedFields];
    const draggedField = newFields[dragIndex];
    newFields.splice(dragIndex, 1);
    newFields.splice(hoverIndex, 0, draggedField);
    onFieldsReorder(newFields);
  };

  return (
    <div className="space-y-6">
      <Card className="h-[600px] 3xl:h-[700px] 4xl:h-[800px] flex flex-col">
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
        <CardContent className='flex-1 overflow-hidden relative w-full'>
          <div
            ref={dropRef}
            className={`flex h-full w-full border-2 border-dashed rounded-lg p-4 transition-colors overflow-y-auto ${isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
          >
            {selectedFields.length === 0 ? (
              <div className="text-center text-muted-foreground py-8 w-full">
                <FileText className="h-12 w-full mx-auto mb-4 opacity-50" />
                <p>Arraste campos aqui ou clique para selecionar da lista</p>
              </div>
            ) : (
              <div className="space-y-3 w-full">
                {selectedFields.map((field, index) => (
                  <SelectedField
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
    </div>
  );
};

export default ReportBuilder;
