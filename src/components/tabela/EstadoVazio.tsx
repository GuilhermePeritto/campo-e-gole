
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const EstadoVazio = () => {
  return (
    <Card className="h-full flex items-center justify-center">
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum registro encontrado</h3>
        <p className="text-gray-500">Não há dados para exibir no momento.</p>
      </div>
    </Card>
  );
};

export default EstadoVazio;
