import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { memo } from 'react';

interface DiaIndividualSkeletonProps {
  tipo: 'month' | 'week' | 'day' | 'agenda';
  quantidadeEventos?: number;
}

const DiaIndividualSkeleton = memo(({ tipo, quantidadeEventos = 2 }: DiaIndividualSkeletonProps) => {
  if (tipo === 'agenda') {
    return (
      <div className="espaco-y-2">
        {Array.from({ length: quantidadeEventos }).map((_, index) => (
          <Card key={index} className="animate-pulse borda-divisor/50">
            <CardContent className="p-4">
              <div className="flex items-start espaco-x-3">
                <Skeleton className="h-3 w-3 rounded-full" />
                <div className="flex-1 espaco-y-2">
                  <div className="flex items-center espaco-x-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <div className="flex items-center espaco-x-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (tipo === 'day') {
    return (
      <div className="espaco-y-1">
        {Array.from({ length: quantidadeEventos }).map((_, index) => (
          <div key={index} className="flex items-center espaco-x-2 py-1">
            <Skeleton className="h-8 w-12 flex-shrink-0" />
            <Skeleton className="h-6 flex-1 rounded-sm" />
          </div>
        ))}
      </div>
    );
  }

  if (tipo === 'week') {
    return (
      <div className="espaco-y-1">
        {Array.from({ length: quantidadeEventos }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full rounded-sm mb-1" />
        ))}
      </div>
    );
  }

  // Para visualização mensal - skeleton dentro do card do dia
  return (
    <div className="espaco-y-1 p-1">
      {Array.from({ length: quantidadeEventos }).map((_, index) => (
        <Skeleton key={index} className="h-2 w-full rounded-sm" />
      ))}
    </div>
  );
});

DiaIndividualSkeleton.displayName = 'DiaIndividualSkeleton';

export default DiaIndividualSkeleton;
