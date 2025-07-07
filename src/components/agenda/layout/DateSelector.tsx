import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface DateInfo {
  value: number;
  label: string;
  isToday?: boolean;
  isCurrent?: boolean;
}

interface DateSelectorProps {
  type: 'day' | 'month';
  onSelect?: (value: number) => void;
  selectedValue?: number;
  month?: number;
  year?: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  curveSide?: 'left' | 'right';
}

const DateSelector: React.FC<DateSelectorProps> = ({
  type,
  onSelect,
  selectedValue,
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  className,
  orientation = 'vertical',
  curveSide = 'right'
}) => {
  const [currentValue, setCurrentValue] = useState(selectedValue || (type === 'day' ? new Date().getDate() : new Date().getMonth()));
  const [isExpanded, setIsExpanded] = useState(false);
  const [dates, setDates] = useState<DateInfo[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Gerar dados baseado no tipo
  useEffect(() => {
    if (type === 'day') {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = new Date();
      const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
      const generatedDates: DateInfo[] = [];
      
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const weekDayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        generatedDates.push({
          value: i,
          label: weekDayNames[date.getDay()],
          isToday: isCurrentMonth && i === today.getDate()
        });
      }
      setDates(generatedDates);
    } else {
      // Para meses
      const monthNames = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];
      const today = new Date();
      const isCurrentYear = today.getFullYear() === year;
      
      const generatedDates: DateInfo[] = monthNames.map((name, index) => ({
        value: index,
        label: name,
        isCurrent: isCurrentYear && index === today.getMonth()
      }));
      setDates(generatedDates);
    }
  }, [type, month, year]);

  // Atualizar currentValue se selectedValue mudar
  useEffect(() => {
    if (selectedValue !== undefined && selectedValue !== currentValue) {
      setCurrentValue(selectedValue);
    }
  }, [selectedValue]);

  // Obter os 5 itens visíveis centrados no valor atual
  const getVisibleDates = () => {
    const centerIndex = dates.findIndex(d => d.value === currentValue);
    const start = Math.max(0, centerIndex - 2);
    const end = Math.min(dates.length, start + 5);
    const adjustedStart = Math.max(0, end - 5);
    return dates.slice(adjustedStart, end);
  };

  const handleDateClick = (value: number) => {
    setCurrentValue(value);
    onSelect?.(value);
  };

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    const maxValue = type === 'day' ? dates.length : 11;
    const newValue = Math.max(type === 'day' ? 1 : 0, Math.min(maxValue, currentValue + direction));
    if (newValue !== currentValue) {
      handleDateClick(newValue);
    }
  };

  const visibleDates = getVisibleDates();
  const isVertical = orientation === 'vertical';

  return (
    <div 
      className={cn(
        "relative select-none",
        isVertical ? "w-20 h-full max-h-[400px]" : "w-full max-w-[280px]",
        isVertical 
          ? curveSide === 'left' ? "pr-8 pl-4 py-4" : "pl-8 pr-4 py-4"
          : curveSide === 'left' ? "pt-8 pb-4 px-4" : "pb-8 pt-4 px-4",
        className
      )}
      ref={containerRef}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onWheel={handleScroll}
    >      
      {/* Container dos cards */}
      <div className={cn(
        "relative flex items-center justify-center",
        isVertical ? "h-80 flex-col" : "h-20"
      )}>
        {visibleDates.map((dateInfo, index) => {
          const isSelected = dateInfo.value === currentValue;
          
          // Calcular posição no semicírculo quando expandido
          const getTransformStyle = () => {
            if (!isExpanded) {
              return {
                zIndex: isSelected ? 20 : 10 - Math.abs(index - 2)
              };
            }
            if (isVertical) {
              const angle = (index - 2) * 25;
              const radius = 30;
              const xMultiplier = curveSide === 'left' ? -1 : 1;
              const x = xMultiplier * Math.abs(Math.sin((angle * Math.PI) / 180) * radius);
              return {
                transform: `translate(${x}px) scale(${isSelected ? 1.1 : 1})`,
                zIndex: isSelected ? 20 : 10 - Math.abs(index - 2)
              };
            } else {
              const angle = (index - 2) * 25;
              const radius = 40;
              const x = Math.sin((angle * Math.PI) / 180) * radius;
              const yMultiplier = curveSide === 'left' ? -1 : 1;
              const y = yMultiplier * Math.abs(Math.cos((angle * Math.PI) / 180) * radius) - (yMultiplier * 20);
              return {
                transform: `translate(${x}px, ${y}px) scale(${isSelected ? 1.1 : 1})`,
                zIndex: isSelected ? 20 : 10 - Math.abs(index - 2)
              };
            }
          };

          // Curvatura dinâmica
          const borderRadius = isVertical
            ? (curveSide === 'right' ? 'rounded-r-xl' : 'rounded-xl')
            : (curveSide === 'right' ? 'rounded-b-xl' : 'rounded-t-xl');

          return (
            <div
              key={dateInfo.value}
              className={cn(
                "absolute cursor-pointer transition-all duration-500 ease-out",
                "border-2 flex flex-col items-center justify-center",
                "transform-gpu will-change-transform",
                type === 'day' 
                  ? (isVertical ? "w-14 h-12" : "w-12 h-16")
                  : "w-16 h-12", // Meses são mais largos
                borderRadius,
                {
                  // Card selecionado
                  "bg-[linear-gradient(135deg,_hsl(var(--day-selector-selected)),_hsl(var(--day-selector-selected-glow)))] border-[hsl(var(--day-selector-selected))] text-[hsl(var(--day-selector-card))] shadow-[var(--shadow-day-selected)] z-20 scale-110": isSelected,
                  // Card normal
                  "bg-[hsl(var(--day-selector-card))] border-[hsl(var(--day-selector-card))] text-[hsl(var(--day-selector-text))] shadow-[var(--shadow-day-card)] opacity-80 z-10 hover:bg-[hsl(var(--day-selector-card-hover))] hover:shadow-[var(--shadow-day-hover)]": !isSelected,
                  // Card de hoje/mês atual
                  "ring-2 ring-[hsl(var(--day-selector-primary))]/30": (dateInfo.isToday || dateInfo.isCurrent) && !isSelected,
                }
              )}
              style={{
                ...(isVertical 
                  ? { top: `${index * 14}px` }
                  : { left: `${index * 12}px` }
                ),
                ...getTransformStyle()
              }}
              onClick={() => handleDateClick(dateInfo.value)}
            >
              <span className={cn(
                "font-medium opacity-70",
                isVertical ? "text-xs" : "text-xs",
                isSelected ? "text-[hsl(var(--day-selector-card))]" : "text-[hsl(var(--day-selector-text-light))]"
              )}>
                {isVertical ? dateInfo.label.slice(0, 3) : dateInfo.label}
              </span>
              <span className={cn(
                "font-bold leading-none",
                type === 'day' 
                  ? (isVertical ? "text-xl" : "text-lg")
                  : "text-base", // Meses têm texto menor
                isSelected ? "text-[hsl(var(--day-selector-card))]" : "text-[hsl(var(--day-selector-text))]"
              )}>
                {type === 'day' ? dateInfo.value : dateInfo.value + 1}
              </span>
              {(dateInfo.isToday || dateInfo.isCurrent) && (
                <div className={cn(
                  "absolute w-1.5 h-1.5 rounded-full",
                  isVertical ? (curveSide === 'left' ? "-left-2" : "-right-2") : "-bottom-2",
                  isSelected ? "bg-[hsl(var(--day-selector-card))]" : "bg-[hsl(var(--day-selector-primary))]"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector; 