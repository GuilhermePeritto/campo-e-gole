import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import { Calendar } from "@/components/ui/calendar-rac";

interface ModernCalendarProps {
  value: DateValue | null;
  onChange: (date: DateValue | null) => void;
}

export default function ModernCalendar({ value, onChange }: ModernCalendarProps) {
  return (
    <Calendar
      className="rounded-md border border-border p-2 pointer-events-auto"
      value={value}
      onChange={onChange}
    />
  );
}