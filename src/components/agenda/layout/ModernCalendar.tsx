import { Calendar } from "@/components/ui/calendar-rac";
import type { DateValue } from "react-aria-components";

interface ModernCalendarProps {
  value: DateValue | null;
  onChange: (date: DateValue | null) => void;
  className?: string;
}

export default function ModernCalendar({ value, onChange, className }: ModernCalendarProps) {
  return (
    <Calendar
      className={`rounded-md p-2 pointer-events-auto ${className ?? ''}`}
      value={value}
      onChange={onChange}
    />
  );
}