
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { memo } from 'react';

interface SkeletonCarregamentoEventosProps {
  quantidade?: number;
}

const SkeletonCarregamentoEventos = memo(({ quantidade = 3 }: SkeletonCarregamentoEventosProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: quantidade }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Skeleton className="h-3 w-3 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

SkeletonCarregamentoEventos.displayName = 'SkeletonCarregamentoEventos';

export default SkeletonCarregamentoEventos;
