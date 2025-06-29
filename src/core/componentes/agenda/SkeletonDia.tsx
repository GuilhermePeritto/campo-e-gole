
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

interface SkeletonDiaProps {
  quantidadeEventos?: number;
  tipoVisualizacao?: 'mes' | 'semana' | 'dia' | 'agenda';
}

const SkeletonDia = ({ quantidadeEventos = 3, tipoVisualizacao = 'mes' }: SkeletonDiaProps) => {
  const gerarSkeletonEventos = () => {
    return Array.from({ length: quantidadeEventos }, (_, index) => (
      <div key={index} className="space-y-1">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-2 w-3/4" />
      </div>
    ));
  };

  if (tipoVisualizacao === 'agenda') {
    return (
      <Card className="mb-3">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tipoVisualizacao === 'dia') {
    return (
      <div className="space-y-2 p-2 border-b">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-1 w-full" />
        </div>
        {gerarSkeletonEventos()}
      </div>
    );
  }

  if (tipoVisualizacao === 'semana') {
    return (
      <div className="space-y-1 p-1 min-h-[80px]">
        {gerarSkeletonEventos()}
      </div>
    );
  }

  // Visualização de mês (padrão)
  return (
    <div className="space-y-1 p-1 min-h-[60px]">
      {Array.from({ length: Math.min(quantidadeEventos, 2) }, (_, index) => (
        <Skeleton key={index} className="h-2 w-full" />
      ))}
      {quantidadeEventos > 2 && (
        <Skeleton className="h-2 w-8 mx-auto" />
      )}
    </div>
  );
};

export default SkeletonDia;
