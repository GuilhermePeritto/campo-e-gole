
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDateForDisplay = (date: Date | string): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'dd/MM/yyyy', { locale: ptBR });
};

export const formatTimeForDisplay = (time: string): string => {
  if (!time) return '';
  
  // Handle different time formats
  if (time.includes(':')) {
    return time; // Already formatted
  }
  
  // Convert from 24h format if needed
  const [hours, minutes] = time.split(':');
  return `${hours?.padStart(2, '0') || '00'}:${minutes?.padStart(2, '0') || '00'}`;
};

export const formatDateTimeForDisplay = (date: Date | string, time?: string): string => {
  if (!date) return '';
  
  const formattedDate = formatDateForDisplay(date);
  
  if (time) {
    const formattedTime = formatTimeForDisplay(time);
    return `${formattedDate} às ${formattedTime}`;
  }
  
  return formattedDate;
};

export const parseDateFromDisplay = (dateString: string): Date | null => {
  if (!dateString) return null;
  
  try {
    // Parse DD/MM/YYYY format
    if (dateString.includes('/')) {
      return parse(dateString, 'dd/MM/yyyy', new Date());
    }
    
    // Fallback to ISO format
    return new Date(dateString);
  } catch {
    return null;
  }
};

export const parseTimeFromDisplay = (timeString: string): string => {
  if (!timeString) return '';
  
  // Ensure HH:MM format
  const cleanTime = timeString.replace(/[^\d:]/g, '');
  const parts = cleanTime.split(':');
  
  if (parts.length >= 2) {
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  
  return '00:00';
};

export const formatDateForInput = (date: Date | string): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};

export const formatDateTimeForStorage = (date: Date | string, time?: string): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const formattedDate = format(dateObj, 'yyyy-MM-dd');
  
  if (time) {
    const formattedTime = parseTimeFromDisplay(time);
    return `${formattedDate}T${formattedTime}:00`;
  }
  
  return formattedDate;
};
