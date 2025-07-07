import { cn } from '@/lib/utils';
import React from 'react';

interface StackedDaySelectorProps {
  days: Date[];
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

function getDayLabel(date: Date) {
  // Retorna a letra do dia da semana (ex: S, T, Q)
  return date.toLocaleDateString('pt-BR', { weekday: 'short' }).charAt(0).toUpperCase();
}

const StackedDaySelector: React.FC<StackedDaySelectorProps> = ({ days, selectedDate, onSelect }) => {
  return (
    <div className="flex flex-col items-center gap-[-24px] overflow-y-auto h-full py-2" style={{ minHeight: 0 }}>
      {days.map((date, idx) => {
        const isSelected =
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear();
        // Camadas: o selecionado fica na frente, os outros atrás
        const zIndex = isSelected ? 10 : 10 - Math.abs(idx - days.findIndex(d => d.getTime() === selectedDate.getTime()));
        const opacity = isSelected ? 1 : 0.5;
        const translate = isSelected ? 'translate-x-0' : `translate-x-[-${Math.abs(idx - days.findIndex(d => d.getTime() === selectedDate.getTime())) * 12}px]`;
        return (
          <button
            key={date.toISOString()}
            onClick={() => onSelect(date)}
            className={cn(
              'relative flex flex-col items-center justify-center w-14 h-16 mb-[-24px] transition-all duration-200',
              isSelected ? 'z-20' : 'z-10',
              isSelected ? 'shadow-xl' : 'shadow',
              isSelected ? 'bg-gradient-to-br from-blue-500 to-blue-400 text-white font-bold' : 'bg-muted text-muted-foreground',
              'rounded-r-2xl', // curvatura à direita
              'border-2',
              isSelected ? 'border-blue-500' : 'border-transparent',
              'hover:brightness-110',
              'focus:outline-none',
              'cursor-pointer',
              'transition-transform',
              translate
            )}
            style={{ opacity, zIndex }}
            tabIndex={0}
            aria-label={date.toLocaleDateString()}
          >
            <span className="text-xs leading-none mb-1">{getDayLabel(date)}</span>
            <span className="text-lg leading-none font-bold">{date.getDate()}</span>
            {isSelected && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow border border-blue-400" />}
          </button>
        );
      })}
    </div>
  );
};

export default StackedDaySelector; 