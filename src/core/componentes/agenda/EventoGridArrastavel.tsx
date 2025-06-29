
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EventoGrid } from '@/core/hooks/useAgendaOriginUI';

interface EventoGridArrastavelProps {
  evento: EventoGrid;
  onClick?: () => void;
}

const EventoGridArrastavel = ({ evento, onClick }: EventoGridArrastavelProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: evento.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    position: 'absolute' as const,
    top: evento.top,
    height: evento.height,
    left: '4px',
    right: '4px',
    minHeight: '40px'
  };

  const obterIniciais = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        rounded-lg border cursor-move px-3 py-2 text-sm
        shadow-sm hover:shadow-md transition-all duration-200
        ${isDragging ? 'z-50 shadow-lg scale-105' : ''}
      `}
      onClick={onClick}
      data-evento-id={evento.id}
    >
      <div 
        className="h-full w-full rounded-md p-2 text-white"
        style={{ backgroundColor: evento.cor }}
      >
        <div className="flex items-start gap-2">
          <Avatar className="h-6 w-6 border-2 border-white/20">
            <AvatarFallback className="text-xs font-medium bg-white/20 text-white">
              {obterIniciais(evento.cliente)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs truncate">
              {evento.titulo}
            </div>
            <div className="text-xs opacity-90 truncate">
              {evento.startTime} - {evento.endTime}
            </div>
            <div className="text-xs opacity-75 truncate">
              {evento.local}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventoGridArrastavel;
