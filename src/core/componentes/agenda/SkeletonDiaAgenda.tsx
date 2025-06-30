
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonDiaAgendaProps {
  tipo?: 'month' | 'week' | 'day' | 'agenda';
}

const SkeletonDiaAgenda = ({ tipo = 'month' }: SkeletonDiaAgendaProps) => {
  if (tipo === 'agenda') {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3 p-3 rounded-lg border">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-3 w-[40%]" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (tipo === 'day') {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-16 flex-1" />
          </div>
        ))}
      </div>
    );
  }

  // Para month e week
  return (
    <div className="space-y-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-full rounded" />
      ))}
    </div>
  );
};

export default SkeletonDiaAgenda;
