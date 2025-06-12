
export const getWeekDays = (currentDate: Date) => {
  const start = new Date(currentDate);
  start.setDate(currentDate.getDate() - currentDate.getDay());

  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    days.push(day);
  }
  return days;
};

export const getMonthDays = (currentDate: Date) => {
  const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const days = [];

  const firstDayWeek = start.getDay();
  for (let i = firstDayWeek - 1; i >= 0; i--) {
    const day = new Date(start);
    day.setDate(start.getDate() - (i + 1));
    days.push(day);
  }

  for (let i = 1; i <= end.getDate(); i++) {
    const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    days.push(day);
  }

  const totalCells = Math.ceil(days.length / 7) * 7;
  const remaining = totalCells - days.length;
  for (let i = 1; i <= remaining; i++) {
    const day = new Date(end);
    day.setDate(end.getDate() + i);
    days.push(day);
  }

  return days;
};

export const getTimeSlots = () => {
  return Array.from({ length: 15 }, (_, i) => {
    const hour = i + 7;
    return `${hour.toString().padStart(2, '0')}:00`;
  });
};

export const getDateTitle = (viewType: string, currentDate: Date, weekDays: Date[]) => {
  switch (viewType) {
    case 'day':
      return currentDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'week':
      const startWeek = weekDays[0];
      const endWeek = weekDays[6];
      return `${startWeek.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} - ${endWeek.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}`;
    case 'month':
      return currentDate.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
    default:
      return '';
  }
};

export const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};
