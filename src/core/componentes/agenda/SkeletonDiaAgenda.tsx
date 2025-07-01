
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

interface SkeletonDiaAgendaProps {
  tipo?: 'month' | 'week' | 'day' | 'agenda';
}

const SkeletonDiaAgenda = ({ tipo = 'month' }: SkeletonDiaAgendaProps) => {
  if (tipo === 'agenda') {
    return (
      <div className="space-y-6 px-6">
        {Array.from({ length: 4 }).map((_, dayIndex) => (
          <div key={dayIndex} className="space-y-3">
            {/* Header do dia */}
            <div className="flex items-center space-x-2 border-b pb-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            
            {/* Eventos do dia */}
            <div className="space-y-2">
              {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, eventIndex) => (
                <Card key={eventIndex} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tipo === 'day') {
    return (
      <div className="space-y-1 p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex items-start space-x-3 py-2">
            <Skeleton className="h-4 w-12 flex-shrink-0" />
            <div className="flex-1 space-y-1">
              {Math.random() > 0.7 && (
                <Skeleton className="h-12 w-full rounded-md" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tipo === 'week') {
    return (
      <div className="grid grid-cols-8 gap-1 p-4">
        {/* Header dos dias */}
        <div></div>
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-8 w-full" />
        ))}
        
        {/* Linhas de horário */}
        {Array.from({ length: 12 }).map((_, hour) => (
          <div key={hour} className="contents">
            <Skeleton className="h-8 w-12" />
            {Array.from({ length: 7 }).map((_, day) => (
              <div key={`${hour}-${day}`} className="space-y-1">
                {Math.random() > 0.8 && (
                  <Skeleton className="h-6 w-full rounded-sm" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Para visualização mensal
  return (
    <div className="grid grid-cols-7 gap-1 p-4">
      {/* Header dos dias da semana */}
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={`weekday-${i}`} className="h-8 w-full" />
      ))}
      
      {/* Células do calendário */}
      {Array.from({ length: 42 }).map((_, i) => (
        <div key={i} className="aspect-square p-1">
          <div className="w-full h-full border rounded-md p-2 space-y-1">
            <Skeleton className="h-4 w-6" />
            {Math.random() > 0.7 && (
              <Skeleton className="h-2 w-full rounded-sm" />
            )}
            {Math.random() > 0.8 && (
              <Skeleton className="h-2 w-3/4 rounded-sm" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonDiaAgenda;
