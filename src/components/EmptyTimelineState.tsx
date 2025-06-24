
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const EmptyTimelineState = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-gray-100 p-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Selecione uma data e local
            </h3>
            <p className="text-sm text-gray-600">
              Para visualizar os eventos do dia, primeiro selecione a data e o local desejado.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>Escolha um local para começar</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyTimelineState;
